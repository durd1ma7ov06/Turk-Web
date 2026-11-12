let librarySelected={},libraryQuery='',libraryBookOpen={},libraryAutoNext=true;
function localFiles(kind,l=level){return (typeof LOCAL_LIBRARY==='undefined'?[]:LOCAL_LIBRARY.files).filter(x=>x.level===l&&x.kind===kind)}
function audioNumber(file){return Number((file.title.match(/^\d+/)||['999'])[0])}
function tracks(){return localFiles('audio').sort((a,b)=>audioNumber(a)-audioNumber(b)||a.title.localeCompare(b.title))}
function prettyTitle(title){return title.replace(/_/g,' ').replace(/\bsayfa\s+(\d+)/i,'· $1-bet ·')}
function audioPageNum(title){const m=title.match(/sayfa[_ ]+(\d+)/i);return m?Number(m[1]):null;}

function libraryPage(){
  const all=tracks(),selected=all.find(x=>x.path===librarySelected[level])||all[0],doc=localFiles('pdf')[0];
  const pageNum=selected?audioPageNum(selected.title):null;
  const isBookOpen=Boolean(libraryBookOpen[level]);
  const bookSrc=doc?(doc.path+'#page='+(pageNum||1)+'&toolbar=1&navpanes=0'):'';

  return `${levels()}<div class="section-head" style="align-items:flex-start"><div><span class="eyebrow" style="color:var(--green)">AUDIO VA DARSLIKLAR</span><h2>Audio va kitoblar — sinxron o‘quv markazi</h2><p class="sub">Yedi İklim Türkçe · ${level} · ${all.length} ta asl MP3 audio · ${doc?'1 ta to‘liq PDF kitob':'Kitob mavjud emas'}</p></div><div class="actions" style="margin:0">${doc?`<button class="${isBookOpen?'secondary':'primary'}" onclick="${isBookOpen?'closeBook()':'openBook()'}">${ico('book')} ${isBookOpen?'Kitobni yashirish':'Kitobni ochish'}</button>`:''}<span class="tag">ICHO‘QUV REJIMI</span></div></div>${page==='listening'?`<button class="secondary" style="margin-bottom:20px" onclick="listeningMode='practice';render()">← Mashqlarga o‘tish</button>`:''}${all.length?`<div class="library-grid"><section><div class="card audio-player"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"><span class="eyebrow">HOZIR TINGLAYAPSIZ</span><div id="library-current-badges" style="display:flex;gap:6px"><span class="tag" style="background:#eef4ea;color:var(--green)">${level} DARAJASI</span><span class="tag" id="library-current-page-tag" style="background:#fef3e2;color:#b46816;${pageNum?'':'display:none'}">📖 ${pageNum||''}-bet</span></div></div><h2 id="library-current-title" style="font-size:23px;line-height:1.5;margin:14px 0 6px">${esc(prettyTitle(selected.title))}</h2><p class="sub" style="margin-bottom:18px">Yunus Emre Enstitüsü asl dars audiosi. Audio va kitob betlari o‘zaro bog‘langan.</p><audio controlslist="nodownload noremoteplayback" disableremoteplayback oncontextmenu="return false" id="library-player" controls preload="metadata" src="${selected.path}" style="width:100%;margin:0 0 16px" onended="audioEnded()">Brauzeringiz audio pleerni qo‘llamaydi.</audio><div class="actions" style="align-items:center;flex-wrap:wrap;gap:8px;margin:0 0 16px"><button id="btn-prev-track" class="secondary" onclick="previousTrack()" ${all.indexOf(selected)===0?'disabled':''}>← Oldingi</button><button class="secondary" onclick="seekAudio(-5)" title="5 soniya orqaga qaytarish">↺ 5s</button><button class="secondary" onclick="seekAudio(5)" title="5 soniya oldinga o‘tkazish">5s ↻</button><button id="btn-next-track" class="secondary" onclick="nextTrack(true)" ${all.indexOf(selected)===all.length-1?'disabled':''}>Keyingi →</button><label style="font-size:11px;display:inline-flex;align-items:center;gap:4px">Tezlik <select id="audio-speed" aria-label="Audio tezligi" onchange="document.getElementById('library-player').playbackRate=Number(this.value)" style="border:1px solid var(--line);border-radius:7px;padding:6px 8px;background:white"><option value="0.75">0.75×</option><option value="0.85">0.85×</option><option selected value="1">1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option></select></label><label style="font-size:11px;display:inline-flex;align-items:center;gap:4px;cursor:pointer"><input type="checkbox" id="audio-loop" onchange="document.getElementById('library-player').loop=this.checked"> Takrorlash</label><label style="font-size:11px;display:inline-flex;align-items:center;gap:4px;cursor:pointer"><input type="checkbox" id="audio-auto" ${libraryAutoNext?'checked':''} onchange="libraryAutoNext=this.checked"> Avto-keyingi</label></div><div class="actions" style="align-items:center;justify-content:space-between;margin:0"><button id="btn-mark-audio" class="text-link" onclick="markAudio('${selected.path}')">${state.completed.includes('audio-'+selected.path)?'✓ Tinglangan':'Tinglab bo‘ldim ✓'}</button>${doc?`<button id="btn-open-book-track" class="primary" onclick="openBook(${pageNum||''})">${ico('book')} Kitobda ochish (${pageNum?pageNum+'-bet':'Kitob'})</button>`:''}</div></div><div class="panel" style="margin-top:16px"><div class="section-head" style="margin:0 0 10px"><h3>Kitob bilan ishlash usuli</h3>${doc?`<a href="${doc.path}" target="_blank" class="text-link" style="font-size:11px">PDF alohida oynada ↗</a>`:''}</div><p style="font-size:12px;color:var(--muted)">Har bir audiodagi <b>sayfa</b> ko‘rsatkichi kitobning tegishli betiga to‘g‘ri keladi. Avval topshiriqni o‘qing, keyin audioni eshitib mashqni bajaring.</p></div></section><section class="panel"><div class="section-head"><h3>${level} audiolari</h3><span class="sub">${all.length} ta dars</span></div><input id="library-search" type="search" placeholder="Mavzu yoki bet raqami (masalan, 10)…" aria-label="Audioni qidirish" value="${esc(libraryQuery)}" oninput="filterLibrary(this.value)"><div id="track-list" class="track-list">${trackList(selected.path)}</div></section></div>${doc?`<section id="book-panel" class="card section-space" ${isBookOpen?'':'hidden'}><div class="section-head" style="margin-bottom:14px;flex-wrap:wrap;gap:12px"><div><span class="eyebrow" style="color:#b46816">RASMIY DARSLIK · YUNUS EMRE ENSTİTÜSÜ</span><h2 style="font-size:22px;margin:4px 0">${esc(doc.title)}</h2><p class="sub">Audiodagi dars beti: <strong id="book-current-page" style="color:var(--green)">${pageNum?pageNum+'-bet':'1-bet'}</strong> · Brauzerda bevosita o‘qing yoki yangi oynada to‘liq ekranda oching.</p></div><div class="actions" style="margin:0;gap:8px">${pageNum?`<button class="secondary" onclick="openBook(${pageNum})">Audiodagi betga sakrash (${pageNum})</button>`:''}<a href="${doc.path}" target="_blank" class="primary" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px">Yangi oynada to‘liq ochish ↗</a><button class="secondary" onclick="closeBook()" aria-label="Kitobni yashirish">Yashirish ×</button></div></div><div style="background:#f4f6f0;border-radius:12px;padding:6px;border:1px solid var(--line)"><iframe id="book-frame" title="${esc(doc.title)}" src="${isBookOpen?bookSrc:''}" data-src="${doc.path}" style="width:100%;height:80vh;min-height:580px;border:0;border-radius:8px;background:white" allow="fullscreen">Kitobni ochish uchun: <a href="${doc.path}" target="_blank">PDF kitobni yuklash/ochish</a></iframe></div></section>`:''}`:'<div class="empty">Materiallar yuklanmoqda. Sahifani yangilang.</div>'}<div class="panel section-space"><h3>Materiallar haqida</h3><p style="font-size:11px;color:var(--muted)">Muallif va nashriyot: Yunus Emre Enstitüsü. Asl audio va kitoblar rasmiy ochiq nashr sahifalaridan olingan. Mahalliy ta’lim nusxasi.</p></div>`
}

