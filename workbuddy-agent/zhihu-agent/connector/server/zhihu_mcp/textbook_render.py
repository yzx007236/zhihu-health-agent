"""On-demand original-page images for the local inline reader only."""
from io import BytesIO
from pathlib import Path
import threading

from . import textbooks

_LOCK = threading.Lock()  # PDFium must never run concurrently in this process.
_WIDTH = 2000
_MAX_FILES = 128
_MAX_BYTES = 256 * 1024 * 1024


class RenderUnavailable(RuntimeError):
    pass


def _cache_root():
    return Path(__file__).resolve().parents[5] / 'output/local-runtime/textbook-pages'


def _prune(root):
    entries = sorted(((p.stat().st_mtime_ns, p.stat().st_size, p)
                      for p in root.glob('*.png')), reverse=True)
    size = 0
    for index, (_, length, path) in enumerate(entries):
        size += length
        if index >= _MAX_FILES or size > _MAX_BYTES:
            path.unlink(missing_ok=True)


def page_png(book_id, pdf_page):
    book = textbooks._book(book_id)
    textbooks._integer(pdf_page, 1, book['pdf_pages'])
    source = textbooks.pdf_path(book_id)
    root = _cache_root()
    # Include the source fingerprint and renderer version; no client paths.
    key = f"{book_id}-{book['sha256']}-{source.stat().st_mtime_ns}-{pdf_page}-{_WIDTH}-v1.png"
    with _LOCK:
        try:
            root.mkdir(parents=True, exist_ok=True)
            cached = root / key
            if cached.is_file():
                raw = cached.read_bytes()
                cached.touch()
                return raw
            import pypdfium2 as pdfium  # Optional for MCP; required only by local original view.
            with pdfium.PdfDocument(str(source)) as document:
                page = document[pdf_page - 1]
                try:
                    width, height = page.get_size()
                    if width <= 0 or height <= 0:
                        raise RenderUnavailable('invalid_page_size')
                    scale = min(_WIDTH / width, (12_000_000 / (width * height)) ** 0.5)
                    bitmap = page.render(scale=scale)
                    try:
                        image = bitmap.to_pil()
                        try:
                            stream = BytesIO()
                            image.save(stream, format='PNG')
                            raw = stream.getvalue()
                        finally:
                            image.close()
                    finally:
                        bitmap.close()
                finally:
                    page.close()
            temporary = cached.with_suffix('.tmp')
            try:
                temporary.write_bytes(raw)
                temporary.replace(cached)
            finally:
                temporary.unlink(missing_ok=True)
            _prune(root)
            return raw
        except RenderUnavailable:
            raise
        except Exception as exc:
            raise RenderUnavailable('original_page_unavailable') from exc
