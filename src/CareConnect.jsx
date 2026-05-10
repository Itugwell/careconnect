import { useState } from "react";

const C = {
  cream:"#FDF6EC",warm:"#FFFAF4",sage:"#3D7A56",sageMid:"#5A9970",sageLight:"#7DB896",sagePale:"#EAF4EE",
  amber:"#C97A3A",amberLight:"#E49550",amberPale:"#FEF0E3",charcoal:"#222220",stone:"#6B6560",
  mist:"#C5BBB2",card:"#FFFFFF",border:"#EDE5DA",
};

const PROVIDERS = [
  {id:1,name:"Margaret Osei",type:"child",rating:4.9,reviews:47,distance:"0.8 mi",price:18,years:12,badge:"Background Checked",avatar:"MO",specialty:"Infant & Toddler Care",available:"Mon–Fri",bio:"I've been caring for little ones for over 12 years. Specializing in infants and toddlers, I bring a warm, nurturing approach. CPR certified and bilingual (English/French).",nextAvail:"Tomorrow"},
  {id:2,name:"James Thornton",type:"elderly",rating:4.8,reviews:63,distance:"1.2 mi",price:22,years:8,badge:"CPR Certified",avatar:"JT",specialty:"Alzheimer's & Memory Care",available:"Flexible",bio:"Former hospital aide with 8 years in elder care. I specialize in memory care and dementia support, creating calm and structured routines for my clients.",nextAvail:"Today"},
  {id:3,name:"Priya Sharma",type:"child",rating:5.0,reviews:31,distance:"2.1 mi",price:20,years:6,badge:"First Aid Certified",avatar:"PS",specialty:"School-Age & Homework Help",available:"Afternoons",bio:"Certified educator and nanny with a passion for learning. I help school-age kids with homework, creative activities, and building independence.",nextAvail:"Wed"},
  {id:4,name:"Dorothy Reyes",type:"elderly",rating:4.7,reviews:88,distance:"0.5 mi",price:19,years:15,badge:"Nursing Background",avatar:"DR",specialty:"Post-Surgery Recovery",available:"Weekends",bio:"15 years in elder care and post-surgical recovery. I provide compassionate, professional support to help seniors heal safely at home.",nextAvail:"Sat"},
  {id:5,name:"Kofi Williams",type:"child",rating:4.8,reviews:22,distance:"3.0 mi",price:16,years:4,badge:"Background Checked",avatar:"KW",specialty:"Special Needs Support",available:"Full-time",bio:"Trained in ABA therapy and special needs care. I create safe, joyful environments for children with diverse abilities.",nextAvail:"Tomorrow"},
  {id:6,name:"Helen Nakamura",type:"elderly",rating:4.9,reviews:54,distance:"1.8 mi",price:24,years:11,badge:"RN Licensed",avatar:"HN",specialty:"Companion & Mobility Care",available:"Mon–Sat",bio:"Registered nurse turned in-home elder care specialist. I combine medical expertise with genuine warmth to support seniors staying independent at home.",nextAvail:"Today"},
];

const REVIEWS = {
  1:[{name:"Sarah K.",date:"Apr 2026",stars:5,text:"Margaret is absolutely wonderful with our 8-month-old. She's calm, attentive, and our baby lights up whenever she arrives!"},{name:"David L.",date:"Mar 2026",stars:5,text:"We've used Margaret for 6 months. She's reliable, caring, and treats our kids like her own."},{name:"Amara J.",date:"Feb 2026",stars:4,text:"Great with the kids. Quality of care is fantastic."}],
  2:[{name:"Linda T.",date:"Apr 2026",stars:5,text:"James has been a godsend for our father. Patient, professional, and always puts Dad's dignity first."},{name:"Michael B.",date:"Mar 2026",stars:5,text:"We couldn't ask for better elder care. James created routines that improved our mother's quality of life."}],
  3:[{name:"Raj P.",date:"Apr 2026",stars:5,text:"Priya is exceptional. Our daughter's grades improved and she actually looks forward to homework time!"}],
  4:[{name:"Carlos M.",date:"Mar 2026",stars:5,text:"Dorothy helped my mom recover after her hip replacement. Professional, warm, and incredibly competent."}],
  5:[{name:"Angela F.",date:"Apr 2026",stars:5,text:"Kofi is amazing with our son who has autism. Patient, consistent, and truly understands special needs."}],
  6:[{name:"Tom Y.",date:"Apr 2026",stars:5,text:"Helen is phenomenal — a nurse who genuinely cares. That combination is rare and invaluable."}],
};

const PLANS = [
  {id:"starter",name:"Starter",price:29,color:C.sage,pale:C.sagePale,features:["Search listing","Basic profile","3 photos","SMS inquiries","Monthly report"]},
  {id:"pro",name:"Professional",price:59,color:C.amber,pale:C.amberPale,popular:true,features:["Priority placement","Video bio","Unlimited photos","Direct messaging","Weekly analytics","Background check badge","Review management"]},
  {id:"elite",name:"Elite",price:99,color:C.charcoal,pale:"#F5F5F0",features:["Top of every search","Elite badge","Instant booking","Dedicated support","Social promotion","Insurance seal","Priority notifications"]},
];

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function Stars({n,size=13}){return <span style={{color:C.amber,fontSize:size,letterSpacing:"1px"}}>{"★".repeat(Math.floor(n))}<span style={{color:C.mist}}>{"☆".repeat(5-Math.floor(n))}</span></span>;}
function Avatar({initials,type,size=52}){const bg=type==="child"?`linear-gradient(135deg,${C.sageMid},${C.sage})`:`linear-gradient(135deg,${C.amberLight},${C.amber})`;return <div style={{width:size,height:size,borderRadius:"50%",background:bg,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:size*0.28,fontFamily:"'Playfair Display',serif",flexShrink:0,boxShadow:"0 2px 10px rgba(0,0,0,0.15)"}}>{initials}</div>;}
function Pill({children,color=C.sage,bg=C.sagePale}){return <span style={{background:bg,color,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>{children}</span>;}
function Btn({children,onClick,variant="primary",full,style={}}){
  const v={primary:{background:C.sage,color:"#fff"},amber:{background:C.amber,color:"#fff"},ghost:{background:"#F0EBE3",color:C.stone},outline:{background:"transparent",color:C.sage,border:`1.5px solid ${C.sage}`}};
  return <button onClick={onClick} style={{border:"none",borderRadius:10,fontWeight:700,cursor:"pointer",padding:"11px 20px",fontSize:13,fontFamily:"inherit",transition:"opacity 0.15s,transform 0.1s",width:full?"100%":"auto",...v[variant],...style}}
    onMouseEnter={e=>{e.currentTarget.style.opacity="0.84";e.currentTarget.style.transform="translateY(-1px)"}}
    onMouseLeave={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.transform="translateY(0)"}}
  >{children}</button>;
}
function Inp({label,...props}){return <div style={{marginBottom:13}}>{label&&<label style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.6px",color:C.stone,display:"block",marginBottom:5}}>{label}</label>}<input style={{width:"100%",padding:"10px 13px",border:`1px solid ${C.border}`,borderRadius:9,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit",...props.style}} {...props}/></div>;}