function searchKey(t){return t.toLocaleLowerCase('tr').replace(/ı/g,'i').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/_/g,' ')}

function trackList(selected){
  const q=searchKey(libraryQuery);
  const rows=tracks().filter(x=>!q||searchKey(x.title).includes(q));
  if(!rows.length) return '<p class="empty">Audio topilmadi. Boshqa so‘z yoki bet raqami bilan qidiring.</p>';
  return rows.map((x,i)=>{
    const isCur=x.path===selected;
    const pageNum=audioPageNum(x.title);
    return `<button class="track-row ${isCur?'selected':''}" data-path="${x.path}" onclick="toggleTrackClick('${x.path}')"><span class="track-num">${state.completed.includes('audio-'+x.path)?'✓':ico('volume')}</span><span style="min-width:0;flex:1"><b>${esc(prettyTitle(x.title))}</b><small>${(x.bytes/1024/1024).toFixed(1)} MB · MP3 ${pageNum?'· '+pageNum+'-bet':''}</small></span><span class="track-status" style="margin-left:auto;color:#7c9568;font-size:13px">${isCur?'●':'▷'}</span></button>`
  }).join('');
}

function filterLibrary(query){
  libraryQuery=query;
  const list=document.getElementById('track-list');
  if(list) list.innerHTML=trackList(librarySelected[level]||tracks()[0]?.path);
}

