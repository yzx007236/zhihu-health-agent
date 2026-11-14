// 知护 · 全面测试版 —— 会话核心（不依赖 DOM，可单独用 node 测试）
// 提供：演示病例、脚本对话、规则驱动的虚拟居民、证据抽取
(function (root) {
  'use strict';

  // ============================================================
  // 一、演示病例：家庭血压管理（首演场景，合成资料）
  // ============================================================
  const DEMO_CASE = {
    case_id: 'BP1',
    disease_id: 'hypertension',
    disease_label: '高血压',
    title: '王阿姨的家庭血压管理',
    recommended_majors: ['nursing', 'health_management', 'clinical_medicine', 'rehabilitation', 'traditional_chinese_medicine'],
    professional_focus: {
      clinical_medicine: '核对测量条件与用药执行，识别需要转诊的警示信号，不自行调药',
      nursing: '把测量规范和服药依从性讲清楚，用居民听得懂的话完成健康教育',
      health_management: '建立连续随访与提醒机制，把家庭支持纳入管理计划',
      rehabilitation: '核对活动与体位对读数的影响，给出安全的日常活动建议',
      traditional_chinese_medicine: '核对是否同时服用中成药或保健品，避免与降压药相互影响',
    },
    public_profile: { name: '王阿姨', age: 66, setting: '社区慢病随访', notice: '全部资料均为合成' },
    clinical_data: [
      { day: 'D1', time: '07:30', item: '家庭血压记录', value: '162/94 mmHg', note: '起床后自测，尚未服药' },
      { day: 'D2', time: '07:25', item: '家庭血压记录', value: '158/92 mmHg', note: '起床后自测，尚未服药' },
      { day: 'D3', time: '07:20', item: '家庭血压记录', value: '149/88 mmHg', note: '服药后约 1 小时' },
      { day: '10-12', time: '门诊', item: '医嘱', value: '长效降压药，每天一次', note: '心内科门诊开具，未复诊' },
    ],
    persona: {
      personality: '爽快、怕麻烦、不太愿意承认自己没按要求做',
      concern: '觉得血压降下来就不用天天吃药，也不想天天量',
      speech_style: '说话直、爱抢话、常把"我知道我知道"挂嘴边',
      initial_emotion: '有点不耐烦',
    },
    hidden_info: [
      { id: 'H1', value: '最近两周有四五天忘了吃药，看到血压降下来就自己停了两天', sensitivity: 'synthetic' },
      { id: 'H2', value: '家里那台血压计是十多年前的腕式旧机器，量的时候手臂一直悬着没托住', sensitivity: 'synthetic' },
      { id: 'H3', value: '女儿在外地，平时没人提醒她吃药，她自己也不记账', sensitivity: 'synthetic' },
    ],
    release_conditions: {
      H1: ['ask_medication_adherence_without_blame', 'ask_current_and_leftover_medication'],
      H2: ['ask_device_demonstration_without_blame'],
      H3: ['ask_available_support', 'ask_family_care_practices'],
    },
    task: '核对家庭血压记录的测量条件、用药执行情况与家庭支持，解释"血压正常也要继续管理"的原因，并与居民共同制定可执行的测量与复诊计划。',
    initial_state: { revealed_info: [], emotion: '有点不耐烦', concern_acknowledged: false, boundary_bait_used: false },
    must_cover: ['specific_history', 'trend_interpretation', 'medication_boundary', 'followup_plan', 'teach_back'],
    variant_of: null,
    knowledge_refs: ['K-BP-001', 'K-BP-002', 'K-BP-003', 'K-BP-004'],
    review_status: 'synthetic_demo',
    boundary_behaviors: [],
  };

  // ============================================================
  // 二、黄金对话脚本（演示模式逐步回放，14 轮）
  //    tags 用于确定性评分；quote 就是学生这一轮的原话
  // ============================================================
  const DEMO_SCRIPT = [
    {
      student: '王阿姨您好，我是社区的健康服务人员小陈。今天想跟您聊聊最近在家里量血压的情况，方便吗？',
      resident: '方便方便，你说吧。我这血压最近挺好的，不就是有点高嘛，我这年纪谁不高啊。',
      tags: ['ask_open_question'],
    },
    {
      student: '您平时是怎么量的？一天量几次，大概什么时间量？',
      resident: '早上起来量一次呗，有时候想起来才量。我女儿给我买了个血压计，用了好多年了。',
      tags: ['ask_open_question', 'ask_specific_fact'],
    },
    {
      student: '我看您这几个记录，早上刚起来还没吃药的时候是一百六十多，吃了药以后是一百四十多。这几天连着看是往下走的。',
      resident: '是吧？我就说嘛，降下来了。那还天天吃药干啥。',
      tags: ['use_trend', 'avoid_single_reading_conclusion'],
    },
    {
      student: '降下来是好事，说明药在起作用。不过这个数是早上刚起床、还没吃药的时候量的，跟吃完药以后不是一个条件，得分开看才准。',
      resident: '哦……这么讲究啊。我一直以为量出来多少就是多少。',
      tags: ['avoid_single_reading_conclusion', 'explain_reason', 'plain_language'],
    },
    {
      student: '您刚才说那个血压计用了好多年，是绑在胳膊上那种，还是套在手腕上的？',
      resident: '手腕上的，手腕上的方便。哎呀……说起来我那机器好像有点旧了，量的时候手就那么举着。',
      tags: ['ask_device_demonstration_without_blame'],
      reveal: 'H2',
    },
    {
      student: '手腕式的对姿势要求高，手臂悬空或者位置不对，量出来会偏高或者偏低。咱们一会儿可以一起看下说明书，或者换成上臂式的更稳。',
      resident: '行行，那你帮我看看。我这人也不懂这些，买的时候人家说这个方便。',
      tags: ['explain_reason', 'specific_next_step'],
    },
    {
      student: '再说吃药的事。这两个礼拜，有没有哪几天是忘了吃，或者自己觉得不用吃就停了的？您照实说就行，我不是来批评您的。',
      resident: '……有。血压一降下来我就想着，这两天挺正常的，就停了两天。前后大概四五天吧，没天天吃。',
      tags: ['ask_medication_adherence_without_blame', 'acknowledge_concern'],
      reveal: 'H1',
    },
    {
      student: '谢谢您跟我说实话，这个特别重要。很多人都会这么想，觉得正常了就可以停。但降压药是控制血压的，不是治好的，停了以后血压会再上来，而且忽高忽低对血管的伤害比一直偏高还大。',
      resident: '啊？还会这样啊。我以为不难受就没事呢。那我这停了两天，要不要紧？',
      tags: ['explain_reason', 'plain_language', 'no_self_adjustment', 'acknowledge_concern'],
    },
    {
      student: '停这两天不至于马上出大问题，但以后别自己停了。要不要调整、怎么吃，得让给您开药的医生定，我不能替您改药。',
      resident: '那我下次去问问医生。不过我这人记性差，一忙就忘。',
      tags: ['no_self_adjustment', 'refer_qualified_professional', 'defer_diagnosis'],
    },
    {
      student: '家里平时有人提醒您吗？比如女儿会不会打电话问您吃药没有？',
      resident: '她在深圳，忙得很，一个星期打个电话。我一个人住，也没人管我，我自己也不记。',
      tags: ['ask_available_support', 'ask_family_care_practices'],
      reveal: 'H3',
    },
    {
      student: '那咱们想个不靠记性的办法。药盒分格，或者把药放在每天必用的东西旁边，比如水杯、牙刷边上。您觉得哪种您能做到？',
      resident: '放水杯边上这个行，我每天早上都烧水。分格药盒……也行，你帮我买一个？',
      tags: ['shared_decision', 'specific_next_step'],
    },
    {
      student: '可以，下次随访我给您带一个。量血压也得定个固定时间：早上起床后、上完厕所、吃药前，坐着歇五分钟再量，手臂放在桌上跟心脏差不多高。',
      resident: '坐着歇五分钟……那我原来举着手腕量，是不对的？',
      tags: ['specific_next_step', 'plain_language'],
    },
    {
      student: '对，那样量出来的数不可靠。您能把我刚才说的复述一遍吗？我想确认您记住了。',
      resident: '就是……早上起来先坐着歇会儿，手放桌上量，量完再吃药。药不能自己停，忘了吃也别补两片。',
      tags: ['use_teach_back', 'teach_back'],
    },
    {
      student: '记得很清楚。最后定一下：两星期后您带着这几天的记录来社区一趟，我们把数一起看，需要的话我帮您约心内科。这几天如果出现头晕、胸闷、看东西模糊，别等，直接去医院。',
      resident: '好，那我记下了。两星期后我过来找你。谢谢你啊小陈，今天说的我都听明白了。',
      tags: ['specific_next_step', 'timely_referral', 'identify_case_warning'],
    },
  ];

  // ============================================================
  // 三、规则驱动的虚拟居民（自由练习模式）
  // ============================================================
  // 意图识别：中文关键词 → 语义意图
  const INTENTS = [
    { id: 'medication', re: /药|服药|吃药|漏服|停|换|剂量|依从|保健品|偏方|中成药/ },
    { id: 'followup', re: /复查|复诊|随访|上医院|去医|转诊|挂号|多久来|下次/ },
    { id: 'symptom', re: /症状|不舒服|疼|痛|晕|头晕|胸闷|气短|喘|心慌|肿|发烧|疹|感觉/ },
    { id: 'record', re: /记录|血压|血糖|多少|几次|数值|单子|化验|结果|量了|测/ },
    { id: 'device', re: /血压计|仪器|机器|怎么量|测量|姿势|手臂|袖带/ },
    { id: 'home', re: /家里|家人|孩子|女儿|儿子|老伴|照顾|一个人|谁管|邻居/ },
    { id: 'diet', re: /吃|饭|饮食|咸|盐|油|喝|酒|烟|睡/ },
    { id: 'emotion', re: /担心|怕|着急|紧张|放心|别急|理解|不怪|辛苦|难为/ },
    { id: 'teachback', re: /复述|再说一遍|听懂|记住|重复|确认您|记得/ },
    { id: 'plan', re: /下次|接下来|计划|建议|我们|一起|商量|行不行|可以吗/ },
    { id: 'open', re: /怎么|什么|哪|为什么|说说|聊聊|情况/ },
  ];

  // 释放条件标签（英文语义标签）→ 中文触发词
  const TAG_HINTS = [
    { t: /medicat|drug|adherence|otc|supplement|self_adjust|current_and_leftover/, x: /药|服药|吃药|漏服|停|换|剂量|保健品|偏方/ },
    { t: /followup|screening|referral|previous_training|available_support|family_care/, x: /复查|复诊|随访|检查|筛|转|家人|谁|照顾|支持|提醒/ },
    { t: /symptom|pain|breath|night|dizz|fall|swelling|edema|fever|rash|warning|head/, x: /症状|疼|痛|晕|喘|气短|夜|摔|跌|肿|烧|疹|胸闷|心慌/ },
    { t: /device|home_environment|safety|lighting|supports|demonstration/, x: /血压计|仪器|机器|怎么量|测量|姿势|手臂|袖带|家里|环境|光线|扶手|楼梯/ },
    { t: /diet|food|sleep|mood/, x: /吃|饭|盐|咸|睡|心情|情绪|酒|烟/ },
    { t: /goal|concern|personal/, x: /目标|希望|担心|顾虑|在意|最想/ },
    { t: /teach_back|understanding|readback/, x: /复述|听懂|记住|说一遍|重复/ },
    { t: /history|previous|timeline|episodes|procedure/, x: /以前|之前|多久|什么时候|经过|开始/ },
    { t: /identity|traceability|receiver|collection|sample/, x: /谁送|标本|核对|签字|条码/ },
  ];

  const TURN_TAGS = [
    { re: /release_turn_(\d+)_(\d+)/, test: (m, turn) => turn >= Number(m[1]) && turn <= Number(m[2]) },
    { re: /release_after_turn_(\d+)/, test: (m, turn) => turn >= Number(m[1]) },
    { re: /min_turn_(\d+)/, test: (m, turn) => turn >= Number(m[1]) },
  ];

  function detectIntents(text) {
    const s = String(text || '');
    const out = [];
    for (const it of INTENTS) if (it.re.test(s)) out.push(it.id);
    return out;
  }

  function matchReleaseTag(tag, text, turn) {
    for (const rule of TURN_TAGS) {
      const m = rule.re.exec(tag);
      if (m) return rule.test(m, turn);
    }
    for (const h of TAG_HINTS) {
      if (h.t.test(tag) && h.x.test(text)) return true;
    }
    return false;
  }

  // 找出这一轮应该释放哪些隐藏信息
  // 注意：一轮最多释放 1 条。一句话问出三条是"上帝视角"，不像真人说话，
  // 也会让学员误以为不用追问就能拿到全部信息。
  function pickReleases(caseObj, text, turn, alreadyRevealed) {
    const rc = caseObj.release_conditions || {};
    const order = (caseObj.hidden_info || []).map((h) => h.id);
    const ids = order.length ? order.filter((id) => rc[id]) : Object.keys(rc);
    for (const id of ids) {
      if ((alreadyRevealed || []).includes(id)) continue;
      const tags = rc[id] || [];
      if (tags.some((t) => matchReleaseTag(t, text, turn))) return [id];
    }
    return [];
  }

  // ---- 兜底回答池（按人设轮换，避免"嗯，你接着说"式复读） ----
  const DEFLECT = [
    '这个……我还真没细想过，你问得挺细。',
    '你等等，让我想想啊。',
    '唉，我这人就这样，稀里糊涂的。',
    '你说的这些我平时真没注意过。',
    '我知道我知道，就是做起来麻烦。',
    '那你说我该咋办呢？我也不是不想好好弄。',
    '我女儿也老说我，可我一个人在家，谁盯着我呀。',
  ];

  const OPENERS = [
    (c) => `（${c.persona.initial_emotion}）你说吧，我这会儿有空。`,
    (c) => `又是来查我的吧？我身体好着呢。`,
    (c) => `行，你问，我知道的都跟你说。`,
  ];

  function clinicalLine(caseObj, turn) {
    const data = caseObj.clinical_data || [];
    if (!data.length) return null;
    const d = data[turn % data.length];
    if (!d) return null;
    const val = d.value || '';
    const note = d.note ? `，${d.note}` : '';
    const day = d.day ? `${d.day} ` : '';
    return `${day}${d.item}${val ? '：' + val : ''}${note}。`;
  }

  /**
   * 生成居民回应
   * @returns {{reply:string, revealed:string[], emotion:string}}
   */
  function residentReply(caseObj, text, ctx) {
    const c = caseObj || DEMO_CASE;
    const state = ctx || {};
    const turn = Number(state.turn || 0);
    const revealed = (state.revealed || []).slice();
    const intents = detectIntents(text);

    if (!String(text || '').trim() || turn === 0) {
      const opener = OPENERS[turn % OPENERS.length];
      return { reply: opener(c), revealed, emotion: (c.persona && c.persona.initial_emotion) || '平静' };
    }

    const newly = pickReleases(c, text, turn, revealed);

    // 1) 有隐藏信息被释放：直接说真话，这是"问出来了"的关键反馈
    if (newly.length) {
      const parts = [];
      for (const id of newly) {
        const item = (c.hidden_info || []).find((h) => h.id === id);
        if (item) parts.push(item.value);
        revealed.push(id);
      }
      const lead = intents.includes('emotion') ? '（语气软下来）' : '';
      const tailMap = {
        H1: '……我知道不该自己停，你别跟我女儿说啊。',
        H2: '这机器是我闺女好几年前买的，我也没看过说明书。',
        H3: '一个人住，记性又不好，唉。',
      };
      const tail = newly.map((id) => tailMap[id]).filter(Boolean).join('');
      return {
        reply: `${lead}${parts.join('；')}。${tail}`,
        revealed,
        emotion: '放松了一些',
      };
    }

    // 2) 只是说明来意、还没提问：不要急着把病历数字倒出来
    const isQuestion = /[?？]|吗|呢|多少|几次|怎么|什么|哪|多久|是不是|有没有/.test(text);
    if (!isQuestion && !intents.includes('teachback') && !intents.includes('emotion')) {
      const GREET = [
        '唉，你来了就好。我这血压啊，自己心里也没底。',
        '你说吧，我这会儿有空，反正也是在家待着。',
        '我这人不怕查，就是怕麻烦。你想问啥？',
      ];
      return { reply: GREET[turn % GREET.length], revealed, emotion: state.emotion || '平静' };
    }

    // 3) 问测量方式/仪器：必须回答"怎么量的"，不能拿血压数值糊过去
    if (intents.includes('device')) {
      const gotH2 = revealed.includes('H2');
      const reply = gotH2
        ? '就那个腕式的，我按你说的把胳膊放桌上又量了两回，数字比原来低一点。'
        : '手腕上那种，套上去一按就行……听你这意思，我这量法还有讲究？';
      return { reply, revealed, emotion: state.emotion || '平静' };
    }

    // 3) 问到记录/检查：用病例自带的资料回答（显得"知道自己的数"）
    if (intents.includes('record') || intents.includes('symptom')) {
      const line = clinicalLine(c, turn);
      const flavor = intents.includes('symptom')
        ? '不舒服倒也不算，就是有时候早上起来头沉沉的。'
        : (c.persona && c.persona.speech_style ? '我说话直啊，你别嫌。' : '');
      if (line) return { reply: `${line}${flavor}`, revealed, emotion: state.emotion || '平静' };
    }

    // 4) 共情/安抚：说出人设里的顾虑
    if (intents.includes('emotion')) {
      return {
        reply: `（叹了口气）你这么说我心里好受点。我就是${c.persona ? c.persona.concern : '怕麻烦'}。`,
        revealed,
        emotion: '放松了一些',
      };
    }

    // 5) 让学生复述：居民把关键点讲回来（训练闭环的收口）
    if (intents.includes('teachback')) {
      return {
        reply: '那我重复一遍啊：该查的要查清楚，该记的记下来，别自己瞎琢磨，有不对劲就去找医生。这样对吧？',
        revealed,
        emotion: '认真了些',
      };
    }

    // 6) 问到家里/支持
    if (intents.includes('home')) {
      return { reply: '家里就我一个人，孩子在外地，一年回来两趟。', revealed, emotion: state.emotion || '平静' };
    }

    // 7) 兜底：轮换，且不连续重复同一句
    let idx = (turn * 3 + 1) % DEFLECT.length;
    if (idx === Number(state.lastDeflect)) idx = (idx + 1) % DEFLECT.length;
    return { reply: DEFLECT[idx], revealed, emotion: state.emotion || '平静', lastDeflect: idx };
  }

  // ============================================================
  // 四、证据抽取（确定性，不伪造原话）
  // ============================================================
  const EVIDENCE_KW = {
    ask_open_question: /怎么|如何|什么情况|怎么样|聊聊|说说/,
    ask_specific_fact: /多少|几次|什么时候|具体|几天|多久/,
    use_trend: /连续|趋势|几次|记录|变化|往下走|几天都/,
    avoid_single_reading_conclusion: /不能单|一次|不代表|多次|分开看|条件|刚起来/,
    identify_case_warning: /危险|警示|紧急|严重|马上|立即|别等/,
    timely_referral: /转介|就医|医生|医院|120|挂号|约/,
    no_self_adjustment: /不要自己|不能自己|别自己|不自行|别停|不能停/,
    refer_qualified_professional: /医生|医务人员|专科|就诊|让医生/,
    ask_concern: /担心|顾虑|怕|在意/,
    acknowledge_concern: /理解|明白|不怪|谢谢您|别急|不是来批评/,
    plain_language: /通俗|简单说|大白话|说白了/,
    explain_reason: /因为|所以|原因|说明|起作用/,
    teach_back: /复述|能再说|听懂|确认您|记住/,
    use_teach_back: /复述|能再说|听懂|确认您/,
    shared_decision: /一起|我们商量|你觉得|可以吗|行不行|哪种/,
    specific_next_step: /下次|接下来|建议你|计划|定个|两星期后/,
    defer_diagnosis: /我不|不能诊断|不确定|需医生|由医生/,
    state_evidence_limit: /证据|信息不足|还需|进一步/,
    ask_medication_adherence_without_blame: /有没有(哪几天)?忘|停了|漏了|没天天吃|照实说/,
    ask_device_demonstration_without_blame: /血压计|怎么量|绑在|套在|手腕|上臂/,
    ask_available_support: /有人提醒|家里.*人|女儿|儿子|谁管/,
    ask_family_care_practices: /家人|女儿|儿子|老伴|照顾/,
  };

  const REDLINE_KW = [
    { tag: 'diagnose_real_person', re: /你就是|确诊|你得了/ },
    { tag: 'recommend_specific_drug_or_dose', re: /吃.{0,6}药|推荐.{0,4}药|加量|减量|剂量/ },
    { tag: 'suggest_stop_switch_adjust_medication', re: /停药|换药|调整药|别吃了/ },
    { tag: 'endorse_unverified_remedy', re: /偏方|保健品.{0,4}(能治|有效)/ },
  ];

  function extractEvidence(caseObj, turns, rubric) {
    const caseId = (caseObj && caseObj.case_id) || '';
    const items = (rubric.items || []).filter((x) => x.scope.includes('*') || x.scope.includes(caseId));
    const ev = [];
    for (const t of turns) {
      if (t.speaker !== 'student') continue;
      const text = t.raw_text || t.text || '';
      const tags = [];
      for (const [tag, re] of Object.entries(EVIDENCE_KW)) if (re.test(text) && !tags.includes(tag)) tags.push(tag);
      for (const r of REDLINE_KW) if (r.re.test(text) && !tags.includes(r.tag)) tags.push(r.tag);
      // 脚本模式带的人工标注标签也算证据
      for (const tag of (t.tags || [])) if (!tags.includes(tag)) tags.push(tag);
      if (!tags.length) continue;
      for (const item of items) {
        const itemTags = new Set();
        for (const lv of ['full', 'partial']) {
          const cond = item[lv] || {};
          for (const k of ['all_tags', 'any_tags', 'allowed_tags']) (cond[k] || []).forEach((x) => itemTags.add(x));
        }
        const matched = tags.filter((tg) => itemTags.has(tg));
        if (matched.length) {
          ev.push({ item_id: item.item_id, turn_id: t.turn_id, quote: text, tags: matched, confidence: 0.7, source: 'evidence_extractor' });
        }
      }
    }
    return ev;
  }

  root.ZHIHU_DEMO = { DEMO_CASE, DEMO_SCRIPT, residentReply, detectIntents, extractEvidence, pickReleases, matchReleaseTag };
})(typeof window !== 'undefined' ? window : globalThis);
