#!/usr/bin/env python3
"""Protocol-level stdio test using the official MCP client."""

import asyncio
import json
import os
import shutil
from pathlib import Path

from mcp import Client, StdioServerParameters

SERVER_ROOT = Path(__file__).resolve().parent.parent
CONNECTOR_ROOT = SERVER_ROOT.parent
MCP_CONFIG = json.loads((CONNECTOR_ROOT / "mcp.json").read_text(encoding="utf-8"))["mcpServers"]["zhihu-training-runtime"]


class TempStore:
    """自建临时目录：tempfile.mkdtemp 在本机 Windows 上会生成不可写入子项的目录（WinError 5）。"""

    def __init__(self, prefix: str) -> None:
        self.path = Path(__file__).parent / f"{prefix}{os.getpid()}"

    def __enter__(self) -> Path:
        shutil.rmtree(self.path, ignore_errors=True)
        self.path.mkdir(parents=True, exist_ok=True)
        return self.path

    def __exit__(self, *exc_info) -> None:
        shutil.rmtree(self.path, ignore_errors=True)


def payload_of(result) -> dict:
    if result.structured_content is not None:
        return result.structured_content
    for block in result.content:
        text = getattr(block, "text", None)
        if text:
            return json.loads(text)
    raise AssertionError("MCP tool returned no JSON payload")


async def run_test() -> None:
    with TempStore("zhihu-mcp-protocol-") as temporary:
        environment = dict(os.environ)
        environment["PYTHONUTF8"] = "1"
        environment["PYTHONIOENCODING"] = "utf-8"
        environment["ZHIHU_SESSION_STORE"] = str(Path(temporary) / "sessions")
        environment.update(MCP_CONFIG.get("env", {}))
        params = StdioServerParameters(
            command=MCP_CONFIG["command"],
            args=MCP_CONFIG["args"],
            cwd=CONNECTOR_ROOT / MCP_CONFIG.get("cwd", "."),
            env=environment,
        )
        async with Client(params) as client:
            listed = await client.list_tools()
            names = {tool.name for tool in listed.tools}
            expected = {
                "zhihu_health_check",
                "zhihu_begin_training",
                "zhihu_start_session",
                "zhihu_get_session_status",
                "zhihu_get_pretest",
                "zhihu_submit_pretest",
                "zhihu_get_knowledge",
                "zhihu_list_training_cases",
                "zhihu_select_training_case",
                "zhihu_generate_case_variant",
                "zhihu_get_sp_state",
                "zhihu_advance_stage",
                "zhihu_append_turn",
                "zhihu_append_exchange",
                "zhihu_score_session",
                "zhihu_generate_training_report",
                "zhihu_get_experience_references",
                "zhihu_list_textbooks",
                "zhihu_search_textbooks",
                "zhihu_read_textbook_page",
                "zhihu_classroom",
            }
            assert expected == names, f"Unexpected tools: {sorted(names)}"
            result = await client.call_tool("zhihu_health_check", {})
            assert not result.is_error
            assert payload_of(result)["status"] == "ok"
            library = await client.call_tool("zhihu_list_textbooks", {})
            assert not library.is_error
            catalog = payload_of(library)
            if catalog["status"] == "ok":
                found = await client.call_tool("zhihu_search_textbooks", {"query": "视盘陷凹", "book_id": "B25"})
                assert not found.is_error
                assert any(r["pdf_page"] == 264 for r in payload_of(found)["results"])
                page = await client.call_tool("zhihu_read_textbook_page", {"book_id": "B25", "pdf_page": 264})
                assert not page.is_error
                assert payload_of(page)["pdf_page"] == 264
            started = await client.call_tool("zhihu_start_session", {"major": "nursing"})
            assert not started.is_error
            assert payload_of(started)["session"]["session_id"].startswith("ZH-")


def main() -> None:
    asyncio.run(run_test())
    print("[OK] MCP stdio protocol test passed; 21 tools discovered (including textbooks and classroom)")


if __name__ == "__main__":
    main()
