import fs from 'fs';import * as u from './ui.mjs';import {page} from './proof.mjs';
const at=(x,y,h,z='',s='')=>`<div style="position:absolute;left:${x}px;top:${y}px;${z?`zoom:${z};left:${x/z}px;top:${y/z}px;`:''}${s}">${h}</div>`;
const T={doc:['Documents','Build a full document editor for desktop and web. Include headings, images, tasks and tables, and style all of it to match your app.'],chat:['Team chat','Let people mention, format and quote in the composer, then show the same rich text in every message. It works on desktop and phones.'],ai:['AI chat','Give people room to write a real prompt. Stream the answer back as rich text, with lists, tables and inline code.']};
const lead='Add rich text editing to your Flutter app, from a single chat box to a full document.';
const P=[['attributed_text','Text that carries its own styles and data'],['super_text_layout','Selections, carets and highlights'],['super_keyboard','Keyboard visibility and size on phones'],['super_editor_clipboard','Copy and paste with formatting']];
const pk=(i,w)=>`<div class="pk" style="width:${w}px">${i.map(k=>`<div><b>${P[k][0]}</b><span>${P[k][1]}</span></div>`).join('')}</div>`;
const base=`.s{position:relative;width:1440px;overflow:hidden}.H{font-size:92px;line-height:1}.C{font-size:50px;line-height:1.05}.tx{position:absolute}.tx p{margin-top:16px;font-size:19px;font-weight:600;line-height:1.5}.pk b{display:block;color:#ddcdbd;font:700 19px Oxanium}.pk span{font:500 16.5px/1.4 Geist;color:#a9b8c6}.pk div{padding:14px 0}`;
const tx=(x,y,w,k,s='')=>`<div class="tx" style="left:${x}px;top:${y}px;width:${w}px;${s}"><span class="metal C">${T[k][0]}</span><p>${T[k][1]}</p></div>`;
const title=(x,y,w,s='')=>`<div class="tx" style="left:${x}px;top:${y}px;width:${w}px;${s}"><span class="metal H">Super Editor</span><p style="font-size:24px">${lead}</p></div>`;
const foot=(x,y)=>`<div style="position:absolute;left:${x}px;top:${y}px"><div style="font:700 24px Oxanium;color:#c3d6e8;margin-bottom:10px">The packages behind it</div><div style="display:flex;gap:40px">${P.map(p=>`<div class=pk style="width:285px"><div><b>${p[0]}</b><span>${p[1]}</span></div></div>`).join('')}</div></div>`;
// A: stages
fs.writeFileSync('A.html',page(`<div class=s style="height:3860px">${title(98,90,700)}
${tx(98,350,620,'doc')}${at(98,540,u.win(u.split(1240,760)))}
${tx(98,1430,620,'chat')}${at(98,1620,u.win(u.chat('dark','','padr')))}${at(968,1690,u.chatPhone('light'))}
${tx(640,2570,700,'ai')}${at(258,2750,u.win(u.ai('dark')))}${at(98,2840,u.aiPhone('light'))}
${foot(98,3690)}</div>`,base));
// B: rail
const rail=(y,k,pks)=>tx(80,y,350,k)+`<div style="position:absolute;left:80px;top:${y+270}px">${pk(pks,330)}</div>`;
fs.writeFileSync('B.html',page(`<div class=s style="height:3560px">${title(80,90,1000)}
${rail(430,'doc',[0,1])}${at(490,400,u.win(u.doc('light',{w:1120,h:700,noside:1})))}${at(610,890,u.win(u.doc('dark',{mode:'slash',nophoto:1,w:1120,h:690,noside:1})))}
${rail(1700,'chat',[1,2])}${at(700,1670,u.win(u.chat('light','grid-template-columns:1fr;width:742px;height:760px','padl').replace('<aside class="side">','<aside class="side" style="display:none">')))}${at(480,1750,u.chatPhone('dark'))}
${rail(2720,'ai',[0,3])}${at(490,2660,u.win(u.ai('dark','height:800px')),.87)}
</div>`,base));
// C: cascade
fs.writeFileSync('C.html',page(`<div class=s style="height:3520px">${title(80,90,760)}
${at(500,330,u.win(u.doc('dark',{mode:'slash',w:1000,h:500,noside:1})),.9)}${at(60,690,u.win(u.doc('light',{w:960,h:730,noside:1,cw:600})),.95)}
${tx(1020,900,360,'doc')}
${at(480,1430,u.win(u.chat('dark','height:700px')),.86)}${at(322,1730,u.chatPhone('light'),.9)}
${tx(70,1480,300,'chat')}
${at(60,2440,u.win(u.ai('light','')),.92)}${at(1000,2590,u.aiPhone('dark'),.9)}
${tx(1090,2110,280,'ai','').replace('top:2110px','top:2330px')}
${foot(60,3350)}</div>`,base));
// D: just the editor
const sheet=(t,mode,w,h)=>`<div class="ui ${t}" style="width:${w}px;height:${h}px;padding:64px 60px;overflow:hidden;clip-path:polygon(26px 0,100% 0,100% calc(100% - 26px),calc(100% - 26px) 100%,0 100%,0 26px)"><div class=col style="width:${w-120}px">${u.docBody(mode!=='slash',{nophoto:mode==='slash'})}</div></div>`;
const pick=(h,re)=>h.match(re)[0];
const chatH=u.chat('dark');const ms=chatH.slice(chatH.indexOf('<div class="ms">'),chatH.indexOf('</main>'));
const aiH=u.ai('dark');const th=aiH.slice(aiH.indexOf('<div class="th">'),aiH.indexOf('</main>'));
fs.writeFileSync('D.html',page(`<div class=s style="height:3300px">${title(0,90,1440,'text-align:center')}
${tx(370,350,700,'doc','text-align:center')}${at(60,590,sheet('light','sel',650,760))}${at(730,590,sheet('dark','slash',650,760))}
${tx(60,1500,420,'chat')}${at(60,1750,`<div class="ui dark" style="background:none;width:640px;--fl:#1a2027;display:flex;flex-direction:column;-webkit-mask:linear-gradient(transparent,#000 120px)">${ms.replace('class="ms"','class="ms" style="padding:0 0 22px"').replace('class="co"','class="co" style="margin:0"')}</div>`,1.28)}${at(970,1560,u.chatPhone('light'),1.05)}
${tx(560,2600,420,'ai').replace('left:560px','left:530px')}${at(80,2720,u.aiPhone('light'),.98)}${at(530,2830,`<div class="ui dark" style="background:none;width:700px;--fl:#1a2027;">${th}</div>`,1.18)}${foot(60,3770)}
</div>`,base).replace('height:3300px','height:3960px'));
