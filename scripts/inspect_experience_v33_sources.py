"""Read-only textbook passage inspection. A search hit is never an approved card."""
import json
from pathlib import Path
import sqlite3
import sys

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / 'resources/textbooks/pages.sqlite3'


def find(book, term, limit=1, width=300):
    with sqlite3.connect(DB.as_uri() + '?mode=ro', uri=True) as db:
        rows = db.execute('SELECT pdf_page,text FROM pages WHERE book_id=? AND pdf_page>25 AND text LIKE ?',
                          (book, '%' + term + '%')).fetchall()
    rows.sort(key=lambda row: (-row[1].count(term), row[0]))
    return [(p, t[max(0, t.find(term)-100):t.find(term)+width]) for p, t in rows[:limit]]


if __name__ == '__main__':
    for arg in sys.argv[1:]:
        book, term = arg.split(':', 1)
        print(json.dumps(dict(book=book, term=term, hits=find(book, term)), ensure_ascii=False))
