import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION } from '../constants';
import { GraduationCap, Calendar } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative z-10 bg-brand-dark/30 overflow-hidden">
      {/* Background decorations - Hidden on mobile */}
      <div className="hidden md:block absolute top-0 right-0 w-[300px] h-[300px] bg-brand-accent/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="hidden md:block absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-purple/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Education Journey</h2>
            <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line - Shifted right on mobile (left-6) for better spacing */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-accent/50 via-brand-purple/50 to-transparent transform md:-translate-x-1/2 h-full rounded-full"></div>

          {EDUCATION.map((edu, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Dot - Aligned with the line at left-6 */}
              <div className="absolute left-6 md:left-1/2 w-5 h-5 bg-brand-dark rounded-full border-4 border-brand-accent transform -translate-x-1/2 mt-1.5 md:mt-0 z-10 shadow-[0_0_15px_rgba(151,135,244,0.8)]">
                <div className="absolute inset-0 rounded-full bg-brand-accent animate-ping opacity-20"></div>
              </div>

              {/* Spacer for desktop layout balance */}
              <div className="hidden md:block w-[calc(50%-40px)]"></div>

              {/* Content Card - Added generous margin-left (ml-16) on mobile */}
              <div className="w-[calc(100%-64px)] ml-16 md:ml-0 md:w-[calc(50%-40px)] group">
                <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 hover:border-brand-accent/40 transition-all duration-300 relative overflow-hidden group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
                    
                    {/* Hover Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/10 rounded-full border border-brand-accent/20 flex items-center gap-2">
                                <Calendar size={12} /> {edu.year}
                            </span>
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">
                            {edu.degree}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-brand-light/70 mb-4 text-sm md:text-base">
                            <GraduationCap size={16} className="text-brand-purple shrink-0" />
                            <span className="break-words">{edu.institution}</span>
                        </div>
                        
                        {edu.details && (
                            <p className="text-brand-light/50 text-sm border-t border-white/5 pt-3 mt-auto">
                                {edu.details}
                            </p>
                        )}
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;