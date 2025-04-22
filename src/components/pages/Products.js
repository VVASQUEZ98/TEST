import React from 'react';
import ContactForm from '../ContactForm';

export default function Products() {
  return (
    <div>
      <h1>PRODUCTS</h1>
      <ContactForm /> {/* Ahora está dentro del return */}
    </div>
  );
}