function toggleTrackClick(path){
  const player=document.getElementById('library-player');
  const isCurrentlySelected=(librarySelected[level]===path)||(tracks()[0]?.path===path&&!librarySelected[level]);
  if(isCurrentlySelected&&player){
    if(player.paused) player.play().catch(()=>{});
    else player.pause();
  } else {
    selectTrack(path,true);
  }
}

function selectTrack(path,autoPlay=false){
  const track=tracks().find(x=>x.path===path);
  if(!track)return;
  librarySelected[level]=path;
  const player=document.getElementById('library-player');
  const titleEl=document.getElementById('library-current-title');
  const pageTag=document.getElementById('library-current-page-tag');
  const openBookBtn=document.getElementById('btn-open-book-track');
  const prevBtn=document.getElementById('btn-prev-track');
  const nextBtn=document.getElementById('btn-next-track');
  const markBtn=document.getElementById('btn-mark-audio');
  const all=tracks();
  const index=all.indexOf(track);
  const pageNum=audioPageNum(track.title);

  if(player&&titleEl){
    titleEl.textContent=prettyTitle(track.title);
    if(pageTag){
      pageTag.style.display=pageNum?'inline-block':'none';
      pageTag.textContent=pageNum?`📖 ${pageNum}-bet`:'';
    }
    if(openBookBtn){
      openBookBtn.innerHTML=`${ico('book')} Kitobda ochish (${pageNum?pageNum+'-bet':'Kitob'})`;
      openBookBtn.onclick=()=>openBook(pageNum);
    }
    if(prevBtn) prevBtn.disabled=index===0;
    if(nextBtn) nextBtn.disabled=index===all.length-1;
    if(markBtn){
      markBtn.textContent=state.completed.includes('audio-'+track.path)?'✓ Tinglangan':'Tinglab bo‘ldim ✓';
      markBtn.onclick=()=>markAudio(track.path);
    }
    document.querySelectorAll('.track-row').forEach(row=>{
      const isCur=row.getAttribute('data-path')===path;
      row.classList.toggle('selected',isCur);
      const iconSpan=row.querySelector('.track-status');
      if(iconSpan) iconSpan.textContent=isCur?'●':'▷';
    });
    if(!player.src.endsWith(encodeURI(track.path))&&!player.src.endsWith(track.path)){
      const speed=Number(document.getElementById('audio-speed')?.value||1);
      player.src=track.path;
      player.playbackRate=speed;
      if(autoPlay) player.play().catch(()=>{});
    } else if(autoPlay&&player.paused){
      player.play().catch(()=>{});
    }
    if(libraryBookOpen[level]){
      const f=document.getElementById('book-frame');
      const doc=localFiles('pdf')[0];
      if(f&&doc&&pageNum){
        f.src=doc.path+'#page='+pageNum+'&toolbar=1&navpanes=0';
        const pageLabel=document.getElementById('book-current-page');
        if(pageLabel) pageLabel.textContent=pageNum+'-bet';
      }
    }
  } else {
    const scroll=window.scrollY;
    render();
    window.scrollTo(0,scroll);
  }
}

