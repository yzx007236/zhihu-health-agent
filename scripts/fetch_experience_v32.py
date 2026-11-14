"""Download public guideline/consensus XML only; never sends training inputs."""
from pathlib import Path
import concurrent.futures
import hashlib
import json
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET

OUT = Path(__file__).resolve().parents[1] / 'output/知护题库关联经验库_v3.2/证据核验'
ARTICLES = {'G19': 'PMC6567462', 'G20': 'PMC6947898', 'G21': 'PMC5850553',
            'G22': 'PMC6258916', 'G23': 'PMC6140607', 'G24': 'PMC5901697',
            'G25': 'PMC7386163', 'G26': 'PMC11198953'}


def fetch(pair):
    sid, pmc = pair
    url = f'https://www.ebi.ac.uk/europepmc/webservices/rest/{pmc}/fullTextXML'
    target = OUT / f'{sid}_原文.xml'
    if target.is_file():
        raw = target.read_bytes()
        record = OUT / f'{sid}_下载记录.json'
        if record.exists():
            url = json.loads(record.read_text(encoding='utf8'))['download_url']
        # Older Python serialization with encoding='utf8' is not accepted by
        # Expat for multibyte text. Rebuild from the preserved original envelope.
        if raw.startswith(b"<?xml version='1.0' encoding='utf8'"):
            raw = (OUT / f'{sid}_原始响应.xml').read_bytes()
    else:
        opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
        request = urllib.request.Request(url, headers={'User-Agent': 'ZhiHu-evidence-review/1.0'})
        try:
            with opener.open(request, timeout=30) as response:
                raw = response.read()
        except urllib.error.HTTPError:
            url = ('https://pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/?verb=GetRecord&'
                   f'identifier=oai:pubmedcentral.nih.gov:{pmc[3:]}&metadataPrefix=pmc')
            with opener.open(url, timeout=30) as response:
                raw = response.read()
    article = ET.fromstring(raw)
    OUT.mkdir(parents=True, exist_ok=True)
    if article.tag != 'article':
        article = next(el for el in article.iter() if el.tag.split('}')[-1] == 'article')
        (OUT / f'{sid}_原始响应.xml').write_bytes(raw)
        for el in article.iter():
            el.tag = el.tag.split('}')[-1]
        raw = ET.tostring(article, encoding='utf-8')
    assert article.tag == 'article' and article.find('body') is not None
    title = ''.join(article.find('.//article-title').itertext())
    text = '\n'.join(' '.join(''.join(el.itertext()).split())
                     for el in article.find('body').iter() if el.tag in ('title', 'p', 'table'))
    meta = {'source_id': sid, 'pmcid': pmc, 'title': title, 'download_url': url,
            'checked_on': '2026-11-14', 'xml_sha256': hashlib.sha256(raw).hexdigest(),
            'text_sha256': hashlib.sha256(text.encode()).hexdigest(),
            'doi': [''.join(el.itertext()) for el in article.findall('.//article-id') if el.get('pub-id-type') == 'doi']}
    target.write_bytes(raw)
    (OUT / f'{sid}_核验文本.txt').write_text(text, encoding='utf8')
    (OUT / f'{sid}_下载记录.json').write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding='utf8')
    return meta


if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        results = {pool.submit(fetch, pair): pair[0] for pair in ARTICLES.items()}
        failed = []
        for future in concurrent.futures.as_completed(results):
            try:
                print(json.dumps(future.result(), ensure_ascii=False), flush=True)
            except Exception as error:
                failed.append(results[future])
                print(results[future], type(error).__name__, str(error), flush=True)
        if failed:
            raise SystemExit('Sources not ready: ' + ', '.join(failed))
