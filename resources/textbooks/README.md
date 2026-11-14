# 知护完整医学教材库

30 本原书、11,835 个 PDF 页面已从本工作区的已校验准备资料正式导入。原 PDF 字节不变，逐本 SHA256 与准备目录中的原件校验一致。程序不再依赖 E:\医学书 或 output\教材出处准备 来阅读教材。

- `catalog.json`：书名、版本、PDF 页数、校验值与相对资源路径。
- `pdf/B01.pdf` 至 `pdf/B30.pdf`：完整原书。当前同卷采用硬链接以节省重复空间；请勿直接修改这些 PDF。备份或迁移时按普通完整文件复制即可。
- `pages.sqlite3`：全部页面的文字、印刷页码候选和中文全文索引。只读查询，不存题目或学习者输入。

主程序根目录双击「打开知护教材库.cmd」，或运行 `python run_local.py --port 8788`，在本机网页的「医学教材库」中阅读。书架支持书名筛选，正文搜索支持至少两个字的关键词，多个关键词用空格分开（同页同时包含）。结果按书号、PDF 页序排列，每批 20 个页面，可筛选单书。

阅读器默认在当前页面显示原书版式，包括图表、封面与扫描页，不调用外部 PDF 界面。支持上一页、下一页、按 PDF 页序跳转、60%—240% 缩放、适合宽度和文字阅读切换。搜索结果直接在窗口内打开对应原书页；关闭教材窗口后继续当前练习。

原书页面由本机 `pypdfium2` 与 `Pillow` 按需生成清晰图片，当前默认运行环境已具备这些依赖；其他 Python 环境可安装服务项目的 `local-reader` 可选依赖。缓存仅保存在 `output/local-runtime/textbook-pages`，最多 128 页、256 MB，按最近使用保留。无需预先转换整套教材，原 PDF 不修改，浏览器无需下载整本即可阅读。原书图片无法载入时提供重试和文字阅读。

页码统一指 PDF 页序（从封面第 1 页起），不冒充印刷页码。B03《人体寄生虫学》文字来自 OCR，未逐字校对；其他书也可能有文字提取误差。检出关键词只表示出处线索。尚未把题目出处候选写入题库解析。

运行时可通过 `ZHIHU_TEXTBOOK_ROOT` 指向另一份完整教材库。缺少资源的运行环境明确返回 unavailable，不回落至准备目录。

Agent 工具：`zhihu_list_textbooks`、`zhihu_search_textbooks(query, book_id?, limit=20, offset=0)`、`zhihu_read_textbook_page(book_id, pdf_page=1)`。返回的 PDF 地址是本机网页的相对地址，应在本机服务上下文中打开。

HTTP 接口：`GET /api/textbooks`、`GET /api/textbooks/search?q=关键词&book_id=B05`、`GET /api/textbooks/B05/pages/511`、`GET|HEAD /api/textbooks/B05/pages/511/image`、`GET|HEAD /api/textbooks/B05/pdf`。PDF 支持单段 Range；不接受任意文件路径。

## 公开网站发布记录

2026-11-14，用户明确授权将当前目录中的30本教材发布到原网站只读路径 `/textbooks/`。公开包使用 `catalog.json`、按书拆分的页面正文索引和 `pdf/B01.pdf` 至 `pdf/B30.pdf`；不包含本机路径、学习者数据或课程数据库。发布并不改变书籍的版权归属，也不把用户授权表述为出版社许可或开放版权。网站页面保留版本、页数、SHA256、OCR状态和“引用前核对原书”的提示。
