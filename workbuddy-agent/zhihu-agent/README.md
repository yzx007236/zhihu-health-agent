# 知护：WorkBuddy 可运行智能体工程

这次交付的不是“专家包”，而是知护智能体的运行工程：

- `connector/skills/zhihu/`：你原来编写的知护 Skill，以及知识卡、病例、评分规则和五个确定性工具；
- `connector/server/`：把上述能力暴露为 MCP 工具的真实运行服务；
- `connector/mcp.json`：普通 WorkBuddy 本地 stdio MCP 配置；
- `agent/`：企业智能体的系统提示词和远程 MCP Manifest 模板。

## 本地运行

要求：Python 3.11+、`uv`。

```powershell
cd connector
uv sync --project server
uv run --project server python server/tests/test_tools.py
uv run --project server python server/server.py
```

最后一条启动的是 stdio MCP，正常情况下不会显示普通网页或聊天界面；它等待 WorkBuddy 通过 MCP 协议调用。

本机测试 Streamable HTTP：

```powershell
uv run --project server python server/server.py --transport streamable-http --host 127.0.0.1 --port 8000
```

测试地址为 `http://127.0.0.1:8000/mcp`。正式发布必须部署到 HTTPS，不能把本机地址当成企业智能体的线上地址。

## WorkBuddy 本地接入

把 `connector/` 作为自定义 MCP 连接器使用。`mcp.json` 会让 WorkBuddy 通过 `uv` 启动服务。首次启动需要下载 Python MCP SDK，之后使用本地缓存。

如果 WorkBuddy 的“自定义连接器”页面只提供 JSON 编辑框，直接粘贴 `connector/mcp.local.workbuddy.json`。该文件已经写入本机工程绝对路径；移动工程目录后必须同步修改路径。

## 企业智能体发布

企业 Runtime 不能访问你电脑上的本地 stdio 服务。发布前需把 MCP Server 部署为 HTTPS Streamable HTTP，然后：

1. 将 `connector/mcp.remote.template.json` 中的 URL 替换为真实 `/mcp` 地址；
2. 将 `agent/manifest.remote.template.json` 中的 MCP URL 和系统提示词 URL 替换为真实地址；
3. 在企业智能体后台导入或填写 Manifest，运行 Test Run 后再发布。

官方文档没有公开完整 `MCPConfig` 对象的所有字段，因此 Manifest 文件保留为模板；最终以企业后台生成并校验的 Manifest 为准。

## 安全与事实边界

- 所有病例都是合成数据；
- 不用于真实诊疗；
- 原始对话、证据候选、程序评分和报告分开保存；
- 评分前会验证引文确实来自学生对应轮次；
- Skill 或工具不可用时停止，不用模型模拟结果。
