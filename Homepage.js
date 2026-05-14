import { useState, useEffect, useRef } from 'react';

const T = {
  bg:"#F7F4EF", paper:"#FFFCF7", ink:"#1A1612", inkSoft:"#3D3630",
  mid:"#7A6F65", faint:"#C8BFB4", accent:"#B8874A", accentL:"#D4A96A",
  accentBg:"#F2EAE0", border:"#E2D9CE", white:"#FFFFFF", dark:"#0F0D0B",
  gift:"#3D2A4E", giftL:"#7B5EA7", giftBg:"#F4F0F8", giftBorder:"#D8CCE8",
};
const PF = "'Playfair Display', Georgia, serif";
const DM = "'DM Sans', system-ui, sans-serif";

/* numerology */
const NM={a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8};
const VOW=new Set(['a','e','i','o','u']);
function red(n){while(n>9&&n!==11&&n!==22)n=(''+n).split('').reduce((a,d)=>a+parseInt(d),0);return n;}
function calc(name,fn){const ls=name.toLowerCase().replace(/[^a-z]/g,'').split('');const u=fn?ls.filter(fn):ls;const s=u.reduce((a,l)=>a+(NM[l]||0),0);return s?red(s):null;}
const gE=n=>calc(n);
const gS=n=>calc(n,l=>VOW.has(l));
const MEAN={1:'leadership & originality',2:'harmony & intuition',3:'creativity & joy',4:'stability & foundation',5:'freedom & adventure',6:'nurturing & love',7:'wisdom & introspection',8:'ambition & abundance',9:'compassion & completion',11:'vision & enlightenment',22:'legacy & transformation'};
function missing(nums){const p=new Set(nums.filter(Boolean));return[1,2,3,4,5,6,7,8,9].filter(n=>!p.has(n));}

const iS={fontFamily:DM,fontSize:'0.96rem',fontWeight:300,color:T.ink,background:T.white,border:`1.5px solid ${T.border}`,borderRadius:2,padding:'0.78rem 1rem',width:'100%',outline:'none',transition:'border-color 0.2s'};
const HR=()=><hr style={{border:'none',borderTop:`1px solid ${T.border}`}}/>;
const Tag=({c,gift})=><p style={{fontFamily:DM,fontSize:'0.68rem',fontWeight:500,letterSpacing:'0.14em',textTransform:'uppercase',color:gift?T.giftL:T.accent,marginBottom:'0.7rem'}}>{c}</p>;
const Body=({children,s})=><p style={{fontFamily:DM,fontSize:'1rem',color:T.inkSoft,lineHeight:1.85,fontWeight:300,...s}}>{children}</p>;

function Btn({children,onClick,filled,style}){
  const[h,setH]=useState(false);
  return <button onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={onClick}
    style={{fontFamily:DM,fontSize:'0.8rem',fontWeight:500,letterSpacing:'0.05em',padding:'0.85rem 2rem',cursor:'pointer',border:`1.5px solid ${T.accent}`,borderRadius:2,background:filled||h?T.accent:'transparent',color:filled||h?T.white:T.accent,transition:'all 0.22s',...style}}>{children}</button>;
}

function Nav({go}){
  const[sc,setSc]=useState(false);
  useEffect(()=>{const fn=()=>setSc(window.scrollY>40);window.addEventListener('scroll',fn);return()=>window.removeEventListener('scroll',fn);},[]);
  return <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:200,background:sc?'rgba(247,244,239,0.97)':T.bg,borderBottom:`1px solid ${sc?T.border:'transparent'}`,transition:'all 0.3s',padding:'1rem 2.5rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
    <span style={{fontFamily:PF,fontSize:'1rem',fontWeight:500,color:T.ink}}>Kotodama Naming</span>
    <div style={{display:'flex',gap:'2rem',alignItems:'center'}}>
      {[['story','Story'],['method','Method'],['packages','Offerings'],['gift','Gift 🎁']].map(([id,l])=>
        <span key={id} onClick={()=>go(id)} style={{fontFamily:DM,fontSize:'0.8rem',color:id==='gift'?T.giftL:T.mid,cursor:'pointer',transition:'color 0.2s'}}
          onMouseEnter={e=>e.target.style.color=id==='gift'?T.gift:T.accent}
          onMouseLeave={e=>e.target.style.color=id==='gift'?T.giftL:T.mid}>{l}</span>
      )}
      <Btn onClick={()=>go('packages')} filled style={{padding:'0.52rem 1.3rem',fontSize:'0.74rem'}}>Book a Reading</Btn>
    </div>
  </nav>;
}

