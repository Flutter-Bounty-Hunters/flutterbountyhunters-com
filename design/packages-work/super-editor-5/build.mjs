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

// V1 zigzag
H.v1=[5080,`${title}
${G(470,'Documents',282)}
${at(-40,716,W(u.docWide('light',1500,930,{tb:1.45,cols:'210px 1fr 300px'})))}
${at(1190,1250,W(u.docTall('dark',620,570)))}${menu(1246,1702,1.75)}
${nt(110,1750,640,'doc')}
${G(2250,'Team chat',282,1)}
${at(700,2496,W(u.chatWide('dark',1180,680,{thread:1,nocomp:1,ms:'padding-bottom:140px',cols:'190px 1fr 350px',tp:'padding-right:50px'})),1.1)}
${at(908,3110,u.compBox(630),1.32)}
${at(110,2600,u.chatPhone('light'),1.2)}
${nt(908,3450,640,'chat')}
${G(3830,'AI chat',282)}
${at(-40,4076,W(u.aiWide('light',1440,790,{flip:1,cols:'780px 1fr',cvp:'padding-left:100px'})))}
${at(790,4640,u.promptBox(638,'dark'),1.6)}
${nt(1460,4110,350,'ai')}`];
// V2 full width ground
H.v2=[5240,`${title}
${G(470,'Documents',282)}
${at(-30,670,W(u.docWide('light',1980,930,{tb:1.45,cols:'330px 1fr 700px',rp:'padding-right:480px',pad:'padding-left:0'})).replace('class="side"','class="side" style="padding-left:130px"').replace('class="bar"','class="bar" style="padding:0 140px"'))}
${at(1290,1180,W(u.docTall('dark',520,600).replace('padding:60px 56px','padding:56px 44px')))}${menu(1334,1684,1.7)}
${nt(410,1690,640,'doc')}
${G(2240,'Team chat',282,1)}
${at(-30,2440,W(u.chatWide('dark',1720,750,{thread:1,nocomp:1,more:1,ms:'padding-bottom:164px',cols:'560px 1fr 400px',tp:'padding-right:60px'})).replace('class="side"','class="side" style="visibility:hidden"'),1.15)}
${at(110,2560,u.chatPhone('light'),1.25)}
${at(640,3150,u.compBox(660),1.34)}
${nt(640,3500,640,'chat')}
${G(3860,'AI chat',282)}
${at(-30,4060,W(u.aiWide('light',1980,820,{more:0,cols:'1010px 1fr',th:'padding-left:140px;padding-right:60px',cvp:'padding-right:150px'})).replace('<div class="hd" style="border:0">','<div class="hd" style="border:0;padding-left:140px">'))}
${at(110,4650,u.promptBox(545,'dark'),1.6)}
${nt(1200,4950,600,'ai')}`];
// V3 separated pairs
const pair=(y)=>y;
H.v3=[5280,`${title}
${G(470,'Documents',282)}
${at(-40,760,W(u.docWide('light',1340,1000,{tb:1.45,noright:1,cols:'220px 1fr'})))}
${nt(1400,770,410,'doc')}
${at(1400,1150,W(u.docTall('dark',600,610).replace('padding:60px 56px','padding:54px 110px 54px 50px')))}${menu(1450,1660,1.5)}
${G(2080,'Team chat',282,1)}
${nt(110,2380,400,'chat')}
${at(650,2370,W(u.chatWide('dark',1120,900,{more:1,k:'prr',cols:'190px 1fr'})),1.24)}
${at(110,2730,u.chatPhone('light'),.965)}
${G(3720,'AI chat',282)}
${at(-40,4010,W(u.aiWide('light',1380,1060,{flip:1,more:1,cols:'700px 1fr',cvp:'padding-left:100px',prompt:`<div class=cx2>${u.promptBox(590,'light')}</div>`})))}
${nt(1460,4020,350,'ai')}
${at(1460,4375,u.aiPhone('dark'),.89)}`];
for(const k in H)fs.writeFileSync(k+'.html',page(`<div class=s style="height:${H[k][0]}px">${H[k][1]}</div>`,css));
fs.writeFileSync('h.txt',Object.entries(H).map(([k,v])=>k+' '+v[0]).join('\n')+'\n');
