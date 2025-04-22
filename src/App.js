// App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Forms from './components/pages/Forms';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import Header from "./components/Header";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import { ThemeProvider } from './components/ThemeContext';
import ThemeWrapper from './components/ThemeWrapper';

function App() {
  const [userData, setUserData] = useState(null);

  return (
    <ThemeProvider>
      <ThemeWrapper>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/Forms' element={<Forms />} />
            <Route path='/products' element={<Products />} />
            <Route
              path='/sign-up'
              element={
                !userData ? (
                  <Forms setUserData={setUserData} />
                ) : (
                  <>
                    <Header
                      name={userData.name}
                      title={userData.title}
                      email={userData.email}
                      phone={userData.phone}
                      linkedin={userData.linkedin}
                    />
                    <Experience experience={userData.experience} />
                    <Education education={userData.education} />
                    <Skills skills={userData.skills} />
                  </>
                )
              }
            />
          </Routes>
        </Router>
      </ThemeWrapper>
    </ThemeProvider>
  );
}

export default App;