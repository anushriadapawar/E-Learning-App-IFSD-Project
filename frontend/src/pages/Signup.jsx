import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    const ok = await signup(name, email, password);
    if (ok) navigate("/dashboard");
    else setErr("Signup failed. Try a different email.");
  };

  return (
    <div style={{display:"grid",gap:12}}>
      <div className="card" style={{padding:18}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <h2 style={{margin:0}}>Create an account</h2>
            <div className="muted" style={{marginTop:6,fontSize:13}}>Join CourseCraft — project-based learning.</div>
          </div>
          <div className="brand-badge" style={{width:42,height:42}}>✦</div>
        </div>

        {err && <div className="pill" style={{marginTop:12,color:"var(--accent)"}}>{err}</div>}

        <form onSubmit={onSubmit} style={{marginTop:12}}>
          <div style={{display:"grid",gap:10}}>
            <label className="label">Full name</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Alex Learner" required />

            <label className="label">Email</label>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required />

            <label className="label">Password</label>
            <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Choose a secure password" required />
          </div>

          <div style={{marginTop:12,display:"flex",gap:10}}>
            <button className="btn btn-primary" type="submit">Create account</button>
            <Link to="/login" className="btn btn-ghost" style={{padding:"8px 12px"}}>Sign in</Link>
          </div>
        </form>
      </div>

      <div className="card" style={{padding:12,display:"flex",gap:12,alignItems:"center"}}>
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop" alt="Team" style={{width:120,height:80,objectFit:"cover",borderRadius:8}} />
        <div>
          <div style={{fontWeight:700}}>Build projects that matter</div>
          <div className="muted" style={{fontSize:13}}>Short lessons, practical outcomes and resume-ready work.</div>
        </div>
      </div>
    </div>
  );
}
