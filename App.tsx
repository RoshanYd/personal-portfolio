import React from 'react';
import NeuralBackground from './components/NeuralBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen text-white font-sans selection:bg-brand-accent selection:text-brand-dark">
      {/* 
        The NeuralBackground sits at fixed z-0. 
        All other components have z-10 or higher to float above it.
      */}
      <NeuralBackground />
      
      <div className="relative z-10 flex flex-col gap-0">
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Education />
          <Projects />
          <Certificates />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default App;