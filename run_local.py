"""Offline review entry: static UI + existing Python tools + experience retrieval.

Run: python run_local.py --port 8765. Binds loopback only. No outbound requests,
cloud SDK, model calls, dependency install or source uploads are performed.
"""
from __future__ import annotations
import argparse
import json
import os
import re
import sqlite3
import sys
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit, unquote, parse_qs

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT / "workbuddy-agent/zhihu-agent/connector/server"))
os.environ.setdefault("ZHIHU_SESSION_STORE", str(ROOT / ".zhihu-sessions" / "local-review"))
os.environ.setdefault("ZHIHU_CLASSROOM_STORE", str(ROOT / ".zhihu-classroom"))
os.environ.setdefault("ZHIHU_CLASSROOM_LOCAL_SETUP", "1")
from zhihu_mcp import tools, experience, textbooks, classroom, textbook_render

TOOLS = {name: getattr(tools, name) for name in (
    "health_check", "begin_training", "start_session", "get_session_status", "get_pretest",
    "submit_pretest", "get_knowledge", "list_training_cases", "select_training_case", "get_sp_state",
    "advance_stage", "append_turn", "append_exchange", "score_session", "generate_training_report",
    "generate_case_variant", "get_experience_references", "list_textbooks", "search_textbooks", "read_textbook_page")}


