// App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Forms from './components/pages/Forms';
import Products from './components/pages/Products';

import { Provider } from "./components/ui/provider"
import { Profile } from './components/perfil/Profile';
import { PortafolioPreview } from './components/pages/PortafolioPreview';
import { Container } from '@chakra-ui/react';
import ContactForm from './components/ContactForm';


function App() {
  const [userData, setUserData] = useState(null);

  return (

    <Provider>
      <Router>
        <Navbar />
        <Container my="3">
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/Forms' element={<Forms />} />
            <Route path='/products' element={<Products />} />
            <Route
              path='/sign-up'
              element={
                !userData ? <Forms setUserData={setUserData} /> : <Profile />
              }
            />
            <Route path='/preview' element={<PortafolioPreview />} />
          </Routes>
        </Container>
        <ContactForm/>
      </Router>
    </Provider>
  );
}

export default App;