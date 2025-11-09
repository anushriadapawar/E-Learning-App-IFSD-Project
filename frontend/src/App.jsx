import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Home, { COURSES } from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import CoursesGrid from "./components/CoursesGrid.jsx";

// theme pref (saved) — default light
const getInitialTheme = () => localStorage.getItem("theme") || "light";

export default function App() {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(getInitialTheme());
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const goHash = (hash) => {
    // navigate to root first so the page exists, then set hash
    navigate("/"); 
    setTimeout(()=> {
      window.location.hash = hash;
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 30);
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar" aria-label="Main navigation">
        <div className="brand">
          <div className="brand-badge">✦</div>
          <div>
            <h1>CourseCraft</h1>
            <div className="muted">Learn by building</div>
          </div>
        </div>

        <nav className="nav-vertical" aria-label="Sections">
          <button className="nav-item" onClick={()=>navigate("/")}>Home</button>
          <button className="nav-item" onClick={()=>goHash("#courses")}>Courses</button>
          <button className="nav-item" onClick={()=>goHash("#mylearning")}>My Learning</button>
          <Link className="nav-item" to="/signup">Sign up</Link>
          <Link className="nav-item" to="/login">Login</Link>
        </nav>

        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-primary" onClick={()=>setTheme(theme==="dark"?"light":"dark")} aria-pressed={theme==="dark"}>
            {theme==="dark" ? "Light" : "Dark"}
          </button>
          {user && <button className="btn btn-ghost" onClick={logout}>Logout</button>}
        </div>

        <div className="meta">
          © {new Date().getFullYear()} CourseCraft • MERN
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        <div className="topbar">
          <div className="search" role="search" aria-label="Search courses">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M11 19a8 8 0 1 1 5.292-14.031A8 8 0 0 1 11 19z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input placeholder="Search courses, e.g. React, APIs..." />
          </div>

          <div className="actions">
            {user ? <div className="pill">Hi, {user.name}</div> : <Link to="/login" className="nav-item">Sign in</Link>}
            <Link to="/signup" className="btn btn-primary">Get started</Link>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <div style={{display:"grid",gap:12}}>
                <div className="card" style={{padding:18}}>
                  <h2 style={{margin:0}}>Your Dashboard</h2>
                  <p className="muted">Progress, saved courses and quick access to lessons.</p>
                </div>

                <h3 style={{margin:"6px 0"}}>Recommended</h3>
                <CoursesGrid courses={COURSES} onOpen={()=>{}} />
              </div>
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <div className="footer">
          <div>CourseCraft — Learn by building</div>
          <div className="muted">MERN • JWT • Responsive</div>
        </div>
      </main>
    </div>
  );
}

function CoursesPage() {
  return (
    <div>
      <div className="hero card">
        <h2>All Courses</h2>
        <p className="muted">Explore our library of hands-on courses.</p>
      </div>

      <div className="section">
        <div className="cards">
          <CoursesGrid courses={COURSES} onOpen={()=>{}} />
        </div>
      </div>
    </div>
  );
}
