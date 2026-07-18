import { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ChatWidget from './components/ChatWidget';
import StickyCTA from './components/StickyCTA';
import ExitIntentPopup from './components/ExitIntentPopup';

// Route-level code splitting — each page ships as its own chunk so the
// initial load only pulls in what the landing route needs.
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Team = lazy(() => import('./pages/Team'));
const PotsReplacement = lazy(() => import('./pages/PotsReplacement'));
const AiConsulting = lazy(() => import('./pages/AiConsulting'));
const InternetConnectivity = lazy(() => import('./pages/InternetConnectivity'));
const MobilitySolutions = lazy(() => import('./pages/MobilitySolutions'));
const VoiceSolutions = lazy(() => import('./pages/VoiceSolutions'));
const AiWorkforce = lazy(() => import('./pages/AiWorkforce'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Tools = lazy(() => import('./pages/Tools'));
const PotsRoiCalculator = lazy(() => import('./pages/tools/PotsRoiCalculator'));
const CopperSunsetRisk = lazy(() => import('./pages/tools/CopperSunsetRisk'));
const FailoverReadiness = lazy(() => import('./pages/tools/FailoverReadiness'));
const AiRoiCalculator = lazy(() => import('./pages/tools/AiRoiCalculator'));
const AiReadinessAssessment = lazy(() => import('./pages/tools/AiReadinessAssessment'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center" aria-busy="true">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-navy-200 border-t-brand-600" />
    <span className="sr-only">Loading…</span>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-navy-50 text-navy-900 antialiased">
          <ScrollToTop />
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/about/team" element={<Team />} />
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
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
