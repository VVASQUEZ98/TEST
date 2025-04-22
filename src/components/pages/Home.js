import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import ContactForm from '../ContactForm';

function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
      <ContactForm />
    </>
  );
}

export default Home;