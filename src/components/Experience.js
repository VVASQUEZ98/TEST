import React from "react";


const Experience = ({ experience }) => {
  return (
    <section className="experience">
      <h2>Experiencia Laboral</h2>
      {experience.map((job, index) => (
        <div className="job" key={index}>
          <h3>{job.position} - {job.company}</h3>
          <p>{job.startDate} - {job.endDate}</p>
          <ul>
            {job.responsibilities.map((responsibility, i) => (
              <li key={i}>{responsibility}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default Experience;