function LiveCard(){
  const[mN,setMN]=useState('');const[fN,setFN]=useState('');
  const mE=gE(mN),mS=gS(mN),fE=gE(fN),fS=gS(fN);
  const mis=missing([mE,mS,fE,fS]);const has=mN.length>1&&fN.length>1;
  return <div style={{background:T.accentBg,borderRadius:6,padding:'2.2rem',border:`1px solid ${T.border}`,boxShadow:'0 8px 40px rgba(26,22,18,0.08)'}}>
    <p style={{fontFamily:DM,fontSize:'0.68rem',fontWeight:500,letterSpacing:'0.12em',textTransform:'uppercase',color:T.accent,marginBottom:'1.2rem'}}>✦ Try it live</p>
    {[['Mother\'s full name',mN,setMN,'e.g. Sofia Elena'],['Father\'s full name',fN,setFN,'e.g. James Michael']].map(([l,v,s,ph])=>
      <div key={l} style={{marginBottom:'0.9rem'}}>
        <p style={{fontFamily:DM,fontSize:'0.68rem',fontWeight:500,letterSpacing:'0.1em',textTransform:'uppercase',color:T.mid,marginBottom:'0.3rem'}}>{l}</p>
        <input value={v} onChange={e=>s(e.target.value)} placeholder={ph} style={iS} onFocus={e=>e.target.style.borderColor=T.accent} onBlur={e=>e.target.style.borderColor=T.border}/>
      </div>
    )}
    {has ? (
      <div style={{display:'flex',flexDirection:'column',gap:'0.8rem',marginTop:'0.4rem'}}>
        {[[mN.split(' ')[0]||'Mother',mE,mS],[fN.split(' ')[0]||'Father',fE,fS]].map(([name,e,s])=>
          <div key={name} style={{background:T.white,borderRadius:3,padding:'0.9rem 1rem',border:`1px solid ${T.border}`}}>
            <p style={{fontFamily:DM,fontSize:'0.68rem',fontWeight:500,letterSpacing:'0.08em',textTransform:'uppercase',color:T.mid,marginBottom:'0.4rem'}}>{name}</p>
            <div style={{display:'flex',gap:'1.5rem'}}>
              {[[e,'Expression'],[s,'Soul Urge']].map(([n,l])=>n&&<div key={l}><span style={{fontFamily:PF,fontSize:'1.4rem',fontWeight:500,color:T.accent}}>{n} </span><span style={{fontFamily:DM,fontSize:'0.68rem',color:T.mid}}>{l}</span></div>)}
            </div>
          </div>
        )}
        {mis.length>0&&<div style={{background:T.dark,borderRadius:3,padding:'0.9rem 1rem'}}>
          <p style={{fontFamily:DM,fontSize:'0.68rem',fontWeight:500,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(255,255,255,0.4)',marginBottom:'0.35rem'}}>Child's name should carry</p>
          <p style={{fontFamily:PF,fontSize:'1.1rem',color:T.accentL,fontWeight:500}}>{mis.slice(0,3).join(' · ')} — {MEAN[mis[0]]}</p>
        </div>}
      </div>
    ):(
      <p style={{fontFamily:DM,fontSize:'0.86rem',fontWeight:300,color:T.mid,fontStyle:'italic',textAlign:'center',paddingTop:'0.5rem',marginTop:'0.4rem'}}>Type both names to see your numerology unfold.</p>
    )}
  </div>;
}

function Hero({go}){
  const words=['Sofia','James','Amara','Luca','Yuki','Elena'];
  const[wi,setWi]=useState(0);const[fade,setFade]=useState(true);
  useEffect(()=>{const t=setInterval(()=>{setFade(false);setTimeout(()=>{setWi(i=>(i+1)%words.length);setFade(true);},350);},2200);return()=>clearInterval(t);},[]);
  return <section style={{background:T.bg,minHeight:'100vh',display:'flex',alignItems:'center',padding:'9rem 2.5rem 5rem',maxWidth:1200,margin:'0 auto',gap:'4rem',flexWrap:'wrap'}}>
    <div style={{flex:'1 1 400px'}}>
      <Tag c="Sacred Naming · Est. with Intention"/>
      <h1 style={{fontFamily:PF,fontSize:'clamp(2.4rem,5.5vw,4.6rem)',fontWeight:500,color:T.ink,lineHeight:1.07,letterSpacing:'-0.02em',marginBottom:'1.4rem'}}>
        The name <em style={{color:T.accent,opacity:fade?1:0,transition:'opacity 0.35s'}}>{words[wi]}</em><br/>was always yours<br/>to give.
      </h1>
      <Body s={{maxWidth:440,marginBottom:'2rem'}}>A proprietary ritual weaving both parents' names through numerology, astrology, and sound — to surface the name your child was always meant to carry.</Body>
      <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginBottom:'1rem'}}>
        <Btn onClick={()=>go('packages')} filled>Book a Reading</Btn>
        <Btn onClick={()=>go('method')}>See How It Works</Btn>
      </div>
      <div onClick={()=>go('gift')} style={{display:'inline-flex',alignItems:'center',gap:'0.6rem',padding:'0.6rem 1.1rem',background:T.giftBg,border:`1px solid ${T.giftBorder}`,borderRadius:2,cursor:'pointer',marginBottom:'2.5rem'}}>
        <span>🎁</span><span style={{fontFamily:DM,fontSize:'0.82rem',color:T.gift}}>Give this as a baby shower gift →</span>
      </div>
      <div style={{display:'flex',gap:'2.5rem'}}>
        {[['6','Slots / month'],['4','Layers of analysis'],['3','Name candidates']].map(([n,l])=>
          <div key={l}><p style={{fontFamily:PF,fontSize:'1.9rem',fontWeight:500,color:T.ink}}>{n}</p><p style={{fontFamily:DM,fontSize:'0.73rem',color:T.mid,fontWeight:300}}>{l}</p></div>
        )}
      </div>
    </div>
    <div style={{flex:'1 1 320px'}}><LiveCard/></div>
  </section>;
}

