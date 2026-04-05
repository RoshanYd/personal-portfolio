import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { SOCIALS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Performance: Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 85; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }, 100);
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 100);
  }

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen ? 'py-3 bg-[#0B0A14]/95 border-b border-white/5 shadow-lg' : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a 
            href="#" 
            className="text-2xl font-bold tracking-tighter text-white z-50 relative group" 
            onClick={scrollToTop}
          >
            RY<span className="text-brand-accent transition-all group-hover:text-white">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-sm font-medium text-brand-light/80 hover:text-white transition-colors tracking-wide py-2 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <div className="w-px h-6 bg-white/10 mx-4"></div>
            <div className="flex space-x-4">
               <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="text-brand-light/70 hover:text-white hover:scale-110 transition-all duration-300">
                  <Github size={20} />
               </a>
               <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-light/70 hover:text-white hover:scale-110 transition-all duration-300">
                  <Linkedin size={20} />
               </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden z-50 p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
          {isOpen && (
              <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="fixed inset-0 bg-[#0B0A14] z-40 flex flex-col items-center justify-center md:hidden overflow-y-auto"
              >
                  {/* Removed heavy blur decorations for mobile performance */}
                  
                  <div className="flex flex-col items-center gap-8 z-10 w-full px-6 py-10">
                    {navLinks.map((link, i) => (
                        <motion.a 
                          key={link.name} 
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * i }}
                          className="text-3xl font-bold text-white/90 hover:text-brand-accent tracking-tight transition-colors py-2 relative group"
                        >
                        {link.name}
                        </motion.a>
                    ))}
                  </div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-8 mt-4 z-10"
                  >
                    <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors">
                      <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-brand-accent/20 group-hover:border-brand-accent/30 transition-all">
                        <Github size={28} />
                      </div>
                    </a>
                    <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors">
                      <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-brand-accent/20 group-hover:border-brand-accent/30 transition-all">
                        <Linkedin size={28} />
                      </div>
                    </a>
                  </motion.div>
              </motion.div>
          )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;