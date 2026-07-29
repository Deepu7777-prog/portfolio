// ============================================
// PORTFOLIO DATA — Saideepthi Kummari
// Centralized content for all sections
// ============================================

export const personalInfo = {
  name: "Saideepthi Kummari",
  greeting: "Hello, Namaste 👋",
  roles: [
    "Computer Science Engineering Student",
    "Full Stack Web Developer",
    "AI & Machine Learning Enthusiast",
    "Cybersecurity Learner",
  ],
  intro:
    "I am a passionate Computer Science Engineering student who enjoys creating modern web applications, AI-powered solutions, and cybersecurity projects. I continuously learn new technologies and actively pursue internships to build real-world experience while developing impactful software.",
  email: "deepudeepuuu730@gmail.com",
  phone: "8464826785",
  linkedin: "https://www.linkedin.com/in/saideepthikummarii",
  github: "https://github.com/Deepu7777-prog",
  location: "Sangareddy, Telangana, India",
  locationCoords: { lat: 17.6194, lng: 78.0823 },
};

export const aboutTags = [
  "Computer Science Engineering Student",
  "Passionate Full Stack Developer",
  "AI & ML Enthusiast",
  "Cybersecurity Learner",
  "Problem Solver",
  "Team Player",
  "Continuous Learner",
  "Looking for Internship Opportunities",
];

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  color: string;
  skills: Skill[];
}

export const skills: SkillCategory[] = [
  {
    title: "Programming",
    color: "#2563EB",
    skills: [
      { name: "Python" },
      { name: "JavaScript" },
      { name: "HTML" },
      { name: "CSS" },
      { name: "SQL" },
    ],
  },
  {
    title: "Frameworks",
    color: "#8B5CF6",
    skills: [
      { name: "Flask" },
      { name: "React" },
      { name: "Next.js" },
    ],
  },
  {
    title: "Database",
    color: "#059669",
    skills: [{ name: "MySQL" }],
  },
  {
    title: "Concepts",
    color: "#DC2626",
    skills: [
      { name: "Artificial Intelligence" },
      { name: "Machine Learning" },
      { name: "Cybersecurity" },
      { name: "Data Structures & Algorithms" },
      { name: "Git & GitHub" },
    ],
  },
];

export interface Experience {
  company: string;
  role: string;
  duration: string;
  project: string;
  responsibilities: string[];
  color: string;
}

export const experiences: Experience[] = [
  {
    company: "Edunet Foundation",
    role: "Capstone Intern",
    duration: "December 2025 – April 2026",
    project: "HeartReach Ally",
    responsibilities: [
      "Full Stack Development",
      "Problem Solving",
      "Team Collaboration",
      "System Design",
    ],
    color: "#2563EB",
  },
];

export interface Project {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  liveUrl: string;
  color: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    title: "CyberGuard",
    description: "AI Powered Cybercrime Detection System",
    tech: ["Python", "Flask", "MySQL", "HTML", "CSS", "JavaScript"],
    features: [
      "Phishing Detection",
      "Scam Detection",
      "Fraud Detection",
      "Cybercrime Reporting",
      "Threat Dashboard",
    ],
    liveUrl: "https://cyberguard-5lg8.vercel.app/",
    color: "#2563EB",
    gradient: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)",
  },
  {
    title: "NextGen BTech",
    description:
      "A platform helping engineering students with academic subjects, study resources, notes, and guidance.",
    tech: ["React", "Next.js", "JavaScript", "CSS"],
    features: [
      "Academic Resources",
      "Study Materials",
      "Subject Guidance",
      "Student Community",
    ],
    liveUrl: "https://nextgen-btech.vercel.app/",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #6D28D9 0%, #A78BFA 100%)",
  },
  {
    title: "HeartReach Ally",
    description:
      "Capstone project completed during Edunet Foundation Internship.",
    tech: ["React", "Python", "Flask", "MySQL"],
    features: [
      "Full Stack Application",
      "Capstone Project",
      "Internship Deliverable",
      "Real-world Impact",
    ],
    liveUrl: "https://heartreach-ally.lovable.app",
    color: "#EC4899",
    gradient: "linear-gradient(135deg, #BE185D 0%, #F472B6 100%)",
  },
];

export interface Education {
  degree: string;
  field?: string;
  year: string;
  score: string;
  scoreLabel: string;
  icon: string;
}

export const education: Education[] = [
  {
    degree: "Bachelor of Technology",
    field: "Computer Science Engineering",
    year: "2024 – 2028",
    score: "9.0",
    scoreLabel: "CGPA",
    icon: "🎓",
  },
  {
    degree: "Intermediate",
    year: "2022 – 2024",
    score: "983 / 1000",
    scoreLabel: "Score",
    icon: "📚",
  },
  {
    degree: "SSC",
    year: "Completed 2022",
    score: "9.8",
    scoreLabel: "CGPA",
    icon: "🏫",
  },
];

export interface Achievement {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export const achievements: Achievement[] = [
  {
    icon: "🏆",
    title: "Three Internship Offer Letters",
    description: "Cognifyz • YugaYatra Retail Pvt. Ltd. • InternPe",
    color: "#F59E0B",
  },
  {
    icon: "👩‍💻",
    title: "Team Leader – CyberGuard",
    description: "Led the development team for AI-powered cybercrime detection",
    color: "#2563EB",
  },
  {
    icon: "🎓",
    title: "Edunet Foundation Internship",
    description: "Successfully completed capstone internship program",
    color: "#8B5CF6",
  },
];

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  color: string;
}

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    title: "Internship Completion Certificate",
    issuer: "Edunet Foundation",
    date: "April 2026",
    color: "#2563EB",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Certificates", href: "#certificates" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/saideepthikummarii",
    icon: "linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/Deepu7777-prog",
    icon: "github",
  },
  {
    name: "Email",
    url: "mailto:deepudeepuuu730@gmail.com",
    icon: "mail",
  },
];
