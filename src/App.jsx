import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Pages/Components/Home/Navbar';
import Hero from './Pages/Components/Home/Hero';
import Team from './Pages/Components/Home/Team';
import FAQ from './Pages/Components/Home/FAQ';
import Contact from './Pages/Components/Home/Contact';
import Footer from './Pages/Components/Home/Footer';
import QuizPage from './Pages/Components/Home/QuizPage';
import Login from './Pages/Components/Home/Login';
import StatsComponent from './components/StatsComponent';


// ✅ Import PrivyWrapper
import { PrivyWrapper } from './PrivyProvider';

function App() {
  return (
    <PrivyWrapper>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/team" element={<Team />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        <StatsComponent />
      </BrowserRouter>
    </PrivyWrapper>
  );
}

export default App;
