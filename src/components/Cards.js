import React from 'react';
import { Card, HStack, Icon, Image, Text } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa6';

function Cards() {

  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <HStack justify="space-around" my="3">
            <Card.Root width={'30%'} aspectRatio="square">
              <Card.Header>
                <Card.Title>Ingresa tus datos</Card.Title>
              </Card.Header>
              <Card.Body gap="4">
                <Image src="../images/img-12.jpg" fit="contain" />
                <Card.Description>
                  <Text fontSize="xl">
                    Ingresa tu experiencia laboral, referencias, proyectos personales y más
                  </Text>
                </Card.Description>
              </Card.Body>
            </Card.Root>
            <Icon size="2xl">
              <FaArrowRight />
            </Icon>
            <Card.Root width={'30%'} aspectRatio="square">
              <Card.Header>
                <Card.Title>Personaliza tu portafolio</Card.Title>
              </Card.Header>
              <Card.Body gap="4">
                <Image src="../images/img-13.jpg" fit="contain" />
                <Card.Description>
                  <Text fontSize="xl">
                    Desde color hasta tipo de fuente, puedes personalizar tu portafolio
                  </Text>
                </Card.Description>
              </Card.Body>
            </Card.Root>
            <Icon size="2xl">
              <FaArrowRight />
            </Icon>
            <Card.Root width={'30%'} aspectRatio="square">
              <Card.Header>
                <Card.Title>Comparte tu portafolio</Card.Title>
              </Card.Header>
              <Card.Body gap="4">
                <Image  src="../images/img-15.jpg" fit="contain" />
                <Card.Description>
                  <Text fontSize="xl">
                    Puedes descargar tu portafolio en un archivo PDF
                  </Text>
                </Card.Description>
              </Card.Body>
            </Card.Root>
          </HStack>
        </div>
      </div>
    </div>
  );
}

export default Cards;