import fs from 'fs';import * as u from './ui.mjs';import {page} from './proof.mjs';
const at=(x,y,h,z=1,s='')=>`<div style="position:absolute;left:${x/z}px;top:${y/z}px;zoom:${z};${s}">${h}</div>`;
const ar=(r,y,h,z=1)=>`<div style="position:absolute;right:${r/z}px;top:${y/z}px;zoom:${z}">${h}</div>`;
const T={doc:'Build a full document editor for desktop and web. Include headings, images, tasks and tables, and style all of it to match your app.',chat:'Let people mention, format and quote in the composer, then show the same rich text in every message. It works on desktop and phones.',ai:'Give people room to write a real prompt. Stream the answer back as rich text, or straight into a document they can edit.'};
const lead='Add rich text editing to your Flutter app, from a single chat box to a full document.';
const css=`.s{position:relative;width:1920px;overflow:hidden}.H{font-size:132px;line-height:.95;display:block}.tx{position:absolute;font-size:25px;font-weight:600;line-height:1.5}.G{position:absolute;line-height:1;white-space:nowrap;font-weight:800;text-transform:uppercase;letter-spacing:-.015em;color:transparent;background:linear-gradient(#55595c,#2a2d2f 80%);-webkit-background-clip:text;background-clip:text}`;
const G=(y,t,s,right)=>`<div class="G" style="top:${y}px;font-size:${s}px;${right?'right:104px':'left:96px'}">${t}</div>`;
const tx=(x,y,w,k)=>`<div class="tx" style="left:${x}px;top:${y}px;width:${w}px">${T[k]}</div>`;
const title=`<div class="tx" style="left:110px;top:110px"><span class="metal H">Super Editor</span></div><div class="tx" style="left:1190px;top:118px;width:600px;font-size:29px;line-height:1.4">${lead}</div>`;
const W=u.win,H={};
const N={doc:'<b>attributed_text</b> carries the styles. <b>super_text_layout</b> paints the selection and caret.',chat:'<b>super_keyboard</b> reports when the phone’s keyboard opens, and how tall it is.',ai:'<b>super_editor_clipboard</b> pastes in text with its formatting.'};
const nt=(x,y,w,k)=>tx(x,y,w,k).replace('</div>',`<div style="margin-top:26px;font:500 19px/1.5 Geist;color:#a9b8c6" class=nt>${N[k]}</div></div>`);
const menu=(x,y,z)=>at(x,y,`<div class="ui dark" style="background:none">${u.frag.menu}</div>`,z);
H.one=[5080,`${title}
${G(470,'Documents',282)}
${at(-40,716,W(u.docWide('light',1500,930,{tb:1.45,cols:'210px 1fr 300px'})))}
${at(1190,1260,W(u.docTall('dark',620,560)))}${menu(1246,1712,1.75)}
${nt(110,1750,640,'doc')}
${G(2230,'Team chat',282,1)}
${at(690,2476,W(u.chatWide('dark',1320,720,{thread:1,nocomp:1,ms:'padding-bottom:128px',cols:'200px 1fr 420px',tp:'padding-right:70px'})))}
${at(890,3080,u.compBox(690),1.2)}
${at(110,2560,u.chatPhone('light'),1.2)}
${nt(890,3400,640,'chat')}
${G(3760,'AI chat',380)}
${at(630,4110,W(u.aiWide('light',1330,800,{cols:'620px 1fr'})))}
${at(110,4630,u.promptBox(700,'dark'),1.6)}
${nt(110,4170,420,'ai')}`];
H.two=[5900,`${title}
${G(470,'Documents',282)}
${ar(-40,716,W(u.docWide('light',1630,930,{tb:1.45,cols:'230px 1fr 390px',rp:'padding-right:64px'})))}
${at(-40,1760,W(u.docTall('dark',1120,500,'').replace('padding:60px 56px','padding:60px 120px 0 150px')))}${menu(113,2212,1.75)}
${nt(1230,1800,560,'doc')}
${G(2660,'Team chat',282,1)}
${at(-30,2906,W(u.chatWide('dark',1980,760,{thread:1,k:'wl',cols:'310px 1fr 560px',tp:'padding-right:90px',ms:'padding-left:40px'})).replace('class="co"','class="co" style="margin-left:40px"'))}
${nt(320,3730,640,'chat')}
${at(1420,3380,u.chatPhone('light'),1.2)}
${G(4440,'AI chat',380)}
${at(110,4786,u.promptBox(1062,'dark'),1.6)}
${at(640,5140,W(u.aiWide('light',1330,680,{cols:'620px 1fr'})))}
${nt(110,5170,420,'ai')}`];
for(const k in H)fs.writeFileSync(k+'.html',page(`<div class=s style="height:${H[k][0]}px">${H[k][1]}</div>`,css));
fs.writeFileSync('h.txt',Object.entries(H).map(([k,v])=>k+' '+v[0]).join('\n')+'\n');
