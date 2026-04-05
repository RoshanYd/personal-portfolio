import React from 'react';
import { motion, Variants } from 'framer-motion';
import { SKILLS } from '../constants';
import { Database, Globe, BrainCircuit, Layout, Server, Code2, LineChart, Sparkles } from 'lucide-react';

// Helper to map skill names to icons for visual variety
const getSkillIcon = (name: string, category: string) => {
  if (name.includes('Python')) return <Code2 size={32} />;
  if (name.includes('Data')) return <Database size={32} />;
  if (name.includes('Analytics')) return <LineChart size={32} />;
  if (name.includes('Intelligence') || name.includes('Machine')) return <BrainCircuit size={32} />;
  if (name.includes('React') || name.includes('Web')) return <Globe size={32} />;
  if (name.includes('SQL')) return <Server size={32} />;
  return <Layout size={32} />;
};

const Skills: React.FC = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  };

  return (
    <section id="skills" className="py-24 relative z-10 overflow-hidden">
      {/* Background glow for section - Hidden on mobile for performance */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Technical Skills</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-brand-accent to-brand-purple mx-auto rounded-full"></div>
            <p className="mt-4 text-brand-light/60 max-w-lg mx-auto">
                My tech stack for building data-driven solutions.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto"
        >
          {SKILLS.map((skill, index) => (
            <motion.div 
              key={index}
              variants={item}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="group relative h-full min-h-[160px] cursor-default"
            >
              {/* Card Container - Reduced backdrop blur on mobile */}
              <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md md:bg-brand-dark/60 md:backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 group-hover:border-brand-accent/50 group-hover:shadow-[0_0_30px_-5px_rgba(151,135,244,0.3)] flex flex-col items-center justify-center p-4">
                
                {/* Moving Gradient Border Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-brand-accent/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]"></div>
                
                {/* Internal Glow Effect */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex flex-col items-center w-full">
                  <motion.div 
                    className="mb-4 p-3 rounded-xl bg-gradient-to-br from-brand-purple/50 to-transparent border border-white/10 text-brand-accent group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-brand-accent/20"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3 + index % 2, 
                      ease: "easeInOut",
                      delay: index * 0.1
                    }}
                  >
                    {getSkillIcon(skill.name, skill.category)}
                  </motion.div>
                  
                  <h3 className="font-bold text-sm sm:text-base md:text-lg text-center leading-tight text-brand-light group-hover:text-white transition-colors w-full px-1">
                    {skill.name}
                  </h3>
                  
                  <motion.div 
                    className="mt-3 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -bottom-6 group-hover:bottom-0 relative"
                    initial={{ y: 5 }}
                    whileHover={{ y: 0 }}
                  >
                    <Sparkles size={10} className="text-brand-accent" />
                    <span className="text-[10px] uppercase tracking-wider text-brand-accent font-semibold">
                       {skill.category}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;