import { motion } from 'framer-motion';
import { skills } from '../data/portfolio';
import '../styles/skills.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Skills = () => {
  return (
    <section id="skills" className="section gradient-bg">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">My Skills</span>
          <h2 className="section-title">Technologies & Concepts</h2>
        </div>

        <div className="skills-grid">
          {skills.map((category, index) => (
            <motion.div
              key={index}
              className="skill-category glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="skill-category-header">
                <div 
                  className="skill-category-dot" 
                  style={{ backgroundColor: category.color }} 
                />
                <h3 className="skill-category-title">{category.title}</h3>
              </div>
              
              <motion.div 
                className="skill-capsules"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="skill-capsule"
                    whileHover={{ y: -5, scale: 1.03 }}
                    style={{ borderLeftColor: category.color }}
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
