import React from "react";


const Skills = ({ skills }) => {
  return (
    <section className="skills">
      <h2>Habilidades</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;