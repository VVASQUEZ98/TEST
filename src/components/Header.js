import React from "react";

const Header = ({ name, title, email, phone, linkedin }) => {
  return (
    <header className="header">
      <h1>{name}</h1>
      <p>{title}</p>
      <div className="contact-info">
        <p>Email: {email}</p>
        <p>Teléfono: {phone}</p>
        <p>LinkedIn: {linkedin}</p>
      </div>
    </header>
  );
};

export default Header;