function Story(){
  return <section id="story" style={{background:T.paper,padding:'5rem 2.5rem'}}>
    <HR/>
    <div style={{maxWidth:1100,margin:'0 auto',paddingTop:'4.5rem',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'4rem'}}>
      <div><Tag c="The Origin"/><h2 style={{fontFamily:PF,fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:500,color:T.ink,lineHeight:1.2}}>A name chosen across the ocean</h2></div>
      <div style={{display:'flex',flexDirection:'column',gap:'1.3rem'}}>
        <Body>My own name was not chosen by chance. It was given by someone in Japan — a gift carried across oceans, encoded with intention I spent years coming to understand. That name shaped who I became, the questions I asked, the path I walked.</Body>
        <Body>That experience introduced me to <strong style={{color:T.ink,fontWeight:500}}>kotodama</strong> — the Japanese understanding that words carry living energy. A name is not just a label. It is the first vibration a child receives.</Body>
        <div style={{padding:'1.8rem 2rem',background:T.accentBg,borderLeft:`3px solid ${T.accent}`,borderRadius:'0 2px 2px 0'}}>
          <p style={{fontFamily:PF,fontSize:'1.15rem',fontStyle:'italic',color:T.ink,lineHeight:1.72}}>"A name is the first gift you give your child. It will be spoken millions of times. It deserves to be chosen with intention."</p>
        </div>
      </div>
    </div>
  </section>;
}

