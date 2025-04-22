import React, { useContext } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { ThemeContext } from './ThemeContext'; // Importa el ThemeContext

function Cards() {
  const { theme } = useContext(ThemeContext); // Obtén el tema actual

  return (
    <div className='cards' style={{ background: theme.background }}>
      <h1 style={{ color: theme.color }}>INOVANDO TU FUTURO!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='../images/img-11.jpg'
              text=''
              label=''
              path='/services'
              style={{ color: theme.color }} // Cambia el color del texto según el tema
            />
            <CardItem
              src='../images/img-12.jpg'
              text=''
              label=''
              path='/services'
              style={{ color: theme.color }} // Cambia el color del texto según el tema
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='../images/img-13.jpg'
              text=''
              label=''
              path='/services'
              style={{ color: theme.color }} // Cambia el color del texto según el tema
            />
            <CardItem
              src='../images/img-14.jpg'
              text=''
              label=''
              path='/products'
              style={{ color: theme.color }} // Cambia el color del texto según el tema
            />
            <CardItem
              src='../images/img-15.jpg'
              text=''
              label=''
              path='/sign-up'
              style={{ color: theme.color }} // Cambia el color del texto según el tema
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;