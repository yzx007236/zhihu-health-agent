"""Local, conservative teaching-reference retrieval. Never participates in scoring.

Association rows are candidate indexes only. Missing facts stay unknown. The
small declarative gate resource is deliberately separate from the source cards.
"""
from __future__ import annotations

import hashlib
import html
import json
import os
import re
from pathlib import Path
from datetime import datetime, timezone

HERE = Path(__file__).resolve().parent
RULES_PATH = HERE / "experience_rules.json"
NOTICE = "教学参考；尚未临床专家审定。不用于自动诊断、处方或执行，不参与原评分。"
NO_MATCH = "经验库暂无适用依据。请补充疾病背景、人群、当前情境及风险信息，必要时由专业人员评估。"
LABELS = {"applicable": "符合条件", "needs_information": "还需补充信息", "not_applicable": "不适用"}


def resource_path():
    configured = os.environ.get("ZHIHU_EXPERIENCE_PATH")
    if configured:
        return Path(configured)
    for version in ("3.2", "3.1", "3.0"):
        for parent in HERE.parents:
            candidate = parent / "output" / f"知护题库关联经验库_v{version}" / f"知护题库关联经验库_v{version}.json"
            if candidate.is_file():
                return candidate
    return HERE / "resources" / "experience.json"


def _load():
    def require(condition):
        if not condition:
            raise ValueError("invalid experience resource")
    raw = resource_path().read_bytes()
    data = json.loads(raw.decode("utf-8-sig"))
    rules_raw = RULES_PATH.read_bytes()
    rules = json.loads(rules_raw.decode("utf-8"))
    require(isinstance(data["version"], str) and data["clinical_review"])
    sources = {s["id"]: s for s in data["sources"]}
    require(len(sources) == len(data["sources"]) == data["source_count"])
    ids = set()
    for card in data["cards"]:
        require(card["id"] not in ids)
        ids.add(card["id"])
        for key in ("title", "topic", "trigger", "collect", "action", "boundary", "status", "interpretation"):
            require(isinstance(card[key], str) and card[key])
        require(card["evidence"])
        for evidence in card["evidence"]:
            source = sources[evidence["source_id"]]
            require(all(isinstance(evidence[k], str) and evidence[k] for k in ("quote", "locator", "grade")))
            require(all(isinstance(source[k], str) and source[k] for k in ("title", "issuer", "version", "verification_scope", "original_url", "checked_on")))
            require(source["original_url"].startswith(("https://", "http://")))
        profile = rules["cards"][card["id"]]
        require(profile["backgrounds"] and profile["requires"])
        for group in profile["backgrounds"]:
            re.compile(rules["backgrounds"][group]["pattern"])
        for gate in profile["requires"] + profile.get("excludes", []):
            re.compile(gate["pattern"])
            require(bool(gate["question"]))
    require(len(ids) == data["card_count"] and ids <= rules["cards"].keys())
    for kind in ("question_associations", "case_associations"):
        for row in data[kind]:
            for link in row["links"]:
                require(set(link["card_ids"]) <= ids)
    return data, rules, hashlib.sha256(raw).hexdigest(), hashlib.sha256(rules_raw).hexdigest()


def status(enabled=True):
    if not enabled or os.environ.get("ZHIHU_EXPERIENCE_ENABLED", "1").lower() in {"0", "false", "off"}:
        return {"status": "disabled", "message": "经验库已关闭；基本训练仍可使用。", "notice": NOTICE}
    try:
        data, _, digest, rules_digest = _load()
        return {"status": "available", "version": data["version"], "cards": data["card_count"],
                "sources": data["source_count"], "checked_on": data["checked_on"],
                "clinical_review": data["clinical_review"], "sha256": digest,
                "rules_sha256": rules_digest, "notice": NOTICE}
    except (OSError, ValueError, KeyError, TypeError, AttributeError, re.error):
        return {"status": "unavailable", "message": "经验库不可用（资源缺失、损坏或字段校验失败）；基本训练仍可使用。", "notice": NOTICE}


def clauses(text):
    return [s.strip() for s in re.split(r"[，,。；;！!\n]|但是|但|而目前", text) if s.strip()]


