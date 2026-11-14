#!/usr/bin/env python3
"""ZhiHu MCP server for WorkBuddy."""

import argparse

from mcp.server import MCPServer

from zhihu_mcp import tools
from zhihu_mcp import classroom

mcp = MCPServer("zhihu-agent")


@mcp.tool()
def zhihu_classroom(action: str, payload: dict | None = None, token: str | None = None) -> dict:
    """课程空间、登录、教师复核与导出；身份由服务端验证登录令牌取得。"""
    return classroom.request(action, payload, token)


@mcp.tool()
def zhihu_health_check() -> dict:
    """检查知护知识包、病例、评分规则和会话存储是否可用。开始训练前调用。"""
    return tools.health_check()


@mcp.tool()
def zhihu_begin_training(trigger: str, session_id: str | None = None, learner_id: str | None = None) -> dict:
    """识别启动口令并开会话。learner_id 用于把同一学习者跨会话的错题、薄弱点和实践成绩归档；省略时使用本机默认档案。"""
    return tools.begin_training(trigger, session_id, learner_id)


@mcp.tool()
def zhihu_start_session(major: str, mode: str = "quick", session_id: str | None = None, new_batch: bool = False, learner_id: str | None = None, case_mode: str = "default", source_session_id: str | None = None) -> dict:
    """按专业创建/续接会话。learner_id 关联跨会话学习档案；case_mode=outpatient_structured 可进入临床医学的 5 个医院门诊完整结构化病例入口；new_batch=true 换一批。"""
    return tools.start_session(major, mode, session_id, new_batch, learner_id, case_mode, source_session_id)


@mcp.tool()
def zhihu_get_session_status(session_id: str) -> dict:
    """按会话编号恢复真实阶段、轮次、已有产物和跨会话学习档案。"""
    return tools.get_session_status(session_id)


@mcp.tool()
def zhihu_get_pretest(session_id: str, level: str = "basic", question_count: int = 5) -> dict:
    """返回不含答案的自测题。question_count 支持 5（完整流程）或 20（只答题），不足时返回本档全部可用题。level 支持 basic/intermediate/advanced/expert/english。"""
    return tools.get_pretest(session_id, level, question_count)


@mcp.tool()
def zhihu_submit_pretest(session_id: str, answers: dict[str, str]) -> dict:
    """提交题号到选项的答案映射，程序批改并返回薄弱节点。"""
    return tools.submit_pretest(session_id, answers)


@mcp.tool()
def zhihu_get_knowledge(node_id: str | None = None, knowledge_id: str | None = None, major_id: str | None = None, course_id: str | None = None) -> dict:
    """按知识节点、知识卡、专业或具体课程检索内容；course_id 见 professional_knowledge_map.json。"""
    return tools.get_knowledge(node_id, knowledge_id, major_id, course_id)


@mcp.tool()
def zhihu_list_training_cases(major: str | None = None, disease_id: str | None = None) -> dict:
    """列出多疾病合成病例；可按专业排序并按疾病筛选。"""
    return tools.list_training_cases(major, disease_id)


@mcp.tool()
def zhihu_select_training_case(session_id: str, case_id: str) -> dict:
    """选择病例并只返回学生可见资料，隐藏信息不会出现在结果中。"""
    return tools.select_training_case(session_id, case_id)


@mcp.tool()
def zhihu_generate_case_variant(session_id: str, focus: str = "auto") -> dict:
    """完成评分报告后，为当前病例创建新的合成变式和重练会话。focus 可选 auto、communication、risk、information、adherence。"""
    return tools.generate_case_variant(session_id, focus)


@mcp.tool()
def zhihu_get_sp_state(session_id: str) -> dict:
    """读取虚拟SP内部人设和信息释放条件。结果仅供模型扮演，禁止展示给学生。"""
    return tools.get_sp_state(session_id)


@mcp.tool()
def zhihu_advance_stage(session_id: str, stage: str) -> dict:
    """推进知护状态机；stage=对话/dialogue/居民对话时，已选病例可从病例研读自动经初步分析进入对话。"""
    return tools.advance_stage(session_id, stage)


@mcp.tool()
def zhihu_append_turn(
    session_id: str,
    speaker: str,
    text: str,
    revealed_info: list[str] | None = None,
    resident_state: dict | None = None,
) -> dict:
    """逐字保存学生、SP、引导者或工具的一轮消息，作为后续评分证据。"""
    return tools.append_turn(session_id, speaker, text, revealed_info, resident_state)


@mcp.tool()
def zhihu_append_exchange(
    session_id: str,
    student_text: str,
    resident_text: str,
    revealed_info: list[str] | None = None,
    resident_state: dict | None = None,
    covered_points: list[str] | None = None,
    professional_conclusion: bool = False,
    action_plan: bool = False,
    teach_back: bool = False,
    safety_closure: bool = False,
) -> dict:
    """原子保存一轮对话并更新导演门控。covered_points 只传本轮确已命中的病例 must_cover 编号。"""
    return tools.append_exchange(
        session_id, student_text, resident_text, revealed_info, resident_state,
        covered_points, professional_conclusion, action_plan, teach_back, safety_closure,
    )


@mcp.tool()
def zhihu_score_session(
    session_id: str,
    evidence_candidates: list[dict],
    red_line_tags: list[str] | None = None,
) -> dict:
    """校验引文确实来自学生对应轮次，再按版本化规则确定性评分。模型不能直接改分。"""
    return tools.score_session(session_id, evidence_candidates, red_line_tags)


@mcp.tool()
def zhihu_get_experience_references(query: str = "", session_id: str | None = None,
                                   question_id: str | None = None, case_id: str | None = None,
                                   topic: str | None = None, node_id: str | None = None,
                                   enabled: bool | None = None, training_active: bool = False,
                                   assessment_active: bool = False, learning_mode: str | None = None,
                                   collected: dict | None = None) -> dict:
    """检索医学指南教学参考。病例练习中可核对公开/SP信息对应的适用条件与出处；完整推荐仅评分后展示，未提交自测保护答案。紧急风险优先，不改分、不诊断、不处方。"""
    return tools.get_experience_references(query, session_id, question_id, case_id, topic, node_id, enabled, training_active, assessment_active, learning_mode, collected)


@mcp.tool()
def zhihu_generate_training_report(session_id: str, exam_reasoning: dict[str, str] | None = None,
                                   collected: dict | None = None) -> dict:
    """根据程序评分生成JSON和独立HTML复盘报告，并返回变式重练入口。"""
    return tools.generate_training_report(session_id, exam_reasoning, collected)


@mcp.tool()
def zhihu_list_textbooks() -> dict:
    """列出当前运行环境已安装的完整医学教材与版本。"""
    return tools.list_textbooks()


@mcp.tool()
def zhihu_search_textbooks(query: str, book_id: str | None = None, limit: int = 20, offset: int = 0) -> dict:
    """检索教材原文，至少两个字，多个关键词用空格分开；返回书名和PDF页序。命中不等于核实题目解析，禁止自动写入题目。"""
    return tools.search_textbooks(query, book_id, limit, offset)


@mcp.tool()
def zhihu_read_textbook_page(book_id: str, pdf_page: int = 1) -> dict:
    """按教材编号和PDF页序读取文字稿。识别稿需对照原书，印刷页码候选未经核实。"""
    return tools.read_textbook_page(book_id, pdf_page)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="ZhiHu MCP server")
    parser.add_argument("--transport", choices=["stdio", "sse", "streamable-http"], default="stdio")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()
    if args.transport == "stdio":
        mcp.run(transport="stdio")
    else:
        mcp.run(transport=args.transport, host=args.host, port=args.port)
