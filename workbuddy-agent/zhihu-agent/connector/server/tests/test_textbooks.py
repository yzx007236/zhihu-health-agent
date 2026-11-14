"""Real installed-library/HTTP acceptance; never rewrites the question bank."""
import json
from io import BytesIO
from concurrent.futures import ThreadPoolExecutor
import os
from pathlib import Path
import sys
import threading
import unittest
from unittest.mock import patch
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[5]
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT / 'workbuddy-agent/zhihu-agent/connector/server'))
import run_local
from zhihu_mcp import textbooks, tools, textbook_render
from PIL import Image


class TextbookAcceptance(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = run_local.ThreadingHTTPServer(('127.0.0.1', 0), run_local.Handler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.base = f'http://127.0.0.1:{cls.server.server_port}'

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown(); cls.server.server_close(); cls.thread.join(3)

    def http(self, path, method='GET', headers=None, body=None):
        with urlopen(Request(self.base + path, method=method, headers=headers or {}, data=body), timeout=30) as r:
            return r.status, r.headers, r.read()

    def json(self, path):
        return json.loads(self.http(path)[2])

    def test_01_all_complete_books_and_pages(self):
        data = self.json('/api/textbooks')
        self.assertEqual(data['status'], 'ok')
        self.assertEqual(data['book_count'], 30)
        self.assertEqual(data['page_count'], 11835)
        self.assertNotIn(str(ROOT), json.dumps(data))
        for book in data['books']:
            status, headers, body = self.http(book['pdf_url'], method='HEAD')
            self.assertEqual(status, 200)
            self.assertEqual(int(headers['Content-Length']), book['bytes'])
            self.assertEqual(body, b'')
            first = self.json(f"/api/textbooks/{book['book_id']}/pages/1")
            last = self.json(f"/api/textbooks/{book['book_id']}/pages/{book['pdf_pages']}")
            self.assertEqual(first['pdf_page'], 1)
            self.assertEqual(last['pdf_page'], book['pdf_pages'])
        with textbooks._database() as db:
            self.assertEqual(db.execute('PRAGMA integrity_check').fetchone()[0], 'ok')
            self.assertEqual(db.execute('SELECT count(*) FROM pages').fetchone()[0], 11835)

    def test_02_chinese_search_ocr_filter_and_pagination(self):
        def search(q, **kw):
            return self.json('/api/textbooks/search?' + urlencode({'q':q, **kw}))
        first = search('肾病综合征', book_id='B05', limit=50)
        self.assertTrue(any(r['pdf_page'] == 511 for r in first['results']))
        self.assertTrue(all(r['book_id'] == 'B05' for r in first['results']))
        p = search('肾病综合征', book_id='B05', limit=2, offset=2)
        self.assertEqual(p['results'], first['results'][2:4])
        self.assertEqual(p['total'], first['total'])
        anatomy = search('视盘陷凹', book_id='B25')
        self.assertTrue(any(r['pdf_page'] == 264 for r in anatomy['results']))
        short = search('气逆', book_id='B01', limit=50)
        self.assertTrue(any(r['pdf_page'] == 104 for r in short['results']))
        ocr = search('疟原虫', book_id='B03')
        self.assertGreater(ocr['total'], 0)
        self.assertTrue(all(r['ocr'] for r in ocr['results']))
        self.assertGreater(search('肾病 综合征', book_id='B05')['total'], 0)
        self.assertEqual(search('不存在的医学术语甲乙丙丁')['total'], 0)
        page = self.json('/api/textbooks/B05/pages/511')
        self.assertIn('肾病综合征', textbooks.normalize(page['text']))
        self.assertFalse(page['printed_page_verified'])

    def test_03_pdf_ranges_and_boundaries(self):
        source = textbooks.pdf_path('B01')
        original = source.read_bytes()
        status, headers, body = self.http('/api/textbooks/B01/pdf')
        self.assertEqual(status, 200)
        self.assertEqual(body, original)
        self.assertEqual(headers['Content-Type'], 'application/pdf')
        for range_header, expected in [('bytes=0-31', original[:32]), ('bytes=100-199', original[100:200]),
                                        ('bytes=-64', original[-64:]), (f'bytes={len(original)-32}-', original[-32:])]:
            status, headers, data = self.http('/api/textbooks/B01/pdf', headers={'Range':range_header})
            self.assertEqual(status, 206)
            self.assertEqual(data, expected)
            self.assertEqual(int(headers['Content-Length']), len(expected))
            self.assertEqual(headers['Accept-Ranges'], 'bytes')
        for invalid in ['bytes=9-1', 'bytes=-0', 'bytes=0-1,4-5', 'bytes=x-y', f'bytes={len(original)}-']:
            with self.assertRaises(HTTPError) as error:
                self.http('/api/textbooks/B01/pdf', headers={'Range':invalid})
            self.assertEqual(error.exception.code, 416)
        _, headers, data = self.http('/api/textbooks/B01/pdf', method='HEAD', headers={'Range':'bytes=0-3'})
        self.assertEqual(data, b'')
        self.assertEqual(headers['Content-Range'], f'bytes 0-3/{len(original)}')

    def test_04_invalid_inputs_no_file_escape(self):
        for path, code in [('/api/textbooks/../../README.md',404), ('/resources/textbooks/catalog.json',404),
                ('/api/textbooks/B99/pdf',400), ('/api/textbooks/B01/pages/0',400),
                ('/api/textbooks/B01/pages/999999',400), ('/api/textbooks/search?q=x',400),
                ('/api/textbooks/search?q=medical&limit=0',400), ('/api/textbooks/search?q=medical&offset=-1',400)]:
            with self.assertRaises(HTTPError) as error:
                self.http(path)
            self.assertEqual(error.exception.code, code, path)
        with patch.dict(os.environ, {'ZHIHU_TEXTBOOK_ROOT':str(ROOT / 'tmp/no-textbooks-installed')}):
            self.assertEqual(textbooks.catalog()['status'], 'unavailable')
            self.assertEqual(tools.search_textbooks('医学')['status'], 'unavailable')
            self.assertEqual(tools.read_textbook_page('B01')['status'], 'unavailable')

    def test_05_main_and_themes_and_mcp_bridge(self):
        for path in ['/', '/variants/index-paper.html', '/variants/index-midnight.html', '/variants/index-frost.html']:
            html = self.http(path)[2].decode('utf-8')
            self.assertIn('textbooks.js', html)
            self.assertIn('textbooks.css', html)
            self.assertIn('window.__LOCAL_ONLY__=true', html)
            prefix = '../' if path.startswith('/variants/') else ''
            self.assertIn(f'src="{prefix}textbooks.js"', html)
        self.assertIn(b'ZH_TEXTBOOKS', self.http('/textbooks.js')[2])
        self.assertIn(b'.tb-dialog', self.http('/textbooks.css')[2])
        for name, args in [('list_textbooks', {}), ('search_textbooks', {'query':'视盘陷凹','book_id':'B25'}),
                           ('read_textbook_page', {'book_id':'B25','pdf_page':264})]:
            payload = json.dumps({'action':'mcp_call','tool':name,'args':args}).encode()
            data = json.loads(self.http('/api/agent', method='POST', headers={'Content-Type':'application/json'}, body=payload)[2])
            self.assertEqual(data['result']['status'], 'ok')

    def test_06_inline_original_and_scanned_pages(self):
        for book, page in [('B25',264), ('B03',100)]:
            path = f'/api/textbooks/{book}/pages/{page}/image'
            status, headers, data = self.http(path)
            self.assertEqual(status, 200)
            self.assertEqual(headers['Content-Type'], 'image/png')
            self.assertEqual(data[:8], b'\x89PNG\r\n\x1a\n')
            with Image.open(BytesIO(data)) as image:
                self.assertEqual(image.width, 2000)
                self.assertGreater(image.height, 2000)
                extrema = image.convert('L').getextrema()
                self.assertLess(extrema[0], 100)
                self.assertGreater(extrema[1], 230)
            _, head, body = self.http(path, method='HEAD')
            self.assertEqual(body, b'')
            self.assertEqual(int(head['Content-Length']), len(data))
            # Cached page must not need PDFium rendering again.
            import pypdfium2
            with patch.object(pypdfium2, 'PdfDocument', side_effect=AssertionError('cache miss')):
                self.assertEqual(self.http(path)[2], data)
        # Concurrent requests render safely and return the same original page.
        with ThreadPoolExecutor(max_workers=3) as pool:
            pages = list(pool.map(lambda _: self.http('/api/textbooks/B05/pages/511/image')[2], range(3)))
        self.assertEqual(pages[0], pages[1])
        self.assertEqual(pages[1], pages[2])
        for path in ['/api/textbooks/B25/pages/0/image', '/api/textbooks/B03/pages/324/image',
                     '/api/textbooks/B99/pages/1/image']:
            with self.assertRaises(HTTPError) as error:
                self.http(path)
            self.assertEqual(error.exception.code, 400)
        with patch.object(textbook_render, 'page_png', side_effect=textbook_render.RenderUnavailable()):
            with self.assertRaises(HTTPError) as error:
                self.http('/api/textbooks/B25/pages/264/image')
            self.assertEqual(error.exception.code, 503)


if __name__ == '__main__':
    unittest.main(verbosity=2)
