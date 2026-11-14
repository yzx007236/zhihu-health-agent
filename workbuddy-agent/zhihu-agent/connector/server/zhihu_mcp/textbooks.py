"""Local complete textbook catalog, read-only page index and literal retrieval.

Retrieval locates source passages; it does not validate an answer or attach a
citation to a question. Public results contain no local filesystem paths.
"""
from contextlib import contextmanager
from functools import lru_cache
import json
import os
from pathlib import Path
import re
import sqlite3
import unicodedata


def normalize(text):
    return ''.join(unicodedata.normalize('NFKC', str(text)).lower().split())


def resource_root():
    configured = os.environ.get('ZHIHU_TEXTBOOK_ROOT')
    if configured:
        return Path(configured).resolve()
    for parent in Path(__file__).resolve().parents:
        candidate = parent / 'resources/textbooks'
        if (candidate / 'catalog.json').is_file():
            return candidate
    return Path(__file__).resolve().parent / 'resources/textbooks'


@lru_cache(maxsize=4)
def _manifest(root, stamp):
    return json.loads((Path(root) / 'catalog.json').read_text(encoding='utf-8-sig'))


def manifest():
    root = resource_root()
    path = root / 'catalog.json'
    return _manifest(str(root), path.stat().st_mtime_ns)


def _book(book_id):
    if not isinstance(book_id, str) or not re.fullmatch(r'B\d{2}', book_id):
        raise ValueError('invalid_book_id')
    for book in manifest()['books']:
        if book['book_id'] == book_id:
            return book
    raise ValueError('unknown_book_id')


def pdf_path(book_id):
    book = _book(book_id)
    root = resource_root().resolve()
    path = (root / book['pdf_file']).resolve()
    if not path.is_relative_to(root) or not path.is_file():
        raise FileNotFoundError('textbook_unavailable')
    return path


def _public(book):
    return {k: book[k] for k in ('book_id', 'title', 'pdf_pages', 'bytes', 'sha256', 'text_status', 'ocr')} | {
        'pdf_url': f"/api/textbooks/{book['book_id']}/pdf"}


def catalog():
    try:
        data = manifest()
        if not (resource_root() / 'pages.sqlite3').is_file():
            raise FileNotFoundError()
        books = [_public(b) | {'available': pdf_path(b['book_id']).is_file()} for b in data['books']]
        return {'status': 'ok', 'book_count': len(books), 'page_count': data['page_count'],
                'page_numbering': data['page_numbering'], 'books': books}
    except (OSError, KeyError, ValueError):
        return {'status': 'unavailable', 'books': [], 'book_count': 0,
                'message': '此运行环境尚未安装完整教材库。请使用已导入教材的本机程序。'}


@contextmanager
def _database():
    path = resource_root() / 'pages.sqlite3'
    db = sqlite3.connect(path.resolve().as_uri() + '?mode=ro', uri=True, timeout=10)
    db.row_factory = sqlite3.Row
    try:
        yield db
    finally:
        db.close()


def _integer(value, minimum, maximum):
    if isinstance(value, bool) or not isinstance(value, int) or not minimum <= value <= maximum:
        raise ValueError('invalid_pagination')
    return value


def _snippet(text, terms):
    # Keep original typography but locate a normalized keyword across line breaks.
    chars, offsets = [], []
    for i, char in enumerate(text):
        normalized = normalize(char)
        chars.extend(normalized)
        offsets.extend([i] * len(normalized))
    norm = ''.join(chars)
    hits = [norm.find(t) for t in terms if norm.find(t) >= 0]
    start = max(0, offsets[min(hits)] - 75) if hits else 0
    return ('…' if start else '') + text[start:start + 340] + ('…' if start + 340 < len(text) else '')


def search(query='', book_id=None, limit=20, offset=0):
    if not isinstance(query, str) or len(query) > 120:
        raise ValueError('invalid_query')
    _integer(limit, 1, 50)
    _integer(offset, 0, 1000000)
    terms = list(dict.fromkeys(normalize(t) for t in query.split() if normalize(t)))
    if not terms or any(len(t) < 2 for t in terms) or len(terms) > 8:
        raise ValueError('输入至少两个字的关键词，多个关键词用空格分开')
    if catalog()['status'] != 'ok':
        return {'status': 'unavailable', 'results': [], 'total': 0}
    if book_id:
        _book(book_id)
    clauses, params = [], []
    if book_id:
        clauses.append('p.book_id=?'); params.append(book_id)
    long_terms = [t for t in terms if len(t) >= 3]
    if long_terms:
        clauses.append('p.id IN (SELECT rowid FROM search WHERE search MATCH ?)')
        params.append(' AND '.join('"' + t.replace('"', '""') + '"' for t in long_terms))
    for term in terms:
        clauses.append('instr(p.norm,?)>0'); params.append(term)
    where = ' AND '.join(clauses)
    with _database() as db:
        total = db.execute('SELECT count(*) FROM pages p WHERE ' + where, params).fetchone()[0]
        rows = db.execute('SELECT p.* FROM pages p WHERE ' + where + ' ORDER BY p.book_id,p.pdf_page LIMIT ? OFFSET ?', params + [limit, offset]).fetchall()
    books = {b['book_id']: b for b in manifest()['books']}
    results = [{'book_id': r['book_id'], 'title': books[r['book_id']]['title'], 'pdf_page': r['pdf_page'],
                'printed_page_candidate': r['printed_page_candidate'], 'snippet': _snippet(r['text'], terms),
                'ocr': books[r['book_id']]['ocr'],
                'pdf_url': f"/api/textbooks/{r['book_id']}/pdf#page={r['pdf_page']}"} for r in rows]
    return {'status': 'ok', 'results': results, 'total': total, 'limit': limit, 'offset': offset,
            'notice': '关键词命中为原文线索，不代表已核实题目解析。页码为PDF页序。'}


def read_page(book_id, pdf_page=1):
    book = _book(book_id)
    _integer(pdf_page, 1, book['pdf_pages'])
    with _database() as db:
        row = db.execute('SELECT * FROM pages WHERE book_id=? AND pdf_page=?', (book_id, pdf_page)).fetchone()
    if row is None:
        raise FileNotFoundError('textbook_page_unavailable')
    return {'status': 'ok', **_public(book), 'pdf_page': pdf_page, 'text': row['text'],
            'printed_page_candidate': row['printed_page_candidate'], 'headings': json.loads(row['headings']),
            'citation': f"{book['title']}，PDF第{pdf_page}页", 'printed_page_verified': False,
            'notice': '文字稿可能含识别或排版误差，引用前请核对原书。印刷页码候选未经逐页核对。'}