def _assertion(clause, match):
    """Scope negation, uncertainty, temporality and hypothetical questions locally.

    This is a conservative lexical parser, not a clinical language model.
    Ambiguous statements never establish an affirmative fact.
    """
    before = clause[:match.start()]
    after = clause[match.end():]
    if re.search(r"疑似|可能|待排|待查|考虑|不排除|尚未|未确认|未确诊|未排除|未能排除|不能确定|是否|有无|如果|假如|若|如何排除|不能排除", before[-16:]) or re.match(r"[？?]|待排|待查|可能|疑似|尚未确诊|未确诊|诊断待定|诊断未明确", after):
        return None
    if re.search(r"否认|排除|没有|并无|无(?:明确)?|不是|非|未见|未出现|不存在", before[-12:]) or re.match(r"(?:史|诊断)?(?:已排除|阴性|不成立)|不存在|不支持", after):
        return False
    if re.search(r"既往|曾经|过去|已缓解|已经恢复", before[-12:]) and not re.search(r"目前|当前|现在|持续|仍|后", clause[match.start():]):
        return None
    if re.search(r"家族|父亲|母亲|家属", before[-8:]):
        return None
    return True


def fact(text, pattern):
    states = []
    for clause in clauses(text):
        for match in re.finditer(pattern, clause, re.I):
            states.append(_assertion(clause, match))
    if not states:
        return None
    # Conflicting or uncertain records must be clarified instead of selecting
    # whichever mention happened to appear last.
    if None in states or (True in states and False in states):
        return None
    return states[0]


def _visible_recall(text, pattern):
    """Do not fill the automatic companion with negated ROS symptoms.

    A suspected current condition can recall a candidate, but never establishes
    applicability. Deliberate query text remains a separate candidate index.
    """
    for clause in clauses(text):
        for match in re.finditer(pattern, clause, re.I):
            if _assertion(clause, match) is True:
                return True
            if (re.search(r"疑似|高度怀疑|考虑|待排", clause[:match.start()])
                    and not re.search(r"否认|已排除|既往|曾经|家族|父亲|母亲|如果|假如|是否|有无", clause)):
                return True
    return False


def emergency(text):
    patterns = [r"意识(?:不清|丧失|障碍|下降|降低)|昏迷|呼之不应|抽搐", r"休克|持续大出血|大量呕血|气道(?:受损|梗阻)|喉头水肿|不能呼吸|严重呼吸困难|口唇发绀", r"明确腹膜炎|板状腹|急性高碳酸(?:血症|呼吸衰竭)", r"新发(?:偏瘫|口角歪斜|言语不清)|突发(?:偏瘫|言语不清)", r"(?:持续|剧烈|突发)胸痛.{0,8}(?:大汗|冷汗|晕厥)", r"脓毒症|严重过敏反应|全身性过敏反应|anaphylaxis"]
    # Emergency recognition runs before loading, disabling or stage gating.
    for clause in clauses(text):
        for pattern in patterns:
            for match in re.finditer(pattern, clause):
                if _assertion(clause, match) is True:
                    return True
                # Current suspected danger also warrants escalation. A question,
                # hypothetical, family or historical record alone does not.
                before = clause[:match.start()]
                if re.search(r"疑似|不排除|不能排除|未排除|未能排除|高度怀疑|考虑", before[-16:]) and not re.search(r"既往|曾经|家族|父亲|母亲|如果|假如|是否|有无|如何|若", clause):
                    return True
    # Symptoms in separate displayed rows/clauses still constitute a current
    # danger signal. Negated, historical and hypothetical mentions stay unknown.
    return (fact(text, r"胸痛|胸闷|胸骨后.{0,6}(?:压榨|闷痛)") is True
            and fact(text, r"大汗|冷汗|晕厥") is True)


def _age(text):
    values = {int(m) for m in re.findall(r"(?<!\d)(\d{1,3})\s*岁", text)}
    if len(values) == 1:
        return values.pop()
    if len(values) > 1:
        return None
    if re.search(r"儿童|幼儿|婴儿|小儿|未成年", text):
        return 10
    if re.search(r"老年|老人", text):
        return 65
    if "成人" in text:
        return 30
    return None


