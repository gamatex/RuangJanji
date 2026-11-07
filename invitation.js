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
 $('names').textContent=[e.bride,e.groom].filter(Boolean).join(' & ');
 $('title').textContent=e.title||'';
 $('date').textContent=[e.event_date,e.event_time].filter(Boolean).join(' · ');
 $('venue').textContent=e.venue||'';$('address').textContent=e.address||'';$('story').textContent=e.story||'';
 if(e.photo && /^https:\/\//.test(e.photo)){$('photo').src=e.photo;$('photo').classList.remove('hidden');}
 document.title=($('names').textContent||'Undangan')+' | RuangJanji';show('invitation');
} catch(e){show('missing');}
