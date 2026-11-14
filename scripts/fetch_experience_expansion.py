"""Fetch public guideline XML only. No training data leaves this workspace."""
from pathlib import Path
import concurrent.futures
import hashlib
import json
import urllib.request
import xml.etree.ElementTree as ET

OUT = Path(__file__).resolve().parents[1] / 'output/知护题库关联经验库_v3.1/证据核验'
ARTICLES = {'G15': 'PMC6812437', 'G16': 'PMC8486643', 'G17': 'PMC7607509', 'G18': 'PMC10691881'}

def fetch(pair):
    sid, pmc = pair
    url = f'https://www.ebi.ac.uk/europepmc/webservices/rest/{pmc}/fullTextXML'
    target = OUT / f'{sid}_原文.xml'
    if target.is_file():
        raw = target.read_bytes()
        if sid == 'G18' and (OUT / f'{sid}_原始响应.xml').is_file():
            url = ('https://pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/?verb=GetRecord&'
                   'identifier=oai:pubmedcentral.nih.gov:10691881&metadataPrefix=pmc')
    else:
        request = urllib.request.Request(url, headers={'User-Agent': 'ZhiHu-evidence-review/1.0'})
        opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
        try:
            with opener.open(request, timeout=35) as response:
                raw = response.read()
        except urllib.error.HTTPError:
            if sid != 'G18':
                raise
            url = ('https://pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/?verb=GetRecord&'
                   'identifier=oai:pubmedcentral.nih.gov:10691881&metadataPrefix=pmc')
            with opener.open(url, timeout=35) as response:
                raw = response.read()
    article = ET.fromstring(raw)
    if article.tag != 'article':
        article = next(el for el in article.iter() if el.tag.split('}')[-1] == 'article')
        # Preserve the untouched downloaded envelope alongside normalized XML.
        OUT.mkdir(parents=True, exist_ok=True)
        (OUT / f'{sid}_原始响应.xml').write_bytes(raw)
        for element in article.iter():
            element.tag = element.tag.split('}')[-1]
        raw = ET.tostring(article, encoding='utf-8')
    assert article.tag == 'article', 'Not a guideline XML'
    title = ''.join(article.find('.//article-title').itertext())
    OUT.mkdir(parents=True, exist_ok=True)
    target.write_bytes(raw)
    body = article.find('body')
    text = '\n'.join(' '.join(''.join(el.itertext()).split()) for el in body.iter() if el.tag in ('title', 'p', 'table'))
    (OUT / f'{sid}_核验文本.txt').write_text(text, encoding='utf-8')
    meta = {'source_id': sid, 'pmcid': pmc, 'title': title, 'download_url': url,
            'checked_on': '2026-11-14', 'xml_sha256': hashlib.sha256(raw).hexdigest(),
            'text_sha256': hashlib.sha256(text.encode()).hexdigest(),
            'doi': [''.join(x.itertext()) for x in article.findall('.//article-id') if x.get('pub-id-type') == 'doi']}
    (OUT / f'{sid}_下载记录.json').write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding='utf-8')
    return meta

if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        results = [pool.submit(fetch, item) for item in ARTICLES.items()]
        for result in results:
            try:
                print(json.dumps(result.result(), ensure_ascii=False))
            except Exception as error:
                print(type(error).__name__, str(error))
