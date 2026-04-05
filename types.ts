
export interface Project {
  title: string;
  description: string;
  liveUrl: string;
  codeUrl: string;
  tags: string[];
  imageUrl: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  details?: string;
}

export interface CertificateItem {
  imageUrl: string;
  title: string;
}

export interface SkillItem {
  name: string;
  category: 'tech' | 'data' | 'web';
}
