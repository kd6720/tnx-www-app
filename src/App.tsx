import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import PotsReplacement from './pages/PotsReplacement';
import AiConsulting from './pages/AiConsulting';
import InternetConnectivity from './pages/InternetConnectivity';
import IpPbx from './pages/IpPbx';
import MobilitySolutions from './pages/MobilitySolutions';
import VoiceSolutions from './pages/VoiceSolutions';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pots-replacement" element={<PotsReplacement />} />
          <Route path="/ai-consulting" element={<AiConsulting />} />
          <Route path="/fleet-management" element={<AiConsulting />} />
          <Route path="/internet-connectivity" element={<InternetConnectivity />} />
          <Route path="/ip-pbx" element={<IpPbx />} />
          <Route path="/mobility-solutions" element={<MobilitySolutions />} />
          <Route path="/voice-solutions" element={<VoiceSolutions />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App
