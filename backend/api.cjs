'use strict';
const {DatabaseSync}=require('node:sqlite');
const {randomBytes,scrypt:rawScrypt,timingSafeEqual,createHash}=require('node:crypto');
const {promisify}=require('node:util');
const fs=require('node:fs'),path=require('node:path');
const scrypt=promisify(rawScrypt),hash=t=>createHash('sha256').update(t).digest('hex');
const emptyState=()=>({level:'A1',completed:[],known:[],history:[],drafts:{},mockDrafts:{},mockResults:[]});
function createApi({dbPath=path.join(__dirname,'../data/turkce.sqlite'),secureCookies=false}={}){
 fs.mkdirSync(path.dirname(dbPath),{recursive:true});
 const db=new DatabaseSync(dbPath);db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;
 CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY,email TEXT NOT NULL UNIQUE,name TEXT NOT NULL,password_hash TEXT NOT NULL,role TEXT NOT NULL DEFAULT 'student' CHECK(role IN ('student','owner')),created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
 CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY,user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,csrf TEXT NOT NULL,expires_at INTEGER NOT NULL);
 CREATE INDEX IF NOT EXISTS sessions_user ON sessions(user_id);
 CREATE TABLE IF NOT EXISTS learning_state(user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,state_json TEXT NOT NULL,revision INTEGER NOT NULL DEFAULT 1,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
 CREATE TABLE IF NOT EXISTS custom_content(id INTEGER PRIMARY KEY,kind TEXT NOT NULL CHECK(kind IN ('lesson','word')),level TEXT NOT NULL CHECK(level IN ('A1','A2','B1','B2','C1')),title TEXT NOT NULL,payload_json TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);`);
 const limits=new Map();let requests=0;
 function limit(key,max,windowMs){const now=Date.now();if(++requests%100===0){for(const [k,v]of limits)if(v.until<now)limits.delete(k);db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(now)}let v=limits.get(key);if(!v||v.until<now){v={count:0,until:now+windowMs};limits.set(key,v)}return ++v.count<=max}
 function reply(res,status,data,extra={}){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...extra});res.end(JSON.stringify(data))}
 function cookie(token,expired=false){return `turkce_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${expired?0:604800}${secureCookies?'; Secure':''}`}
 function session(req){let token;try{token=(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('turkce_session='))?.slice(15)}catch{return null}if(!token||!/^[a-f0-9]{64}$/.test(token))return null;return db.prepare('SELECT u.id,u.name,u.email,u.role,s.csrf,s.token_hash FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?').get(hash(token),Date.now())}
 function publicUser(s){return {id:s.id,name:s.name,email:s.email,role:s.role}}
 function issue(res,user){const token=randomBytes(32).toString('hex'),csrf=randomBytes(24).toString('hex');db.prepare('INSERT INTO sessions(token_hash,user_id,csrf,expires_at) VALUES(?,?,?,?)').run(hash(token),user.id,csrf,Date.now()+604800000);reply(res,200,{user:publicUser(user),csrf},{'Set-Cookie':cookie(token)})}
 async function body(req){if(!String(req.headers['content-type']||'').startsWith('application/json'))throw Object.assign(Error('JSON formatida yuboring.'),{status:415});let size=0,chunks=[];for await(const chunk of req){size+=chunk.length;if(size>262144)throw Object.assign(Error('Ma’lumot hajmi katta.'),{status:413});chunks.push(chunk)}try{const data=JSON.parse(Buffer.concat(chunks).toString('utf8'));if(!data||typeof data!=='object'||Array.isArray(data))throw Error();return data}catch{throw Object.assign(Error('JSON formati noto‘g‘ri.'),{status:400})}}
 function validState(s){if(!s||typeof s!=='object'||Array.isArray(s))return false;const keys=['level','completed','known','history','drafts','mockDrafts','mockResults'];if(Object.keys(s).some(k=>!keys.includes(k)))return false;return ['A1','A2','B1','B2','C1'].includes(s.level)&&['completed','known','history','mockResults'].every(k=>Array.isArray(s[k])&&s[k].length<=5000)&&s.completed.every(x=>typeof x==='string'&&x.length<240)&&s.known.every(x=>typeof x==='string'&&x.length<120)&&s.history.every(x=>x&&typeof x.id==='string'&&typeof x.type==='string'&&typeof x.date==='string'&&Number.isFinite(Date.parse(x.date)))&&['drafts','mockDrafts'].every(k=>s[k]&&typeof s[k]==='object'&&!Array.isArray(s[k]));}
 async function handle(req,res,url){
  if(!url.pathname.startsWith('/api/'))return false;
  try{
   const route=url.pathname,method=req.method,ip=req.socket.remoteAddress||'local';
   if(!['GET','POST','PUT','DELETE'].includes(method)){reply(res,405,{error:'Bu usul qo‘llanmaydi.'});return true}
   if(method!=='GET'){
    let origin;try{origin=new URL(req.headers.origin).host}catch{}
    if(origin!==req.headers.host||req.headers['sec-fetch-site']==='cross-site'){reply(res,403,{error:'So‘rov manbasi tasdiqlanmadi.'});return true}
   }
   if(route==='/api/health'&&method==='GET'){reply(res,200,{status:'ok',storage:'sqlite',version:'2.0.0'});return true}
   if(['/api/auth/register','/api/auth/login'].includes(route)&&method==='POST'){
    if(!limit('auth:'+ip,12,60000)){reply(res,429,{error:'Ko‘p urinish bo‘ldi. Bir daqiqadan keyin qayta urinib ko‘ring.'},{'Retry-After':'60'});return true}
    const data=await body(req),email=typeof data.email==='string'?data.email.trim().toLowerCase():'';
    const password=data.password;
    if(email.length>254||!/^\S+@\S+\.\S+$/.test(email)||typeof password!=='string'||password.length<10||password.length>128){reply(res,400,{error:'To‘g‘ri email va 10–128 belgili parol kiriting.'});return true}
    if(route.endsWith('register')){
     const name=typeof data.name==='string'?data.name.trim():'';
     if(name.length<2||name.length>60){reply(res,400,{error:'Ism 2–60 belgidan iborat bo‘lsin.'});return true}
     const salt=randomBytes(16).toString('hex'),key=await scrypt(password,salt,64);
     try{const record=db.prepare('INSERT INTO users(email,name,password_hash) VALUES(?,?,?)').run(email,name,salt+':'+key.toString('hex'));issue(res,{id:Number(record.lastInsertRowid),email,name,role:'student'})}catch(err){if(err.code?.includes('SQLITE_CONSTRAINT')||[1555,2067].includes(err.errcode))reply(res,409,{error:'Bu email uchun hisob mavjud. Kirish bo‘limidan foydalaning.'});else throw err}
    }else{
     const user=db.prepare('SELECT * FROM users WHERE email=?').get(email);const [salt,stored]=user?user.password_hash.split(':'):['0'.repeat(32),'0'.repeat(128)];const key=await scrypt(password,salt,64);
     if(!user||!timingSafeEqual(Buffer.from(stored,'hex'),key)){reply(res,401,{error:'Email yoki parol noto‘g‘ri.'});return true}issue(res,user)
    }return true;
   }
   const current=session(req);
   if(route==='/api/auth/session'&&method==='GET'){reply(res,200,current?{user:publicUser(current),csrf:current.csrf}:{user:null});return true}
   if(route==='/api/content/custom'&&method==='GET'){
    const rows=db.prepare('SELECT id,kind,level,title,payload_json,created_at FROM custom_content ORDER BY id ASC').all();
    reply(res,200,{items:rows.map(r=>({id:r.id,kind:r.kind,level:r.level,title:r.title,payload:JSON.parse(r.payload_json),createdAt:r.created_at}))});return true;
   }
   if(!current){reply(res,401,{error:'Hisobingizga kiring.'});return true}
   if(method!=='GET'&&req.headers['x-csrf-token']!==current.csrf){reply(res,403,{error:'Sessiya tasdig‘i yaroqsiz. Sahifani yangilang.'});return true}
   if(route==='/api/auth/logout'&&method==='POST'){db.prepare('DELETE FROM sessions WHERE token_hash=?').run(current.token_hash);reply(res,200,{ok:true},{'Set-Cookie':cookie('',true)});return true}
   if(route==='/api/state'&&method==='GET'){const row=db.prepare('SELECT state_json,revision,updated_at FROM learning_state WHERE user_id=?').get(current.id);reply(res,200,{state:row?JSON.parse(row.state_json):null,revision:row?.revision||0,updatedAt:row?.updated_at||null});return true}
   if(route==='/api/state'&&method==='PUT'){
    if(!limit('state:'+current.id,120,60000)){reply(res,429,{error:'Saqlash tezligi cheklangan. Biroz kuting.'});return true}
    const data=await body(req);
    if(!Number.isSafeInteger(data.revision)||data.revision<0||!validState(data.state)){reply(res,400,{error:'O‘quv ma’lumotlari formati noto‘g‘ri.'});return true}
    const json=JSON.stringify(data.state);let revision;
    db.exec('BEGIN IMMEDIATE');try{const row=db.prepare('SELECT revision FROM learning_state WHERE user_id=?').get(current.id);if((row?.revision||0)!==data.revision){db.exec('ROLLBACK');reply(res,409,{error:'Boshqa seansdagi natijalar yangilangan. Sahifani yangilab qayta yuklang.'});return true}revision=data.revision+1;db.prepare('INSERT INTO learning_state(user_id,state_json,revision) VALUES(?,?,?) ON CONFLICT(user_id) DO UPDATE SET state_json=excluded.state_json,revision=excluded.revision,updated_at=CURRENT_TIMESTAMP').run(current.id,json,revision);db.exec('COMMIT')}catch(err){db.exec('ROLLBACK');throw err}reply(res,200,{ok:true,revision});return true;
   }
   if(route==='/api/content/custom'&&method==='POST'){
    if(!current||current.role!=='owner'){reply(res,403,{error:'Bu amal faqat loyiha egasi uchun ruxsat etilgan.'});return true}
    const data=await body(req);
    if(!['lesson','word'].includes(data.kind)||!['A1','A2','B1','B2','C1'].includes(data.level)||typeof data.title!=='string'||!data.title.trim()||!data.payload||typeof data.payload!=='object'){
     reply(res,400,{error:'Ma’lumotlar formati to‘liq emas yoki xato.'});return true;
    }
    const resRow=db.prepare('INSERT INTO custom_content(kind,level,title,payload_json) VALUES(?,?,?,?)').run(data.kind,data.level,data.title.trim(),JSON.stringify(data.payload));
    reply(res,201,{ok:true,id:Number(resRow.lastInsertRowid)});return true;
   }
   if(route.startsWith('/api/content/custom/')&&method==='DELETE'){
    if(!current||current.role!=='owner'){reply(res,403,{error:'Ruxsat berilmagan.'});return true}
    const id=Number(route.split('/').pop());
    if(!Number.isSafeInteger(id)||id<=0){reply(res,400,{error:'ID noto‘g‘ri.'});return true}
    db.prepare('DELETE FROM custom_content WHERE id=?').run(id);
    reply(res,200,{ok:true});return true;
   }
   if(route==='/api/auth/change-password'&&method==='POST'){
    const data=await body(req),oldPassword=data.oldPassword,newPassword=data.newPassword;
    if(typeof oldPassword!=='string'||typeof newPassword!=='string'||newPassword.length<10||newPassword.length>128){
     reply(res,400,{error:'Yangi parol kamida 10 ta belgidan iborat bo‘lishi lozim.'});return true;
    }
    const userRow=db.prepare('SELECT password_hash FROM users WHERE id=?').get(current.id);
    const [salt,stored]=userRow.password_hash.split(':');
    const oldKey=await scrypt(oldPassword,salt,64);
    if(!timingSafeEqual(Buffer.from(stored,'hex'),oldKey)){reply(res,401,{error:'Amaldagi eski parol noto‘g‘ri.'});return true}
    const newSalt=randomBytes(16).toString('hex'),newKey=await scrypt(newPassword,newSalt,64);
    db.prepare('UPDATE users SET password_hash=? WHERE id=?').run(newSalt+':'+newKey.toString('hex'),current.id);
    reply(res,200,{ok:true,message:'Parol muvaffaqiyatli o‘zgartirildi.'});return true;
   }
   if(route==='/api/admin/users'&&method==='GET'){
    if(current.role!=='owner'){reply(res,403,{error:'Ruxsat berilmagan.'});return true}
    const rows=db.prepare('SELECT u.id,u.name,u.email,u.role,u.created_at,ls.revision,ls.updated_at FROM users u LEFT JOIN learning_state ls ON u.id=ls.user_id ORDER BY u.id DESC').all();
    reply(res,200,{users:rows});return true;
   }
   if(route==='/api/admin/overview'&&method==='GET'){
    if(current.role!=='owner'){reply(res,403,{error:'Bu bo‘lim faqat loyiha egasi uchun.'});return true}
    const users=db.prepare('SELECT COUNT(*) n FROM users').get().n,states=db.prepare('SELECT state_json FROM learning_state').all();let activities=0,mocks=0;for(const s of states){const data=JSON.parse(s.state_json);activities+=data.history.length;mocks+=data.mockResults.length}reply(res,200,{users,activities,mocks,storage:'SQLite',role:'owner'});return true;
   }
   reply(res,404,{error:'API manzili topilmadi.'});return true;
  }catch(err){if(!res.headersSent)reply(res,err.status||500,{error:err.status?err.message:'Serverda xatolik yuz berdi.'});return true}
 }
 return {handle,close(){db.close()},db};
}
module.exports={createApi,emptyState};
