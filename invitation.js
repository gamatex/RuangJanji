import {createClient} from 'https://esm.sh/@supabase/supabase-js@2.57.0';
import {SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY} from './packages/shared/src/config.js';
const $=id=>document.getElementById(id);
const slug=decodeURIComponent(location.pathname.slice(1).replace(/\/$/,'')).toLowerCase();
const show=id=>{ $('loading').classList.add('hidden');$(id).classList.remove('hidden');};
try {
 if(!/^[a-z0-9-]{3,80}$/.test(slug))throw Error('invalid slug');
 const db=createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
 const {data,error}=await db.rpc('get_published_invitation',{p_slug:slug});
 if(error||!data?.length)throw Error('not found');
 const e=data[0];
 // Only load approved local template names. Never accept arbitrary URLs from database.
 if(/^(?:art-(?:0[1-4])|birthday-(?:0[1-2])|deluxe-(?:0[1-8])|minisite-(?:0[1-9]|10)|syari-(?:0[1-3]))$/.test(e.theme||'')){
  const frame=$('theme-frame');
  frame.src='/templates/'+e.theme+'.html?to='+encodeURIComponent(new URLSearchParams(location.search).get('to')||'Tamu Undangan');
  $('theme-container').classList.remove('hidden');
  frame.addEventListener('load',()=>{frame.contentWindow?.postMessage({type:'ruangjanji:published-invitation',payload:{groom:e.groom,bride:e.bride,title:e.title,date:e.event_date,time:e.event_time,venue:e.venue,address:e.address,story:e.story,photo:e.photo}},location.origin);});
 }

 $('names').textContent=[e.bride,e.groom].filter(Boolean).join(' & ');
 $('title').textContent=e.title||'';
 $('date').textContent=[e.event_date,e.event_time].filter(Boolean).join(' · ');
 $('venue').textContent=e.venue||'';$('address').textContent=e.address||'';$('story').textContent=e.story||''; $('story-section').classList.toggle('hidden',!e.story);
 if(e.address){$('map-link').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(e.address);$('map-link').classList.remove('hidden');}
 if(e.event_date){const target=new Date(e.event_date+'T'+(e.event_time||'00:00')+':00');if(Number.isFinite(target.getTime())){ $('countdown-section').classList.remove('hidden');const updateCountdown=()=>{const ms=Math.max(0,target.getTime()-Date.now());const d=Math.floor(ms/86400000),h=Math.floor(ms%86400000/3600000),m=Math.floor(ms%3600000/60000),sec=Math.floor(ms%60000/1000);$('countdown').textContent=ms?d+' hari · '+h+' jam · '+m+' menit · '+sec+' detik':'Hari bahagia telah tiba';};updateCountdown();setInterval(updateCountdown,1000);}}
 if(e.photo && /^https:\/\//.test(e.photo)){$('photo').src=e.photo;$('photo').classList.remove('hidden');}
 document.title=($('names').textContent||'Undangan')+' | RuangJanji';
 const token=new URLSearchParams(location.search).get('t');
 if(token&&/^[0-9a-f-]{36}$/i.test(token)){
 $('rsvp-section').classList.remove('hidden');
 $('rsvp-status').onchange=()=>{const attending=$('rsvp-status').value==='hadir';$('rsvp-attendees').disabled=!attending;$('rsvp-attendees').value=attending?'1':'0';};
 $('rsvp-form').onsubmit=async ev=>{
 ev.preventDefault();const button=ev.currentTarget.querySelector('button');button.disabled=true;$('rsvp-message').textContent='Mengirim konfirmasi...';
 const {error}=await db.rpc('submit_guest_rsvp',{p_slug:slug,p_token:token,p_rsvp:$('rsvp-status').value,p_attendees:Number($('rsvp-attendees').value),p_wishes:$('rsvp-wishes').value.trim()});
 $('rsvp-message').textContent=error?'Gagal mengirim: '+error.message:'Terima kasih, konfirmasi berhasil tersimpan.';
 button.disabled=false;
 };
 }
 show('invitation');
} catch(e){show('missing');}
navigator.clipboard.writeText(accountNumber);