// ── BOOKING MODAL ──────────────────────────────────────────────────────────────
function BookingModal({provider,onClose}){
  const today=new Date();
  const [month,setMonth]=useState(today.getMonth());
  const [year,setYear]=useState(today.getFullYear());
  const [day,setDay]=useState(null);
  const [time,setTime]=useState(null);
  const [hours,setHours]=useState(3);
  const [step,setStep]=useState(1);
  const [name,setName]=useState("");const [email,setEmail]=useState("");const [notes,setNotes]=useState("");
  const [cardNum,setCardNum]=useState("");const [expiry,setExpiry]=useState("");const [cvv,setCvv]=useState("");
  const [done,setDone]=useState(false);
  const firstDay=new Date(year,month,1).getDay();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const unavail=[3,7,14,21,22];
  const times=["8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];
  const subtotal=(provider.price*hours).toFixed(2);
  const fee=(subtotal*0.029+0.30).toFixed(2);
  const total=(+subtotal+ +fee).toFixed(2);
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(34,34,32,0.62)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:14,overflowY:"auto"}} onClick={onClose}>
      <div style={{background:C.card,borderRadius:22,padding:26,maxWidth:460,width:"100%",boxShadow:"0 24px 80px rgba(0,0,0,0.28)",margin:"auto",maxHeight:"94vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:800}}>Book {provider.name.split(" ")[0]}</div><div style={{fontSize:11,color:C.stone}}>Step {step} of 4</div></div>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,color:C.stone,cursor:"pointer"}}>✕</button>
        </div>
        <div style={{display:"flex",gap:4,marginBottom:22}}>{[1,2,3,4].map(s=><div key={s} style={{flex:1,height:3,borderRadius:2,background:s<=step?C.sage:C.border,transition:"background 0.3s"}}/>)}</div>

        {step===1&&<>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <button onClick={()=>{if(month===0){setMonth(11);setYear(y=>y-1)}else setMonth(m=>m-1)}} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:C.stone,padding:"4px 8px"}}>‹</button>
            <span style={{fontWeight:700,fontSize:14}}>{months[month]} {year}</span>
            <button onClick={()=>{if(month===11){setMonth(0);setYear(y=>y+1)}else setMonth(m=>m+1)}} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:C.stone,padding:"4px 8px"}}>›</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:18}}>
            {dayNames.map(d=><div key={d} style={{textAlign:"center",fontSize:9,fontWeight:700,color:C.mist,padding:"3px 0",textTransform:"uppercase"}}>{d}</div>)}
            {Array(firstDay).fill(null).map((_,i)=><div key={`e${i}`}/>)}
            {Array(daysInMonth).fill(null).map((_,i)=>{const d=i+1;const isPast=new Date(year,month,d)<new Date(today.getFullYear(),today.getMonth(),today.getDate());const isUnavail=unavail.includes(d);const isSel=day===d;return<button key={d} onClick={()=>!isPast&&!isUnavail&&setDay(d)} style={{padding:"7px 0",border:"none",borderRadius:7,fontSize:12,fontWeight:isSel?700:400,cursor:isPast||isUnavail?"not-allowed":"pointer",background:isSel?C.sage:"transparent",color:isSel?"#fff":isPast||isUnavail?C.mist:C.charcoal,textDecoration:isUnavail?"line-through":"none"}}>{d}</button>;})}
          </div>
          {day&&<>
            <div style={{fontWeight:700,fontSize:12,marginBottom:8,color:C.charcoal}}>Select a time</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:5,marginBottom:16}}>
              {times.map(t=><button key={t} onClick={()=>setTime(t)} style={{padding:"7px 2px",border:`1.5px solid ${time===t?C.sage:C.border}`,borderRadius:7,background:time===t?C.sagePale:"#fff",color:time===t?C.sage:C.stone,fontSize:10,fontWeight:600,cursor:"pointer"}}>{t}</button>)}
            </div>
            <div style={{marginBottom:16}}>
              <div style={{fontWeight:700,fontSize:12,marginBottom:8}}>Duration</div>
              <div style={{display:"flex",gap:5}}>{[1,2,3,4,6,8].map(h=><button key={h} onClick={()=>setHours(h)} style={{flex:1,padding:"7px 2px",border:`1.5px solid ${hours===h?C.sage:C.border}`,borderRadius:7,background:hours===h?C.sagePale:"#fff",color:hours===h?C.sage:C.stone,fontSize:12,fontWeight:600,cursor:"pointer"}}>{h}h</button>)}</div>
            </div>
            {time&&<div style={{background:C.sagePale,borderRadius:9,padding:"11px 14px",marginBottom:16,display:"flex",justifyContent:"space-between",fontSize:12}}><span style={{color:C.sage}}>{months[month]} {day} · {time} · {hours}h</span><span style={{fontWeight:800,color:C.charcoal}}>${subtotal}</span></div>}
          </>}
          <Btn onClick={()=>day&&time&&setStep(2)} full variant="primary" style={{opacity:day&&time?1:0.4}}>Continue →</Btn>
        </>}

        {step===2&&<>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,marginBottom:16}}>Your Details</div>
          <Inp label="Full Name" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/>
          <Inp label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@example.com"/>
          <Inp label="Phone" type="tel" placeholder="(555) 000-0000"/>
          <div style={{marginBottom:14}}><label style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.6px",color:C.stone,display:"block",marginBottom:5}}>Notes</label><textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Allergies, special instructions, etc." style={{width:"100%",padding:"10px 13px",border:`1px solid ${C.border}`,borderRadius:9,fontSize:14,outline:"none",minHeight:70,resize:"vertical",boxSizing:"border-box",fontFamily:"inherit"}}/></div>
          <div style={{background:C.sagePale,borderRadius:9,padding:"10px 14px",marginBottom:16,fontSize:12,color:C.sage}}>📅 {months[month]} {day} · {time} · {hours}h with {provider.name}</div>
          <div style={{display:"flex",gap:8}}><Btn onClick={()=>setStep(1)} variant="ghost" style={{flex:1}}>← Back</Btn><Btn onClick={()=>name&&email&&setStep(3)} variant="primary" style={{flex:2,opacity:name&&email?1:0.4}}>Continue →</Btn></div>
        </>}

        {step===3&&<>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,marginBottom:4}}>Secure Payment</div>
          <div style={{fontSize:11,color:C.stone,marginBottom:16,display:"flex",alignItems:"center",gap:4}}><span style={{color:C.sage}}>🔒</span>Powered by Stripe · 256-bit SSL</div>
          <div style={{background:"#F9F6F2",borderRadius:10,padding:"13px 15px",marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:12}}><span style={{color:C.stone}}>{hours}h × ${provider.price}/hr</span><span style={{fontWeight:600}}>${subtotal}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:12}}><span style={{color:C.stone}}>Stripe processing fee</span><span style={{fontWeight:600}}>${fee}</span></div>
            <div style={{borderTop:`1px solid ${C.border}`,marginTop:8,paddingTop:8,display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:700,fontSize:13}}>Total</span><span style={{fontWeight:800,fontSize:15,color:C.charcoal}}>${total}</span></div>
          </div>
          <div style={{border:`1px solid ${C.border}`,borderRadius:11,overflow:"hidden",marginBottom:13}}>
            <div style={{padding:"11px 13px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:8}}><span>💳</span><input value={cardNum} onChange={e=>setCardNum(e.target.value.replace(/\D/g,"").slice(0,16).replace(/(\d{4})/g,"$1 ").trim())} placeholder="Card number" style={{border:"none",outline:"none",flex:1,fontSize:13,fontFamily:"inherit",background:"transparent"}}/><span style={{fontSize:10,color:C.mist}}>VISA MC AMEX</span></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",borderBottom:`1px solid ${C.border}`}}><input value={expiry} onChange={e=>setExpiry(e.target.value)} placeholder="MM / YY" style={{padding:"11px 13px",border:"none",outline:"none",fontSize:13,fontFamily:"inherit",borderRight:`1px solid ${C.border}`}}/><input value={cvv} onChange={e=>setCvv(e.target.value)} placeholder="CVV" style={{padding:"11px 13px",border:"none",outline:"none",fontSize:13,fontFamily:"inherit"}}/></div>
            <input placeholder="Name on card" style={{width:"100%",padding:"11px 13px",border:"none",outline:"none",fontSize:13,fontFamily:"inherit",boxSizing:"border-box"}}/>
          </div>
          <div style={{background:C.amberPale,borderRadius:9,padding:"9px 13px",marginBottom:14,fontSize:11,color:C.amber,display:"flex",gap:6}}><span>ℹ️</span><span>Prototype — no real charge. Add your Stripe key to go live.</span></div>
          <div style={{display:"flex",gap:8}}><Btn onClick={()=>setStep(2)} variant="ghost" style={{flex:1}}>← Back</Btn><Btn onClick={()=>setStep(4)} variant="amber" style={{flex:2}}>🔒 Pay ${total}</Btn></div>
        </>}

        {step===4&&<div style={{textAlign:"center",padding:"14px 0"}}>
          <div style={{width:60,height:60,background:C.sagePale,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 14px"}}>✅</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:21,fontWeight:800,marginBottom:8}}>Booking Confirmed!</div>
          <div style={{color:C.stone,fontSize:13,lineHeight:1.7,marginBottom:18}}>Your session with <strong>{provider.name}</strong> on <strong>{months[month]} {day}</strong> at <strong>{time}</strong> is confirmed. Check your email for details.</div>
          <div style={{background:C.sagePale,borderRadius:11,padding:"14px",marginBottom:18,textAlign:"left"}}>
            {[["Provider",provider.name],["Date",`${months[month]} ${day}, ${year}`],["Time",time],["Duration",`${hours} hours`],["Total Paid",`$${total}`]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}><span style={{color:C.stone}}>{k}</span><span style={{fontWeight:600}}>{v}</span></div>
            ))}
          </div>
          <Btn onClick={onClose} full variant="primary">Done</Btn>
        </div>}
      </div>
    </div>
  );
}

