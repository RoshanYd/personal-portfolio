import React from 'react';
import { motion } from 'framer-motion';
import { HERO_IMAGE } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-32 md:pt-20 md:pb-32 overflow-hidden z-10">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-20 md:gap-12">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left mt-10 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-brand-accent font-medium tracking-widest mb-4 uppercase text-xs md:text-sm bg-brand-accent/10 inline-block px-3 py-1 rounded-full border border-brand-accent/20">
                Data Scientist & Developer
              </h2>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.2] md:leading-[1.1] mb-6 tracking-tight">
                Hi, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-purple-400">
                  Roshan Yadav
                </span>
              </h1>
              <p className="text-base md:text-xl text-brand-light/80 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                Transforming complex data into actionable insights and building intelligent web solutions.
              </p>
            </motion.div>
          </div>

          {/* Floating Image */}
          <div className="w-full md:w-1/2 flex justify-center relative">
            {/* Background Glow - Reduced blur/size on mobile for performance */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-brand-accent/20 blur-[40px] md:blur-[100px] rounded-full pointer-events-none"></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px]"
            >
              {/* Spinning border effect */}
              <div className="absolute inset-0 rounded-full border border-brand-accent/30 border-dashed animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute -inset-4 rounded-full border border-white/5 animate-[spin_15s_linear_infinite_reverse]"></div>
              
              <motion.div 
                className="absolute inset-3 rounded-full overflow-hidden border-4 border-brand-purple/50 shadow-2xl relative z-10 bg-brand-dark"
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img 
                  src={HERO_IMAGE} 
                  alt="Roshan Yadav" 
                  loading="eager"
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-light/40 flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-brand-accent/50 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;