function previousTrack(){
  const all=tracks(),i=all.findIndex(x=>x.path===librarySelected[level]);
  const prev=all[Math.max(0,(i<0?0:i)-1)];
  if(prev) selectTrack(prev.path,true);
}

function nextTrack(autoPlay=true){
  const all=tracks(),i=all.findIndex(x=>x.path===librarySelected[level]);
  const next=all[Math.min(all.length-1,(i<0?0:i)+1)];
  if(next) selectTrack(next.path,autoPlay);
}

function seekAudio(delta){
  const player=document.getElementById('library-player');
  if(!player) return;
  player.currentTime=Math.max(0,Math.min(player.duration||Infinity,player.currentTime+delta));
}

function audioEnded(){
  const path=librarySelected[level]||tracks()[0]?.path;
  if(path&&!state.completed.includes('audio-'+path)){
    complete('audio-'+path,'audio');
    const markBtn=document.getElementById('btn-mark-audio');
    if(markBtn) markBtn.textContent='✓ Tinglangan';
  }
  const all=tracks();
  const currentIndex=all.findIndex(x=>x.path===path);
  const nextTrackItem=all[currentIndex+1];
  if(libraryAutoNext&&nextTrackItem){
    toast('Keyingi audio boshlanmoqda…');
    selectTrack(nextTrackItem.path,true);
  } else {
    const list=document.getElementById('track-list');
    if(list) list.innerHTML=trackList(path);
  }
}

function markAudio(path){
  if(!state.completed.includes('audio-'+path)) complete('audio-'+path,'audio');
  toast('Tinglash qayd etildi ✓');
  const markBtn=document.getElementById('btn-mark-audio');
  if(markBtn) markBtn.textContent='✓ Tinglangan';
  const list=document.getElementById('track-list');
  if(list) list.innerHTML=trackList(path);
}

function openBook(targetPage){
  libraryBookOpen[level]=true;
  const p=document.getElementById('book-panel');
  if(!p){
    const scroll=window.scrollY;
    render();
    window.scrollTo(0,scroll);
    setTimeout(()=>openBook(targetPage),50);
    return;
  }
  p.hidden=false;
  const f=document.getElementById('book-frame');
  const doc=localFiles('pdf')[0];
  if(!f||!doc) return;
  const selected=tracks().find(x=>x.path===librarySelected[level])||tracks()[0];
  const pageNum=targetPage||audioPageNum(selected?.title||'')||1;
  const targetSrc=doc.path+'#page='+pageNum+'&toolbar=1&navpanes=0';
  if(!f.src||!f.src.includes(doc.path)||f.src!==targetSrc){
    f.src=targetSrc;
  }
  const pageLabel=document.getElementById('book-current-page');
  if(pageLabel) pageLabel.textContent=pageNum?pageNum+'-bet':'1-bet';
  p.scrollIntoView({behavior:'smooth',block:'start'});
}

function closeBook(){
  libraryBookOpen[level]=false;
  const p=document.getElementById('book-panel');
  if(p) p.hidden=true;
}

function localLibraryBanner(){
  const count=localFiles('audio').length,doc=localFiles('pdf')[0];
  return `<div class="panel" style="margin:0 0 24px;background:#edf2e7"><div class="section-head" style="margin:0"><div><h3>${level}: ${count} ta asl audio + rasmiy kitob</h3><p class="sub">Haqiqiy MP3 fayllar, ichki pleer va PDF kitob. Hammasi Turix ichida.</p></div><div class="actions" style="margin:0"><button class="primary" onclick="navigate('library')">Audiolarni ochish →</button>${doc?`<button class="secondary" onclick="navigate('library');setTimeout(()=>openBook(),100)">Kitobni ochish ${ico('book')}</button>`:''}</div></div></div>`
}
