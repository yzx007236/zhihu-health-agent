#!/usr/bin/env python3
"""Check a running ZhiHu Streamable HTTP MCP endpoint."""

import asyncio
import sys

from mcp import Client


async def run(url: str) -> None:
    async with Client(url) as client:
        listed = await client.list_tools()
        assert len(listed.tools) == 21
        result = await client.call_tool("zhihu_health_check", {})
        assert not result.is_error
        print(f"[OK] Streamable HTTP MCP connected; {len(listed.tools)} tools discovered")


if __name__ == "__main__":
    asyncio.run(run(sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8000/mcp"))
