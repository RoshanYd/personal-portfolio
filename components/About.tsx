import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 blur-[50px]"></div>

          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">About Me</h3>
          <div className="space-y-4 text-brand-light/90 leading-relaxed text-lg">
            <p>
              I am a passionate <span className="text-brand-accent font-medium">Data Scientist</span> and <span className="text-brand-accent font-medium">Python Developer</span> with a strong foundation in Web Development. 
              My journey involves transforming raw data into actionable insights and building robust applications that solve real-world problems.
            </p>
            <p>
              Currently pursuing my <span className="text-white font-medium">MCA</span>, I am constantly exploring the intersection of AI, Analytics, and Modern Web Technologies. 
              I thrive in environments that challenge my technical skills and allow me to create impactful digital experiences.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
             <div className="px-4 py-2 bg-brand-purple/50 rounded-lg border border-brand-accent/20 text-sm text-brand-accent">
                📍 Nashik, India
             </div>
             <div className="px-4 py-2 bg-brand-purple/50 rounded-lg border border-brand-accent/20 text-sm text-brand-accent">
                🚀 Open to Opportunities
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;