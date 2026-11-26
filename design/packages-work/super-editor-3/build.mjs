import fs from 'fs';import * as u from './ui.mjs';import {page} from './proof.mjs';const F=u.frag;
const at=(x,y,h,z=1,s='')=>`<div style="position:absolute;left:${x/z}px;top:${y/z}px;zoom:${z};${s}">${h}</div>`;
const card=(t,h,w,s='')=>`<div class="win"><div class="edge"><div class="ui ${t}" style="width:${w}px;padding:22px 26px;${s}">${h}</div></div></div>`;
const T={doc:['Documents','Build a full document editor for desktop and web. Include headings, images, tasks and tables, and style all of it to match your app.'],chat:['Team chat','Let people mention, format and quote in the composer, then show the same rich text in every message. It works on desktop and phones.'],ai:['AI chat','Give people room to write a real prompt. Stream the answer back as rich text, with lists, tables and inline code.']};
const lead='Add rich text editing to your Flutter app, from a single chat box to a full document.';
const P=[['attributed_text','Text that carries its own styles and data'],['super_text_layout','Selections, carets and highlights'],['super_keyboard','Keyboard visibility and size on phones'],['super_editor_clipboard','Copy and paste with formatting']];
const pk=(x,y,i,w=360,s='')=>`<div class="pk" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;${s}">${i.map(k=>`<div><b>${P[k][0]}</b><span>${P[k][1]}</span></div>`).join('')}</div>`;
const css=`.s{position:relative;width:1920px;overflow:hidden}.H{font-size:132px;line-height:.95;display:block}.C{font-size:76px;line-height:1}.tx{position:absolute}.tx p{margin-top:20px;font-size:23px;font-weight:600;line-height:1.5}.pk b{display:block;color:#ddcdbd;font:700 22px Oxanium}.pk span{font:500 18.5px/1.4 Geist;color:#a9b8c6}.pk div{padding:12px 0}.G{position:absolute;left:0;width:1920px;text-align:center;line-height:.8;white-space:nowrap}.bare .ms>*{margin:0}`;
const tx=(x,y,w,k,s='')=>`<div class="tx" style="left:${x}px;top:${y}px;width:${w}px;${s}"><span class="metal C">${T[k][0]}</span><p>${T[k][1]}</p></div>`;
const p=(k)=>`<p style="font-size:23px;font-weight:600;line-height:1.5">${T[k][1]}</p>`;
const title=(x,y)=>`<div class="tx" style="left:${x}px;top:${y}px;width:1100px"><span class="metal H">Super Editor</span></div><div class="tx" style="left:${x+1080}px;top:${y+12}px;width:560px"><p style="font-size:29px;margin:0;line-height:1.4">${lead}</p></div>`;
const sheetless=(t,o)=>u.doc(t,{bare:1,...o});
const H={};
const row=(y,k,i)=>`<div class="tx" style="left:110px;top:${y}px;width:700px"><span class="metal C">${T[k][0]}</span></div><div class="tx" style="left:760px;top:${y+2}px;width:560px"><p style="margin:0">${T[k][1]}</p></div>${pk(1440,y-10,i,380)}`;
// A wings
H.A=[4330,`${title(110,110)}
${at(-150,390,u.win(u.doc('light',{noside:1,w:1010,h:820})),1.2)}
${tx(1150,400,640,'doc')}${pk(1150,660,[0,1],640,'display:flex;gap:40px')}
${at(1000,850,u.win(u.doc('dark',{bare:1,mode:'slash',nophoto:1,w:860,h:690})),1.15)}
${tx(110,1600,540,'chat')}${pk(110,1870,[2],500)}
${at(700,1780,u.win(u.chat('dark','','padr')),1.3)}
${at(330,2030,u.chatPhone('light'),1.14)}
${at(-210,3120,u.win(u.ai('light','')),1.25)}
${tx(1250,2890,580,'ai')}${pk(1250,3150,[3],420)}${at(1080,3320,u.aiPhone('dark'),1.12)}`];
// B exploded
const half=(t,mode,x)=>`<div class="ui ${t}" style="position:absolute;inset:0"><div style="position:absolute;left:${x}px;top:110px;zoom:1.2"><div class="col">${u.docBody(mode!=='slash',{nophoto:mode==='slash'})}</div></div></div>`;
H.B=[4640,`${title(110,110)}
${tx(110,360,640,'doc')}${pk(1190,400,[0,1],640,'display:flex;gap:40px')}
<div style="position:absolute;left:0;top:640px;width:1920px;height:960px;clip-path:polygon(0 0,100% 70px,100% 100%,0 calc(100% - 70px))">${half('light','sel',110)}<div style="position:absolute;inset:0;clip-path:polygon(57% 0,100% 0,100% 100%,44% 100%)">${half('dark','slash',890)}</div></div>
${tx(110,1790,560,'chat')}${pk(110,2080,[2],500)}
${at(770,1730,card('dark',F.m1.replace('412 edits, no conflicts.','412 edits, no conflicts.'),560),1.35)}${at(1180,1960,card('light',F.m2,430),1.4)}${at(700,2190,card('dark',F.m3,440),1.35)}
${at(-60,2490,`<div class="ui dark" style="background:none;width:730px">${u.composer.replace('class="co"','class="co" style="margin:0;padding-left:64px"')}</div>`,1.75)}${at(1370,2290,u.chatPhone('light'),1.2)}
${tx(110,3300,560,'ai')}${pk(110,3570,[3],500)}
${at(800,3400,`<div class="ui dark" style="background:none"><div class="me" style="max-width:none;width:540px"><div class="at2">${F.ic.doc}Offline sync</div>Compare <b>last write wins</b> with an <b>edit queue</b> for this app.</div></div>`,1.4)}
${at(690,3640,card('light',`<div class="an">${F.ans}</div>`,980,'padding:34px 250px 40px 44px'),1.35)}
${at(-60,4130,`<div class="ui dark" style="background:none">${u.prompt.replace('class="cx"','class="cx" style="margin:0;width:800px;padding-left:80px"')}</div>`,1.75)}`];
// C giant type
const G=(y,t,s)=>`<div class="G" style="top:${y}px;font-size:${s}px;left:60px;width:auto;text-align:left;font-weight:800;text-transform:uppercase;letter-spacing:-.01em;color:transparent;background:linear-gradient(#5b5f62,#26292b 85%);-webkit-background-clip:text;background-clip:text;padding:.1em 0">${t}</div>`;
H.C=[4760,`${title(110,110)}
${G(410,'Documents',304)}
${at(60,650,u.win(u.doc('light',{noside:1,w:960,h:760})),1.15)}${at(1060,810,u.win(u.doc('dark',{bare:1,mode:'slash',nophoto:1,w:760,h:690})),1.2)}
<div class="tx" style="left:110px;top:1600px;width:600px"><p style="margin:0">${T.doc[1]}</p></div>
<div style="position:absolute;left:0;top:0;width:1920px">${G(1850,'Team chat',304).replace('left:60px','left:200px')}</div>
${at(540,2090,u.win(u.chat('dark','')),1.24)}${at(110,2220,u.chatPhone('light'),1.14)}
<div class="tx" style="left:1060px;top:3110px;width:760px"><p style="margin:0">${T.chat[1]}</p></div>
${G(3300,'AI chat',380)}
${at(90,3610,u.win(u.ai('light','')),1.25)}${at(1410,3440,u.aiPhone('dark'),1.18)}
<div class="tx" style="left:1490px;top:4430px;width:370px"><p style="margin:0">${T.ai[1]}</p></div>`];
// D wraparound
const tilt=(x,y,h,z,d,o)=>at(x,y,`<div style="perspective:1500px"><div style="transform:rotateY(${d}deg);transform-origin:${o}">${h}</div></div>`,z);
H.D=[4600,`${title(110,110)}
${tilt(-330,520,u.win(u.doc('dark',{noside:1,nophoto:1,mode:'x',w:800,h:690})),1.04,28,'right center')}
${tilt(1452,520,u.win(u.doc('dark',{bare:1,mode:'slash',nophoto:1,w:740,h:690,cw:520})),1.04,-28,'left center')}
${at(485,460,u.win(u.doc('light',{bare:1,w:860,h:800,cw:660})),1.1)}
${row(1440,'doc',[0,1])}
${tilt(-470,1900,u.win(u.chat('dark','')),1.08,24,'right center')}
${tilt(1220,1900,u.win(u.chat('light','')),1.08,-24,'left center')}
${at(725,1790,u.chatPhone('dark'),1.26)}
${row(2890,'chat',[2])}
${tilt(-30,3330,u.aiPhone('dark'),1.1,24,'right center')}${tilt(1540,3330,u.aiPhone('dark').replace('ui dark','ui light'),1.1,-24,'left center')}
${at(398,3210,u.win(u.ai('dark','')),1.04)}
${row(4310,'ai',[3])}`];
for(const k in H)fs.writeFileSync(k+'.html',page(`<div class=s style="height:${H[k][0]}px">${H[k][1]}</div>`,css));
fs.writeFileSync('h.txt',Object.entries(H).map(([k,v])=>k+' '+v[0]).join('\n')+'\n');