def _background(text, group, rules):
    definition = rules["backgrounds"][group]
    found = fact(text, definition["pattern"])
    if found is not True or definition.get("suspected_allowed"):
        if found is None and definition.get("suspected_allowed"):
            if any(_assertion(clause, match) is False
                   for clause in clauses(text)
                   for match in re.finditer(definition["pattern"], clause, re.I)):
                return None  # conflicting suspected / explicitly excluded data
            # Suspected AMI is intentional in these guidelines. Negation still
            # vetoes; an isolated mention or past history does not establish it.
            for clause in clauses(text):
                if re.search(r"疑似|高度怀疑|高疑|考虑", clause) and re.search(definition["pattern"], clause, re.I) and not re.search(r"否认|已排除|既往|家族", clause):
                    return True
        return found
    if definition.get("confirmed_required") or group in {"copd", "stroke", "diabetes", "elderly_diabetes", "ra"}:
        # A bare disease name used for search is not a confirmed background.
        for clause in clauses(text):
            if re.search(definition["pattern"], clause, re.I) and re.search(r"确诊|已诊断|诊断为?|(?:胃镜|内镜)证实|患者|病人|患有|卒中后", clause) and fact(clause, definition["pattern"]) is True:
                return True
        return None
    return found


def _evaluate(card, rule, text, rules):
    missing, excluded, confirmed = [], [], []
    checks = []
    def check(key, value):
        checks.append({"condition": key, "result": "present" if value is True else "absent" if value is False else "unknown"})
    for group in rule["backgrounds"]:
        condition = rules["backgrounds"][group]
        result = _background(text, group, rules)
        check("background:" + group, result)
        if result is False:
            excluded.append(condition["question"] + "：已有否定信息")
        elif result is None:
            missing.append(condition["question"])
        else:
            confirmed.append(condition["question"])
    age = _age(text)
    minimum = rule.get("min_age", 18)
    if minimum:
        check("age:minimum", None if age is None else age >= minimum)
        if age is None:
            missing.append(f"请确认当前患者年龄及是否属于{minimum}岁及以上人群。")
        elif age < minimum:
            excluded.append(f"当前年龄不在本卡限定的{minimum}岁及以上人群范围内。")
        else:
            confirmed.append("年龄人群条件")
    for index, gate in enumerate(rule["requires"]):
        result = fact(text, gate["pattern"])
        check(f"requires:{index}", result)
        if result is False:
            excluded.append(gate["question"] + "：已有否定信息")
        elif result is None:
            missing.append(gate["question"])
        else:
            confirmed.append(gate["question"])
    for index, gate in enumerate(rule.get("excludes", [])):
        result = fact(text, gate["pattern"])
        check(f"excludes:{index}", result)
        if result is True:
            excluded.append(gate["question"])
        elif result is None and (gate.get("require_clear", True) or re.search(gate["pattern"], text, re.I)):
            missing.append(gate["question"])
        elif result is False:
            confirmed.append("已核对排除项：" + gate["question"])
    state = "not_applicable" if excluded else "needs_information" if missing else "applicable"
    return {"applicability": state, "label": LABELS[state], "condition_checks": checks, "confirmed_conditions": confirmed,
            "unconfirmed_conditions": missing, "exclusion_reasons": excluded,
            "additional_information": ([card["collect"]] if state != "not_applicable" else []),
            "questions": missing + ([card["collect"]] if state == "needs_information" else [])}


