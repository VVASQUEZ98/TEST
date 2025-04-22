import React from "react";


const Education = ({ education }) => {
  return (
    <section className="education">
      <h2>Educación</h2>
      {education.map((degree, index) => (
        <div className="degree" key={index}>
          <h3>{degree.institution}</h3>
          <p>{degree.degree}</p>
          <p>{degree.startDate} - {degree.endDate}</p>
        </div>
      ))}
    </section>
  );
};

export default Education;