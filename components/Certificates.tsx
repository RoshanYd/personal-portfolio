
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CERTIFICATES } from '../constants';
import { Award, X, ZoomIn } from 'lucide-react';

const Certificates: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <section className="py-20 relative z-10 bg-brand-dark/30">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
          <Award className="text-brand-accent" /> Certifications
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATES.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedImage(cert.imageUrl)}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer shadow-lg hover:shadow-brand-accent/20 transition-all"
            >
              <div className="absolute inset-0 bg-brand-purple/20 border border-white/5 z-10 rounded-xl group-hover:border-brand-accent/50 transition-colors"></div>
              
              <img 
                src={cert.imageUrl} 
                alt={cert.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-4">
                 <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-1 text-brand-accent">
                        <ZoomIn size={16} /> <span className="text-xs uppercase tracking-wider font-bold">View Certificate</span>
                    </div>
                    <p className="text-white font-medium text-sm">
                    {cert.title}
                    </p>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal - Professional View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Professional Close Button */}
            <button 
              className="fixed top-6 right-6 z-[110] group flex items-center justify-center bg-white/10 hover:bg-brand-accent text-white hover:text-brand-dark border border-white/20 hover:border-brand-accent rounded-full p-3 transition-all duration-300 transform hover:rotate-90 shadow-xl"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close"
            >
              <X size={28} />
            </button>

            {/* Image Container */}
            <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               transition={{ type: "spring", damping: 25, stiffness: 300 }}
               className="relative max-w-7xl max-h-[90vh] w-full flex items-center justify-center"
               onClick={(e) => e.stopPropagation()} 
            >
                <img 
                  src={selectedImage} 
                  alt="Certificate Full View" 
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10"
                />
            </motion.div>
            
            {/* Hint Text */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-6 left-0 right-0 text-center text-white/50 text-sm pointer-events-none"
            >
                Click anywhere outside to close
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
