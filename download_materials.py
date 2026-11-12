"""Download public publisher-provided Yedi Iklim assets into this local MVP."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.request import Request, urlopen
from urllib.parse import urljoin, urlparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import json, re, hashlib, time

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / 'assets' / 'yedi-iklim'
BASE = 'https://www.yee.org.tr'

class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.tracks=[]; self.docs=[]; self.in_li=False; self.text=[]; self.href=None; self.linktext=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='li': self.in_li=True; self.text=[]
        if tag=='source' and a.get('type','').startswith('audio/'):
            title=' '.join(' '.join(self.text).split())
            title=re.sub(r'\s+[\d.]+\s*MB$', '', title)
            self.tracks.append((title,a.get('src')))
        if tag=='a': self.href=a.get('href'); self.linktext=[]
    def handle_data(self,data):
        if self.in_li:self.text.append(data)
        if self.href:self.linktext.append(data)
    def handle_endtag(self,tag):
        if tag=='li':self.in_li=False
        if tag=='a' and self.href:
            text=' '.join(self.linktext)
            if '.pdf' in text.lower():self.docs.append((text,self.href))
            self.href=None

def get(url):
    if urlparse(url).hostname not in ('www.yee.org.tr','yee.org.tr'):
        raise ValueError('Unexpected source host')
    return urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0 (local educational download)'}),timeout=90)

def download(item):
    dest=ROOT/item['path'];dest.parent.mkdir(parents=True,exist_ok=True)
    if not dest.exists() or dest.stat().st_size<1000:
        for attempt in range(3):
            try:
                with get(item['url']) as response:
                    ct=response.headers.get('Content-Type','')
                    if 'text/html' in ct:raise ValueError('HTML instead of media')
                    data=response.read()
                if len(data)<1000:raise ValueError('Unexpectedly small media')
                if item['kind']=='pdf' and not data.startswith(b'%PDF'):raise ValueError('Invalid PDF')
                dest.write_bytes(data);break
            except Exception:
                if attempt==2:raise
                time.sleep(attempt+1)
    data=dest.read_bytes()
    item.update(bytes=len(data),sha256=hashlib.sha256(data).hexdigest())
    return item

def main():
    items=[];pages=[]
    for level in ['A1','A2','B1','B2','C1']:
        url=f'{BASE}/en/yayinlar/yedi-iklim-turkce-{level.lower()}-ders-kitabi'
        with get(url) as response:html=response.read().decode('utf-8')
        page=Page();page.feed(html)
        seen=set()
        for title,src in page.tracks:
            if not src or src in seen:continue
            seen.add(src);media_id=src.rstrip('/').split('/')[-1]
            items.append(dict(level=level,kind='audio',title=title or f'Audio {media_id}',url=urljoin(BASE,src),path=f'assets/yedi-iklim/{level}/{media_id}.mp3',source=url))
        for title,src in page.docs:
            if src in seen:continue
            seen.add(src)
            items.append(dict(level=level,kind='pdf',title=f'Yedi İklim Türkçe {level} Ders Kitabı',url=urljoin(BASE,src),path=f'assets/yedi-iklim/{level}/ders-kitabi.pdf',source=url))
            break
        pages.append(dict(level=level,source=url,audio=len(page.tracks),pdf=len(page.docs)))
        print(f'{level}: {len(page.tracks)} audio, {len(page.docs)} PDF',flush=True)
    ASSETS.mkdir(parents=True,exist_ok=True)
    completed=[];failed=[]
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures={pool.submit(download,i):i for i in items}
        for future in as_completed(futures):
            try:
                completed.append(future.result())
                if len(completed)%10==0:print(f'Downloaded {len(completed)}/{len(items)}',flush=True)
            except Exception as err:
                item=futures[future];failed.append(dict(path=item['path'],error=str(err)))
                print('FAILED '+item['path']+' '+str(err),flush=True)
    completed.sort(key=lambda x:(x['level'],x['kind'],x['title']))
    result=dict(publisher='Yunus Emre Enstitüsü',collection='Yedi İklim Türkçe',downloaded_at='2026-11-12',usage='Local educational copy. Publisher retains rights; public redistribution license not established.',pages=pages,files=completed,failed=failed)
    (ASSETS/'manifest.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
    (ROOT/'library-data.js').write_text('const LOCAL_LIBRARY='+json.dumps(result,ensure_ascii=False)+';\n',encoding='utf-8')
    print(json.dumps(dict(files=len(completed),failed=len(failed),megabytes=round(sum(i['bytes'] for i in completed)/1024**2,1))),flush=True)

if __name__=='__main__':main()
