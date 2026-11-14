# 知护 · 大健康学习与实践智能体

面向临床医学、护理学、医学技术、中医学、康复治疗和健康服务与管理等专业的教学训练项目。支持专项答题、直接病例训练和完整学习流程，以及师生课程、教学任务、评分复盘和学习档案。

本仓库按 **2026-11-15 工作目录源码** 整理，包含最新工作台、师生分入口、悬浮动态形象、课程演示账号和指南经验库 v3.2。历史 v4.4.0 安装包早于这些改动，不能代替当前源码。

**全部病例为教学模拟。内容不构成医疗建议，不用于真实诊疗；题目、病例和指南候选仍需专业教师核验。**

## 在线体验

[打开知护网页](https://pretty-camel-d2g0oe3e03341c0a4-1521569590.tcloudbaseapp.com) · [学生入口](https://pretty-camel-d2g0oe3e03341c0a4-1521569590.tcloudbaseapp.com/classroom.html?role=student) · [教师入口](https://pretty-camel-d2g0oe3e03341c0a4-1521569590.tcloudbaseapp.com/classroom.html?role=teacher)

在线服务使用维护者部署的环境，可用性与源码仓库独立。首次使用建议从下面的本地版本开始。

## 五分钟本地运行

需要 **Python 3.11 或更高版本**和现代浏览器。基础网页、题库、病例、评分、课程与指南检索使用 Python 标准库，无需云账号或模型密钥。

1. 点击 GitHub 的 **Code → Download ZIP** 并解压，或使用 Git 克隆仓库。
2. 在解压目录打开终端，运行：

```sh
python run_local.py --port 8765
```

macOS / Linux 通常使用 `python3`；Windows 也可使用 `py -3`。

3. 浏览器打开 <http://127.0.0.1:8765>。按 `Ctrl+C` 停止服务。

本地对话采用规则流程；连接云端模型后的自然语言对话需按[安装与接入说明](docs/SETUP.md)配置。请通过上述 Python 入口访问，直接双击 HTML 不会启动后端。

### 师生课程演示

本地打开 <http://127.0.0.1:8765/classroom.html>，选择教师或学生。首次访问课程状态或登录时，会在**自己的本地数据库**中建立演示课程：

| 项目 | 初始值 |
|---|---|
| 课程代码 | `DEMO2026` |
| 教师账号 | `demo_teacher` |
| 教师初始密码 | `DemoTeacher2026!Changed` |
| 学生账号 | `demo_student` |
| 学生初始密码 | `DemoStudent2026!` |

首次登录后按页面提示修改密码。重复初始化保留已改的密码和记录；线上演示账号可能已经被修改，以上初始密码不保证可用于共享网站。部署真实课程时设置 `ZHIHU_CLASSROOM_DEMO=0`，配置自己的课程开通密钥和账号。

## 能使用哪些功能

- 专项答题：选择专业与难度，自测、解析和错题复习。
- 病例训练：病例研读、信息采集、初步分析、模拟居民对话、程序评分与复盘。
- 完整流程：5 题自测 → 薄弱点讲解 → 错题关联病例 → 对话训练 → 评分复盘。
- 师生课程：身份登录、任务分发、进度、教师复核与导出。
- 指南带教：随当前训练检索经验卡，保留条件核对、来源和阶段保护。仓库附带当前使用的 **91 张卡 / 23 份来源**。
- WorkBuddy / MCP：可以接入当前 Python MCP 运行服务，详见[接入说明](docs/SETUP.md#workbuddy--mcp-接入)。

题量不足时返回该专业难度下实际可用的题目。不同病例条目、原题推演、完整病例的统计含义不同，请以运行时与对应数据定义为准。

## 目录

```text
run_local.py                         本地网页及 API 启动入口
web/                                 网页源码、素材与前端检查
workbuddy-agent/zhihu-agent/
  connector/server/                  当前 MCP 服务与课程业务
  connector/server/zhihu_mcp/resources/experience.json
                                     可独立运行的指南经验库
  connector/skills/zhihu/             当前服务实际加载的 Skill / 题库 / 病例
  agent/                             智能体提示词与远程配置模板
zhihu/                               原始 Skill 与质控资料
functions/zhihu-agent/                Node.js 云函数网关
resources/textbooks/                  可选教材目录与说明
docs/                                安装、部署与发布说明
scripts/                             开发辅助脚本
```

修改实际运行的题库或 Skill 时，优先检查 `connector/skills/zhihu/`。根目录 `zhihu/` 为独立保留的原始资料；两份不会自动同步。

## 可选教材资源

完整教材 PDF 和页面索引约 **2.2 GB**，未纳入 Git 源码。缺少教材时，训练与评分仍可使用，教材入口如实显示资源不可用。已有完整资源可通过 `ZHIHU_TEXTBOOK_ROOT` 指定目录；原书页面渲染另需 `pypdfium2` 和 `Pillow`。详见[教材资源说明](docs/TEXTBOOKS.md)。

## 开发与部署

- [安装、MCP、云端配置及验证](docs/SETUP.md)
- [发布范围、资源与当前限制](docs/RELEASE.md)
- [素材与使用范围](NOTICE.md)

`.env.example` 是环境变量参考，程序不会自动读取 `.env`。请在运行进程或部署平台配置变量。仓库不提供维护者的云密钥、课程数据库、个人学习记录、备份或旧安装包。GitHub 托管源码；完整在线 API 需要另行部署 Python 服务与云函数，单独启用 GitHub Pages 不会运行这些后端。

本项目尚未新增开源许可证。第三方资料仍受原权利人条款约束，具体见 [NOTICE.md](NOTICE.md)。
