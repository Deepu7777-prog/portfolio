import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import SmoothScrollProvider from './components/SmoothScroll';
import Footer from './components/Footer';

// Lazy load sections for performance
const Hero = lazy(() => import('./sections/Hero'));
const About = lazy(() => import('./sections/About'));
const Skills = lazy(() => import('./sections/Skills'));
const Experience = lazy(() => import('./sections/Experience'));
const Projects = lazy(() => import('./sections/Projects'));
const Education = lazy(() => import('./sections/Education'));
const Certificates = lazy(() => import('./sections/Certificates'));
const Achievements = lazy(() => import('./sections/Achievements'));
const Contact = lazy(() => import('./sections/Contact'));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <>
      <CustomCursor />
      <LoadingScreen onComplete={handleLoadingComplete} />

      {!loading && (
        <SmoothScrollProvider>
          <Navbar />
          <main>
            <Suspense fallback={null}>
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Education />
              <Certificates />
              <Achievements />
              <Contact />
            </Suspense>
          </main>
          <Footer />
        </SmoothScrollProvider>
      )}
    </>
  );
}

export default App;
