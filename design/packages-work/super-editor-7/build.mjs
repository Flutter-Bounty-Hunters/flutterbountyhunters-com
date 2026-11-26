import fs from 'fs';import * as u from './ui.mjs';import {page} from './proof.mjs';
const at=(x,y,h,z=1,s='')=>`<div style="position:absolute;left:${x/z}px;top:${y/z}px;zoom:${z};${s}">${h}</div>`;
const ar=(r,y,h,z=1)=>`<div style="position:absolute;right:${r/z}px;top:${y/z}px;zoom:${z}">${h}</div>`;
const T={doc:'Build a full document editor for desktop and web. Include headings, images, tasks and tables, and style all of it to match your app.',chat:'Let people mention, format and quote in the composer, then show the same rich text in every message. It works on desktop and phones.',ai:'Give people room to write a real prompt. Stream the answer back as rich text, or straight into a document they can edit.'};
const lead='Add rich text editing to your Flutter app, from a single chat box to a full document.';
const css=`.s{position:relative;width:1920px;overflow:hidden}.H{font-size:132px;line-height:.95;display:block}.tx{position:absolute;font-size:25px;font-weight:600;line-height:1.5}.G{position:absolute;line-height:1;white-space:nowrap;font-weight:800;text-transform:uppercase;letter-spacing:-.015em;color:transparent;background:linear-gradient(#55595c,#2a2d2f 80%);-webkit-background-clip:text;background-clip:text}`;
const G=(y,t,s,right)=>`<div class="G" style="top:${y}px;font-size:${s}px;${right?'right:104px':'left:96px'}">${t}</div>`;
const tx=(x,y,w,k)=>`<div class="tx" style="left:${x}px;top:${y}px;width:${w}px">${T[k]}</div>`;
const title=`<div class="tx" style="left:0;top:110px;width:1920px;text-align:center"><span class="metal H">Super Editor</span><div style="margin-top:34px;font-size:29px;line-height:1.4">${lead}</div></div>`;
const W=u.win,H={};
const N={doc:'<b>attributed_text</b> carries the styles. <b>super_text_layout</b> paints the selection and caret.',chat:'<b>super_keyboard</b> reports when the phone’s keyboard opens, and how tall it is.',ai:'<b>super_editor_clipboard</b> pastes in text with its formatting.'};
const nt=(x,y,w,k)=>tx(x,y,w,k).replace('</div>',`<div style="margin-top:26px;font:500 19px/1.5 Geist;color:#a9b8c6" class=nt>${N[k]}</div></div>`);
const menu=(x,y,z)=>at(x,y,`<div class="ui dark" style="background:none">${u.frag.menu}</div>`,z);


// 1 corner
H.v1=[5650,`${title}
${G(560,'Documents',282)}
${at(-40,790,W(u.docWide('light',1480,930,{tb:1.45,cols:'260px 1fr 290px'})).replace('class="side"','class="side" style="padding-left:52px"').replace('class="bar"','class="bar" style="padding-left:62px"').replace('class="col" style="','class="col" style="width:790px;'))}
${nt(1500,902,320,'doc')}
${at(1130,1390,W(u.docTall('dark',680,570)))}${menu(1186,1816,1.75)}
${G(2440,'Team chat',282,1)}
${at(600,2670,W(u.chatWide('dark',1300,760,{thread:1,nocomp:1,more:1,ms:'padding-bottom:140px;padding-left:60px',cols:'250px 1fr 370px',tp:'padding-right:60px'}).replace('class="side"','class="side" style="padding-left:56px"')),1.08)}
${nt(110,2782,400,'chat')}
${at(225,3160,u.chatPhone('light'),1.2)}
${at(930,3360,u.compBox(640),1.32)}
${G(4430,'AI chat',282)}
${at(-40,4660,W(u.aiWide('light',1480,810,{flip:1,more:1,cols:'790px 1fr',cvp:'padding-left:100px'})))}
${nt(1500,4772,320,'ai')}
${at(790,5270,u.promptBox(638,'dark','border-radius:9px'),1.6)}`];
for(const k in H)fs.writeFileSync(k+'.html',page(`<div class=s style="height:${H[k][0]}px">${H[k][1]}</div>`,css));
fs.writeFileSync('h.txt',Object.entries(H).map(([k,v])=>k+' '+v[0]).join('\n')+'\n');
