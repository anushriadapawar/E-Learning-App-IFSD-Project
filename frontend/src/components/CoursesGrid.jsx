import React from "react";

export default function CoursesGrid({ courses, onOpen }) {
  return (
    <>
      {courses.map((c) => (
        <article className="course" key={c.id}>
          <img className="thumb" src={c.img} alt={`${c.title} thumbnail`} />
          <div className="meta">
            <h3>{c.title}</h3>
            <p className="muted">{c.level}</p>
          </div>
          <div className="row">
            <div style={{fontSize:13,color:"var(--muted)",maxWidth:360}}>{c.desc}</div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-primary" onClick={()=>onOpen(c)}>Details</button>
              <button className="btn btn-ghost" onClick={()=>onOpen(c)}>Preview</button>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