class Handler(SimpleHTTPRequestHandler):
    ASSETS = {"/care-ui.css", "/care-ui.js", "/care-leaf.svg", "/care-ring.svg", "/course-care.css", "/app.js", "/data.js", "/engine.js", "/store.js", "/qa.js", "/experience.js", "/textbooks.js", "/textbooks.css",
              "/classroom.js", "/classroom.css", "/experience.css", "/studio.css", "/auth-studio.css", "/mascot.css", "/mascot.js", "/zhihu-mascot.mp4", "/care-brand.svg", "/care-architecture.svg", "/care-workspace.svg",
              "/mobile-care.css", "/variants/index-paper.html", "/variants/index-midnight.html", "/variants/index-frost.html",
              "/variants", "/variants/"}
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT / "web"), **kwargs)

    def log_message(self, *args):
        pass  # no query strings, request bodies, names or clinical text in logs

    def end_headers(self):
        # Local review files change in place; never mix cached styles with new UI.
        path = unquote(urlsplit(self.path).path)
        if path in self.ASSETS or path in {"/", "/index.html", "/classroom.html"}:
            self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def _json(self, data, code=200):
        raw = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        if self.command != 'HEAD':
            self.wfile.write(raw)

    def _textbooks(self):
        parsed = urlsplit(self.path)
        path = unquote(parsed.path)
        if not path.startswith('/api/textbooks'):
            return False
        try:
            query = parse_qs(parsed.query)
            if path == '/api/textbooks':
                self._json(textbooks.catalog())
            elif path == '/api/textbooks/search':
                self._json(textbooks.search(query.get('q', [''])[0], query.get('book_id', [None])[0],
                    int(query.get('limit', ['20'])[0]), int(query.get('offset', ['0'])[0])))
            elif match := re.fullmatch(r'/api/textbooks/(B\d{2})/pages/(\d+)', path):
                self._json(textbooks.read_page(match[1], int(match[2])))
            elif match := re.fullmatch(r'/api/textbooks/(B\d{2})/pages/(\d+)/image', path):
                raw = textbook_render.page_png(match[1], int(match[2]))
                self.send_response(200)
                self.send_header('Content-Type', 'image/png')
                self.send_header('Content-Length', str(len(raw)))
                self.send_header('Cache-Control', 'private, max-age=3600')
                self.send_header('X-Content-Type-Options', 'nosniff')
                self.end_headers()
                if self.command != 'HEAD':
                    try:
                        self.wfile.write(raw)
                    except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError):
                        pass
            elif match := re.fullmatch(r'/api/textbooks/(B\d{2})/pdf', path):
                self._pdf(match[1])
            else:
                self._json({'error': 'not_found'}, 404)
        except (ValueError, TypeError):
            self._json({'error': 'invalid_textbook_request'}, 400)
        except (OSError, KeyError):
            self._json({'error': 'textbook_unavailable'}, 404)
        except sqlite3.Error:
            self._json({'error': 'textbook_index_unavailable'}, 503)
        except textbook_render.RenderUnavailable:
            self._json({'error': 'original_page_unavailable'}, 503)
        return True

    def _pdf(self, book_id):
        path = textbooks.pdf_path(book_id)
        size = path.stat().st_size
        start, end, code = 0, size - 1, 200
        byte_range = self.headers.get('Range')
        if byte_range:
            match = re.fullmatch(r'bytes=(\d*)-(\d*)', byte_range)
            valid = bool(match and (match[1] or match[2]))
            if valid:
                if match[1]:
                    start = int(match[1]); end = min(int(match[2]), size - 1) if match[2] else size - 1
                else:
                    start = max(0, size - int(match[2])); end = size - 1
                valid = start <= end and start < size
            if not valid:
                self.send_response(416)
                self.send_header('Content-Range', f'bytes */{size}')
                self.send_header('Content-Length', '0')
                self.end_headers()
                return
            code = 206
        self.send_response(code)
        self.send_header('Content-Type', 'application/pdf')
        self.send_header('Content-Disposition', f'inline; filename="{book_id}.pdf"')
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Cache-Control', 'private, max-age=3600')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Content-Length', str(end - start + 1))
        if code == 206:
            self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.end_headers()
        if self.command == 'HEAD':
            return
        try:
            with path.open('rb') as stream:
                stream.seek(start)
                remaining = end - start + 1
                while remaining > 0:
                    chunk = stream.read(min(256 * 1024, remaining))
                    if not chunk:
                        break
                    self.wfile.write(chunk); remaining -= len(chunk)
        except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError):
            pass

    def do_GET(self):
        if self._textbooks():
            return
        path = unquote(urlsplit(self.path).path)
        if path == "/api/agent":
            return self._json({"status": "ok", "service": "知护本地Python运行时", "model": "本地确定性流程；无模型调用", "workbuddy_configured": False, "local_only": True})
        if path == "/api/experience/status":
            return self._json(experience.status())
        if path in {"/", "/index.html", "/classroom.html", "/variants/index-paper.html", "/variants/index-midnight.html", "/variants/index-frost.html"}:
            page_path = ROOT / "web" / path.lstrip("/") if path.startswith("/variants/") else ROOT / "web/index.html"
            content = page_path.read_text(encoding="utf-8-sig")
            if path == "/classroom.html":
                content = (ROOT / "web/classroom.html").read_text(encoding="utf-8-sig")
                content = content.replace('<head>', '<head><script>window.__LOCAL_ONLY__=true;window.__AGENT_API__="/api/agent";</script>', 1)
            if path.startswith("/variants/"):
                content = content.replace('src="data.js"', 'src="../data.js"')
                content = content.replace('src="engine.js"', 'src="../engine.js"')
                content = content.replace('src="store.js"', 'src="../store.js"')
                content = content.replace('src="qa.js"', 'src="../qa.js"')
                content = content.replace('src="experience.js"', 'src="../experience.js"')
                content = content.replace('src="textbooks.js"', 'src="../textbooks.js"')
                content = content.replace('href="textbooks.css"', 'href="../textbooks.css"')
                content = content.replace('src="app.js"', 'src="../app.js"')
            content = content.replace('<script src="https://cdn.jsdelivr.net/npm/@tencent-ai/workbuddy-cloud-sdk@dev/lib/index.global.js"></script>', '')
            content = content.replace('<script src="data.js">', '<script>window.__LOCAL_ONLY__=true;window.__AGENT_API__="/api/agent";</script><script src="data.js">')
            content = content.replace('<script src="../data.js">', '<script>window.__LOCAL_ONLY__=true;window.__AGENT_API__="/api/agent";</script><script src="../data.js">')
            raw = content.encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Security-Policy", "connect-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self' data:")
            self.send_header("Content-Length", str(len(raw)))
            self.end_headers(); self.wfile.write(raw)
            return
        if path in {"/variants", "/variants/"}:
            raw = (ROOT / "web/variants/index.html").read_bytes()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(raw)))
            self.end_headers(); self.wfile.write(raw)
            return
        # Serve only static UI assets; reject traversal and hidden directories.
        if path not in self.ASSETS:
            return self._json({"error": "not_found"}, 404)
        return super().do_GET()

    def do_HEAD(self):
        if self._textbooks():
            return
        path = unquote(urlsplit(self.path).path)
        if path in {"/", "/index.html"}:
            self.send_response(200); self.end_headers()
            return
        if path not in self.ASSETS:
            self.send_response(404); self.end_headers()
            return
        return super().do_HEAD()

    def do_POST(self):
        origin = self.headers.get("Origin")
        allowed = {f"http://127.0.0.1:{self.server.server_port}", f"http://localhost:{self.server.server_port}"}
        if origin and origin not in allowed:
            return self._json({"error": "origin_rejected"}, 403)
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if not 0 < length <= 256 * 1024:
                return self._json({"error": "invalid_body_size"}, 413)
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            if isinstance(payload, dict) and urlsplit(self.path).path == "/api/agent" and payload.get("action") == "classroom":
                return self._json(classroom.request(payload.get("operation"), payload.get("payload"), payload.get("token")))
            if not isinstance(payload, dict):
                return self._json({"status": "error", "error": "invalid_request"}, 400)
            if urlsplit(self.path).path == "/api/experience":
                args = {k: payload[k] for k in ("query", "session_id", "question_id", "case_id", "topic", "node_id", "enabled", "training_active", "assessment_active", "learning_mode", "collected") if k in payload}
                return self._json(tools.get_experience_references(**args))
            if urlsplit(self.path).path == "/api/agent" and payload.get("action") == "mcp_call":
                name = str(payload.get("tool", "")).removeprefix("zhihu_")
                if name in TOOLS:
                    return self._json({"status": "ok", "mode": "local", "result": TOOLS[name](**(payload.get("args") or {}))})
            return self._json({"status": "unavailable", "error": "local_only_no_cloud_or_model"}, 503)
        except (ValueError, TypeError, KeyError, OSError, tools.RuntimeErrorWithCode) as exc:
            # Controlled codes only. Do not echo user-supplied text on failures.
            return self._json({"status": "error", "error": getattr(exc, "code", "invalid_request")}, 400)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8765)
    args = parser.parse_args()
    print(f"ZhiHu local only: http://127.0.0.1:{args.port} (Ctrl+C to stop)", flush=True)
    ThreadingHTTPServer(("127.0.0.1", args.port), Handler).serve_forever()
