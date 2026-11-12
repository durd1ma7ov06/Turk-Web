from pathlib import Path
from zipfile import ZipFile, ZIP_STORED
import json, hashlib

def sha256_file(path):
    h=hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda:f.read(1024*1024),b''):h.update(chunk)
    return h.hexdigest()

root=Path(__file__).resolve().parent
manifest=json.loads((root/'assets/yedi-iklim/manifest.json').read_text(encoding='utf-8'))
if manifest['failed']:
    raise SystemExit('Downloads incomplete; inspect manifest failed list.')
for item in manifest['files']:
    p=root/item['path']
    if not p.is_file() or p.stat().st_size!=item['bytes']:
        raise SystemExit(f'Missing or incomplete: {p}')
    if sha256_file(p)!=item['sha256']:
        raise SystemExit(f'Checksum mismatch: {p}')
    with p.open('rb') as header_file:data=header_file.read(4096)
    if item['kind']=='pdf' and not data.startswith(b'%PDF'):
        raise SystemExit(f'Invalid PDF: {p}')
    if item['kind']=='audio' and not (data.startswith(b'ID3') or any(data[i]==255 and data[i+1]&224==224 for i in range(len(data)-1))):
        raise SystemExit(f'Invalid MP3 header: {p}')

speech=json.loads((root/'assets/turkish-speech/manifest.json').read_text(encoding='utf-8'))
if speech['failed'] or speech['locale']!='tr-TR':raise SystemExit('Turkish speech incomplete')
for item in speech['files'].values():
    p=root/item['path']
    if item['locale']!='tr-TR' or not item['voice'].startswith('tr-TR-') or not p.is_file() or sha256_file(p)!=item['sha256']:raise SystemExit('Turkish audio integrity error')

names=['account.js','dashboard.js','design.css','backend/api.cjs','backend/manage.cjs','tests/backend.test.cjs','.gitignore','index.html','style.css','rights.js','HUQUQLAR_VA_XAVFSIZLIK.md','app.js','content.js','materials.js','mock-data.js','mock.js','speech.js','speech-data.js','speech-texts.json','generate_turkish_audio.py','library.js','library-data.js','server.cjs','package.json','start.bat','README.md','download_materials.py','package_mvp.py']
files=[root/n for n in names]+sorted((root/'assets').rglob('*'))
output=root/'Turkce-MVP-toliq.zip'
with ZipFile(output,'w',compression=ZIP_STORED,allowZip64=True) as archive:
    for p in files:
        if p.is_file():archive.write(p,arcname='Turkce-MVP/'+p.relative_to(root).as_posix())
with ZipFile(output) as archive:
    if archive.testzip():raise SystemExit('ZIP integrity error')
report={'files':len(manifest['files']),'audio':sum(x['kind']=='audio' for x in manifest['files']),'turkish_speech_audio':len(speech['files']),'pdf':sum(x['kind']=='pdf' for x in manifest['files']),'archive':output.name,'archive_bytes':output.stat().st_size,'archive_sha256':sha256_file(output),'all_file_hashes_verified':True}
(root/'verification.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))
