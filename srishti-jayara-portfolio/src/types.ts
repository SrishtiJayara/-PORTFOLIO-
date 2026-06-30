/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tag: string; // e.g., INTERACTIVE APP
  tagColorClass: string; // e.g., text-teal-300 border-teal-500/30
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Design & Tools' | 'Core Computer Science';
  level: number; // 1 to 100 for progress indicators
  iconName: string; // lucide icon name
  logoUrl?: string; // official logo image URL
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  grade?: string;
  description: string;
}