function Why(){
  const cards=[
    {n:'01',t:'Numerological depth',d:'Numbers in a name create a frequency that shapes how a person moves through the world. We align your child\'s name to their life path.'},
    {n:'02',t:'Astrological resonance',d:'The birth chart is a map. The name we find honors that map — amplifying the gifts already written at birth.'},
    {n:'03',t:'Sound & phonetics',d:'The way a name sounds when spoken carries as much weight as its meaning. We choose names that feel right in the mouth and ear.'},
    {n:'04',t:'Pure intuition',d:'After all analysis, I sit quietly with your family\'s energy and feel the name. This is what no algorithm can replicate.'},
  ];
  return <section style={{padding:'5rem 2.5rem',background:T.bg}}>
    <HR/>
    <div style={{maxWidth:1100,margin:'0 auto',paddingTop:'4.5rem'}}>
      <div style={{marginBottom:'3rem'}}><Tag c="Why It Works"/><h2 style={{fontFamily:PF,fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:500,color:T.ink,lineHeight:1.2,maxWidth:360}}>Four layers. One name.</h2></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'1.4rem'}}>
        {cards.map(c=><div key={c.n} style={{padding:'2rem 1.7rem',background:T.paper,border:`1px solid ${T.border}`,borderRadius:3,transition:'all 0.25s'}}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 8px 28px rgba(26,22,18,0.08)';}}
          onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';}}>
          <p style={{fontFamily:DM,fontSize:'0.7rem',fontWeight:500,color:T.faint,letterSpacing:'0.1em',marginBottom:'1rem'}}>{c.n}</p>
          <p style={{fontFamily:PF,fontSize:'1.08rem',fontWeight:500,color:T.ink,marginBottom:'0.7rem'}}>{c.t}</p>
          <p style={{fontFamily:DM,fontSize:'0.93rem',fontWeight:300,color:T.inkSoft,lineHeight:1.8}}>{c.d}</p>
        </div>)}
      </div>
    </div>
  </section>;
}

