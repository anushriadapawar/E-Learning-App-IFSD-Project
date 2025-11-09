import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import CoursesGrid from "../components/CoursesGrid.jsx";
import CourseModal from "../components/CourseModal.jsx";

export const COURSES = [
  { id: 1, title: "Frontend Fast Track", level: "Beginner • 6h", desc: "Modern JS, components, and UI fundamentals.", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1472" },
  { id: 2, title: "React Projects Lab", level: "Intermediate • 12h", desc: "Build three real apps using hooks and routing.", img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1400&auto=format&fit=crop" },
  { id: 3, title: "Data Structures in Practice", level: "Beginner • 10h", desc: "Core DS with practical coding tasks.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop" },
  { id: 4, title: "APIs & Backend Essentials", level: "Intermediate • 8h", desc: "Auth, REST design and DB patterns.", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400&auto=format&fit=crop" },
  { id: 5, title: "Practical Databases", level: "Beginner • 5h", desc: "Schema design, indexing and real queries.", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop" },
  { id: 6, title: "Team Git Workflows", level: "All Levels • 3h", desc: "PRs, branching and collaborative best practices.", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop" },
];

export default function Home() {
  const { user } = useAuth();
  const [selected, setSelected] = useState(null);
  const coursesRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#courses" && coursesRef.current) {
      coursesRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return (
    <>
      <div className="hero">
        <div className="card">
          <h2>Learn by building — practical courses</h2>
          <p className="muted" style={{marginTop:8}}>Short, focused lessons with project outcomes and checkpoints. Designed for fast progress and portfolio results.</p>

          <div style={{display:"flex",gap:12,marginTop:16}}>
            <Link className="btn btn-primary" to={user ? "/dashboard" : "/signup"}>{user ? "Open Dashboard" : "Start free"}</Link>
            <a className="btn btn-ghost" href="#courses">Browse courses</a>
          </div>

          <div style={{marginTop:16,display:"flex",gap:12,flexWrap:"wrap"}}>
            <div className="pill">Projects</div>
            <div className="pill">Quizzes</div>
            <div className="pill">Resources</div>
          </div>
        </div>

        <div className="card" style={{padding:0,overflow:"hidden"}}>
          <img src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1400&auto=format&fit=crop" alt="Hero" style={{width:"100%",height:320,objectFit:"cover"}}/>
        </div>
      </div>

      <div className="section" id="courses" ref={coursesRef}>
        <h3 style={{margin:0}}>Popular Courses</h3>
        <div className="cards" style={{marginTop:12}}>
          <CoursesGrid courses={COURSES} onOpen={setSelected} />
        </div>
      </div>

      <div className="section" id="mylearning" style={{marginTop:18}}>
        <h3 style={{margin:0}}>My Learning</h3>
        <div style={{marginTop:12}}>
          {user ? (
            <div className="cards">
              <article className="course"><img className="thumb" src={COURSES[0].img} alt="thumb"/><div className="meta"><h3>{COURSES[0].title}</h3><p className="muted">Progress <span style={{float:"right"}}>40%</span></p></div><div className="row"><button className="btn btn-primary">Resume</button><button className="btn btn-ghost">Overview</button></div></article>
              <article className="course"><img className="thumb" src={COURSES[1].img} alt="thumb"/><div className="meta"><h3>{COURSES[1].title}</h3><p className="muted">Progress <span style={{float:"right"}}>15%</span></p></div><div className="row"><button className="btn btn-primary">Resume</button><button className="btn btn-ghost">Overview</button></div></article>
              <article className="course"><img className="thumb" src={COURSES[5].img} alt="thumb"/><div className="meta"><h3>{COURSES[5].title}</h3><p className="muted">Progress <span style={{float:"right"}}>60%</span></p></div><div className="row"><button className="btn btn-primary">Resume</button><button className="btn btn-ghost">Overview</button></div></article>
            </div>
          ) : (
            <div className="card">
              <h3 style={{margin:0}}>Sign in to save progress</h3>
              <p className="muted" style={{marginTop:8}}>Create an account to track courses, bookmarks and certificates.</p>
              <div style={{marginTop:12}}>
                <Link className="btn btn-primary" to="/signup">Create free account</Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <CourseModal course={selected} onClose={()=>setSelected(null)} />
    </>
  );
}
