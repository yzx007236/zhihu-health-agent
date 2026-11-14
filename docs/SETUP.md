# 安装与接入

## 本地网页

在仓库根目录运行 `python run_local.py --port 8765`，打开 <http://127.0.0.1:8765>。要求 Python 3.11+；macOS/Linux 可用 `python3`。

基础运行不需要 `pip install`。`requirements.txt` 仅说明这个事实，不包含可选功能的依赖。端口被占用时可改为 `--port 8766`，并访问相应地址。

服务仅监听 `127.0.0.1`。学习会话写入 `.zhihu-sessions/`，课程账号和任务写入 `.zhihu-classroom/`。这些目录均被 Git 忽略；升级源码前自行备份，需要保留记录时不要删除。

本地模式不调用云模型，模拟居民使用规则回答。不能把本地模式效果描述为云模型对话效果。

## 演示课程与自己的课程

默认初始化 `DEMO2026` 演示课程、`demo_teacher` 与 `demo_student`，初始密码见根目录 README。首次登录必须修改密码。演示初始化不会重置现有密码或覆盖记录。

如需本地创建自己的课程，在启动之前设置以下变量：

```powershell
$env:ZHIHU_CLASSROOM_DEMO = '0'
$env:ZHIHU_CLASSROOM_SETUP_KEY = '请替换为你自己生成的长随机密钥'
python run_local.py --port 8765
```

macOS/Linux：

```sh
export ZHIHU_CLASSROOM_DEMO=0
export ZHIHU_CLASSROOM_SETUP_KEY='请替换为你自己生成的长随机密钥'
python3 run_local.py --port 8765
```

进入教师入口，在首次开通课程区域创建课程与教师账号，再由教师添加学生。已经初始化过课程的环境不会因为关闭演示开关而删除既有演示账号；需要空白课程环境时，为 `ZHIHU_CLASSROOM_STORE` 和 `ZHIHU_SESSION_STORE` 指定新的私有目录。

## WorkBuddy / MCP 接入

本地网页不要求 MCP SDK。需要 MCP 客户端调用时，在仓库根目录安装服务声明的依赖：

```sh
python -m pip install "mcp[cli]>=2.0.0,<3"
```

也可使用项目已有的 uv 配置：

```sh
uv sync --project workbuddy-agent/zhihu-agent/connector/server
uv run --project workbuddy-agent/zhihu-agent/connector/server python workbuddy-agent/zhihu-agent/connector/server/server.py
```

stdio 服务等待客户端通过协议调用，不会显示网页。`connector/mcp.json` 中的相对路径以 `connector/` 为工作目录；移动项目后，请在客户端配置中使用自己的实际路径。不要复制原开发机路径。

安装依赖后也可直接启动本机 HTTP MCP：

```sh
python workbuddy-agent/zhihu-agent/connector/server/server.py --transport streamable-http --host 127.0.0.1 --port 8000
```

地址为 <http://127.0.0.1:8000/mcp>。远程客户端使用 `connector/mcp.remote.template.json`，替换为自己部署的 HTTPS 地址。智能体提示词位于 `agent/system-prompt.md`。

## 云端部署

云端分成三部分：Python MCP 服务、Node.js HTTP 网关、静态网页。GitHub 仓库本身不会替你启动这些服务。

1. Python：使用 `workbuddy-agent/zhihu-agent/Dockerfile` 构建，构建上下文为 `workbuddy-agent/zhihu-agent/`，容器监听 8000。
2. 课程持久化：为 `/data` 配置持久卷，或配置 PostgreSQL。云模式禁止悄悄回退到临时数据库。直接 PostgreSQL 另需 `python -m pip install "psycopg[binary]>=3.2,<4"`，迁移文件见 `connector/server/migrations/`。CloudBase REST RPC 模式使用对应迁移与 `ZHIHU_CLASSROOM_CLOUDBASE_ENV` / `ZHIHU_CLASSROOM_API_KEY`。
3. 网关：在 `functions/zhihu-agent/` 运行 `npm ci`。使用 Node.js 20+，`node server.js` 默认监听 9000，HTTP 路径 `/api/agent`。配置自己的 `MCP_URL`、模型和 WorkBuddy 变量。
4. 网页：将 `web/` 中的网页与运行素材部署到静态站点。在应用脚本加载前设置 `window.__AGENT_API__` 为你自己的 `/api/agent` 绝对地址，或修改 `web/app.js` 和 `web/classroom.js` 的默认地址。源码保留原线上演示地址；直接上传未配置的网页会访问原演示环境。
5. CloudBase：`cloudbaserc.json` 中的环境 ID 是原项目的标识，独立部署时替换为自己的环境 ID，并在部署平台配置密钥。

完整的变量参考见根目录 `.env.example`。它只是一份清单，程序不会自动加载此文件。真实课程设 `ZHIHU_CLASSROOM_DEMO=0`，使用自己生成的开通密钥。不要把 `.env`、服务密钥、学生数据或数据库备份提交到仓库。

## 开发验证

基础后端检查无需 MCP SDK：

```sh
python workbuddy-agent/zhihu-agent/connector/server/tests/test_tools.py
python -m unittest discover -s workbuddy-agent/zhihu-agent/connector/server/tests -p test_local_experience_http.py -v
python -m unittest discover -s workbuddy-agent/zhihu-agent/connector/server/tests -p test_classroom.py -v
```

前端检查需要 Node.js 20+，例如：

```sh
node web/test_learning_modes.cjs
node web/test_case_recommendations.cjs
node web/test_classroom_entries.cjs
node web/test_mascot.cjs
```

运行 `web/test_inline_experience.cjs` 前先执行 `python web/build_experience_test_fixtures.py`，从当前真实检索引擎生成合成测试数据。该步骤不需要历史 `output/` 文件。

GitHub Actions 配置会在独立检出中检查基础工具、HTTP、课程及全部前端测试。教材检查需要另外安装完整教材资源；MCP 协议测试需要先安装 Python MCP SDK。