function Method(){
  const[active,setActive]=useState(0);
  const steps=[
    {n:'I',t:'Numerological DNA',icon:'◎',short:'Extract core numbers from both parents\' names. Identify what\'s missing. Your child\'s name completes the family blueprint.',detail:'Every letter maps to a number 1–9. The sum gives the Expression number. Vowels give the Soul Urge. Consonants give the Personality. Together they reveal what a name truly carries.'},
    {n:'II',t:'Sound Alchemy',icon:'◈',short:'Listen to the sounds inside both parents\' names. The child\'s name echoes both when spoken — a sonic thread connecting three people.',detail:'This draws from kotodama. Soft labials (m, b, p) carry warmth. Fricatives (s, f) carry movement. Stops (k, t, d) carry clarity and strength. We listen for what your family needs.'},
    {n:'III',t:'Astrological Bridge',icon:'◇',short:'Your sun, moon and rising signs inform the elemental energy your family carries. The child\'s due date is the final celestial filter.',detail:'Earth signs suit grounded, rooted names. Water signs carry fluid, lyrical names. Fire signs resonate with strong bright sounds. Air signs bring versatility.'},
    {n:'IV',t:'The Intuitive Seal',icon:'✦',short:'When all layers converge, I sit quietly with your family\'s energy and feel which name carries the highest resonance.',detail:'After years of practice, certain names simply land differently. There is a quality of rightness — in the sound, the number, the feeling — that I have learned to trust.'},
  ];
  return <section id="method" style={{padding:'5rem 2.5rem',background:T.paper}}>
    <HR/>
    <div style={{maxWidth:1100,margin:'0 auto',paddingTop:'4.5rem'}}>
      <div style={{marginBottom:'3.5rem'}}><Tag c="The Method"/><h2 style={{fontFamily:PF,fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:500,color:T.ink,lineHeight:1.2}}>The Lineage Weave</h2></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'3rem',alignItems:'start'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'0.6rem'}}>
          {steps.map((s,i)=><div key={i} onClick={()=>setActive(i)} style={{padding:'1.3rem 1.5rem',borderRadius:3,border:`1.5px solid ${active===i?T.accent:T.border}`,background:active===i?T.accentBg:T.white,cursor:'pointer',transition:'all 0.25s'}}>
            <div style={{display:'flex',alignItems:'center',gap:'0.9rem'}}>
              <span style={{fontFamily:DM,fontSize:'0.68rem',color:active===i?T.accent:T.faint,fontWeight:500,minWidth:20}}>{s.n}</span>
              <span style={{fontSize:'0.95rem',color:active===i?T.accent:T.faint}}>{s.icon}</span>
              <p style={{fontFamily:PF,fontSize:'0.98rem',fontWeight:500,color:active===i?T.ink:T.mid}}>{s.t}</p>
            </div>
            {active===i&&<p style={{fontFamily:DM,fontSize:'0.88rem',fontWeight:300,color:T.inkSoft,lineHeight:1.8,marginTop:'0.8rem',paddingLeft:'2.5rem'}}>{s.short}</p>}
          </div>)}
        </div>
        <div style={{background:T.white,border:`1px solid ${T.border}`,borderRadius:4,padding:'2.2rem',position:'sticky',top:'7rem'}}>
          <p style={{fontFamily:DM,fontSize:'0.68rem',fontWeight:500,letterSpacing:'0.12em',textTransform:'uppercase',color:T.accent,marginBottom:'1rem'}}>Deep dive</p>
          <h3 style={{fontFamily:PF,fontSize:'1.2rem',fontWeight:500,color:T.ink,marginBottom:'0.9rem'}}>{steps[active].t}</h3>
          <Body s={{fontSize:'0.94rem'}}>{steps[active].detail}</Body>
        </div>
      </div>
    </div>
  </section>;
}

