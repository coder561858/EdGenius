// import React from 'react'
// import { BrowserRouter } from 'react-router-dom'
// import Navbar from './pages/components/Home/Navbar'
// import Hero from './pages/components/Home/Hero'
// import Team from './pages/components/Home/Team'
// import FAQ from './pages/components/Home/FAQ'
// import Contact from './pages/components/Home/Contact'
// import Footer from './pages/components/Home/Footer'

// function App() {
//     return (
//         <BrowserRouter>
//             <Navbar />
//             <Hero />
//             <Team />
//             <FAQ />
//             <Contact />
//             <Footer />
//         </BrowserRouter>
//     )
// }

// export default App

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './pages/components/Home/Navbar';
import Hero from './pages/components/Home/Hero';
import Team from './pages/components/Home/Team';
import FAQ from './pages/components/Home/FAQ';
import Contact from './pages/components/Home/Contact';
import Footer from './pages/components/Home/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/team" element={<Team />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Hero />
        <Team />
        <FAQ />
        <Contact />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
