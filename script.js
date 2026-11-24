const $=s=>document.querySelector(s);
let total=0, selectedColor='#b77b35';
$('#colors').addEventListener('click',e=>{
 const b=e.target.closest('.swatch');if(!b)return;
 selectedColor=b.dataset.color;document.querySelectorAll('.swatch').forEach(x=>x.classList.toggle('active',x===b));
 $('#base').style.background=`linear-gradient(180deg,${selectedColor},#70451f)`;
});
$('#flowerSelect').addEventListener('change',e=>$('#flower').textContent=e.target.value);
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('show'),2400)}
function makeKrathong(){
 const wrap=document.createElement('div');wrap.className='floating';
 const k=document.createElement('div');k.className='krathong';
 k.innerHTML='<div class="leaf"></div><div class="leaf"></div><div class="leaf"></div><div class="leaf"></div><div class="leaf"></div><div class="k-base"></div><div class="flower"></div><div class="candle"></div><div class="flame"></div>';
 k.querySelector('.k-base').style.background=`linear-gradient(180deg,${selectedColor},#70451f)`;
 k.querySelector('.flower').textContent=$('#flowerSelect').value;
 wrap.appendChild(k);return wrap;
}
$('#floatBtn').addEventListener('click',()=>{
 const wish=$('#wish').value.trim(),name=$('#nickname').value.trim();
 if(!wish){toast('เขียนคำอธิษฐานก่อนลอยกระทงนะ 🪷');$('#wish').focus();return}
 const stage=$('#riverStage'),boat=makeKrathong();
 boat.style.left=(18+Math.random()*64)+'%';boat.style.bottom=(15+Math.random()*22)+'%';
 stage.appendChild(boat);
 requestAnimationFrame(()=>requestAnimationFrame(()=>{boat.style.bottom='-25%';boat.style.left=Math.random()<.5?'105%':'-15%';boat.style.opacity='0'}));
 setTimeout(()=>boat.remove(),7500);
 total++;$('#count').textContent=total.toLocaleString('th-TH');
 const card=document.createElement('div');card.className='wish-card';
 const message=document.createElement('div');message.textContent='“'+wish+'”';
 const by=document.createElement('small');by.textContent=name?'— '+name:'— คำอธิษฐานจากผู้ร่วมลอยกระทง';
 card.append(message,by);$('#wishes').prepend(card);
 $('#wish').value='';toast('ลอยกระทงเรียบร้อยแล้ว ขอให้สมหวังนะ ✨');
});
$('#resetBtn').addEventListener('click',()=>{
 $('#wish').value='';$('#nickname').value='';$('#flowerSelect').value='🌼';$('#flower').textContent='🌼';
 selectedColor='#b77b35';$('#base').style.background='linear-gradient(180deg,#b77b35,#70451f)';
 document.querySelectorAll('.swatch').forEach((x,i)=>x.classList.toggle('active',i===0));
 toast('เริ่มตกแต่งกระทงใหม่ได้เลย');
});
