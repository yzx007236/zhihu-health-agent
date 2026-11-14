"""Import the verified local preparation into the application's textbook library.

No OCR, external requests or question-bank writes. PDFs are hard-linked on the
same volume (copied if unavailable), verified by SHA256, and indexed per PDF page.
"""
from pathlib import Path
import hashlib
import json
import os
import shutil
import sqlite3
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'workbuddy-agent/zhihu-agent/connector/server'))
from zhihu_mcp.textbooks import normalize


def main():
    source = ROOT / 'output/教材出处准备'
    dest = ROOT / 'resources/textbooks'
    (dest / 'pdf').mkdir(parents=True, exist_ok=True)
    books = json.loads((source / '教材目录.json').read_text(encoding='utf-8-sig'))
    database = dest / 'pages.build.sqlite3'
    if database.exists():
        database.unlink()
    db = sqlite3.connect(database)
    db.executescript('''
        CREATE TABLE pages(id INTEGER PRIMARY KEY, book_id TEXT, pdf_page INTEGER,
            text TEXT, norm TEXT, printed_page_candidate TEXT, headings TEXT,
            UNIQUE(book_id, pdf_page));
        CREATE VIRTUAL TABLE search USING fts5(norm, content='pages', content_rowid='id', tokenize='trigram');
    ''')
    catalog = []
    total_pages = 0
    for book in books:
        bid = book['book_id']
        original = source / book['relative_pdf']
        pdf = dest / 'pdf' / (bid + '.pdf')
        if not pdf.exists():
            try:
                os.link(original, pdf)
            except OSError:
                shutil.copy2(original, pdf)
        with pdf.open('rb') as stream:
            digest = hashlib.file_digest(stream, 'sha256').hexdigest()
        if digest != book['sha256']:
            raise ValueError(f'{bid}: PDF checksum mismatch; import stopped')
        pages = json.loads((source / '工作数据' / (bid + '.json')).read_text(encoding='utf-8-sig'))['pages']
        if len(pages) != book['pdf_pages'] or [p['pdf_page'] for p in pages] != list(range(1, len(pages) + 1)):
            raise ValueError(f'{bid}: page sequence mismatch')
        db.executemany('INSERT INTO pages(book_id,pdf_page,text,norm,printed_page_candidate,headings) VALUES(?,?,?,?,?,?)',
            [(bid, p['pdf_page'], p['text'], normalize(p['text']), str(p.get('printed_page_candidate') or ''),
              json.dumps(p.get('headings_on_page', []), ensure_ascii=False)) for p in pages])
        catalog.append({k: book[k] for k in ('book_id', 'title', 'bytes', 'sha256', 'pdf_pages', 'text_status')} |
            {'pdf_file': f'pdf/{bid}.pdf', 'ocr': bid == 'B03'})
        total_pages += len(pages)
        print(f'{bid}: verified, {len(pages)} pages indexed', flush=True)
    db.execute("INSERT INTO search(search) VALUES('rebuild')")
    db.commit()
    assert db.execute('PRAGMA integrity_check').fetchone()[0] == 'ok'
    db.close()
    os.replace(database, dest / 'pages.sqlite3')
    manifest = {'schema_version': 1, 'page_numbering': 'PDF页序，从1开始；非印刷页码',
                'book_count': len(catalog), 'page_count': total_pages, 'books': catalog}
    (dest / 'catalog.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'Imported {len(catalog)} complete books, {total_pages} PDF pages.', flush=True)


if __name__ == '__main__':
    main()
