
import { Project, EducationItem, CertificateItem, SkillItem } from './types';
import { Database, Code2, BrainCircuit, Globe, BarChart3, Server } from 'lucide-react';

export const HERO_IMAGE = "https://i.postimg.cc/tgfmM3YD/IMG-20250426-114644.jpg";

export const SOCIALS = {
  linkedin: "https://www.linkedin.com/in/roshan-yadav-a9971a2b3",
  github: "https://github.com/RoshanYD",
  email: "mailto:roshantalks228@gmail.com"
};

export const SKILLS: SkillItem[] = [
  { name: "Python", category: "tech" },
  { name: "Data Science", category: "data" },
  { name: "Analytics", category: "data" },
  { name: "Artificial Intelligence", category: "tech" },
  { name: "SQL", category: "data" },
  { name: "Web Development", category: "web" },
  { name: "React.js", category: "web" },
  { name: "Machine Learning", category: "data" },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "MCA (Master of Computer Applications)",
    institution: "MET Bhujbal Knowledge City, Nashik",
    year: "2025 – Present",
    details: "Focusing on Advanced Computing and AI."
  },
  {
    degree: "B.Sc. Computer Science",
    institution: "HPT & RYK College, Nashik",
    year: "2025",
    details: "CGPA: 7.38"
  },
  {
    degree: "HSC (Higher Secondary Certificate)",
    institution: "HPT & RYK College, Nashik",
    year: "2022",
    details: "Percentage: 60%"
  },
  {
    degree: "SSC (Secondary School Certificate)",
    institution: "St. Francis High School, Nashik",
    year: "2020",
    details: "Percentage: 79.80%"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Campfly Sales Analytics Dashboard",
    description: "Interactive sales analytics dashboard providing deep insights into KPIs, revenue trends, and customer segments.",
    liveUrl: "https://camply-sales-analysis.netlify.app/",
    codeUrl: "https://github.com/RoshanYd/campfly-sales-analysis-dashboard",
    tags: ["Data Analytics", "Visualization", "Dashboard"],
    imageUrl: "https://i.postimg.cc/KzqmBKCH/Gemini-Generated-Image-s6leyns6leyns6le.png"
  },
  {
    title: "ARcricinfo Web App",
    description: "A modern cricket analytics application featuring a responsive UI for real-time stats and fast browsing.",
    liveUrl: "https://arcricinfo1.netlify.app/",
    codeUrl: "https://github.com/RoshanYd/ARcricinfo",
    tags: ["Web Dev", "React", "API Integration"],
    imageUrl: "https://i.postimg.cc/GmFrzgZx/Gemini-Generated-Image-yj3x1uyj3x1uyj3x.png"
  }
];

export const CERTIFICATES: CertificateItem[] = [
  { title: "Certificate 1", imageUrl: "https://i.postimg.cc/XvKD6NV6/Certificate.png" },
  { title: "Infosys DA", imageUrl: "https://i.postimg.cc/52Bm6PDs/infosis-DA-certificate1.png" },
  { title: "Certificate 3", imageUrl: "https://i.postimg.cc/Lsf5txK0/Certificate-(1)-(1).png" },
  { title: "Data Science", imageUrl: "https://i.postimg.cc/GpMgm7sj/Data-Science-Certificate.png" },
];
