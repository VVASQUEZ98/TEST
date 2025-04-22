import React, { useContext } from 'react';
import './ContactForm.css';
import { Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';

function ContactForm() {
  const { themeStyles } = useContext(ThemeContext);

  return (
    <div className='footer-container' style={{ backgroundColor: themeStyles.footerBg }}>
      <section className='social-media'>
        <div className='social-media-wrap'>
          {/* Logo del grupo */}
          <div className='footer-logo'>
            <Link to='/' className='social-logo' style={{ color: themeStyles.text }}>
              Grupo #6
              <i className='fab fa-typo3' />
            </Link>
          </div>

          <small className='website-rights' style={{ color: themeStyles.text }}>
            Grupo #6 © 2023
          </small>

          {/* Redes Sociales */}
          <div className='social-icons'>
            <Link className='social-icon-link' to='https://www.facebook.com/' target='_blank' aria-label='Facebook'>
              <i className='fab fa-facebook-f' />
            </Link>
            <Link className='social-icon-link' to='https://www.instagram.com/' target='_blank' aria-label='Instagram'>
              <i className='fab fa-instagram' />
            </Link>
            <Link className='social-icon-link' to='https://www.youtube.com/' target='_blank' aria-label='Youtube'>
              <i className='fab fa-youtube' />
            </Link>
            <Link className='social-icon-link' to='https://x.com/home' target='_blank' aria-label='Twitter'>
              <i className='fab fa-twitter' />
            </Link>
            <Link className='social-icon-link' to='https://www.linkedin.com/feed/' target='_blank' aria-label='LinkedIn'>
              <i className='fab fa-linkedin' />
            </Link>
            <Link className='social-icon-link' to='https://github.com/KevinECastroP/Proyecto-LP3.git' target='_blank' aria-label='GitHub'>
              <i className='fab fa-github' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactForm;
