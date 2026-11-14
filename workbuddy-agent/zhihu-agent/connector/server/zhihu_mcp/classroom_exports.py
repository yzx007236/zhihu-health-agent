"""Dependency-free XLSX and paginated Chinese PDF exports. All text is data."""
import io
import unicodedata
import zipfile
from xml.sax.saxutils import escape


def xlsx(rows):
    def cell(value, col, row):
        name = ''
        while col:
            col, n = divmod(col - 1, 26)
            name = chr(65 + n) + name
        ref = f'{name}{row}'
        if isinstance(value, (int, float)):
            return f'<c r="{ref}"><v>{value}</v></c>'
        # inlineStr prevents formula interpretation, including = + - @ prefixes.
        value = ''.join(c for c in str(value if value is not None else '') if ord(c) >= 32 or c in '\n\t')
        return f'<c r="{ref}" t="inlineStr"><is><t xml:space="preserve">{escape(value)}</t></is></c>'
    body = ''.join(f'<row r="{i}">' + ''.join(cell(v, j, i) for j, v in enumerate(row, 1)) + '</row>' for i, row in enumerate(rows, 1))
    files = {
        '[Content_Types].xml': '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>',
        '_rels/.rels': '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
        'xl/workbook.xml': '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="课程成绩" sheetId="1" r:id="rId1"/></sheets></workbook>',
        'xl/_rels/workbook.xml.rels': '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>',
        'xl/worksheets/sheet1.xml': '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><cols><col min="1" max="20" width="22" customWidth="1"/></cols><sheetData>' + body + '</sheetData></worksheet>',
    }
    out = io.BytesIO()
    with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as archive:
        for name, data in files.items():
            archive.writestr(name, '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + data)
    return out.getvalue()


def pdf(lines):
    # A4, 42 lines per page, reserving space above the footer.
    wrapped = []
    for line in lines:
        for paragraph in str(line).splitlines() or ['']:
            part, width = '', 0
            for char in paragraph:
                char = char if 32 <= ord(char) <= 0xFFFF else ' '
                w = 2 if unicodedata.east_asian_width(char) in {'F', 'W'} else 1
                if width + w > 82:
                    wrapped.append(part); part, width = '', 0
                part += char; width += w
            wrapped.append(part)
    pages = [wrapped[i:i + 42] for i in range(0, len(wrapped), 42)] or [[]]
    objects = [b'<< /Type /Catalog /Pages 2 0 R >>', b'',
               b'<< /Type /Font /Subtype /Type0 /BaseFont /STSong-Light /Encoding /UniGB-UCS2-H /DescendantFonts [4 0 R] >>',
               b'<< /Type /Font /Subtype /CIDFontType0 /BaseFont /STSong-Light /CIDSystemInfo << /Registry (Adobe) /Ordering (GB1) /Supplement 4 >> /DW 1000 /W [1 95 500] >>']
    kids = []
    for number, page in enumerate(pages, 1):
        page_id = len(objects) + 1; stream_id = page_id + 1
        kids.append(f'{page_id} 0 R')
        objects.append(f'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents {stream_id} 0 R >>'.encode())
        content = 'BT /F1 11 Tf 17 TL 48 788 Td\n'
        for line in page:
            content += '<' + line.encode('utf-16-be').hex() + '> Tj T*\n'
        content += 'ET\nBT /F1 9 Tf 48 32 Td <' + f'知护课程训练报告  |  {number}/{len(pages)}'.encode('utf-16-be').hex() + '> Tj ET'
        raw = content.encode('ascii')
        objects.append(f'<< /Length {len(raw)} >>\nstream\n'.encode() + raw + b'\nendstream')
    objects[1] = f'<< /Type /Pages /Count {len(kids)} /Kids [{" ".join(kids)}] >>'.encode()
    out = bytearray(b'%PDF-1.4\n%\xe2\xe3\xcf\xd3\n'); offsets = [0]
    for i, obj in enumerate(objects, 1):
        offsets.append(len(out)); out.extend(f'{i} 0 obj\n'.encode() + obj + b'\nendobj\n')
    start = len(out); out.extend(f'xref\n0 {len(offsets)}\n0000000000 65535 f \n'.encode())
    for offset in offsets[1:]:
        out.extend(f'{offset:010d} 00000 n \n'.encode())
    out.extend(f'trailer\n<< /Size {len(offsets)} /Root 1 0 R >>\nstartxref\n{start}\n%%EOF\n'.encode())
    return bytes(out)
