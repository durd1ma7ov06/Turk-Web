const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=__dirname,port=Number(process.env.PORT||5174);
const {createApi}=require('./backend/api.cjs');
const api=createApi({dbPath:process.env.TURKCE_DB_PATH||path.join(root,'data/turkce.sqlite'),secureCookies:process.env.COOKIE_SECURE==='true'});
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.mp3':'audio/mpeg','.pdf':'application/pdf','.json':'application/json; charset=utf-8','.zip':'application/zip','.png':'image/png'};
const publicFiles=new Set(['index.html','style.css','app.js','content.js','materials.js','library.js','library-data.js','mock.js','mock-data.js','speech.js','speech-data.js','rights.js','account.js','dashboard.js','design.css']);
const publicMedia=new Set();
for(const [name,field] of [['assets/yedi-iklim/manifest.json','files'],['assets/turkish-speech/manifest.json','files']]){const manifest=JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));const rows=Array.isArray(manifest[field])?manifest[field]:Object.values(manifest[field]);for(const item of rows)publicMedia.add(item.path);}
http.createServer(async(req,res)=>{
 let requestUrl;try{requestUrl=new URL(req.url,'http://127.0.0.1')}catch{res.writeHead(400);res.end();return;}
 if(await api.handle(req,res,requestUrl))return;
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}
 let file;
 try{file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));}catch{res.writeHead(400);res.end();return;}
 if(file===root)file=path.join(root,'index.html');
 if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 const relative=path.relative(root,file).split(path.sep).join('/');
 if(!publicFiles.has(relative)&&!publicMedia.has(relative)){res.writeHead(404);res.end();return;}
 const type=mime[path.extname(file)];if(!type){res.writeHead(404);res.end();return;}
 fs.stat(file,(error,stat)=>{
  if(error||!stat.isFile()){res.writeHead(404);res.end('Not found');return;}
  const headers={'Content-Type':type,'Accept-Ranges':'bytes','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','X-Frame-Options':'SAMEORIGIN','Referrer-Policy':'same-origin'};
  if(publicMedia.has(relative))headers['Content-Disposition']='inline';
  let start=0,end=stat.size-1,status=200;
  if(req.headers.range){
   const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
   if(!match||(!match[1]&&!match[2])){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return;}
   if(!match[1])start=Math.max(0,stat.size-Number(match[2]));
   else{start=Number(match[1]);if(match[2])end=Math.min(Number(match[2]),end);}
   if(start>end||start>=stat.size||!Number.isSafeInteger(start)||!Number.isSafeInteger(end)){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return;}
   status=206;headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`;
  }
  headers['Content-Length']=Math.max(0,end-start+1);res.writeHead(status,headers);
  if(req.method==='HEAD'||stat.size===0){res.end();return;}
  const stream=fs.createReadStream(file,{start,end});stream.on('error',()=>res.destroy());res.on('close',()=>stream.destroy());stream.pipe(res);
 });
}).listen(port,'127.0.0.1',()=>console.log(`Turix platformasi ishga tushdi: http://127.0.0.1:${port}`));