// ── REVIEWS MODAL ──────────────────────────────────────────────────────────────
function ReviewsModal({provider,onClose}){
  const reviews=REVIEWS[provider.id]||[];
  const [showForm,setShowForm]=useState(false);
  const [hover,setHover]=useState(0);
  const [myStars,setMyStars]=useState(0);
  const [myText,setMyText]=useState("");
  const [done,setDone]=useState(false);
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(34,34,32,0.62)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:14,overflowY:"auto"}} onClick={onClose}>
      <div style={{background:C.card,borderRadius:22,padding:26,maxWidth:460,width:"100%",boxShadow:"0 24px 80px rgba(0,0,0,0.28)",margin:"auto",maxHeight:"88vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:800}}>Reviews</div><div style={{fontSize:12,color:C.stone,marginTop:2}}><Stars n={provider.rating}/> {provider.rating} · {reviews.length} reviews</div></div>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,color:C.stone,cursor:"pointer"}}>✕</button>
        </div>
        {reviews.map((r,i)=>(
          <div key={i} style={{borderBottom:`1px solid ${C.border}`,paddingBottom:14,marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <div style={{display:"flex",alignItems:"center",gap:9}}>
                <div style={{width:34,height:34,borderRadius:"50%",background:`linear-gradient(135deg,${C.sageLight},${C.sage})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:13}}>{r.name[0]}</div>
                <div><div style={{fontWeight:700,fontSize:13}}>{r.name}</div><div style={{fontSize:10,color:C.mist}}>{r.date}</div></div>
              </div>
              <Stars n={r.stars} size={11}/>
            </div>
            <p style={{fontSize:13,color:C.stone,lineHeight:1.6,margin:0}}>{r.text}</p>
          </div>
        ))}
        {!showForm&&!done&&<Btn onClick={()=>setShowForm(true)} variant="outline" full>✍️ Write a Review</Btn>}
        {showForm&&!done&&<div>
          <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>Your Rating</div>
          <div style={{display:"flex",gap:4,marginBottom:13}}>{[1,2,3,4,5].map(s=><button key={s} onMouseEnter={()=>setHover(s)} onMouseLeave={()=>setHover(0)} onClick={()=>setMyStars(s)} style={{background:"none",border:"none",fontSize:26,cursor:"pointer",color:(hover||myStars)>=s?C.amber:C.border,padding:0,transition:"color 0.1s"}}>★</button>)}</div>
          <div style={{marginBottom:13}}><label style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.6px",color:C.stone,display:"block",marginBottom:5}}>Your Review</label><textarea value={myText} onChange={e=>setMyText(e.target.value)} placeholder="Share your experience…" style={{width:"100%",padding:"10px 13px",border:`1px solid ${C.border}`,borderRadius:9,fontSize:13,outline:"none",minHeight:80,resize:"vertical",boxSizing:"border-box",fontFamily:"inherit"}}/></div>
          <div style={{display:"flex",gap:8}}><Btn onClick={()=>setShowForm(false)} variant="ghost" style={{flex:1}}>Cancel</Btn><Btn onClick={()=>myStars&&myText&&setDone(true)} variant="primary" style={{flex:2,opacity:myStars&&myText?1:0.4}}>Submit</Btn></div>
        </div>}
        {done&&<div style={{textAlign:"center",padding:"14px 0",color:C.sage}}><div style={{fontSize:30,marginBottom:8}}>🙏</div><div style={{fontWeight:700}}>Thanks for your review!</div><div style={{fontSize:12,color:C.stone,marginTop:3}}>It helps families find the right care.</div></div>}
      </div>
    </div>
  );
}

// ── PROVIDER PROFILE MODAL ─────────────────────────────────────────────────────
function ProfileModal({provider,onClose,onBook,onReviews}){
  const reviews=REVIEWS[provider.id]||[];
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(34,34,32,0.62)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:14,overflowY:"auto"}} onClick={onClose}>
      <div style={{background:C.card,borderRadius:22,maxWidth:460,width:"100%",boxShadow:"0 24px 80px rgba(0,0,0,0.28)",margin:"auto",maxHeight:"90vh",overflow:"hidden",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
        <div style={{background:provider.type==="child"?`linear-gradient(135deg,${C.sagePale},${C.sageMid}22)`:`linear-gradient(135deg,${C.amberPale},${C.amberLight}22)`,padding:"24px 24px 18px",position:"relative",flexShrink:0}}>
          <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"rgba(255,255,255,0.8)",border:"none",borderRadius:"50%",width:30,height:30,fontSize:15,cursor:"pointer",color:C.stone}}>✕</button>
          <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
            <Avatar initials={provider.avatar} type={provider.type} size={60}/>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:800,color:C.charcoal}}>{provider.name}</div>
              <div style={{fontSize:11,color:provider.type==="child"?C.sage:C.amber,fontWeight:700,marginTop:2,textTransform:"uppercase",letterSpacing:"0.7px"}}>{provider.type==="child"?"👶 Child Care":"🤝 Elder Care"}</div>
              <div style={{display:"flex",alignItems:"center",gap:6,marginTop:5}}>
                <Stars n={provider.rating}/>
                <span onClick={e=>{e.stopPropagation();onReviews(provider)}} style={{fontSize:11,color:C.stone,cursor:"pointer",textDecoration:"underline"}}>{provider.rating} ({provider.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:12}}>
            <Pill color={provider.type==="child"?C.sage:C.amber} bg={provider.type==="child"?C.sagePale:C.amberPale}>{provider.badge}</Pill>
            <Pill color={C.stone} bg="#F0EBE3">📍 {provider.distance}</Pill>
            <Pill color={C.stone} bg="#F0EBE3">🕐 {provider.available}</Pill>
            <Pill color={C.stone} bg="#F0EBE3">{provider.years} yrs exp</Pill>
          </div>
        </div>
        <div style={{padding:"18px 24px 24px",overflowY:"auto"}}>
          <div style={{marginBottom:16}}><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>About</div><p style={{fontSize:13,color:C.stone,lineHeight:1.7,margin:0}}>{provider.bio}</p></div>
          <div style={{background:C.sagePale,borderRadius:11,padding:"13px 15px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:11,color:C.stone}}>Hourly Rate</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:800,color:C.charcoal}}>${provider.price}<span style={{fontSize:13,fontWeight:400,color:C.stone}}>/hr</span></div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.stone}}>Next Available</div><div style={{fontWeight:700,color:C.sage,marginTop:2}}>{provider.nextAvail}</div></div>
          </div>
          {reviews.length>0&&<div style={{marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><div style={{fontWeight:700,fontSize:13}}>Recent Reviews</div><span onClick={()=>onReviews(provider)} style={{fontSize:11,color:C.sage,cursor:"pointer",fontWeight:600}}>See all →</span></div>
            <div style={{background:"#F9F6F2",borderRadius:9,padding:"11px 13px"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontWeight:600,fontSize:12}}>{reviews[0].name}</span><Stars n={reviews[0].stars} size={11}/></div><p style={{fontSize:12,color:C.stone,margin:0,lineHeight:1.6}}>"{reviews[0].text}"</p></div>
          </div>}
          <div style={{display:"flex",gap:8}}><Btn onClick={()=>onReviews(provider)} variant="outline" style={{flex:1}}>Reviews</Btn><Btn onClick={()=>onBook(provider)} variant="primary" style={{flex:2}}>📅 Book Now</Btn></div>
        </div>
      </div>
    </div>
  );
}

// ── SIGNUP MODAL ──────────────────────────────────────────────────────────────
function SignupModal({onClose}){
  const [step,setStep]=useState(1);
  const [plan,setPlan]=useState(null);
  const [type,setType]=useState("");
  const [done,setDone]=useState(false);
  const [cardNum,setCardNum]=useState("");
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(34,34,32,0.62)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:14,overflowY:"auto"}} onClick={onClose}>
      <div style={{background:C.card,borderRadius:22,padding:26,maxWidth:500,width:"100%",boxShadow:"0 24px 80px rgba(0,0,0,0.28)",margin:"auto",maxHeight:"94vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:800}}>Become a Provider</div><div style={{fontSize:11,color:C.stone}}>Step {step} of 3</div></div>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,color:C.stone,cursor:"pointer"}}>✕</button>
        </div>
        <div style={{display:"flex",gap:4,marginBottom:22}}>{[1,2,3].map(s=><div key={s} style={{flex:1,height:3,borderRadius:2,background:s<=step?C.sage:C.border,transition:"background 0.3s"}}/>)}</div>

        {step===1&&<>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,marginBottom:14}}>Your Information</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><Inp label="First Name" placeholder="First"/><Inp label="Last Name" placeholder="Last"/></div>
          <Inp label="Email" type="email" placeholder="you@email.com"/>
          <Inp label="Phone" type="tel" placeholder="(555) 000-0000"/>
          <Inp label="ZIP Code" placeholder="12345"/>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.6px",color:C.stone,display:"block",marginBottom:8}}>Care Type Offered</label>
            <div style={{display:"flex",gap:7}}>{[["child","👶 Child"],["elderly","🤝 Elderly"],["both","🤲 Both"]].map(([v,l])=><button key={v} onClick={()=>setType(v)} style={{flex:1,padding:"10px 5px",border:`2px solid ${type===v?C.sage:C.border}`,borderRadius:9,background:type===v?C.sagePale:C.card,color:type===v?C.sage:C.stone,fontWeight:700,fontSize:12,cursor:"pointer",transition:"all 0.2s"}}>{l}</button>)}</div>
          </div>
          <Btn onClick={()=>setStep(2)} full variant="primary">Continue →</Btn>
        </>}

        {step===2&&<>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,marginBottom:4}}>Choose Your Plan</div>
          <div style={{fontSize:12,color:C.stone,marginBottom:16}}>Cancel anytime. No hidden fees.</div>
          <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:20}}>
            {PLANS.map(pl=>(
              <div key={pl.id} onClick={()=>setPlan(pl.id)} style={{border:`2px solid ${plan===pl.id?pl.color:C.border}`,borderRadius:13,padding:"14px 16px",cursor:"pointer",background:plan===pl.id?pl.pale:C.card,transition:"all 0.2s",position:"relative"}}>
                {pl.popular&&<span style={{position:"absolute",top:-9,right:13,background:C.amber,color:"#fff",fontSize:9,fontWeight:800,padding:"2px 9px",borderRadius:20,textTransform:"uppercase"}}>Popular</span>}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div><div style={{fontWeight:800,fontSize:14,color:C.charcoal}}>{pl.name}</div><div style={{fontSize:11,color:C.stone,marginTop:1}}>{pl.features.slice(0,2).join(" · ")}</div></div>
                  <div style={{textAlign:"right"}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:800,color:pl.color}}>${pl.price}</div><div style={{fontSize:9,color:C.stone}}>/month</div></div>
                </div>
                {plan===pl.id&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:9}}>{pl.features.map(f=><span key={f} style={{fontSize:10,color:pl.color,background:"rgba(255,255,255,0.6)",borderRadius:5,padding:"2px 7px"}}>✓ {f}</span>)}</div>}
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:8}}><Btn onClick={()=>setStep(1)} variant="ghost" style={{flex:1}}>← Back</Btn><Btn onClick={()=>plan&&setStep(3)} variant="primary" style={{flex:2,opacity:plan?1:0.4}}>Continue →</Btn></div>
        </>}

        {step===3&&<>{done?(
          <div style={{textAlign:"center",padding:"16px 0"}}>
            <div style={{width:60,height:60,background:C.sagePale,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 14px"}}>🎉</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:21,fontWeight:800,marginBottom:8}}>You're Live!</div>
            <div style={{color:C.stone,fontSize:13,lineHeight:1.7,marginBottom:18}}>Your provider profile is now active. Families in your area can find and book you today.</div>
            <div style={{background:C.sagePale,borderRadius:11,padding:"13px",marginBottom:16,textAlign:"left"}}>{[["Plan",PLANS.find(p=>p.id===plan)?.name],["Monthly","$"+PLANS.find(p=>p.id===plan)?.price+"/mo"],["Status","✅ Active"]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}><span style={{color:C.stone}}>{k}</span><span style={{fontWeight:700}}>{v}</span></div>)}</div>
            <Btn onClick={onClose} full variant="primary">Go to Dashboard →</Btn>
          </div>
        ):<>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,marginBottom:4}}>Payment Details</div>
          <div style={{fontSize:11,color:C.stone,marginBottom:14,display:"flex",alignItems:"center",gap:4}}><span style={{color:C.sage}}>🔒</span>Powered by Stripe · 256-bit SSL</div>
          <div style={{background:"#F9F6F2",borderRadius:9,padding:"11px 14px",marginBottom:13,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:C.stone}}>{PLANS.find(p=>p.id===plan)?.name} · monthly</span><span style={{fontWeight:800,color:C.charcoal}}>${PLANS.find(p=>p.id===plan)?.price}/mo</span></div>
          <div style={{border:`1px solid ${C.border}`,borderRadius:11,overflow:"hidden",marginBottom:13}}>
            <div style={{padding:"11px 13px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:7}}><span>💳</span><input value={cardNum} onChange={e=>setCardNum(e.target.value.replace(/\D/g,"").slice(0,16).replace(/(\d{4})/g,"$1 ").trim())} placeholder="Card number" style={{border:"none",outline:"none",flex:1,fontSize:13,fontFamily:"inherit",background:"transparent"}}/></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",borderBottom:`1px solid ${C.border}`}}><input placeholder="MM / YY" style={{padding:"11px 13px",border:"none",outline:"none",fontSize:13,fontFamily:"inherit",borderRight:`1px solid ${C.border}`}}/><input placeholder="CVV" style={{padding:"11px 13px",border:"none",outline:"none",fontSize:13,fontFamily:"inherit"}}/></div>
            <input placeholder="Name on card" style={{width:"100%",padding:"11px 13px",border:"none",outline:"none",fontSize:13,fontFamily:"inherit",boxSizing:"border-box"}}/>
          </div>
          <div style={{background:C.amberPale,borderRadius:9,padding:"9px 13px",marginBottom:13,fontSize:11,color:C.amber,display:"flex",gap:5}}><span>ℹ️</span><span>Prototype — no real charge. Add your Stripe key to go live.</span></div>
          <div style={{display:"flex",gap:8}}><Btn onClick={()=>setStep(2)} variant="ghost" style={{flex:1}}>← Back</Btn><Btn onClick={()=>setDone(true)} variant="amber" style={{flex:2}}>🔒 Subscribe & Go Live</Btn></div>
        </>}</>}
      </div>
    </div>
  );
}

// ── DASHBOARD ──────────────────────────────────────────────────────────────────
function Dashboard({onClose}){
  const [tab,setTab]=useState("overview");
  const stats=[{label:"Profile Views",val:"284",delta:"+12%",icon:"👁️"},{label:"Inquiries",val:"18",delta:"+3 this week",icon:"💬"},{label:"Bookings",val:"9",delta:"this month",icon:"📅"},{label:"Earnings",val:"$847",delta:"this month",icon:"💰"}];
  const bookings=[{family:"The Johnson Family",date:"May 14",time:"9:00 AM",hours:4,total:72,status:"confirmed",type:"child"},{family:"Maria Chen",date:"May 16",time:"2:00 PM",hours:3,total:54,status:"pending",type:"elderly"},{family:"The Williams Family",date:"May 20",time:"8:00 AM",hours:6,total:108,status:"confirmed",type:"child"},{family:"Robert Okafor",date:"May 22",time:"10:00 AM",hours:2,total:36,status:"pending",type:"elderly"}];
  return(
    <div style={{position:"fixed",inset:0,background:C.cream,zIndex:400,display:"flex",flexDirection:"column",overflowY:"auto"}}>
      <div style={{background:C.charcoal,padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}><div style={{width:30,height:30,background:`linear-gradient(135deg,${C.sage},${C.amber})`,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>🏡</div><span style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:800,color:"#fff"}}>Provider Dashboard</span></div>
        <button onClick={onClose} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:7,padding:"6px 12px",color:"#fff",fontSize:11,fontWeight:600,cursor:"pointer"}}>← Back to App</button>
      </div>
      <div style={{background:`linear-gradient(135deg,${C.sage},#2E5E41)`,padding:"20px",color:"#fff"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:800,marginBottom:3}}>Welcome back, Margaret 👋</div>
        <div style={{fontSize:12,opacity:0.8}}>Professional Plan · Active · Next payout: May 31</div>
        <div style={{display:"flex",gap:6,marginTop:12,flexWrap:"wrap"}}>
          {["overview","bookings","earnings","profile"].map(t=><button key={t} onClick={()=>setTab(t)} style={{padding:"6px 14px",borderRadius:20,border:"none",background:tab===t?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.1)",color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer",textTransform:"capitalize"}}>{t}</button>)}
        </div>
      </div>
      <div style={{padding:"18px 16px",maxWidth:680,margin:"0 auto",width:"100%"}}>
        {tab==="overview"&&<>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:16}}>
            {stats.map(s=><div key={s.label} style={{background:C.card,borderRadius:13,padding:"14px",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}><div style={{fontSize:20,marginBottom:5}}>{s.icon}</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:800,color:C.charcoal}}>{s.val}</div><div style={{fontSize:10,color:C.stone,marginTop:1}}>{s.label}</div><div style={{fontSize:10,color:C.sage,fontWeight:600,marginTop:2}}>{s.delta}</div></div>)}
          </div>
          <div style={{background:C.card,borderRadius:13,padding:"16px",boxShadow:"0 2px 8px rgba(0,0,0,0.06)",marginBottom:12}}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:11}}>Upcoming Bookings</div>
            {bookings.slice(0,3).map((b,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:9,marginBottom:9,borderBottom:i<2?`1px solid ${C.border}`:"none"}}><div><div style={{fontWeight:600,fontSize:12}}>{b.family}</div><div style={{fontSize:10,color:C.stone,marginTop:1}}>{b.date} · {b.time} · {b.hours}h</div></div><div style={{textAlign:"right"}}><div style={{fontWeight:700,color:C.charcoal,fontSize:13}}>${b.total}</div><span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:20,background:b.status==="confirmed"?C.sagePale:C.amberPale,color:b.status==="confirmed"?C.sage:C.amber}}>{b.status}</span></div></div>)}
          </div>
          <div style={{background:C.amberPale,borderRadius:13,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:10}}><div><div style={{fontWeight:700,fontSize:13}}>Complete your profile</div><div style={{fontSize:11,color:C.stone,marginTop:2}}>Add a photo & video bio for 3× more inquiries</div></div><Btn variant="amber" style={{fontSize:11,padding:"8px 14px"}}>Edit</Btn></div>
        </>}
        {tab==="bookings"&&<>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:800,marginBottom:14}}>All Bookings</div>
          {bookings.map((b,i)=><div key={i} style={{background:C.card,borderRadius:13,padding:"14px 16px",marginBottom:9,boxShadow:"0 2px 8px rgba(0,0,0,0.05)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
            <div><div style={{fontWeight:700,fontSize:13}}>{b.family}</div><div style={{fontSize:11,color:C.stone,marginTop:2}}>📅 {b.date} · {b.time} · {b.hours}h</div><div style={{fontSize:10,color:b.type==="child"?C.sage:C.amber,fontWeight:600,marginTop:2}}>{b.type==="child"?"👶 Child":"🤝 Elder"}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:800}}>${b.total}</div><span style={{fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20,background:b.status==="confirmed"?C.sagePale:C.amberPale,color:b.status==="confirmed"?C.sage:C.amber}}>{b.status==="confirmed"?"✓ Confirmed":"⏳ Pending"}</span></div>
          </div>)}
        </>}
        {tab==="earnings"&&<>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:800,marginBottom:14}}>Earnings</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
            {[["This Month","$847","+22%"],["Last Month","$692",""],["YTD","$3,241",""],["Pending","$162","pays May 31"]].map(([l,v,d])=><div key={l} style={{background:C.card,borderRadius:13,padding:"14px",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}><div style={{fontSize:10,color:C.stone,marginBottom:3}}>{l}</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:800,color:C.charcoal}}>{v}</div>{d&&<div style={{fontSize:10,color:C.sage,fontWeight:600,marginTop:2}}>{d}</div>}</div>)}
          </div>
          <div style={{background:C.card,borderRadius:13,padding:"16px",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Recent Payouts</div>
            {[["Apr 30, 2026","$692","Deposited"],["Mar 31, 2026","$587","Deposited"],["Feb 28, 2026","$720","Deposited"]].map(([d,a,s])=><div key={d} style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:9,marginBottom:9,borderBottom:`1px solid ${C.border}`}}><div><div style={{fontSize:12,fontWeight:600}}>{d}</div><span style={{fontSize:10,color:C.sage,fontWeight:600}}>{s}</span></div><div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:800}}>{a}</div></div>)}
          </div>
        </>}
        {tab==="profile"&&<>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:800,marginBottom:14}}>Edit Profile</div>
          <div style={{background:C.card,borderRadius:13,padding:"18px",boxShadow:"0 2px 8px rgba(0,0,0,0.06)",marginBottom:11}}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Photo & Bio</div>
            <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:14}}><Avatar initials="MO" type="child" size={56}/><div><Btn variant="outline" style={{fontSize:11,padding:"7px 13px"}}>Upload Photo</Btn><div style={{fontSize:10,color:C.mist,marginTop:3}}>JPG, PNG · Max 5MB</div></div></div>
            <div style={{marginBottom:12}}><label style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.6px",color:C.stone,display:"block",marginBottom:5}}>Bio</label><textarea defaultValue="I've been caring for little ones for over 12 years…" style={{width:"100%",padding:"10px 13px",border:`1px solid ${C.border}`,borderRadius:9,fontSize:13,outline:"none",minHeight:80,resize:"vertical",boxSizing:"border-box",fontFamily:"inherit"}}/></div>
            <Inp label="Hourly Rate ($)" type="number" defaultValue="18"/>
            <Btn full variant="primary">Save Changes</Btn>
          </div>
          <div style={{background:C.sagePale,borderRadius:13,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontWeight:700,fontSize:13}}>Professional Plan</div><div style={{fontSize:11,color:C.stone}}>$59/mo · Renews Jun 1</div></div><Btn variant="outline" style={{fontSize:11,padding:"7px 13px"}}>Manage</Btn></div>
        </>}
      </div>
    </div>
  );
}

