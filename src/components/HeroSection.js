import React, { useContext } from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import video from '../videos/video_1.mp4';
import { ThemeContext } from './ThemeContext';

function HeroSection() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className='hero-container' style={{ background: theme.background, color: theme.color }}>
      <video src={video} autoPlay loop muted />
      <h1>Te damos la Bienvenida a tu portafolio</h1>
      <p>la prueba del fracaso es el exito del futuro</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          to='/sign-up'
        >
          Registrarse
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          to='/#'
        >
          Como crear un portafolio <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;