import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    const ok = await login(email, password);
    if (ok) navigate("/dashboard");
    else setErr("Invalid email or password");
  };

  return (
    <div style={{display:"grid",gap:12}}>
      <div className="card" style={{padding:18}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <h2 style={{margin:0}}>Welcome back</h2>
            <div className="muted" style={{marginTop:6,fontSize:13}}>Sign in to continue your learning path.</div>
          </div>
          <div className="brand-badge" style={{width:42,height:42}}>✦</div>
        </div>

        {err && <div className="pill" style={{marginTop:12,color:"var(--accent)"}}>{err}</div>}

        <form onSubmit={onSubmit} style={{marginTop:12}}>
          <div style={{display:"grid",gap:10}}>
            <label className="label">Email</label>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required />

            <label className="label">Password</label>
            <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required />
          </div>

          <div style={{marginTop:12,display:"flex",gap:10}}>
            <button className="btn btn-primary" type="submit">Sign in</button>
            <Link to="/signup" className="btn btn-ghost" style={{padding:"8px 12px"}}>Sign up</Link>
          </div>
        </form>
      </div>

      <div className="card" style={{padding:12,display:"flex",gap:12,alignItems:"center"}}>
        <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1400&auto=format&fit=crop" alt="Study" style={{width:120,height:80,objectFit:"cover",borderRadius:8}} />
        <div>
          <div style={{fontWeight:700}}>Fast, project-first lessons</div>
          <div className="muted" style={{fontSize:13}}>Sign in and pick up where you left off.</div>
        </div>
      </div>
    </div>
  );
}
