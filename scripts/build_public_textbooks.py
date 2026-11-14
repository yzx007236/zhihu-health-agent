"""Build the read-only static textbook bundle for the public website.

PDFs remain ordinary files under textbooks/pdf. Page JSON contains only the
catalogue's public metadata and extracted page text; no local paths or learner
data are included.
"""
from __future__ import annotations

import json
import shutil
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'resources/textbooks'
OUT = ROOT / 'output/教材公开发布/textbooks'

OUT.mkdir(parents=True, exist_ok=True)
(OUT / 'pages').mkdir(parents=True, exist_ok=True)
(OUT / 'pdf').mkdir(parents=True, exist_ok=True)

catalog = json.loads((SOURCE / 'catalog.json').read_text(encoding='utf-8-sig'))
book_map = {book['book_id']: book for book in catalog['books']}
db = sqlite3.connect(SOURCE / 'pages.sqlite3')
db.row_factory = sqlite3.Row
for book_id in sorted(book_map):
    rows = db.execute(
        'SELECT book_id,pdf_page,text,norm,printed_page_candidate,headings FROM pages WHERE book_id=? ORDER BY pdf_page',
        (book_id,)).fetchall()
    pages = []
    for row in rows:
        pages.append({
            'book_id': row['book_id'], 'pdf_page': row['pdf_page'],
            'text': row['text'], 'norm': row['norm'],
            'printed_page_candidate': row['printed_page_candidate'],
            'headings': json.loads(row['headings']),
            'snippet': row['text'][:340],
        })
    (OUT / 'pages' / f'{book_id}.json').write_text(
        json.dumps(pages, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    shutil.copy2(SOURCE / book_map[book_id]['pdf_file'], OUT / 'pdf' / f'{book_id}.pdf')
db.close()

public_books = []
for book in catalog['books']:
    item = {key: book[key] for key in ('book_id', 'title', 'pdf_pages', 'bytes', 'sha256', 'text_status', 'ocr')}
    item['pdf_url'] = f"/textbooks/pdf/{book['book_id']}.pdf"
    public_books.append(item)
public = {key: catalog[key] for key in ('schema_version', 'page_numbering', 'book_count', 'page_count')}
public['books'] = public_books
public['publication'] = {
    'mode': '公开只读教材资源',
    'source_notice': '用户已明确授权将当前教材文件发布到本网站；版本、页码和文字稿状态以书目记录为准。',
    'content_notice': '关键词命中是原文线索，不代表题目解析已核实；OCR或文字提取结果应对照原书。',
}
(OUT / 'catalog.json').write_text(json.dumps(public, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'books': len(public_books), 'pages': catalog['page_count'],
                  'bytes': sum(path.stat().st_size for path in (OUT / 'pdf').glob('*.pdf'))}, ensure_ascii=False))
