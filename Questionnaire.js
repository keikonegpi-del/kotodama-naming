import { useState } from 'react';

const T = {
  bg:"#F7F4EF", ink:"#1A1612", inkSoft:"#3D3630",
  mid:"#7A6F65", faint:"#C8BFB4", accent:"#B8874A", accentL:"#D4A96A",
  accentBg:"#F2EAE0", border:"#E2D9CE", white:"#FFFFFF", dark:"#0F0D0B",
};
const PF = "'Playfair Display', Georgia, serif";
const DM = "'DM Sans', system-ui, sans-serif";

const PKGS = {
  weave:    'The Weave',
  ceremony: 'The Weave + Ceremony',
  heirloom: 'The Heirloom',
};

function getPkg(){
  try { const p=new URLSearchParams(window.location.search).get('pkg')||''; return PKGS[p]?p:'ceremony'; }
  catch { return 'ceremony'; }
}

const STEPS=[
  {title:'About the mother',           sub:'Her full birth name is the first thread of the weave.'},
  {title:'About the father',           sub:'Together, both names form the foundation.'},
  {title:'About your baby',            sub:'The due date guides the astrological reading.'},
  {title:'Your intentions',            sub:'What do you hope this name carries?'},
  {title:'Where to send your reading', sub:'Almost done — just your email so I can deliver.'},
];

const iB={fontFamily:DM,fontSize:'1rem',fontWeight:300,color:T.ink,background:T.white,border:`1.5px solid ${T.border}`,borderRadius:2,padding:'0.82rem 1rem',width:'100%',outline:'none',transition:'border-color 0.2s'};

function FI({label,note,...p}){
  return <div style={{display:'flex',flexDirection:'column',gap:'0.35rem'}}>
    {label&&<label style={{fontFamily:DM,fontSize:'0.7rem',fontWeight:500,letterSpacing:'0.1em',textTransform:'uppercase',color:T.mid}}>
      {label}{note&&<span style={{textTransform:'none',letterSpacing:0,fontWeight:300,color:T.faint,marginLeft:'0.4rem'}}>{note}</span>}
    </label>}
    <input {...p} style={iB} onFocus={e=>e.target.style.borderColor=T.accent} onBlur={e=>e.target.style.borderColor=T.border}/>
  </div>;
}
function FS({label,children,...p}){
  return <div style={{display:'flex',flexDirection:'column',gap:'0.35rem'}}>
    {label&&<label style={{fontFamily:DM,fontSize:'0.7rem',fontWeight:500,letterSpacing:'0.1em',textTransform:'uppercase',color:T.mid}}>{label}</label>}
    <select {...p} style={{...iB,color:p.value?T.ink:T.mid,background:T.white}} onFocus={e=>e.target.style.borderColor=T.accent} onBlur={e=>e.target.style.borderColor=T.border}>{children}</select>
  </div>;
}
function FT({label,...p}){
  return <div style={{display:'flex',flexDirection:'column',gap:'0.35rem'}}>
    {label&&<label style={{fontFamily:DM,fontSize:'0.7rem',fontWeight:500,letterSpacing:'0.1em',textTransform:'uppercase',color:T.mid}}>{label}</label>}
    <textarea {...p} style={{...iB,resize:'vertical',minHeight:110,...(p.style||{})}} onFocus={e=>e.target.style.borderColor=T.accent} onBlur={e=>e.target.style.borderColor=T.border}/>
  </div>;
}

