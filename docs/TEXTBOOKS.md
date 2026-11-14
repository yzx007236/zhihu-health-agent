# 可选教材资源

源码提供教材阅读器、只读查询接口和书目，不包含完整教材原文件及全文数据库。源码包在无教材时可完成题库、病例、评分与课程流程；教材状态会显示 unavailable。

已有完整教材库的目录结构应为：

```text
textbooks/
  catalog.json
  pages.sqlite3
  pdf/
    B01.pdf
    ...
    B30.pdf
```

将完整目录放入仓库的 `resources/textbooks/`，或在启动前将 `ZHIHU_TEXTBOOK_ROOT` 设为它的绝对路径。必须同时有目录、索引和对应 PDF；仅复制书目不会变成已安装教材。

原书图片阅读需要可选依赖：

```sh
python -m pip install "pypdfium2>=4.30,<6" "Pillow>=10,<13"
```

文字检索使用 Python 内置 SQLite。页码均为 PDF 页序；OCR 文本和印刷页码候选可能有误，引用前应核对原书。

完整资源约 2.2 GB，且存在超过 GitHub 单文件大小限制的 PDF 与索引，不适合普通 Git 提交。已有本地教材继续保留；本次发布不会上传或删除这些文件。后续如需分发，应单独准备具备相应权限的资源包，并记录来源、版本与校验值。

`scripts/import_textbooks.py`、`scripts/verify_textbook_installation.py` 等为原开发机的资料整理工具，依赖未随仓库公开的准备资料，不是首次运行的必需步骤。历史安装记录见 `resources/textbooks/README.md`，其中描述的“已安装”指原工作区。