function Packages({go}){
  const pkgs=[
    {name:'The Weave',price:'$95',tag:'Foundational reading',pkg:'weave',dark:false,features:['Full Lineage Weave analysis','3 name candidates with meanings','Numerology breakdown per name','Astrological resonance notes','Kotodama sound reading','12-page PDF · 5–7 days']},
    {name:'The Weave + Ceremony',price:'$165',tag:'Most popular',pkg:'ceremony',dark:true,features:['Everything in The Weave','Print-ready naming certificate','Personal voice note from me','Naming ceremony guide','Delivered in 7 days']},
    {name:'The Heirloom',price:'$280',tag:'Complete experience',pkg:'heirloom',dark:false,features:['Everything in The Weave + Ceremony','Full ancestral numerology','Illustrated scroll document','Family numerology map','Unlimited revisions · 10–14 days']},
  ];
  return <section id="packages" style={{padding:'5rem 2.5rem',background:T.bg}}>
    <HR/>
    <div style={{maxWidth:1100,margin:'0 auto',paddingTop:'4.5rem'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'1.5rem',flexWrap:'wrap',gap:'1rem'}}>
        <div><Tag c="Offerings"/><h2 style={{fontFamily:PF,fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:500,color:T.ink,lineHeight:1.2}}>Choose your reading</h2></div>
        <p style={{fontFamily:DM,fontSize:'0.83rem',color:T.mid,fontWeight:300}}>Only 6 readings open per month.</p>
      </div>
      <div onClick={()=>go('gift')} style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem',padding:'1.2rem 1.8rem',background:T.giftBg,border:`1.5px solid ${T.giftBorder}`,borderRadius:3,marginBottom:'2rem',cursor:'pointer'}}>
        <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
          <span style={{fontSize:'1.4rem'}}>🎁</span>
          <div>
            <p style={{fontFamily:PF,fontSize:'1rem',fontWeight:500,color:T.gift}}>Giving this as a gift?</p>
            <p style={{fontFamily:DM,fontSize:'0.85rem',fontWeight:300,color:T.giftL}}>Perfect for baby showers. We handle the gifting experience for you.</p>
          </div>
        </div>
        <span style={{fontFamily:DM,fontSize:'0.8rem',fontWeight:500,color:T.gift}}>Gift this reading →</span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(285px,1fr))',gap:'1.5rem'}}>
        {pkgs.map((p,i)=><div key={i} style={{background:p.dark?T.dark:T.white,border:`1px solid ${p.dark?T.dark:T.border}`,borderRadius:3,padding:'2.5rem 2rem',display:'flex',flexDirection:'column',position:'relative',transition:'transform 0.25s,box-shadow 0.25s'}}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='0 16px 48px rgba(26,22,18,0.12)';}}
          onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';}}>
          {p.dark&&<div style={{position:'absolute',top:-1,left:'50%',transform:'translateX(-50%)',background:T.accent,color:T.white,fontSize:'0.6rem',fontWeight:500,letterSpacing:'0.12em',padding:'0.22rem 1.1rem',fontFamily:DM,textTransform:'uppercase',whiteSpace:'nowrap',borderRadius:'0 0 3px 3px'}}>Most Popular</div>}
          <p style={{fontFamily:DM,fontSize:'0.7rem',fontWeight:500,letterSpacing:'0.1em',textTransform:'uppercase',color:p.dark?T.accentL:T.accent,marginBottom:'0.4rem'}}>{p.tag}</p>
          <p style={{fontFamily:PF,fontSize:'1.25rem',fontWeight:500,color:p.dark?T.white:T.ink}}>{p.name}</p>
          <p style={{fontFamily:PF,fontSize:'2.1rem',fontWeight:500,color:p.dark?T.white:T.ink,margin:'1.2rem 0'}}>{p.price}</p>
          <ul style={{listStyle:'none',padding:0,flex:1,marginBottom:'1.8rem'}}>
            {p.features.map((f,j)=><li key={j} style={{fontFamily:DM,fontSize:'0.87rem',fontWeight:300,color:p.dark?'rgba(255,255,255,0.72)':T.inkSoft,padding:'0.45rem 0',borderBottom:`1px solid ${p.dark?'rgba(255,255,255,0.07)':T.border}`,display:'flex',gap:'0.55rem',alignItems:'baseline'}}>
              <span style={{color:p.dark?T.accentL:T.accent,fontSize:'0.52rem',flexShrink:0}}>●</span>{f}
            </li>)}
          </ul>
          <a href={`/questionnaire?pkg=${p.pkg}`} style={{display:'block',textAlign:'center',fontFamily:DM,fontSize:'0.77rem',fontWeight:500,padding:'0.88rem',borderRadius:2,border:`1.5px solid ${p.dark?'rgba(255,255,255,0.25)':T.accent}`,color:p.dark?T.white:T.accent,textDecoration:'none',transition:'all 0.2s'}}
            onMouseEnter={e=>{e.target.style.background=p.dark?'rgba(255,255,255,0.12)':T.accent;if(!p.dark)e.target.style.color=T.white;}}
            onMouseLeave={e=>{e.target.style.background='transparent';if(!p.dark)e.target.style.color=T.accent;}}>
            Book this reading
          </a>
        </div>)}
      </div>
    </div>
  </section>;
}