export default function Questionnaire(){
  const [pkg]   = useState(getPkg());
  const [step,  setStep]  = useState(0);
  const [vis,   setVis]   = useState(true);
  const [dir,   setDir]   = useState(1);
  const [done,  setDone]  = useState(false);
  const [errors,setErrors]= useState({});
  const [d, setD] = useState({mb:'',mg:'',md:'',mt:'',mp:'',fb:'',fg:'',fd:'',ft:'',fp:'',cd:'',cs:'',cl:'',q:'',ln:'',an:'',her:'',cn:'',ce:''});
  const upd=k=>e=>{setD(p=>({...p,[k]:e.target.value}));setErrors(p=>({...p,[k]:''}));};
  const R2={display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'};

  const validate=()=>{
    const e={};
    if(step===0&&!d.mb.trim())e.mb='Full birth name is required.';
    if(step===1&&!d.fb.trim())e.fb='Full birth name is required.';
    if(step===4){if(!d.cn.trim())e.cn='Your name is required.';if(!d.ce.trim())e.ce='Email is required.';}
    setErrors(e);return Object.keys(e).length===0;
  };

  const go=(ns,nd=1)=>{
    if(nd===1&&!validate())return;
    setDir(nd);setVis(false);setTimeout(()=>{setStep(ns);setVis(true);},180);
  };

  const pkgName = PKGS[pkg];
  const slide={opacity:vis?1:0,transform:vis?'translateX(0)':`translateX(${dir*20}px)`,transition:'opacity 0.2s ease,transform 0.2s ease'};

  if(done) return(
    <div style={{minHeight:'100vh',background:T.bg,display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={{maxWidth:520,textAlign:'center'}}>
        <div style={{width:64,height:64,borderRadius:'50%',background:T.accentBg,border:`2px solid ${T.accent}`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 2rem',fontSize:'1.5rem'}}>✓</div>
        <h1 style={{fontFamily:PF,fontSize:'2rem',fontWeight:500,color:T.ink,marginBottom:'1rem'}}>Thank you, {d.cn.split(' ')[0]||'dear one'}.</h1>
        <p style={{fontFamily:DM,fontSize:'1rem',fontWeight:300,color:T.inkSoft,lineHeight:1.85,marginBottom:'1rem'}}>Your intake for <strong style={{fontWeight:500}}>{pkgName}</strong> has been received. I'll sit with your family's energy and begin the weave within 24 hours.</p>
        <p style={{fontFamily:DM,fontSize:'0.95rem',fontWeight:300,color:T.mid,marginBottom:'2rem'}}>Your reading will be delivered to <strong style={{fontWeight:400}}>{d.ce}</strong>.</p>
        <div style={{padding:'1.4rem 1.8rem',background:T.accentBg,borderRadius:3,border:`1px solid ${T.border}`}}>
          <p style={{fontFamily:PF,fontSize:'1.05rem',fontStyle:'italic',color:T.ink,lineHeight:1.7}}>"The weave has already begun."</p>
        </div>
      </div>
    </div>
  );

  return <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
      body{background:${T.bg};}
      input:focus,select:focus,textarea:focus{border-color:${T.accent}!important;outline:none;}
      select option{background:${T.white};}
    `}</style>

    {/* TOP BAR */}
    <div style={{position:'sticky',top:0,zIndex:100,background:'rgba(247,244,239,0.97)',borderBottom:`1px solid ${T.border}`,padding:'0.9rem 2rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <a href="/" style={{fontFamily:PF,fontSize:'0.95rem',fontWeight:500,color:T.ink,textDecoration:'none'}}>Kotodama Naming</a>
      <span style={{fontFamily:DM,fontSize:'0.75rem',fontWeight:400,color:T.mid,background:T.accentBg,padding:'0.3rem 0.9rem',borderRadius:20,border:`1px solid ${T.border}`}}>{pkgName}</span>
    </div>

    <div style={{maxWidth:640,margin:'0 auto',padding:'4rem 2rem 6rem'}}>
      {/* Header */}
      <div style={{marginBottom:'3rem',textAlign:'center'}}>
        <p style={{fontFamily:DM,fontSize:'0.68rem',fontWeight:500,letterSpacing:'0.14em',textTransform:'uppercase',color:T.accent,marginBottom:'0.6rem'}}>Your Sacred Intake</p>
        <h1 style={{fontFamily:PF,fontSize:'clamp(1.8rem,4vw,2.6rem)',fontWeight:500,color:T.ink,lineHeight:1.15,marginBottom:'0.8rem'}}>Let's begin the weave.</h1>
        <p style={{fontFamily:DM,fontSize:'0.95rem',fontWeight:300,color:T.mid,lineHeight:1.75,maxWidth:420,margin:'0 auto'}}>Five short steps. Everything here goes directly into your reading — nothing wasted, nothing repeated.</p>
      </div>

      {/* Progress bar */}
      <div style={{display:'flex',gap:5,marginBottom:'2.5rem'}}>
        {STEPS.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=step?T.accent:T.border,transition:'background 0.4s'}}/>)}
      </div>

      {/* Step */}
      <div style={slide}>
        <p style={{fontFamily:DM,fontSize:'0.68rem',fontWeight:500,letterSpacing:'0.1em',textTransform:'uppercase',color:T.faint,marginBottom:'0.3rem'}}>{step+1} of {STEPS.length}</p>
        <h2 style={{fontFamily:PF,fontSize:'1.5rem',fontWeight:500,color:T.ink,marginBottom:'0.3rem'}}>{STEPS[step].title}</h2>
        <p style={{fontFamily:DM,fontSize:'0.88rem',fontWeight:300,color:T.mid,marginBottom:'2rem'}}>{STEPS[step].sub}</p>

        {step===0&&<div style={{display:'flex',flexDirection:'column',gap:'1.1rem'}}>
          <div style={R2}>
            <div><FI label="Full birth name" note="(as on birth certificate)" placeholder="e.g. Sofia Elena Martínez" value={d.mb} onChange={upd('mb')}/>{errors.mb&&<p style={{fontFamily:DM,fontSize:'0.78rem',color:'#C0392B',marginTop:'0.3rem'}}>{errors.mb}</p>}</div>
            <FI label="Name you go by" placeholder="e.g. Sofia" value={d.mg} onChange={upd('mg')}/>
            <FI label="Date of birth" type="date" value={d.md} onChange={upd('md')}/>
            <FI label="Time of birth" note="(if known)" type="time" value={d.mt} onChange={upd('mt')}/>
          </div>
          <FI label="Place of birth" placeholder="e.g. Buenos Aires, Argentina" value={d.mp} onChange={upd('mp')}/>
          <div style={{padding:'1rem 1.2rem',background:T.accentBg,borderRadius:2,borderLeft:`3px solid ${T.accent}`}}>
            <p style={{fontFamily:DM,fontSize:'0.82rem',fontWeight:300,color:T.inkSoft,lineHeight:1.7}}>💡 Use the full name as given at birth — even if never used. It carries the original numerological signature.</p>
          </div>
        </div>}

        {step===1&&<div style={{display:'flex',flexDirection:'column',gap:'1.1rem'}}>
          <div style={R2}>
            <div><FI label="Full birth name" note="(as on birth certificate)" placeholder="e.g. James Michael O'Brien" value={d.fb} onChange={upd('fb')}/>{errors.fb&&<p style={{fontFamily:DM,fontSize:'0.78rem',color:'#C0392B',marginTop:'0.3rem'}}>{errors.fb}</p>}</div>
            <FI label="Name you go by" placeholder="e.g. James" value={d.fg} onChange={upd('fg')}/>
            <FI label="Date of birth" type="date" value={d.fd} onChange={upd('fd')}/>
            <FI label="Time of birth" note="(if known)" type="time" value={d.ft} onChange={upd('ft')}/>
          </div>
          <FI label="Place of birth" placeholder="e.g. Dublin, Ireland" value={d.fp} onChange={upd('fp')}/>
          <div style={{padding:'1rem 1.2rem',background:T.accentBg,borderRadius:2,borderLeft:`3px solid ${T.accent}`}}>
            <p style={{fontFamily:DM,fontSize:'0.82rem',fontWeight:300,color:T.inkSoft,lineHeight:1.7}}>💡 Single parent or same-sex couple? Use the name of whoever holds the second most significant energetic presence in the child's life.</p>
          </div>
        </div>}

        {step===2&&<div style={{display:'flex',flexDirection:'column',gap:'1.1rem'}}>
          <div style={R2}>
            <FI label="Due date or birth date" type="date" value={d.cd} onChange={upd('cd')}/>
            <FS label="Baby's sex" value={d.cs} onChange={upd('cs')}>
              <option value="">— Select —</option>
              <option>Girl</option><option>Boy</option><option>Unknown / Surprise</option><option>Non-binary / Open</option>
            </FS>
          </div>
          <FI label="Last name(s) the child will carry" placeholder="e.g. O'Brien-Martínez" value={d.cl} onChange={upd('cl')}/>
          <div style={{padding:'1rem 1.2rem',background:T.accentBg,borderRadius:2,borderLeft:`3px solid ${T.accent}`}}>
            <p style={{fontFamily:DM,fontSize:'0.82rem',fontWeight:300,color:T.inkSoft,lineHeight:1.7}}>💡 Baby already born? Use the birth date. Not yet? The due date is your best astrological anchor — we can refine after birth if needed.</p>
          </div>
        </div>}

        {step===3&&<div style={{display:'flex',flexDirection:'column',gap:'1.3rem'}}>
          <FT label="What qualities do you hope this name carries?" placeholder="e.g. strength, warmth, creativity, a connection to nature, resilience..." value={d.q} onChange={upd('q')} style={{minHeight:120}}/>
          <FT label="Any names you're already drawn to?" placeholder="Share freely — these are clues, not commitments. Even sounds or letters you love are helpful." value={d.ln} onChange={upd('ln')} style={{minHeight:90}}/>
          <FI label="Any names or sounds to avoid?" placeholder="e.g. names of family members, sounds that feel wrong" value={d.an} onChange={upd('an')}/>
          <FI label="Cultural or linguistic heritage to honor" placeholder="e.g. Irish, Japanese, Yoruba, Hebrew, Indigenous, Latin..." value={d.her} onChange={upd('her')}/>
          <div style={{padding:'1rem 1.2rem',background:T.accentBg,borderRadius:2,borderLeft:`3px solid ${T.accent}`}}>
            <p style={{fontFamily:DM,fontSize:'0.82rem',fontWeight:300,color:T.inkSoft,lineHeight:1.7}}>💡 Don't overthink this. Write from the heart — a feeling, a hope, even a single word is enough.</p>
          </div>
        </div>}

        {step===4&&<div style={{display:'flex',flexDirection:'column',gap:'1.1rem'}}>
          <div style={R2}>
            <div><FI label="Your name" placeholder="How should I address you?" value={d.cn} onChange={upd('cn')}/>{errors.cn&&<p style={{fontFamily:DM,fontSize:'0.78rem',color:'#C0392B',marginTop:'0.3rem'}}>{errors.cn}</p>}</div>
            <div><FI label="Email address" type="email" placeholder="Where to send your reading" value={d.ce} onChange={upd('ce')}/>{errors.ce&&<p style={{fontFamily:DM,fontSize:'0.78rem',color:'#C0392B',marginTop:'0.3rem'}}>{errors.ce}</p>}</div>
          </div>
          {/* Summary */}
          <div style={{background:T.white,border:`1px solid ${T.border}`,borderRadius:3,padding:'1.4rem 1.6rem',marginTop:'0.5rem'}}>
            <p style={{fontFamily:DM,fontSize:'0.68rem',fontWeight:500,letterSpacing:'0.1em',textTransform:'uppercase',color:T.faint,marginBottom:'1rem'}}>Your reading summary</p>
            {[['Package',pkgName],['Mother',d.mg||d.mb.split(' ')[0]||'—'],['Father',d.fg||d.fb.split(' ')[0]||'—'],['Baby',d.cs||'—'],['Due / Born',d.cd||'—']].map(([l,v])=>
              <div key={l} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.45rem 0',borderBottom:`1px solid ${T.border}`}}>
                <span style={{fontFamily:DM,fontSize:'0.82rem',fontWeight:300,color:T.mid}}>{l}</span>
                <span style={{fontFamily:DM,fontSize:'0.82rem',fontWeight:400,color:T.ink}}>{v}</span>
              </div>
            )}
          </div>
          <div style={{padding:'1rem 1.2rem',background:T.accentBg,borderRadius:2,borderLeft:`3px solid ${T.accent}`}}>
            <p style={{fontFamily:DM,fontSize:'0.82rem',fontWeight:300,color:T.inkSoft,lineHeight:1.7}}>I'll begin your reading within 24 hours and deliver it directly to your inbox.</p>
          </div>
        </div>}
      </div>

      {/* Nav buttons */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'2.5rem',paddingTop:'1.5rem',borderTop:`1px solid ${T.border}`}}>
        {step>0
          ?<button onClick={()=>go(step-1,-1)} style={{fontFamily:DM,fontSize:'0.82rem',fontWeight:400,padding:'0.75rem 1.5rem',cursor:'pointer',border:`1.5px solid ${T.border}`,borderRadius:2,background:'transparent',color:T.mid,transition:'all 0.2s'}}
            onMouseEnter={e=>{e.target.style.borderColor=T.accent;e.target.style.color=T.accent;}}
            onMouseLeave={e=>{e.target.style.borderColor=T.border;e.target.style.color=T.mid;}}>← Back</button>
          :<div/>
        }
        {step<STEPS.length-1
          ?<button onClick={()=>go(step+1,1)} style={{fontFamily:DM,fontSize:'0.82rem',fontWeight:500,padding:'0.85rem 2.2rem',cursor:'pointer',border:`1.5px solid ${T.accent}`,borderRadius:2,background:T.accent,color:T.white,transition:'all 0.2s'}}
            onMouseEnter={e=>e.target.style.background=T.accentL}
            onMouseLeave={e=>e.target.style.background=T.accent}>Continue →</button>
          :<button onClick={()=>{if(!validate())return;setDone(true);}} style={{fontFamily:DM,fontSize:'0.85rem',fontWeight:500,padding:'0.95rem 2.5rem',cursor:'pointer',border:`1.5px solid ${T.dark}`,borderRadius:2,background:T.dark,color:T.white,transition:'all 0.2s'}}
            onMouseEnter={e=>e.target.style.background='#2a2420'}
            onMouseLeave={e=>e.target.style.background=T.dark}>Send my intake ✦</button>
        }
      </div>

      {/* Dots */}
      <div style={{display:'flex',justifyContent:'center',gap:'6px',marginTop:'2rem'}}>
        {STEPS.map((_,i)=><div key={i} style={{width:i===step?20:6,height:6,borderRadius:3,background:i===step?T.accent:T.border,transition:'all 0.3s'}}/>)}
      </div>
    </div>
  </>;
}
