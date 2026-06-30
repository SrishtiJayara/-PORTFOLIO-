/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Layout, Server, Sliders, Cpu, CheckCircle2 } from 'lucide-react';
import { Skill } from '../types';
import ScrollAnimatedSection from './ScrollAnimatedSection';

const SKILLS_DATA: Skill[] = [
  // Frontend
  { name: 'React.js', category: 'Frontend', level: 88, iconName: 'Layout', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript (ES6+)', category: 'Frontend', level: 90, iconName: 'Layout', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', category: 'Frontend', level: 80, iconName: 'Layout', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 92, iconName: 'Layout', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'HTML5 & CSS3', category: 'Frontend', level: 93, iconName: 'Layout', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'Framer Motion', category: 'Frontend', level: 75, iconName: 'Layout', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },

  // Backend
  { name: 'Node.js', category: 'Backend', level: 70, iconName: 'Server', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Local Storage / Cache', category: 'Backend', level: 85, iconName: 'Server', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },

  // Design & Tools
  { name: 'Git & GitHub', category: 'Design & Tools', level: 90, iconName: 'Sliders', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'Vercel / Netlify', category: 'Design & Tools', level: 84, iconName: 'Sliders', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
  { name: 'Responsive Layouts', category: 'Design & Tools', level: 92, iconName: 'Sliders', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },

  // Core CS
  { name: 'Data Structures', category: 'Core Computer Science', level: 78, iconName: 'Cpu', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Algorithms', category: 'Core Computer Science', level: 76, iconName: 'Cpu', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'OOPs Concepts', category: 'Core Computer Science', level: 84, iconName: 'Cpu', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
];

const CATEGORIES = [
  { id: 'All', label: 'All Tech', icon: CheckCircle2 },
  { id: 'Frontend', label: 'Frontend', icon: Layout },
  { id: 'Backend', label: 'Backend', icon: Server },
  { id: 'Design & Tools', label: 'Tools & Design', icon: Sliders },
  { id: 'Core Computer Science', label: 'Core CS', icon: Cpu },
];

export default function SkillsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter(skill => skill.category === selectedCategory);

  return (
    <div id="skills-grid-container" className="space-y-10 max-w-5xl mx-auto">
      {/* Dynamic Category Selector Tabs */}
      <div className="flex flex-wrap justify-center gap-2" id="skills-tabs">
        {CATEGORIES.map((cat) => {
          const IconComponent = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`tab-skill-${cat.id.replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-purple-500 border-purple-400 text-white shadow-lg shadow-purple-500/20 scale-[1.02]'
                  : 'bg-white/5 border-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid Display */}
      <div
        id="skills-items-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredSkills.map((skill, index) => {
          return (
            <ScrollAnimatedSection
              key={skill.name}
              id={`skill-card-${skill.name.replace(/\s+/g, '-')}`}
              delay={(index % 3) * 0.05}
              direction="up"
              className="bg-neutral-900/20 border border-white/5 rounded-2xl p-6 backdrop-blur-md hover:border-white/10 transition-all duration-300 group hover:-translate-y-0.5"
            >
              <div className="mb-4 flex items-center gap-3">
                {skill.logoUrl ? (
                  <img
                    src={skill.logoUrl}
                    alt={`${skill.name} logo`}
                    className="w-8 h-8 object-contain rounded-md"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-semibold text-neutral-300">
                    {skill.name.charAt(0)}
                  </div>
                )}
                <span className="text-sm font-bold text-neutral-200 group-hover:text-white transition-colors">
                  {skill.name}
                </span>
              </div>

              <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mt-2.5 font-semibold">
                {skill.category}
              </span>
            </ScrollAnimatedSection>
          );
        })}
      </div>
    </div>
  );
}
