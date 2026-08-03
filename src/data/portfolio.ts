// ============================================
// PORTFOLIO DATA — Saideepthi Kummari
// Centralized content for Awwwards-Quality Portfolio
// ============================================

export const personalInfo = {
  name: "Saideepthi Kummari",
  greeting: "Hello 👋",
  roles: [
    "AI & Machine Learning Enthusiast",
    "Python Developer",
    "Cybersecurity Explorer",
    "Full Stack Web Developer"
  ],
  heroIntro:
    "Passionate B.Tech Computer Science Engineering student building intelligent AI-powered and secure software solutions with beautiful user experiences.",
  aboutIntro:
    "I am a passionate Computer Science Engineering student specializing in Artificial Intelligence, Machine Learning, Cybersecurity and Full Stack Development. I enjoy building real-world applications that solve meaningful problems while continuously learning modern technologies.",
  email: "deepudeepuuu730@gmail.com",
  phone: "+91 8464826785",
  linkedin: "https://www.linkedin.com/in/saideepthikummarii",
  github: "https://github.com/Deepu7777-prog",
  location: "Sangareddy, Telangana, India",
  college: "Ellenki College of Engineering and Technology (JNTUH)",
  resumeUrl: "/resume.pdf",
};

export const statistics = [
  { label: "CGPA", value: "9.0", suffix: "" },
  { label: "Internships", value: "1+", suffix: "" },
  { label: "Featured Projects", value: "1", suffix: "" },
  { label: "Technical Skills", value: "10+", suffix: "" },
];

export interface SkillItem {
  name: string;
  category: string;
  iconName: string;
  color: string;
  description: string;
}

export const skillsBento: SkillItem[] = [
  {
    name: "Python",
    category: "Programming",
    iconName: "python",
    color: "#3776AB",
    description: "Core language for AI/ML modeling & Flask APIs",
  },
  {
    name: "AI & Machine Learning",
    category: "Core Concept",
    iconName: "brain",
    color: "#8B5CF6",
    description: "Predictive models, NLP, & cyber threat classification",
  },
  {
    name: "Cybersecurity",
    category: "Security",
    iconName: "shield",
    color: "#06B6D4",
    description: "Phishing detection, fraud prevention & vulnerability analysis",
  },
  {
    name: "SQL & MySQL",
    category: "Database",
    iconName: "database",
    color: "#00758F",
    description: "Relational database schema design & querying",
  },
  {
    name: "Flask",
    category: "Framework",
    iconName: "flask",
    color: "#EC4899",
    description: "Lightweight Python microframework for REST web services",
  },
  {
    name: "JavaScript & React",
    category: "Frontend",
    iconName: "react",
    color: "#61DAFB",
    description: "Dynamic glassmorphic UIs & interactive applications",
  },
  {
    name: "HTML & CSS",
    category: "Frontend",
    iconName: "code",
    color: "#E34F26",
    description: "Modern responsive layouts & 3D micro-animations",
  },
  {
    name: "Data Structures & Algo",
    category: "CS Core",
    iconName: "cpu",
    color: "#F59E0B",
    description: "Optimized computational algorithms & data structures",
  },
  {
    name: "Problem Solving",
    category: "Soft Skill",
    iconName: "target",
    color: "#10B981",
    description: "Analytical thinking & creative software design",
  },
];

export const skills = skillsBento;

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  project: string;
  description: string;
  highlights: string[];
  color: string;
}

export const experiences: ExperienceItem[] = [
  {
    company: "Edunet Foundation",
    role: "Software Development Intern",
    duration: "December 2025 – April 2026",
    project: "Unified Emergency Alert System & HeartReach Ally",
    description:
      "Worked on full-stack web applications and system design during the SAP Code Unnati Capstone internship.",
    highlights: [
      "Full Stack Development",
      "System Design & Debugging",
      "Team Collaboration & Leadership",
      "Problem Solving under Agile Sprints",
    ],
    color: "#8B5CF6",
  },
];

export interface ProjectItem {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  color: string;
  gradient: string;
}

export const featuredProjects: ProjectItem[] = [
  {
    title: "CyberGuard",
    subtitle: "AI-Powered Cybercrime Detection System",
    description:
      "CyberGuard is an AI-powered Cybercrime Detection Platform capable of identifying phishing websites, scam messages, malicious URLs, and online fraud in real time.",
    features: [
      "AI Phishing Detection",
      "Scam Message Classification",
      "Real-time Threat Analysis",
      "Online Fraud Prevention",
      "Cyber Crime Reporting Portal",
      "Interactive Threat Dashboard",
    ],
    tech: ["Python", "Flask", "MySQL", "HTML", "CSS", "JavaScript"],
    liveUrl: "https://cyberguard-5lg8.vercel.app/",
    githubUrl: "https://github.com/Deepu7777-prog",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)",
  },
];

export const projects = featuredProjects;

export interface EducationItem {
  institution: string;
  affiliation?: string;
  degree: string;
  field: string;
  duration: string;
  score: string;
  scoreLabel: string;
  icon: string;
  details: string;
}

export const educationList: EducationItem[] = [
  {
    institution: "Ellenki College of Engineering and Technology",
    affiliation: "Jawaharlal Nehru Technological University Hyderabad (JNTUH)",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science Engineering",
    duration: "2024 – 2028 (Expected)",
    score: "9.0",
    scoreLabel: "CGPA",
    icon: "🎓",
    details:
      "Learned data structures, algorithms, software development principles, and AI fundamentals to solve complex real-world problems.",
  },
  {
    institution: "Sri Venkateswara Junior College",
    degree: "Intermediate (10+2)",
    field: "MPC (Mathematics, Physics, Chemistry)",
    duration: "2022 – 2024",
    score: "983 / 1000",
    scoreLabel: "Marks",
    icon: "📚",
    details:
      "Achieved 984/1000 marks, demonstrating academic excellence in advanced mathematics and scientific problem-solving.",
  },
  {
    institution: "G.N.H.S",
    degree: "SSC (10th Standard)",
    field: "General Education",
    duration: "2021 – 2022",
    score: "9.8",
    scoreLabel: "CGPA",
    icon: "🏫",
    details:
      "Completed secondary education with 9.8 CGPA, building strong analytical and mathematical fundamentals.",
  },
];

export const education = educationList;

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  icon: string;
}

export const certificates: CertificateItem[] = [
  {
    title: "Code Unnati Capstone Certification in Python, Data Analytics, DBMS, DSA & Competitive Coding",
    issuer: "Edunet Foundation & SAP",
    date: "2025 – 2026",
    icon: "📜",
  },
];

export interface AchievementItem {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const achievements: AchievementItem[] = [
  {
    title: "Current 9.0 CGPA",
    description: "Consistent academic performance in B.Tech CSE at Ellenki College of Engineering (JNTUH).",
    icon: "🏆",
    color: "#8B5CF6",
  },
  {
    title: "983 / 1000 Intermediate MPC",
    description: "Top-tier academic scorer at Sri Venkateswara Junior College.",
    icon: "🌟",
    color: "#06B6D4",
  },
  {
    title: "Unified Emergency Alert Lead Developer",
    description: "Developed end-to-end full-stack alert system during SAP Edunet Capstone internship.",
    icon: "🚀",
    color: "#EC4899",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
