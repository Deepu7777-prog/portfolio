import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiLinkedin, FiGithub, FiChevronDown } from 'react-icons/fi';
import { personalInfo, socialLinks } from '../data/portfolio';
import HeroScene from '../components/3d/HeroScene';
import Terminal from '../components/Terminal';
import '../styles/hero.css';

const easeOutTransition = [0.16, 1, 0.3, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutTransition } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const Hero: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (-y / rect.height) * 15,
      y: (x / rect.width) * 15,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="home" className="hero">
      {/* Background Lighting & Particles Mesh */}
      <HeroScene />

      <div className="hero-content">
        {/* LEFT SIDE: Portrait Photo with Falling Entrance & Bounce Landing */}
        <motion.div
          className="hero-image-wrapper"
          initial={{ y: -300, opacity: 0, scale: 0.85 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 65,
            damping: 13,
            mass: 1.1,
            delay: 0.2,
          }}
        >
          <div className="hero-image-glow" />

          <motion.div
            className="hero-image-frame"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <img
              src="/images/profile.jpg"
              alt="Saideepthi Kummari"
              className="hero-portrait"
            />

            <div className="hero-image-badge">
              <span className="dot" />
              <span>Available for Internships</span>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: Text Content, CTAs & Social Links */}
        <motion.div
          className="hero-text"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-greeting" variants={fadeInUp}>
            <span>Welcome to my Portfolio</span>
            <span className="wave">✨</span>
          </motion.div>

          <motion.h1 className="hero-name text-gradient" variants={fadeInUp}>
            {personalInfo.name}
          </motion.h1>

          <motion.div className="hero-subtitle" variants={fadeInUp}>
            Software Engineer / AI & ML Student
          </motion.div>

          <motion.p className="hero-description" variants={fadeInUp}>
            {personalInfo.intro}
          </motion.p>

          <motion.div className="hero-cta" variants={fadeInUp}>
            <a href={`mailto:${personalInfo.email}`} className="btn btn-primary">
              <FiDownload /> Download Resume
            </a>
            <a href="#contact" className="btn btn-secondary">
              <FiMail /> Contact Me
            </a>
          </motion.div>

          <motion.div className="hero-social" variants={fadeInUp}>
            {socialLinks.map((link, index) => {
              const Icon = link.name === 'LinkedIn' ? FiLinkedin : FiGithub;
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="hero-social-btn"
                >
                  <Icon />
                </a>
              );
            })}
          </motion.div>

          <div style={{ marginTop: '28px', width: '100%' }}>
            <Terminal />
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll Down</span>
        <FiChevronDown />
      </div>
    </section>
  );
};

export default Hero;
