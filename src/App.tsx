import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import PotsReplacement from './pages/PotsReplacement';
import AiConsulting from './pages/AiConsulting';
import InternetConnectivity from './pages/InternetConnectivity';
import IpPbx from './pages/IpPbx';
import { Navigate } from 'react-router-dom';
import MobilitySolutions from './pages/MobilitySolutions';
import VoiceSolutions from './pages/VoiceSolutions';
import AiWorkforce from './pages/AiWorkforce';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Tools from './pages/Tools';
import PotsRoiCalculator from './pages/tools/PotsRoiCalculator';
import CopperSunsetRisk from './pages/tools/CopperSunsetRisk';
import FailoverReadiness from './pages/tools/FailoverReadiness';
import AiRoiCalculator from './pages/tools/AiRoiCalculator';
import AiReadinessAssessment from './pages/tools/AiReadinessAssessment';

import ChatWidget from './components/ChatWidget';
import StickyCTA from './components/StickyCTA';
import ExitIntentPopup from './components/ExitIntentPopup';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-navy-50 text-navy-900 antialiased">
          <ScrollToTop />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/pots-replacement" element={<PotsReplacement />} />
              <Route path="/ai-consulting" element={<AiConsulting />} />
              <Route path="/fleet-management" element={<AiConsulting />} />
              <Route path="/internet-connectivity" element={<InternetConnectivity />} />
              <Route path="/ip-pbx" element={<Navigate to="/voice-solutions" replace />} />
              <Route path="/mobility-solutions" element={<MobilitySolutions />} />
              <Route path="/voice-solutions" element={<VoiceSolutions />} />
              <Route path="/ai-workforce" element={<AiWorkforce />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/pots-roi-calculator" element={<PotsRoiCalculator />} />
              <Route path="/tools/copper-sunset-risk" element={<CopperSunsetRisk />} />
              <Route path="/tools/failover-readiness" element={<FailoverReadiness />} />
              <Route path="/tools/ai-roi-calculator" element={<AiRoiCalculator />} />
              <Route path="/tools/ai-readiness" element={<AiReadinessAssessment />} />
            </Routes>
          </main>
          <Footer />
          <ChatWidget />
          <StickyCTA />
          <ExitIntentPopup />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