function GiftSection({giftRef}){
  const[occ,setOcc]=useState('Baby shower');
  const occasions=['Baby shower','Birth announcement','New parent gift','Gender reveal','Just because'];
  return <section ref={giftRef} id="gift" style={{padding:'5rem 2.5rem',background:T.giftBg,borderTop:`2px solid ${T.giftBorder}`}}>
    <div style={{maxWidth:1100,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'5rem',alignItems:'center'}}>
      <div>
        <Tag c="The Gift of a Name" gift/>
        <h2 style={{fontFamily:PF,fontSize:'clamp(1.6rem,3vw,2.5rem)',fontWeight:500,color:T.gift,lineHeight:1.2,marginBottom:'1.2rem'}}>The most meaningful baby shower gift they'll receive.</h2>
        <Body s={{marginBottom:'1.5rem'}}>While everyone else brings onesies, you give something that lasts a lifetime. A Kotodama reading is a gift that shapes who a child becomes.</Body>
        {[['🎀','Beautiful digital gift card','Delivered to your inbox instantly'],['✉️','Personal note included','Add your own message to the parents'],['🔒','No info needed from you','The parents fill in their own details'],['✨','Valid for 12 months','Redeemable anytime after purchase']].map(([icon,title,sub])=>
          <div key={title} style={{display:'flex',gap:'1rem',alignItems:'flex-start',padding:'0.9rem 1.1rem',background:T.white,borderRadius:3,border:`1px solid ${T.giftBorder}`,marginBottom:'0.7rem'}}>
            <span style={{fontSize:'1.1rem',flexShrink:0}}>{icon}</span>
            <div><p style={{fontFamily:DM,fontSize:'0.88rem',fontWeight:500,color:T.gift}}>{title}</p><p style={{fontFamily:DM,fontSize:'0.82rem',fontWeight:300,color:T.mid,marginTop:'0.1rem'}}>{sub}</p></div>
          </div>
        )}
        <a href="/questionnaire?pkg=ceremony&gift=true" style={{display:'inline-block',marginTop:'1rem',padding:'1rem 2.5rem',background:T.gift,color:T.white,fontFamily:DM,fontSize:'0.82rem',fontWeight:500,textDecoration:'none',borderRadius:2,border:`1.5px solid ${T.gift}`,transition:'all 0.2s'}}
          onMouseEnter={e=>e.target.style.background='#2d1f3a'}
          onMouseLeave={e=>e.target.style.background=T.gift}>
          🎁 Give This Reading
        </a>
      </div>
      <div>
        <div style={{background:T.white,borderRadius:6,padding:'2.5rem',border:`1.5px solid ${T.giftBorder}`,boxShadow:'0 8px 40px rgba(61,42,78,0.08)'}}>
          <p style={{fontFamily:DM,fontSize:'0.68rem',fontWeight:500,letterSpacing:'0.12em',textTransform:'uppercase',color:T.giftL,marginBottom:'1.3rem'}}>What's the occasion?</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.6rem',marginBottom:'2rem'}}>
            {occasions.map(o=><button key={o} onClick={()=>setOcc(o)} style={{fontFamily:DM,fontSize:'0.82rem',padding:'0.45rem 1rem',border:`1.5px solid ${occ===o?T.gift:T.giftBorder}`,borderRadius:20,background:occ===o?T.gift:'transparent',color:occ===o?T.white:T.gift,cursor:'pointer',transition:'all 0.2s'}}>{o}</button>)}
          </div>
          <div style={{background:`linear-gradient(135deg,${T.gift},#6B4C8E)`,borderRadius:4,padding:'2rem',color:T.white}}>
            <p style={{fontFamily:DM,fontSize:'0.65rem',fontWeight:500,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(255,255,255,0.5)',marginBottom:'0.5rem'}}>Gift of a Lifetime</p>
            <p style={{fontFamily:PF,fontSize:'1.4rem',fontWeight:500,lineHeight:1.3,marginBottom:'0.4rem'}}>Kotodama Naming</p>
            <p style={{fontFamily:DM,fontSize:'0.82rem',fontWeight:300,color:'rgba(255,255,255,0.7)',marginBottom:'1.5rem'}}>{occ} · The Weave + Ceremony</p>
            <div style={{borderTop:'1px solid rgba(255,255,255,0.15)',paddingTop:'1rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <p style={{fontFamily:DM,fontSize:'0.75rem',color:'rgba(255,255,255,0.5)'}}>Valid 12 months</p>
              <p style={{fontFamily:PF,fontSize:'1.2rem',color:T.accentL,fontWeight:500}}>$165</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}

function FAQ(){
  const[open,setOpen]=useState(null);
  const qs=[
    {q:"What if I don't believe in numerology?",a:"You don't need to. The process leads you to a name with a thoughtful, layered story behind it. Many clients start as skeptics."},
    {q:"My baby is already born. Can I still book?",a:"Absolutely. Post-birth readings are often the most precise. Many families also use this to validate a name already chosen, or to find a meaningful middle name."},
    {q:"Can I give this as a baby shower gift?",a:"Yes — it's one of the most popular ways people use Kotodama. You purchase the reading and the parents redeem it whenever they're ready."},
    {q:"I'm a single parent. Does this still work?",a:"Yes. We work with your name and whoever holds the most significant presence in the child's life. The Lineage Weave adapts to every family structure."},
    {q:"How long does the process take?",a:"The Weave: 5–7 days. The Weave + Ceremony: 7 days. The Heirloom: 10–14 days."},
    {q:"When do I pay?",a:"After you submit the questionnaire, I confirm your slot within 24 hours. Payment follows confirmation."},
  ];
  return <section style={{padding:'5rem 2.5rem',background:T.bg}}>
    <HR/>
    <div style={{maxWidth:1100,margin:'0 auto',paddingTop:'4.5rem',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'4rem',alignItems:'start'}}>
      <div><Tag c="Questions"/><h2 style={{fontFamily:PF,fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:500,color:T.ink,lineHeight:1.2}}>Common questions</h2></div>
      <div>{qs.map((item,i)=><div key={i} style={{borderBottom:`1px solid ${T.border}`,padding:'1.3rem 0',cursor:'pointer'}} onClick={()=>setOpen(open===i?null:i)}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'1rem'}}>
          <p style={{fontFamily:DM,fontSize:'0.95rem',fontWeight:400,color:open===i?T.accent:T.ink,transition:'color 0.2s'}}>{item.q}</p>
          <span style={{color:T.accent,fontSize:'1rem',display:'inline-block',transition:'transform 0.3s',transform:open===i?'rotate(45deg)':'rotate(0)',flexShrink:0}}>+</span>
        </div>
        {open===i&&<p style={{fontFamily:DM,fontSize:'0.92rem',fontWeight:300,color:T.mid,lineHeight:1.8,marginTop:'0.75rem'}}>{item.a}</p>}
      </div>)}</div>
    </div>
  </section>;
}

export default function Homepage(){
  const giftRef=useRef();
  const go=id=>{
    if(id==='gift'){giftRef.current?.scrollIntoView({behavior:'smooth'});return;}
    document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  };
  return <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
      html{scroll-behavior:smooth;}
      body{background:${T.bg};}
      ::-webkit-scrollbar{width:5px;}
      ::-webkit-scrollbar-thumb{background:${T.faint};border-radius:3px;}
      input:focus,select:focus,textarea:focus{border-color:${T.accent}!important;outline:none;}
      select option{background:${T.white};}
    `}</style>
    <Nav go={go}/>
    <div style={{background:T.bg}}>
      <Hero go={go}/>
      <Story/>
      <Why/>
      <Method/>
      <Packages go={go}/>
      <GiftSection giftRef={giftRef}/>
      <FAQ/>
      <footer style={{background:T.dark,padding:'3.5rem 2.5rem'}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1.5rem'}}>
          <div><p style={{fontFamily:PF,fontSize:'1rem',fontWeight:500,color:T.white,marginBottom:'0.2rem'}}>Kotodama Naming</p><p style={{fontFamily:DM,fontSize:'0.8rem',fontWeight:300,color:'rgba(255,255,255,0.38)',fontStyle:'italic'}}>Where sound meets soul</p></div>
          <p style={{fontFamily:DM,fontSize:'0.7rem',color:'rgba(255,255,255,0.22)'}}>© 2025 Kotodama Naming · All readings confidential</p>
        </div>
      </footer>
    </div>
  </>;
}
