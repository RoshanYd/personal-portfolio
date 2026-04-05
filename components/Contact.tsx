
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIALS } from '../constants';
import { Mail, Github, Linkedin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Initialize EmailJS with your public key once on mount
    emailjs.init("LUsG3pJVUBcwUSxme");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    
    setStatus('sending');
    setErrorMessage('');

    // Create the exact parameters object your template expects
    const templateParams = {
      from_name: formData.from_name,
      from_email: formData.from_email,
      message: formData.message,
      time: new Date().toLocaleString(), // Adds the time timestamp
    };

    emailjs.send(
      'service_jpjjztb',  // Your Service ID
      'template_9xd0rpb', // Your Template ID
      templateParams,
      'LUsG3pJVUBcwUSxme' // Your Public Key
    )
    .then((result) => {
      console.log('SUCCESS!', result.status, result.text);
      setStatus('success');
      setFormData({ from_name: '', from_email: '', message: '' }); // Reset form
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, (error) => {
      console.error('FAILED...', error);
      setStatus('error');
      setErrorMessage('Failed to send message. Please check your connection and try again.');
    });
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card rounded-3xl overflow-hidden shadow-2xl border border-white/5"
        >
          <div className="grid md:grid-cols-2">
            
            {/* Info Side */}
            <div className="p-10 bg-gradient-to-br from-brand-accent/20 to-brand-purple/20 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Let's Connect</h3>
                <p className="text-brand-light/80 mb-8">
                  I'm currently looking for new opportunities in Data Science and Web Development. 
                  Have a question or want to work together?
                </p>
              </div>

              <div className="space-y-4">
                <a href={SOCIALS.email} className="flex items-center gap-3 text-white hover:text-brand-accent transition-colors">
                  <Mail size={20} />
                  <span>roshantalks228@gmail.com</span>
                </a>
                <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-brand-accent transition-colors">
                  <Linkedin size={20} />
                  <span>LinkedIn Profile</span>
                </a>
                <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-brand-accent transition-colors">
                  <Github size={20} />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>

            {/* Form Side */}
            <div className="p-10">
              <form id="contact-form" onSubmit={sendEmail} className="space-y-6">
                <div>
                  <label htmlFor="from_name" className="block text-sm font-medium text-brand-light/60 mb-2">Name</label>
                  <input 
                    type="text"
                    name="from_name"
                    id="from_name"
                    required
                    value={formData.from_name}
                    onChange={handleChange}
                    className="w-full bg-brand-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50"
                    placeholder="Your Name"
                    disabled={status === 'sending' || status === 'success'}
                  />
                </div>
                <div>
                  <label htmlFor="from_email" className="block text-sm font-medium text-brand-light/60 mb-2">Email</label>
                  <input 
                    type="email"
                    name="from_email"
                    id="from_email"
                    required
                    value={formData.from_email}
                    onChange={handleChange}
                    className="w-full bg-brand-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50"
                    placeholder="your@email.com"
                    disabled={status === 'sending' || status === 'success'}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-light/60 mb-2">Message</label>
                  <textarea 
                    name="message"
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-brand-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50"
                    placeholder="Say hello..."
                    disabled={status === 'sending' || status === 'success'}
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className={`w-full font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                    status === 'success' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50 cursor-default' 
                      : status === 'error'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30'
                      : 'bg-brand-accent text-brand-dark hover:bg-white'
                  }`}
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle size={18} /> Message Sent!
                    </>
                  ) : status === 'error' ? (
                    <>
                       Try Again <Send size={18} />
                    </>
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-red-400 text-sm mt-2"
                    >
                      <AlertCircle size={16} />
                      <span>{errorMessage || "Something went wrong."}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

          </div>
        </motion.div>

        <footer className="mt-20 text-center text-brand-light/40 text-sm">
          <p>© 2025 Roshan Yadav. Built with React & Tailwind.</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