// ── PROVIDER CARD ──────────────────────────────────────────────────────────────
function ProviderCard({p,onSelect}){
  const [saved,setSaved]=useState(false);
  return(
    <div style={{background:C.card,borderRadius:15,padding:"18px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:`1px solid ${C.border}`,display:"flex",flexDirection:"column",gap:10,transition:"box-shadow 0.2s,transform 0.2s",cursor:"pointer"}}
      onClick={()=>onSelect(p)}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,0.11)";e.currentTarget.style.transform="translateY(-2px)"}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.06)";e.currentTarget.style.transform="translateY(0)"}}>
      <div style={{display:"flex",gap:11,alignItems:"flex-start"}}>
        <Avatar initials={p.avatar} type={p.type}/>
        <div style={{flex:1}}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:800,color:C.charcoal}}>{p.name}</div><div style={{fontSize:10,color:p.type==="child"?C.sage:C.amber,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.6px",marginTop:1}}>{p.type==="child"?"👶 Child":"🤝 Elder"}</div></div>
            <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{background:"none",border:"none",fontSize:17,cursor:"pointer",color:saved?C.amber:C.mist,padding:0}}>{saved?"♥":"♡"}</button>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:4,marginTop:3}}><Stars n={p.rating} size={11}/><span style={{fontSize:10,color:C.stone}}>{p.rating} ({p.reviews})</span></div>
        </div>
      </div>
      <div style={{fontSize:11,color:C.stone,fontStyle:"italic"}}>{p.specialty}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
        <Pill color={p.type==="child"?C.sage:C.amber} bg={p.type==="child"?C.sagePale:C.amberPale}>{p.badge}</Pill>
        <Pill color={C.stone} bg="#F5F0EA">📍 {p.distance}</Pill>
        <Pill color={C.stone} bg="#F5F0EA">🕐 {p.available}</Pill>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><span style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:800,color:C.charcoal}}>${p.price}</span><span style={{fontSize:11,color:C.stone}}>/hr</span></div>
        <span style={{fontSize:10,color:C.sage,fontWeight:600,padding:"4px 9px",background:C.sagePale,borderRadius:7}}>Avail: {p.nextAvail}</span>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App(){
  const [view,setView]=useState("home");
  const [filter,setFilter]=useState("all");
  const [search,setSearch]=useState("");
  const [selected,setSelected]=useState(null);
  const [booking,setBooking]=useState(null);
  const [reviewing,setReviewing]=useState(null);
  const [showSignup,setShowSignup]=useState(false);
  const [showDash,setShowDash]=useState(false);
  const [zip,setZip]=useState("");
  const filtered=PROVIDERS.filter(p=>(filter==="all"||p.type===filter)&&(p.name.toLowerCase().includes(search.toLowerCase())||p.specialty.toLowerCase().includes(search.toLowerCase())));
  return(
    <div style={{fontFamily:"'DM Sans',Helvetica,sans-serif",background:C.cream,minHeight:"100vh",color:C.charcoal}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');*{box-sizing:border-box;margin:0;}input:focus,textarea:focus{border-color:#3D7A56!important;outline:none!important;}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:#D0C8C0;border-radius:3px;}`}</style>

      {/* NAV */}
      <nav style={{background:C.warm,borderBottom:`1px solid ${C.border}`,padding:"0 16px",position:"sticky",top:0,zIndex:50,display:"flex",alignItems:"center",justifyContent:"space-between",height:58}}>
        <div onClick={()=>setView("home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:32,height:32,background:`linear-gradient(135deg,${C.sage},${C.amber})`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🏡</div>
          <span style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:800,color:C.charcoal}}>CareConnect</span>
        </div>
        <div style={{display:"flex",gap:5,alignItems:"center"}}>
          <button onClick={()=>setView("providers")} style={{background:"none",border:"none",fontSize:12,fontWeight:600,color:view==="providers"?C.sage:C.stone,cursor:"pointer",padding:"5px 7px"}}>Find Care</button>
          <button onClick={()=>setShowDash(true)} style={{background:"none",border:`1.5px solid ${C.border}`,borderRadius:7,fontSize:11,fontWeight:600,color:C.stone,cursor:"pointer",padding:"5px 10px"}}>Dashboard</button>
          <button onClick={()=>setShowSignup(true)} style={{background:C.amber,color:"#fff",border:"none",borderRadius:8,padding:"7px 13px",fontSize:11,fontWeight:700,cursor:"pointer"}}>Join as Provider</button>
        </div>
      </nav>

      {view==="home"&&<>
        {/* Hero */}
        <div style={{background:`linear-gradient(160deg,${C.warm} 0%,${C.sagePale} 55%,${C.amberPale} 100%)`,padding:"56px 18px 64px",textAlign:"center"}}>
          <div style={{display:"inline-block",background:C.sagePale,border:`1px solid ${C.sageLight}`,borderRadius:20,padding:"4px 13px",fontSize:10,color:C.sage,fontWeight:700,marginBottom:16,letterSpacing:"0.8px",textTransform:"uppercase"}}>Trusted · Vetted · Local</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(30px,6vw,52px)",fontWeight:800,lineHeight:1.15,maxWidth:620,margin:"0 auto 16px",color:C.charcoal}}>Care for Every<br/><span style={{color:C.sage}}>Stage of Life</span></h1>
          <p style={{fontSize:15,color:C.stone,maxWidth:440,margin:"0 auto 28px",lineHeight:1.7}}>Find trusted, background-checked caregivers for children and elderly loved ones — or join our network and earn.</p>
          <div style={{display:"flex",gap:7,justifyContent:"center",maxWidth:400,margin:"0 auto 15px",flexWrap:"wrap"}}>
            <input value={zip} onChange={e=>setZip(e.target.value)} placeholder="Enter ZIP code" style={{flex:1,minWidth:140,padding:"12px 15px",border:`2px solid ${C.border}`,borderRadius:10,fontSize:14,outline:"none",fontFamily:"inherit"}}/>
            <Btn onClick={()=>setView("providers")} variant="primary" style={{padding:"12px 22px",fontSize:14}}>Find Caregivers →</Btn>
          </div>
          <div style={{fontSize:11,color:C.stone}}>Or <span onClick={()=>setShowSignup(true)} style={{color:C.amber,fontWeight:700,cursor:"pointer",textDecoration:"underline"}}>sign up as a provider</span> from $29/mo</div>
        </div>

        {/* Care types */}
        <div style={{padding:"46px 16px",maxWidth:800,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:30}}><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:800,marginBottom:6}}>What kind of care do you need?</h2><p style={{color:C.stone,fontSize:13}}>Connecting families with experienced, vetted caregivers nearby.</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14}}>
            {[{icon:"👶",title:"Child Care",color:C.sage,pale:C.sagePale,t:"child",desc:"Newborns, toddlers, school-age & special needs. Full-time, part-time, and after-school."},{icon:"🤝",title:"Elderly Care",color:C.amber,pale:C.amberPale,t:"elderly",desc:"Companion care, memory support, post-surgery recovery & mobility assistance."}].map(ct=>(
              <div key={ct.title} onClick={()=>{setFilter(ct.t);setView("providers")}} style={{background:ct.pale,border:`1px solid ${ct.color}33`,borderRadius:14,padding:22,cursor:"pointer",transition:"transform 0.2s,box-shadow 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.09)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>
                <div style={{fontSize:34,marginBottom:10}}>{ct.icon}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:800,color:ct.color,marginBottom:5}}>{ct.title}</div>
                <div style={{fontSize:12,color:C.stone,lineHeight:1.6}}>{ct.desc}</div>
                <div style={{marginTop:12,fontSize:11,fontWeight:700,color:ct.color}}>Browse providers →</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust */}
        <div style={{background:C.warm,padding:"40px 16px",textAlign:"center",borderTop:`1px solid ${C.border}`}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:800,marginBottom:28}}>Why families trust CareConnect</h2>
          <div style={{display:"flex",gap:24,flexWrap:"wrap",justifyContent:"center",maxWidth:680,margin:"0 auto"}}>
            {[["🔍","Verified","Background-checked & ID verified."],["⭐","Real Reviews","Honest ratings from real families."],["🛡️","Insured","All providers carry liability insurance."],["📅","Easy Booking","Schedule & pay in one place."]].map(([icon,title,desc])=>(
              <div key={title} style={{maxWidth:140}}><div style={{fontSize:26,marginBottom:7}}>{icon}</div><div style={{fontWeight:700,fontSize:13,marginBottom:3}}>{title}</div><div style={{fontSize:11,color:C.stone,lineHeight:1.5}}>{desc}</div></div>
            ))}
          </div>
        </div>

        {/* Provider CTA */}
        <div style={{background:`linear-gradient(135deg,${C.sage},#2E5E41)`,padding:"50px 16px",textAlign:"center",color:"#fff"}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:800,marginBottom:10}}>Are you a caregiver?</h2>
          <p style={{fontSize:14,opacity:0.85,maxWidth:380,margin:"0 auto 22px",lineHeight:1.7}}>Join our network of trusted providers. Set your own hours, rates, and availability. Paid securely via Stripe.</p>
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:20}}>
            {PLANS.map(pl=><div key={pl.id} style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:9,padding:"9px 16px",color:"#fff",position:"relative"}}>{pl.popular&&<div style={{position:"absolute",top:-7,right:7,background:C.amber,fontSize:8,fontWeight:800,padding:"1px 6px",borderRadius:20,textTransform:"uppercase"}}>Popular</div>}<div style={{fontSize:16,fontWeight:800}}>${pl.price}/mo</div><div style={{fontSize:10,opacity:0.75}}>{pl.name}</div></div>)}
          </div>
          <Btn onClick={()=>setShowSignup(true)} variant="amber" style={{padding:"13px 30px",fontSize:14}}>Get Listed Today →</Btn>
        </div>

        {/* Coming Soon to App Stores */}
        <div style={{background:C.warm,padding:"44px 20px",textAlign:"center",borderTop:`1px solid ${C.border}`}}>
          <div style={{maxWidth:520,margin:"0 auto"}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:C.amber,marginBottom:10}}>Coming Soon</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:800,marginBottom:8,color:C.charcoal}}>Take CareConnect anywhere</h2>
            <p style={{fontSize:13,color:C.stone,lineHeight:1.7,margin:"0 auto 22px",maxWidth:380}}>Our mobile apps are launching soon. Get notified the moment they're available.</p>
            <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:18}}>
              <a href="#notify" onClick={e=>{e.preventDefault();document.getElementById("notify-input")?.focus()}} style={{display:"flex",alignItems:"center",gap:9,background:C.charcoal,color:"#fff",padding:"10px 16px",borderRadius:9,textDecoration:"none",minWidth:150,opacity:0.92,transition:"opacity 0.15s"}} onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.92"}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01M12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25"/></svg>
                <div style={{textAlign:"left",lineHeight:1.1}}>
                  <div style={{fontSize:9,opacity:0.75}}>Coming Soon to</div>
                  <div style={{fontSize:15,fontWeight:700,fontFamily:"'Playfair Display',serif"}}>App Store</div>
                </div>
              </a>
              <a href="#notify" onClick={e=>{e.preventDefault();document.getElementById("notify-input")?.focus()}} style={{display:"flex",alignItems:"center",gap:9,background:C.charcoal,color:"#fff",padding:"10px 16px",borderRadius:9,textDecoration:"none",minWidth:150,opacity:0.92,transition:"opacity 0.15s"}} onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.92"}>
                <svg width="22" height="22" viewBox="0 0 24 24"><path fill="#34A853" d="M3.609 1.814 13.792 12 3.61 22.186a1.998 1.998 0 0 1-.61-1.43V3.244c0-.527.227-1.027.609-1.43z"/><path fill="#FBBC04" d="m13.792 12 3.302-3.302 3.927 2.265a1.5 1.5 0 0 1 0 2.594l-3.927 2.265L13.792 12z"/><path fill="#EA4335" d="m17.094 8.698-3.302 3.302L3.61 1.814A2 2 0 0 1 5.864 1.6l11.23 7.098z"/><path fill="#4285F4" d="m13.792 12 3.302 3.302L5.864 22.4a2 2 0 0 1-2.255-.214L13.792 12z"/></svg>
                <div style={{textAlign:"left",lineHeight:1.1}}>
                  <div style={{fontSize:9,opacity:0.75}}>Coming Soon to</div>
                  <div style={{fontSize:15,fontWeight:700,fontFamily:"'Playfair Display',serif"}}>Google Play</div>
                </div>
              </a>
            </div>
            <form onSubmit={e=>{e.preventDefault();const f=new FormData(e.target);alert("Thanks! We'll notify "+f.get("email")+" when the apps launch.");e.target.reset()}} style={{display:"flex",gap:7,maxWidth:380,margin:"0 auto",flexWrap:"wrap"}}>
              <input id="notify-input" name="email" type="email" required placeholder="your@email.com" style={{flex:1,minWidth:180,padding:"10px 13px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,outline:"none",fontFamily:"inherit",background:C.card}}/>
              <button type="submit" style={{background:C.sage,color:"#fff",border:"none",borderRadius:8,padding:"10px 18px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Notify Me</button>
            </form>
          </div>
        </div>

        {/* In Loving Memory */}
        <div style={{background:C.cream,padding:"48px 20px",textAlign:"center",borderTop:`1px solid ${C.border}`}}>
          <div style={{maxWidth:520,margin:"0 auto"}}>
            <div style={{fontSize:22,marginBottom:14,color:C.amber}}>✦</div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:"2.5px",textTransform:"uppercase",color:C.stone,marginBottom:14}}>In Loving Memory</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:800,color:C.charcoal,marginBottom:10,lineHeight:1.2}}>Nadine K. Evans</div>
            <div style={{width:40,height:2,background:C.amber,margin:"0 auto 18px",borderRadius:2}}></div>
            <p style={{fontSize:14,color:C.stone,lineHeight:1.8,fontStyle:"italic",margin:0}}>She inspired us to create this site for those, like us, who are in need. Her love, compassion, and care continue through every connection made here.</p>
          </div>
        </div>
      </>}

      {view==="providers"&&(
        <div style={{maxWidth:800,margin:"0 auto",padding:"24px 14px"}}>
          <div style={{marginBottom:16}}><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:800,marginBottom:2}}>Find a Caregiver</h2><p style={{color:C.stone,fontSize:12}}>{filtered.length} providers near you</p></div>
          <div style={{display:"flex",gap:7,marginBottom:14,flexWrap:"wrap"}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or specialty…" style={{flex:1,minWidth:170,padding:"9px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,outline:"none",fontFamily:"inherit"}}/>
            <div style={{display:"flex",gap:5}}>{[["all","All"],["child","👶"],["elderly","🤝"]].map(([v,l])=><button key={v} onClick={()=>setFilter(v)} style={{padding:"9px 12px",border:`1.5px solid ${filter===v?C.sage:C.border}`,borderRadius:8,background:filter===v?C.sagePale:C.card,color:filter===v?C.sage:C.stone,fontWeight:600,fontSize:12,cursor:"pointer"}}>{l}</button>)}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:12}}>
            {filtered.map(p=><ProviderCard key={p.id} p={p} onSelect={setSelected}/>)}
          </div>
          {filtered.length===0&&<div style={{textAlign:"center",padding:"50px",color:C.stone}}><div style={{fontSize:32,marginBottom:8}}>🔍</div><div style={{fontWeight:600,fontSize:14}}>No providers found</div></div>}
          <div style={{background:C.amberPale,border:`1px solid ${C.amberLight}`,borderRadius:12,padding:"16px 18px",marginTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
            <div><div style={{fontWeight:700,fontSize:13}}>Are you a caregiver?</div><div style={{color:C.stone,fontSize:11,marginTop:1}}>Join and start receiving bookings today.</div></div>
            <Btn onClick={()=>setShowSignup(true)} variant="amber" style={{fontSize:12,padding:"9px 16px"}}>List Your Profile →</Btn>
          </div>
        </div>
      )}

      {selected&&!booking&&!reviewing&&<ProfileModal provider={selected} onClose={()=>setSelected(null)} onBook={p=>{setBooking(p);setSelected(null)}} onReviews={p=>{setReviewing(p);setSelected(null)}}/>}
      {booking&&<BookingModal provider={booking} onClose={()=>setBooking(null)}/>}
      {reviewing&&<ReviewsModal provider={reviewing} onClose={()=>setReviewing(null)}/>}
      {showSignup&&<SignupModal onClose={()=>setShowSignup(false)}/>}
      {showDash&&<Dashboard onClose={()=>setShowDash(false)}/>}
    </div>
  );
}
