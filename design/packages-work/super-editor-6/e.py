s=open('ui.mjs').read()
i=s.index("Same here. It only happens when <span class=\"sel\">");j=s.index(", and never on Wi-Fi.')}")
s=s[:i]+"<span class=\"sel\">Only past 50%<span class=\"hdl\" style=\"left:-7px;top:-9px\"></span><span class=\"hdl\" style=\"right:-7px;bottom:-9px\"></span><span class=\"pop tb\" style=\"padding:3px;font-size:14.5px;left:-20px;transform:none;bottom:calc(100% + 30px)\"><span style=\"padding:8px 13px\">Copy</span><span class=\"sp\"></span><span style=\"padding:8px 13px\">Quote</span><span class=\"sp\"></span><span style=\"padding:8px 13px\">Share</span></span></span> for me"+s[j:]
s=s.replace("out tonight.')}</div><div class=\"co\"><div class=\"cb2\" style=\"color:var(--s)\">","out tonight.<div class=\"rx\"><i>🎉 9</i></div>')}${cm('m','OT','Otto','inherit','7:24','I can test it on:<ul><li>an old tablet</li><li>a phone with no SIM</li></ul>')}</div><div class=\"co\"><div class=\"cb2\" style=\"color:var(--s)\">")
s=s.replace('<div style="height:34px"></div>${cm(','<div style="height:46px"></div>${cm(')
s=s.replace('<div class="ms" style="padding:0 0 20px">${m2}${m3}','<div class="ms" style="padding:0 0 20px">${m1}${m2}${m3}')
s=s.replace('padding:44px 110px 0 690px" class="ser"','padding:52px 150px 0 680px" class="ser"').replace('grid-template-columns:720px 1fr"><div style="padding:0 50px','grid-template-columns:720px 1fr"><div style="padding:0 50px').replace('style="padding-left:620px"','style="padding-left:530px"')
s=s.replace("<p>On the fourth pass she found one.","<p>Wind pulled at the door. She didn’t look up.</p><p>On the fourth pass she found one.")
open('ui.mjs','w').write(s)
c=open('ui.css').read().replace('.ser{font-family:Newsreader,serif;font-size:22px','.ser{font-family:Newsreader,serif;font-size:26px').replace('.ser h1{font:500 40px','.ser h1{font:500 54px');open('ui.css','w').write(c)
b=open('build.mjs').read()
R=[("H.v1=[4860","H.v1=[5010"),("${G(3640,'AI chat',282)}\n${at(-40,3870","${G(3790,'AI chat',282)}\n${at(-40,4020"),("nt(1500,3900","nt(1500,4050"),("at(790,4480,","at(790,4630,"),
("at(870,1440,W(u.notes('dark',900,590))","at(870,1510,W(u.notes('dark',900,590))"),("menu(1173,1990,1.5)","menu(1181,1968,1.75)"),
("G(2370,'Team chat'","G(2440,'Team chat'"),("nt(110,2640,360","nt(110,2710,360"),("at(560,2600,W(u.macroChat('dark',880,520","at(560,2670,W(u.macroChat('dark',880,560"),("at(250,2960,","at(250,3080,"),("at(1234,3300,","at(1234,3436,"),("G(3990,","G(4190,"),("at(-60,4220,","at(-60,4420,"),("at(1200,4390,W(u.aiTall('light',570,700)),1.07)","at(1240,4620,W(u.aiTall('light',570,690)),1)"),("nt(110,5070,","nt(110,5290,"),("H.v2=[5250","H.v2=[5580"),("pad:'0 90px 0 130px',pw:620","pad:'0 130px 0 100px',pw:630"),
("W(u.artWin('light',600,940,{tb:1.2,ph:170,q:1,pad:'50px 52px'})","W(u.artWin('light',600,860,{tb:1.2,ph:170,q:1,pad:'50px 52px',end:'/ta<span class=caret></span>'})"),
("${nt(1180,1600,600,'doc')}","${at(572,1545,`<div class=\"ui light\" style=\"background:none\">${u.frag.menu}</div>`,1.6)}${nt(1180,1600,600,'doc')}"),
("G(1930,'Team","G(2010,'Team"),("at(-40,2320,W(u.community('dark',1850,640,{cols:'130px 220px 1fr 300px',rail:'padding-left:60px',ms:'margin-right:520px',co:'margin-right:560px'})))","at(-40,2400,W(u.community('dark',1610,530,{cols:'120px 190px 1fr 262px',rail:'padding-left:56px',ms:'margin-right:455px',co:'margin-right:485px'})),1.15)"),("at(1010,2190,","at(1010,2270,"),("nt(330,3040,","nt(330,3080,"),
("G(3330,","G(3430,"),("at(160,3800,W(u.aiHomeWide('light',1800,620)))","at(160,3850,W(u.aiHomeWide('light',1565,550)),1.15)"),("at(870,3640,W(u.aiTall('dark',540,900)),1.1)","at(960,3720,W(u.aiTall('dark',540,780)),1.1)"),("nt(210,4500,","nt(217,4550,"),("H.v3=[5060","H.v3=[4880")]
for o,n in R:
    assert o in b,o; b=b.replace(o,n)
open('build.mjs','w').write(b)
