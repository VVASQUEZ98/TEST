import React from 'react';
import video from '../videos/video_1.mp4';
import { Heading } from '@chakra-ui/react';

function HeroSection() {

  return (
    <div className='hero-container'>
      <video src={video} autoPlay loop muted />
      <Heading size="xl" justifySelf={"center"} my="3">
        Te damos la Bienvenida a tu portafolio
      </Heading>
      <div className='hero-btns'>
        {/* <Button
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
        </Button> */}
      </div>
    </div>
  );
}

export default HeroSection;