def search(query="", question_id=None, case_id=None, topic=None, node_id=None,
           enabled=True, allow_cards=True, audit_path=None,
           guidance_only=False, visible_context="", coaching=False):
    # Only explicitly visible clinical text supplies facts. Index labels, stems,
    # hidden case fields, standard answers and student proposals are never facts.
    text = str(query or "")[:12000]
    guidance_only = bool(guidance_only and not allow_cards)
    coaching = bool(coaching and guidance_only)
    visible = str(visible_context or "")[:12000]
    urgent = emergency(text) or emergency(visible)
    base = {"status": "ok", "cards": [], "notice": NOTICE, "urgent": urgent, "review_allowed": bool(allow_cards),
            "guidance_allowed": guidance_only,
            "mode": "coaching" if coaching else "training_guidance" if guidance_only else "reference_review" if allow_cards else "assessment_protected",
            "urgent_message": "存在紧急风险线索，请立即联系现场救治团队或急诊/120，优先升级处理；不要等待追问或指南检索。" if urgent else "",
            "message": NO_MATCH, "outcome": "no_reliable_match"}
    availability = status(enabled)
    base["resource"] = availability
    if availability["status"] != "available":
        base.update(status=availability["status"], message=availability["message"], outcome=availability["status"])
        _audit(base, audit_path)
        return base
    if not allow_cards and not guidance_only:
        base.update(outcome="stage_restricted", message="当前处于未提交自测或独立测评，暂不展示可能提示答案的经验卡。病例带教练习可查看条件性参考，评分后可复盘完整依据。")
        _audit(base, audit_path)
        return base
    try:
        data, rules, _, _ = _load()
        sources = {s["id"]: s for s in data["sources"]}
        # During practice, association IDs cannot reveal a hidden case topic or
        # an unsubmitted question's answer. Only visible text / explicit search
        # subjects recall candidates; the student's query never establishes facts.
        retrieval_text = text + "；" + visible if guidance_only else text
        if guidance_only:
            question_id = case_id = None
        reasons = {}
        def add(cid, why):
            reasons.setdefault(cid, []).append(why)
        for kind, key, value in (("question_associations", "question_id", question_id), ("case_associations", "case_id", case_id)):
            if value:
                for row in data[kind]:
                    if row[key] == value:
                        for link in row["links"]:
                            for cid in link["card_ids"]:
                                add(cid, f"{key}={value}的候选索引；{link['condition']}")
        for card in data["cards"]:
            cid = card["id"]
            if question_id in card.get("question_ids", []) or case_id in card.get("case_ids", []):
                add(cid, "卡片登记的题号/病例号候选关联")
            if node_id and node_id in card.get("node_ids", []):
                add(cid, f"知识节点{node_id}候选关联")
            if topic and (topic in card["topic"] or card["topic"] in topic):
                add(cid, f"疾病主题{topic}候选检索")
            rule = rules["cards"][cid]
            if re.search(rf"(?<![A-Za-z0-9]){cid}(?!\d)", retrieval_text, re.I):
                add(cid, "指定经验卡编号")
            patterns = [rules["backgrounds"][g]["pattern"] for g in rule["backgrounds"]] + rule.get("retrieval", [])
            if any(re.search(p, text, re.I) or (guidance_only and _visible_recall(visible, p)) for p in patterns):
                add(cid, "公开资料或自主检索含疾病/情境词；检索词不等于患者确诊" if guidance_only else "当前描述含疾病或情境检索词；仍需逐项核对适用性")
        results = []
        for card in data["cards"]:
            if card["id"] not in reasons:
                continue
            evaluation = _evaluate(card, rules["cards"][card["id"]], visible if guidance_only else text, rules)
            if guidance_only:
                # Explicit allowlist: do not return recommendation-bearing titles,
                # triggers, collect/action/boundary prose, quotes or grades, even
                # in the JSON response. This is not merely a UI concealment.
                item = {"id": card["id"], "title": card["topic"] + " · 适用条件核对",
                        "topic": card["topic"], "guidance_only": True,
                        "retrieval_reasons": reasons[card["id"]], **evaluation,
                        "questions": evaluation["unconfirmed_conditions"],
                        "additional_information": [],
                        "learning_guidance": ("已有公开信息与本卡条件冲突，请勿套用。" if evaluation["applicability"] == "not_applicable" else
                                              "已提供信息符合本卡检索条件，请自主形成判断，评分后再复核完整推荐。" if evaluation["applicability"] == "applicable" else
                                              "把未确认条件转化为自己的询问或核实，获得患者回答后再检索。") +
                                             "候选主题不是本例诊断；未询问的信息仍为未知。风险变化时优先联系现场专业团队评估。",
                        "review_status": card["status"],
                        "evidence": [{"source_id": e["source_id"], "locator": e["locator"],
                                      "source": {k: sources[e["source_id"]][k] for k in
                                                 ("id", "title", "issuer", "version", "original_url", "verification_scope", "checked_on")}}
                                     for e in card["evidence"]]}
                checks = evaluation["condition_checks"]
                backgrounds = [c for c in checks if c["condition"].startswith("background:")]
                population = [c for c in checks if c["condition"].startswith("age:")]
                safe_to_coach = (coaching and backgrounds and all(c["result"] == "present" for c in backgrounds + population)
                                 and evaluation["applicability"] != "not_applicable")
                if safe_to_coach:
                    item.update(title=card["title"], guidance_only=False, coaching=True,
                                trigger=card["trigger"], additional_information=[card["collect"]],
                                teaching_interpretation=card["action"] if evaluation["applicability"] == "applicable" else "",
                                conditional_interpretation=card["action"] if evaluation["applicability"] == "needs_information" else "",
                                interpretation_label=card["interpretation"], boundary=card["boundary"],
                                evidence=[{**e, "source": sources[e["source_id"]]} for e in card["evidence"]])
                results.append(item)
                continue
            item = {"id": card["id"], "title": card["title"], "topic": card["topic"],
                    "retrieval_reasons": reasons[card["id"]], **evaluation,
                    "trigger": card["trigger"], "boundary": card["boundary"],
                    "teaching_interpretation": card["action"] if evaluation["applicability"] == "applicable" else "",
                    "conditional_interpretation": card["action"] if evaluation["applicability"] == "needs_information" else "",
                    "interpretation_label": card["interpretation"], "review_status": card["status"],
                    "evidence": [{**e, "source": sources[e["source_id"]]} for e in card["evidence"]]}
            results.append(item)
        order = {"applicable": 0, "needs_information": 1, "not_applicable": 2}
        if coaching:
            results.sort(key=lambda c: (0 if "指定经验卡编号" in c["retrieval_reasons"] else 1,
                                        order[c["applicability"]],
                                        -sum(x["result"] == "present" for x in c["condition_checks"] if x["condition"].startswith("requires:")),
                                        len(c["unconfirmed_conditions"]), c["id"]))
        else:
            results.sort(key=lambda c: (order[c["applicability"]], len(c["unconfirmed_conditions"]), c["id"]))
        base["candidate_count"] = len(results)
        base["cards"] = results[:3 if coaching else 12]
        if any(c["applicability"] == "applicable" for c in results):
            base.update(outcome="applicable", message="部分候选卡符合已提供的教学检索条件，仍须逐项复核补充信息和边界；不代表覆盖该病例或答案正确。")
        elif any(c["applicability"] == "needs_information" for c in results):
            base.update(outcome="needs_information", message="尚无已确认适用的经验卡。请先核对候选卡的关键追问；以下调整思路仅在条件核实后供教学参考。")
        if guidance_only:
            base["message"] = ("训练中引导：根据公开资料与患者已说出的内容核对条件。你输入的诊断或处理想法只用于检索，不作为已确认事实；以下问题是指南适用性自查，不是本例标准答案或评分点。完整推荐与教学转述在原评分完成后展示。"
                               if results else "经验库暂无适用依据。请补充自主检索主题或继续采集当前情境；不会根据病例号推断隐藏诊断。")
            base["context_basis"] = "public_case_and_sp_replies_only"
            base["context_detail"] = "公开病例资料、当前已查看的采集结果及已保存患者回答；不含隐藏资料或学生拟诊"
            if coaching:
                base["message"] = ("带教练习：依据公开资料和已记录的患者回答核对条件；输入的猜测只用于检索。思路仅在相关条件核实后供教学参考，不代表标准答案或评分正确。"
                                   if results else "经验库暂无适用依据，请继续采集信息或寻求专业评估。")
        _audit(base, audit_path, results)
        return base
    except (OSError, ValueError, KeyError, TypeError, AttributeError, re.error):
        base.update(status="unavailable", outcome="unavailable", cards=[], message="经验库检索失败；基本训练仍可使用。")
        _audit(base, audit_path)
        return base


