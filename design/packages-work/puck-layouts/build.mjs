import fs from 'fs';
const I={search:'<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',pen:'<path d="M4 20l1-5L16 4l4 4L9 19z"/>',link:'<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',image:'<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 16l5-5 5 5 2-2 4 4"/>',check:'<path d="M5 12l5 5 9-10"/>',bell:'<path d="M6 17V11a6 6 0 0 1 12 0v6l1 1H5zM10 21h4"/>',bookmark:'<path d="M7 4h10v16l-5-4-5 4z"/>',smile:'<circle cx="12" cy="12" r="9"/><path d="M8.5 14a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>',mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',send:'<path d="M4 12l16-8-6 17-3-7z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"/>',layers:'<path d="M12 4l9 5-9 5-9-5zM3 14l9 5 9-5"/>'};
const ic=(n,s)=>`<svg viewBox="0 0 24 24" style="width:${s}px;height:${s}px">${I[n]}</svg>`;
const at=(x,y,w,h,html='',st='',cls='')=>`<div class="${cls}" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;${h?`height:${h}px;`:''}${st}">${html}</div>`;
const puck=(x,y,d,st='')=>`<img src="puck.png" class="pk" style="left:${x-d/2}px;top:${y-d/2}px;width:${d}px;${st}">`;
const item=(x,y,d,html='',st='')=>`<span class="it" style="left:${x-d/2}px;top:${y-d/2}px;width:${d}px;height:${d}px;${st}">${html}</span>`;
const fan=(cx,cy,r,n,from,sweep,d,f)=>Array.from({length:n},(_,i)=>{const a=(from+sweep*(n>1?i/(n-1):0))*Math.PI/180;const q=f(i);return item(cx+r*Math.cos(a),cy+r*Math.sin(a),d,q.h||'',q.s||'')}).join('');
const DK='background:#14110f;color:#f1e9de',BN='background:#efe6d9;color:#14110f';
const names=['search','pen','link','image','check','bell','bookmark','smile'];
const lvl=(cx,cy,r,c='rgb(20 17 15/.45)')=>`<i style="position:absolute;left:${cx-r}px;top:${cy-r}px;width:${2*r}px;height:${2*r}px;border:1.5px solid ${c};border-radius:50%"></i>`;
// contents, around a center, where k is the scale of a 64px puck
const open2=(cx,cy,k)=>lvl(cx,cy,106*k)+lvl(cx,cy,196*k)+fan(cx,cy,106*k,8,-90,315,44*k,i=>({h:ic(names[i],20*k),s:DK}))+fan(cx,cy,196*k,14,-90,360*13/14,44*k,()=>({s:BN}))+puck(cx,cy,80*k);
const open1=(cx,cy,k)=>lvl(cx,cy,112*k)+fan(cx,cy,112*k,8,-90,315,48*k,i=>({h:ic(names[i],21*k),s:DK}))+puck(cx,cy,68*k);
const edge=(x,cy,k,s=DK)=>fan(x,cy,112*k,5,-76,152,48*k,i=>({h:ic(['pen','search','mic','image','send'][i],21*k),s}))+puck(x+25.6*k,cy,64*k);
const corner=(x,y,k)=>fan(x,y,132*k,4,187,76,48*k,i=>({s:`background:url(mesa.png) ${[10,45,72,96][i]}% 60%/auto 100%;box-shadow:0 0 0 ${2.5*k}px #f3ede4`}))+puck(x-25.6*k,y-30*k,64*k);
const keys=(w,h,k,o={})=>{const top=o.top??h*.46;const row=(s,extra=0)=>`<div style="display:flex;justify-content:center;gap:${8*k}px;margin-bottom:${11*k}px">${[...s].map(c=>`<b style="width:${50*k}px;height:${62*k}px;font-size:${30*k}px;border-radius:${9*k}px">${c}</b>`).join('')}</div>`;const gx=w/2+(o.gap??174)*k,py=top-(o.lift??60)*k,d=92*k;return `<div class="keys" style="left:50%;top:${top}px;transform:translateX(-50%)">${row('qwertyuiop')}${row('asdfghjkl')}${row('zxcvbnm')}${row('      ')}</div><i style="position:absolute;left:${gx-d/2}px;top:${top+84*k-d/2}px;width:${d}px;height:${d}px;border:${2.5*k}px dashed #b5562c;border-radius:50%"></i><svg viewBox="0 0 20 60" style="position:absolute;left:${gx-11*k}px;top:${top-5*k}px;width:${22*k}px;height:${62*k}px;stroke:#d8672f;stroke-width:3"><path d="M10 58V4M3 11l7-7 7 7"/></svg>${puck(gx,py,d)}`};
const path=(()=>{let x=0,v=0,o=[];for(let k=0;k<=600;k++){const dt=1/1200;if(k%26==0)o.push(x);v+=(220*(1-x)-26*v)*dt;x+=v*dt}return o.map(q=>q/o.at(-1))})();
const trail=(x0,y0,x1,y1,d)=>path.map((t,i)=>puck(x0+(x1-x0)*t,y0+(y1-y0)*t,d,`opacity:${(.14+.86*(i/(path.length-1))**2.4).toFixed(2)};filter:none;`)).join('');
const rinkbg=(v)=>v?'background:linear-gradient(#a8432f,#a8432f) 0 50%/100% 3px no-repeat,linear-gradient(#7ba3bf,#7ba3bf) 0 24%/100% 4px no-repeat,linear-gradient(#7ba3bf,#7ba3bf) 0 76%/100% 4px no-repeat,#e4ebee':'background:linear-gradient(#a8432f,#a8432f) 50% 0/3px 100% no-repeat,linear-gradient(#7ba3bf,#7ba3bf) 24% 0/4px 100% no-repeat,linear-gradient(#7ba3bf,#7ba3bf) 76% 0/4px 100% no-repeat,#e4ebee';
const C=fs.readFileSync('contours.txt','utf8');
const map=(w,h,k,o={})=>{const px=o.left?25.6*k:w-25.6*k,py=h/2;const cols=['','','#ff9a5c','#4fc08d','#5aa9ff'];const it=fan(o.left?px:px,py,112*k,5,o.left?-88:268,o.left?176:-176,48*k,i=>cols[i]?{h:`<i style="width:${18*k}px;height:${18*k}px;border-radius:50%;background:${cols[i]}"></i>`,s:`background:color-mix(in srgb,${cols[i]} 45%,#23262b);border:1px solid rgb(255 255 255/${i==2?1:.16})`}:{h:ic(['sun','layers'][i],20*k),s:'background:#262a30;color:#f1f3f5;border:1px solid rgb(255 255 255/.16)'});
 return `<svg viewBox="0 0 720 520" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%;stroke:#31413f;stroke-width:1.3"><path d="${C}"/><path d="M120 452 C190 430 170 350 250 330 S380 350 400 270" style="stroke:#ff9a5c;stroke-width:5"/><path d="M400 270 C420 200 500 230 530 160 S560 90 620 74" style="stroke:#ff9a5c;stroke-width:5;stroke-dasharray:1 11"/><circle cx="400" cy="270" r="10" style="fill:#fff;stroke:#ff9a5c;stroke-width:5"/></svg>${it}${puck(px,py,64*k)}`};
const T={sum:'Put a menu within reach, anywhere in your Flutter app. People drag it out of the way, and it springs to the edge.',map:['Try it.','Drag the puck, throw it, or tap it to open its menu.'],open:['In the open,','it spreads into rings.'],edge:['At an edge,','half a ring.'],corner:['In a corner,','a quarter.'],keys:['When the keyboard opens,','it moves up.'],throw:['Let go,','and it springs to the nearest edge.']};
const cap=(x,y,w,k,st='',col='')=>at(x,y,w,0,`<b>${T[k][0]}</b> ${T[k][1]}`,st,'cap '+col);
const title=(x,y,s=78,st='')=>at(x,y,700,0,'Puck',`font-size:${s}px;${st}`,'metal');
const sum=(x,y,w,st='',fs=17)=>at(x,y,w,0,`${T.sum}<div class="lk">Get Puck on pub.dev</div>`,`font-size:${fs}px;${st}`,'sum');
const notes=[['Any widget.','Icons, photos or your own controls can go in the menu.'],['Same place.','Give a menu an ID, and it remembers where people left it.'],['In your hands.','Open and close it from code, and listen as it moves.']];
const note=(x,y,w,i,st='')=>at(x,y,w,0,`<b>${notes[i][0]}</b> ${notes[i][1]}`,st,'cap');
const plate=(x,y,w,h,bg,html,rad='4px')=>at(x,y,w,h,html,`overflow:hidden;background:${bg};border-radius:${rad};`);
const MAP='#17201f',RUST='#b5562c',BONE='#e5ddd0',STEEL='#5f8fb0',GRA='#1c2126';
const X=210,W=1020;const L={};
{ // A: modular grid, 4 columns of 240
 const m=240,g=20,c=i=>X+i*(m+g);const r=[90,418,746];
 L.a=[1160,title(X-4,r[0]+6,78)+sum(X,r[0]+104,235,'',16)
 +plate(c(1),r[0],m,m,'none',puck(m/2,m/2,m,'filter:none;'))
 +plate(c(2),r[0],m*2+g,m,MAP,map(m*2+g,m,.72))+cap(c(2),r[0]+m+14,500,'map')
 +plate(c(0),r[1],m,m,STEEL,corner(m,m,1.1),'100% 0 0 0')+cap(c(0),r[1]+m+14,m,'corner')
 +plate(c(1),r[1],m,m,BONE,edge(0,m/2,.86),'0 120px 120px 0')+cap(c(1),r[1]+m+14,m,'edge')
 +plate(c(2),r[1],m,m,RUST,open2(m/2,m/2,.5),'50%')+cap(c(2),r[1]+m+14,m,'open')
 +[0,1,2].map(i=>note(c(3),r[1]+i*84,m,i)).join('')
 +plate(c(0),r[2],m*2+g,m,GRA,keys(m*2+g,m,.872))+cap(c(0),r[2]+m+14,500,'keys')
 +plate(c(2),r[2],m*2+g,m,'x;'+rinkbg(),trail(50,m/2,m*2+g-36,m/2,80))+cap(c(2),r[2]+m+14,500,'throw')];
}
{ // B: quarter, half, whole on one line
 const y=560,R=230,k=1.25;const x1=X,x2=X+R+50,x3=x2+R+50;
 L.b=[1330,at(0,70,1440,0,'Puck','font-size:78px;text-align:center','metal')+at(400,160,640,0,T.sum+'<div class="lk" style="margin:16px auto 0;background-position:50% 100%">Get Puck on pub.dev</div>','font-size:18px;text-align:center','sum')
 +plate(x1,y-R,R,R,STEEL,corner(R,R,k),R+'px 0 0 0')
 +plate(x2,y-R,R,2*R,BONE,edge(0,R,k),`0 ${R}px ${R}px 0`)
 +plate(x3,y-R,2*R,2*R,RUST,open2(R,R,.95),'50%')
 +at(X,y+16,R,0,`<b>In a corner,</b> the menu is a quarter of a ring.`,'','cap')
 +at(x2,y+R+16,R,0,`<b>At an edge,</b> half a ring.`,'','cap')+at(x3,y+R+16,2*R,0,`<b>In the open,</b> the whole ring, on as many levels as you need.`,'text-align:center','cap')
 +plate(X,900,500,300,MAP,map(500,300,.8))+cap(X,1214,500,'map')
 +plate(X+520,900,500,168,GRA,keys(500,168,.872,{top:102,lift:58}))+plate(X+520,1088,500,112,'x;'+rinkbg(),trail(50,56,480,56,70),'56px 0 0 56px')
 +at(X+520,1214,500,0,`<b>It moves</b> above the keyboard, and springs to the nearest edge.`,'','cap')];
}
{ // C: the section is an open menu
 const cx=1272,cy=520,r=440,d=196;const an=[122,151,180,209,238].map(a=>a*Math.PI/180);const pos=an.map(a=>[cx+r*Math.cos(a),cy-r*Math.sin(a)]);
 const inner=[['open',RUST,open2(d/2,d/2,.415)],['edge',BONE,`<i style="position:absolute;left:0;top:0;width:44px;height:100%;background:#14110f;z-index:3"></i>`+edge(44,d/2,.64)],['corner',STEEL,corner(152,152,.78)+`<i style="position:absolute;right:0;top:0;width:44px;height:100%;background:#14110f;z-index:3"></i><i style="position:absolute;left:0;bottom:0;width:100%;height:44px;background:#14110f;z-index:3"></i>`],['keys',GRA,keys(d,d,.66,{top:92,gap:0,lift:52})],['throw','x;'+rinkbg(),trail(30,d/2,d-28,d/2,48)]];
 L.c=[1040,`<svg style="position:absolute;left:0;top:0;width:1440px;height:1040px;stroke:#4b4540;stroke-width:3"><path d="M${cx+r*Math.cos(100*Math.PI/180)} ${cy-r*Math.sin(100*Math.PI/180)} A${r} ${r} 0 0 0 ${cx+r*Math.cos(260*Math.PI/180)} ${cy-r*Math.sin(260*Math.PI/180)}"/></svg>`
 +puck(cx,cy,420,'filter:none;')
 +inner.map(([k,bg,h],i)=>plate(pos[i][0]-d/2,pos[i][1]-d/2,d,d,bg,h,'50%')+at(pos[i][0]-d/2-24-200,pos[i][1]-20,200,0,`<b>${T[k][0]}</b> ${T[k][1]}`,'text-align:right','cap')).join('')
 +title(X-4,cy-150,100)+sum(X,cy-30,290)];
}
{ // D: one poster, where each shape is where it happens
 const w=1020,h=640,y=250;const R=150;
 const kt=470;
 L.d=[1010,title(X-4,84,78)+at(X+340,100,430,0,T.sum,'font-size:17px','sum')+at(X+w-240,122,240,0,'<div class="lk" style="margin:0 0 0 auto">Get Puck on pub.dev</div>','','sum')
 +plate(X,y,w,h,BONE,
   at(0,0,200,200,'',`background:${STEEL};border-radius:0 0 100% 0`)+fan(0,0,126,4,7,76,46,i=>({s:`background:url(mesa.png) ${[10,45,72,96][i]}% 60%/auto 100%;box-shadow:0 0 0 2.5px #f3ede4`}))+puck(25,29,62)
   +at(0,250,180,360,'','background:#14110f;border-radius:0 180px 180px 0')+`<div style="position:absolute;left:0;top:250px;width:180px;height:360px">${edge(0,180,1,BN)}</div>`
   +at(w/2-236,120,400,400,open2(200,200,.83),`background:${RUST};border-radius:50%`)
   +at(w-250,56,250,110,trail(50,55,232,55,64),rinkbg()+';border-radius:55px 0 0 55px;overflow:hidden')
   +at(w-300,300,300,h-300,keys(300,h-300,.82,{top:130,gap:0,lift:64}),'background:#1c2126;border-radius:18px 0 0 0;overflow:hidden')
   +at(216,40,190,0,'<b>In a corner,</b><br>a quarter of a ring','','cap ink')+at(196,560,150,0,'<b>At an edge,</b><br>half a ring','','cap ink')+at(w/2-166,540,260,0,'<b>In the open,</b><br>rings, on as many levels as you need','text-align:center','cap ink')+at(w-240,180,232,0,'<b>Let go,</b> and it springs to the edge','','cap ink')+at(w-300,256,292,0,'<b>When the keyboard opens,</b> it moves up','','cap ink'))
 +at(X,y+h+18,w,0,'<b>Try it.</b> Drag the puck in the middle anywhere on the poster, and its menu takes the shape you see there.','','cap')];
}
{ // E: folded leaflet
 const w=216,h=560,x=180,y=110;const px=i=>x+i*w;
 const fold=i=>`<i style="position:absolute;inset:0;background:linear-gradient(to right,rgb(0 0 0/${i%2?.0:.16}),transparent 45%,rgb(0 0 0/${i%2?.16:0}))"></i>`;
 const pan=(i,bg,html,c,ink)=>plate(px(i),y,w,h,bg,html+fold(i)+(c?at(20,h-84,w-36,0,`<b>${c[0]}</b> ${c[1]}`,'','cap '+ink):''),'0');
 const p1=puck(w/2,206,176,'filter:none;')+at(17,312,190,0,'Puck','font-size:64px','metal')+at(20,384,182,0,T.sum,'font-size:14.5px','sum');
 const s3=at(48,36,120,120,open1(60,60,.4),'background:#14110f00;border-radius:50%;')+'';
 const shapes=at(33,30,150,150,open1(75,75,.5),'background:#efe6d9;border-radius:50%;overflow:hidden')+at(0,204,96,170,edge(0,85,.58),'background:#efe6d9;border-radius:0 85px 85px 0;overflow:hidden')+at(w-118,352,118,118,corner(118,118,.62),'background:#efe6d9;border-radius:100% 0 0 0;overflow:hidden');
 L.e=[790,pan(0,'#100d0b',p1)+pan(1,MAP,map(w,h-90,.8),T.map,'')+pan(2,RUST,shapes,['It fits the space:','a ring, half of one or a quarter.'],'ink')+pan(3,'x;'+rinkbg(1),trail(60,60,w-30,430,78),T.throw,'ink')+pan(4,GRA,at(0,0,w,h-104,keys(w,h-104,1.02,{top:230,gap:0,lift:72}),'overflow:hidden'),T.keys,'')
 +at(x,y+h+20,1080,0,'<div class="lk" style="margin:0">Get Puck on pub.dev</div>','','sum')];
}
const css=`*{box-sizing:border-box;margin:0;padding:0}body{background:#0a0807;width:1440px;position:relative;font-family:Oxanium;-webkit-font-smoothing:antialiased;overflow-x:hidden}svg{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.metal{font-weight:800;line-height:1;letter-spacing:-.015em;text-transform:uppercase;color:transparent;background:linear-gradient(rgb(226 211 196/.72),rgb(172 157 145/.62)),url(rust.svg),linear-gradient(#ddcdbd,#a39488);-webkit-background-clip:text;background-clip:text}.sum{font-weight:600;line-height:1.45;color:#c3d6e8}.lk{margin-top:18px;padding-bottom:5px;width:fit-content;font-size:16px;font-weight:700;color:#d8c8b8;background:linear-gradient(#a8978a,#a8978a) 0 100%/60px 2px no-repeat}.cap{font-size:15px;font-weight:600;line-height:1.4;color:#c3d6e8}.cap b{font-weight:700;color:#ddcdbd}.cap.ink{color:#3a322b}.cap.ink b{color:#14110f}.pk{position:absolute;z-index:2;border-radius:50%;filter:drop-shadow(0 6px 10px rgb(0 0 0/.45))}.it{position:absolute;z-index:1;border-radius:50%;display:grid;place-items:center}.keys{position:absolute;font-family:Geist}.keys b{display:grid;place-items:center;font-weight:400;line-height:1;color:#14110f;background:#e5ddd0;box-shadow:0 2px 0 rgb(0 0 0/.5)}`;
for(const k in L)fs.writeFileSync(k+'.html',`<!doctype html><meta charset=utf8><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500&family=Oxanium:wght@600;700;800&display=swap" rel=stylesheet><style>${css}body{height:${L[k][0]}px}</style><body>${L[k][1]}`.replaceAll('background:x;background:','background:'));
fs.writeFileSync('h.txt',Object.entries(L).map(([k,v])=>k+' '+v[0]).join('\n')+'\n');
