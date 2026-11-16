// All learning narration uses pre-generated Turkish MP3s; with intelligent tr-TR Speech Synthesis fallback.
let turkishAudioRequest=0;
function stopTurkishSpeech(){turkishAudioRequest++;const player=document.getElementById('turkish-player');if(player){player.pause();player.currentTime=0;}const dock=document.getElementById('speech-dock');if(dock)dock.hidden=true;if(window.speechSynthesis)window.speechSynthesis.cancel();}
function speakWithSynthesis(text){
  if(!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  const utter=new SpeechSynthesisUtterance(text);
  utter.lang='tr-TR';
  utter.rate=0.9;
  const voices=window.speechSynthesis.getVoices();
  const trVoice=voices.find(v=>v.lang.startsWith('tr')||v.lang.toLowerCase().includes('turkish'));
  if(trVoice)utter.voice=trVoice;
  utter.onerror=()=>{toast('Talaffuzni ijro etib bo‘lmadi.');};
  window.speechSynthesis.speak(utter);
}
async function playTurkish(text){
  stopTurkishSpeech();const request=turkishAudioRequest;
  const files=typeof TURKISH_SPEECH==='undefined'?{}:TURKISH_SPEECH.files;
  const key=String(text).normalize('NFC').trim();
  const entry=files[key]||Object.entries(files).find(([t])=>t.normalize('NFC').trim()===key)?.[1];
  const libraryPlayer=document.getElementById('library-player');if(libraryPlayer)libraryPlayer.pause();
  const dock=document.getElementById('speech-dock');
  if(entry&&entry.locale==='tr-TR'&&entry.voice.startsWith('tr-TR-')){
    dock.innerHTML=`<div class="speech-title"><b>Turix · Turkcha talaffuz</b><span>${esc(key.length>85?key.slice(0,85)+'…':key)}</span><small>tr-TR · Emel · MP3</small></div><audio controlslist="nodownload noremoteplayback" disableremoteplayback oncontextmenu="return false" id="turkish-player" controls preload="auto" src="${entry.path}" aria-label="Turkcha talaffuz audiosi"></audio><label class="speech-speed">Tezlik <select aria-label="Talaffuz tezligi" onchange="document.getElementById('turkish-player').playbackRate=Number(this.value)"><option value="0.85">0.85×</option><option value="1" selected>1×</option><option value="1.15">1.15×</option></select></label><button class="secondary" onclick="stopTurkishSpeech()" aria-label="Talaffuz pleerini yopish">×</button>`;
    dock.hidden=false;const player=document.getElementById('turkish-player');
    player.onerror=()=>{if(request===turkishAudioRequest)toast('Turkcha audio faylini ochib bo‘lmadi. Sahifani yangilang.');};
    try{await player.play();}catch(error){if(error.name!=='AbortError'&&request===turkishAudioRequest)toast('Audioni boshlash uchun pleerdagi ijro tugmasini bosing.');}
    return;
  }
  if(window.speechSynthesis){
    dock.innerHTML=`<div class="speech-title"><b>Turix · Turkcha talaffuz</b><span>${esc(key.length>85?key.slice(0,85)+'…':key)}</span><small>tr-TR · Nutq sintezi</small></div><div style="display:flex;align-items:center;gap:12px"><button class="primary" style="padding:8px 14px;font-size:12px" onclick="speakWithSynthesis(${JSON.stringify(key).replace(/"/g,'&quot;')})">Qayta eshitish 🔊</button><button class="secondary" onclick="stopTurkishSpeech()" aria-label="Talaffuz pleerini yopish">×</button></div>`;
    dock.hidden=false;
    speakWithSynthesis(key);
    return;
  }
  toast('Ushbu matn uchun turkcha audio hali tayyor emas.');
}
