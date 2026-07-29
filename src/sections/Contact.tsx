import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiSend, FiCheck, FiMapPin } from 'react-icons/fi';
import { personalInfo } from '../data/portfolio';
import GlobeCanvas from '../components/3d/Globe';
import '../styles/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section gradient-bg">
      <div className="container">
        <div className="section-header text-center">
          <motion.p 
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.p>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Let's Connect
          </motion.h2>
        </div>

        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-input"
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="name" className="form-label">Name</label>
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-input"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email" className="form-label">Email</label>
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  id="message"
                  className="form-textarea"
                  placeholder=" "
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <label htmlFor="message" className="form-label">Message</label>
              </div>
              
              <button type="submit" className="form-submit">
                Send Message <FiSend />
              </button>

              <AnimatePresence>
                {submitted && (
                  <motion.div 
                    className="contact-success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div 
                      className="contact-success-icon"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    >
                      <FiCheck />
                    </motion.div>
                    <h3>Message Sent!</h3>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.a 
              href={`mailto:${personalInfo.email}`}
              className="contact-info-card"
              whileHover={{ scale: 1.02 }}
            >
              <div className="contact-info-icon"><FiMail /></div>
              <div className="contact-info-text">
                <span className="contact-info-label">Email</span>
                <span className="contact-info-value">{personalInfo.email}</span>
              </div>
            </motion.a>

            <motion.a 
              href={`tel:${personalInfo.phone}`}
              className="contact-info-card"
              whileHover={{ scale: 1.02 }}
            >
              <div className="contact-info-icon"><FiPhone /></div>
              <div className="contact-info-text">
                <span className="contact-info-label">Phone</span>
                <span className="contact-info-value">{personalInfo.phone}</span>
              </div>
            </motion.a>

            <motion.a 
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-card"
              whileHover={{ scale: 1.02 }}
            >
              <div className="contact-info-icon"><FiLinkedin /></div>
              <div className="contact-info-text">
                <span className="contact-info-label">LinkedIn</span>
                <span className="contact-info-value">Connect on LinkedIn</span>
              </div>
            </motion.a>

            <motion.a 
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-card"
              whileHover={{ scale: 1.02 }}
            >
              <div className="contact-info-icon"><FiGithub /></div>
              <div className="contact-info-text">
                <span className="contact-info-label">GitHub</span>
                <span className="contact-info-value">View my repositories</span>
              </div>
            </motion.a>
            
            <motion.div 
              className="contact-info-card"
              style={{ pointerEvents: 'none' }}
            >
              <div className="contact-info-icon"><FiMapPin /></div>
              <div className="contact-info-text">
                <span className="contact-info-label">Location</span>
                <span className="contact-info-value">{personalInfo.location}</span>
              </div>
            </motion.div>

            <div className="contact-globe">
              <GlobeCanvas />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
