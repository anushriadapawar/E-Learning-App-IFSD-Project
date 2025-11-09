import React from "react";

export default function CourseModal({ course, onClose }) {
  if (!course) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <h2 style={{margin:0}}>{course.title}</h2>
            <div className="muted" style={{marginTop:6}}>{course.level}</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button className="btn btn-ghost" onClick={onClose}>Close</button>
            <button className="btn btn-primary">Enroll</button>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:12}}>
          <img src={course.img} alt={course.title} style={{width:"100%",height:180,objectFit:"cover",borderRadius:8}} />
          <div>
            <p style={{margin:0}}>{course.desc}</p>
            <ul style={{marginTop:10,color:"var(--muted)"}}>
              <li>Project-based lessons</li>
              <li>Progress checkpoints</li>
              <li>Resources & templates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
