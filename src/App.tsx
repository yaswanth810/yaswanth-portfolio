import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}
      <Toaster position="bottom-right" />
      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <Navbar />
        {/* animated grid overlay */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-grid-animated" />
        <main className="relative z-[1] bg-transparent min-h-screen">
          <Hero />
          <About />
          <Projects />
          <Achievements />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}

export default App;
