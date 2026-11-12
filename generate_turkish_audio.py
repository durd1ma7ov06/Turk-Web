from pathlib import Path
import asyncio, json, hashlib, sys
ROOT=Path(__file__).resolve().parent
sys.path.insert(0,str(ROOT/'.tools/tts'))
import edge_tts

async def main():
    voices=await edge_tts.list_voices()
    turkish={v['ShortName'] for v in voices if v['Locale']=='tr-TR'}
    voice='tr-TR-EmelNeural'
    if voice not in turkish:raise RuntimeError('Required Turkish voice unavailable')
    print('Verified Turkish voice: '+voice,flush=True)
    texts=json.loads((ROOT/'speech-texts.json').read_text(encoding='utf-8'))
    folder=ROOT/'assets/turkish-speech';folder.mkdir(parents=True,exist_ok=True)
    semaphore=asyncio.Semaphore(3);results={};failed=[]
    async def generate(text):
        key=hashlib.sha256(text.encode('utf-8')).hexdigest()[:20]
        dest=folder/(key+'.mp3')
        async with semaphore:
            try:
                if not dest.exists() or dest.stat().st_size<500:
                    for attempt in range(3):
                        try:
                            temp=dest.with_suffix('.part')
                            await edge_tts.Communicate(text,voice,rate='-8%').save(str(temp))
                            if temp.stat().st_size<500:raise RuntimeError('Empty audio')
                            temp.replace(dest);break
                        except Exception:
                            if attempt==2:raise
                            await asyncio.sleep(2*(attempt+1))
                results[text]={'path':'assets/turkish-speech/'+dest.name,'voice':voice,'locale':'tr-TR','bytes':dest.stat().st_size,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()}
                if len(results)%10==0:print(f'Generated {len(results)}/{len(texts)}',flush=True)
            except Exception as e:failed.append({'text':text,'error':str(e)})
    await asyncio.gather(*(generate(t) for t in texts))
    data={'voice':voice,'locale':'tr-TR','rate':'-8%','files':results,'failed':failed}
    (folder/'manifest.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
    (ROOT/'speech-data.js').write_text('const TURKISH_SPEECH='+json.dumps(data,ensure_ascii=False)+';\n',encoding='utf-8')
    print(json.dumps({'generated':len(results),'failed':len(failed)}),flush=True)
    if failed:raise SystemExit(1)

if __name__=='__main__':asyncio.run(main())
