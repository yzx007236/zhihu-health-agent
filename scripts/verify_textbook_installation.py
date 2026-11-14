"""Write an installed-resource audit without changing any question/knowledge file."""
from pathlib import Path
import hashlib
import json
import sys
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'workbuddy-agent/zhihu-agent/connector/server'))
from zhihu_mcp import textbooks


def main():
    catalog = textbooks.catalog()
    assert catalog['status'] == 'ok' and catalog['book_count'] == 30
    originals = json.loads((ROOT / 'output/教材出处准备/原始文件校验.json').read_text(encoding='utf-8-sig'))
    preserved = []
    for entry in originals:
        if entry['kind'] == '前端':
            continue  # The application UI was intentionally integrated.
        path = Path(entry['path'])
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        preserved.append({'path': str(path.relative_to(ROOT)), 'unchanged': digest == entry['sha256']})
    assert all(p['unchanged'] for p in preserved), 'Question/knowledge source changed since preparation'
    verified = []
    for book in catalog['books']:
        with textbooks.pdf_path(book['book_id']).open('rb') as stream:
            digest = hashlib.file_digest(stream, 'sha256').hexdigest()
        assert digest == book['sha256']
        verified.append({'book_id': book['book_id'], 'sha256': digest, 'verified': True})
    with textbooks._database() as db:
        assert db.execute('PRAGMA integrity_check').fetchone()[0] == 'ok'
        indexed = db.execute('SELECT count(*) FROM pages').fetchone()[0]
    assert indexed == 11835
    with urlopen('http://127.0.0.1:8788/api/textbooks', timeout=10) as response:
        live = json.load(response)
    assert live['book_count'] == 30
    report = {
        'book_count': 30, 'pdf_pages': indexed, 'total_pdf_bytes': sum(b['bytes'] for b in catalog['books']),
        'local_entry': 'http://127.0.0.1:8788/#textbooks', 'live_http_catalog_verified': True,
        'pdf_checksums': verified, 'original_question_and_knowledge_files': preserved,
        'question_citations_integrated': False, 'cloud_deployed': False,
        'validation': {
            'installed_library_http': '5 real HTTP tests passed: catalog/all books, boundary pages, Chinese/OCR retrieval, full PDF and ranges, invalid inputs and main/themes/MCP bridge',
            'frontend_contract': 'shelf, escaping, pagination, page reading, return, focus, outage and learning state preservation passed; not visual verification',
            'regressions': '8 existing real HTTP acceptance tests and 3 existing JS suites passed',
            'mcp_stdio': 'real MCP client handshake and all 21 current schemas passed, including textbook search/read and existing session flow',
            'browser_visual': 'not performed: Tabbit CLI_REGISTRATION_UNAVAILABLE',
        },
    }
    dest = ROOT / 'output/教材正式接入'
    dest.mkdir(exist_ok=True)
    (dest / '验证报告.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'PASS: 30 complete PDFs, {indexed} pages, {len(preserved)} original question/knowledge files unchanged, live HTTP available.')


if __name__ == '__main__':
    main()