def _audit(result, audit_path, candidates=()):
    if not audit_path:
        return
    # Controlled fields only: no raw text, patient identities or their hashes.
    resource = result.get("resource", {})
    audit = {"time": datetime.now(timezone.utc).isoformat(), "version": resource.get("version"),
             "resource_sha256": resource.get("sha256"), "rules_sha256": resource.get("rules_sha256"),
             "outcome": result["outcome"], "urgent": result["urgent"], "mode": result.get("mode"),
             "candidates": [{"id": c["id"], "result": c["applicability"],
                             "condition_checks": c["condition_checks"],
                             "confirmed_count": len(c["confirmed_conditions"]),
                             "missing_count": len(c["unconfirmed_conditions"]),
                             "excluded_count": len(c["exclusion_reasons"]),
                             "via": sorted({"association" if "索引" in r or "关联" in r else "context" for r in c["retrieval_reasons"]})}
                            for c in candidates]}
    try:
        path = Path(audit_path); path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("a", encoding="utf-8") as stream:
            stream.write(json.dumps(audit, ensure_ascii=False) + "\n")
        result["audit_status"] = "recorded"
    except OSError:
        result["audit_status"] = "unavailable"


def render_reference_html(result):
    """Escaped, source-faithful report fragment; no generated medical content."""
    esc = lambda v: html.escape(str(v), quote=True)
    parts = ["<section><h2>医学指南情境经验（教学参考）</h2>", f"<p>{esc(result['notice'])}</p>"]
    if result.get("urgent"):
        parts.append(f"<p><strong>{esc(result['urgent_message'])}</strong></p>")
    parts.append(f"<p>{esc(result['message'])}</p>")
    for c in result.get("cards", []):
        if c.get("guidance_only"):
            parts.extend([f"<article><h3>{esc(c['id'])} {esc(c['title'])} · {esc(c['label'])}</h3>",
                          f"<p>训练中适用性自查：{esc('；'.join(c['questions']))}</p>",
                          f"<p>{esc(c['learning_guidance'])}</p>"])
            for e in c["evidence"]:
                s = e["source"]
                parts.append(f"<p>来源 {esc(s['id'])}：{esc(s['title'])} · {esc(s['issuer'])} · 版本 {esc(s['version'])} · {esc(e['locator'])} · <a href='{esc(s['original_url'])}'>原始链接</a> · 核验范围：{esc(s['verification_scope'])} · 核验日期 {esc(s['checked_on'])}</p>")
            parts.append("</article>")
            continue
        parts.extend([f"<article><h3>{esc(c['id'])} {esc(c['title'])} · {esc(c['label'])}</h3>",
                      f"<p>检出依据：{esc('；'.join(c['retrieval_reasons']))}</p>",
                      f"<p>未确认条件：{esc('；'.join(c['unconfirmed_conditions']))}</p>",
                      f"<p>关键追问/需补信息：{esc('；'.join(c['questions'] + c['additional_information']))}</p>",
                      f"<p>排除原因：{esc('；'.join(c['exclusion_reasons']))}</p>",
                      f"<p>整理者教学转述（条件核实后参考）：{esc(c['teaching_interpretation'] or c['conditional_interpretation'])}</p>",
                      f"<p>边界与升级：{esc(c['boundary'])}</p>", f"<p>审核状态：{esc(c['review_status'])}</p>"])
        for e in c["evidence"]:
            s = e["source"]
            label = e.get('quote_label') or ('专家共识原文' if s.get('evidence_type') == 'expert_consensus' else '指南原文推荐')
            parts.append(f"<blockquote>{esc(label)}：{esc(e['quote'])}</blockquote><p>{esc(e['grade'])} · {esc(e['locator'])}</p><p>来源 {esc(s['id'])}：{esc(s['title'])} · {esc(s['issuer'])} · 版本 {esc(s['version'])} · <a href='{esc(s['original_url'])}'>原始链接</a> · 核验范围：{esc(s['verification_scope'])} · 核验日期 {esc(s['checked_on'])}</p>")
        parts.append("</article>")
    parts.append("</section>")
    return "\n".join(parts)
