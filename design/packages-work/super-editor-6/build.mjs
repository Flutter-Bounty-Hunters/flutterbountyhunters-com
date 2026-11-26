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


// 1 corner
H.v1=[5010,`${title}
${G(470,'Documents',282)}
${at(-40,700,W(u.docWide('light',1480,930,{tb:1.45,cols:'210px 1fr 290px'})))}
${nt(1500,730,320,'doc')}
${at(1130,1300,W(u.docTall('dark',680,570)))}${menu(1186,1726,1.75)}
${G(2140,'Team chat',282,1)}
${at(600,2370,W(u.chatWide('dark',1300,760,{thread:1,nocomp:1,more:1,ms:'padding-bottom:140px;padding-left:60px',cols:'250px 1fr 370px',tp:'padding-right:60px'}).replace('class="side"','class="side" style="padding-left:56px"')),1.08)}
${nt(110,2400,400,'chat')}
${at(225,2730,u.chatPhone('light'),1.2)}
${at(930,3060,u.compBox(640),1.32)}
${G(3790,'AI chat',282)}
${at(-40,4020,W(u.aiWide('light',1480,810,{flip:1,cols:'790px 1fr',cvp:'padding-left:100px'})))}
${nt(1500,4050,320,'ai')}
${at(790,4630,u.promptBox(638,'dark'),1.6)}`];
// 2 close-up
H.v2=[5580,`${title}
${G(470,'Documents',282)}
${at(-60,700,W(u.artWin('light',800,640,{tb:1.15,ph:170,pad:'34px 70px 0 98px'})),1.75)}
${nt(1430,740,380,'doc')}
${at(870,1510,W(u.notes('dark',900,590)),1.05)}
${menu(1181,1968,1.75)}
${G(2440,'Team chat',282,1)}
${nt(110,2710,360,'chat')}
${at(560,2670,W(u.macroChat('dark',880,560,'0 130px 0 130px')),1.62)}
${at(250,3080,u.phoneSel('light'),1.16)}
${at(1234,3436,`<div class="ui dark" style="background:none">${u.mentionMenu}</div>`,1.75)}
${G(4190,'AI chat',282)}
${at(-60,4420,W(u.aiHome('dark',860,500,{pad:'0 130px 0 100px',pw:630})),1.65)}
${at(1240,4620,W(u.aiTall('light',570,690)),1)}
${nt(110,5290,640,'ai')}`];
// 3 crossbar
H.v3=[4880,`${title}
${G(470,'Documents',282)}
${at(160,930,W(u.manuscript('dark',1800,600)))}
${at(520,780,W(u.artWin('light',600,860,{tb:1.2,ph:170,q:1,pad:'50px 52px',end:'/ta<span class=caret></span>'})))}
${at(572,1545,`<div class="ui light" style="background:none">${u.frag.menu}</div>`,1.6)}${nt(1180,1600,600,'doc')}
${G(2010,'Team chat',282,1)}
${at(-40,2400,W(u.community('dark',1610,530,{cols:'120px 190px 1fr 262px',rail:'padding-left:56px',ms:'margin-right:455px',co:'margin-right:485px'})),1.15)}
${at(1010,2270,u.phoneSel('light'),1.22)}
${nt(330,3080,600,'chat')}
${G(3430,'AI chat',282)}
${at(160,3850,W(u.aiHomeWide('light',1565,550)),1.15)}
${at(960,3720,W(u.aiTall('dark',540,780)),1.1)}
${nt(217,4550,560,'ai')}`];
for(const k in H)fs.writeFileSync(k+'.html',page(`<div class=s style="height:${H[k][0]}px">${H[k][1]}</div>`,css));
fs.writeFileSync('h.txt',Object.entries(H).map(([k,v])=>k+' '+v[0]).join('\n')+'\n');
