/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GraduationCap, Calendar, Award } from 'lucide-react';
import { EducationItem } from '../types';
import ScrollAnimatedSection from './ScrollAnimatedSection';

const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Bachelor of Technology in Computer Science & Engineering',
    institution: 'A.P.J. Abdul Kalam University (AKTU)',
    period: '2024 - 2028',
    description: 'Focusing on advanced computing paradigms, software engineering standards, data structures, and interactive application engineering. Actively participating in development clubs and coding hackathons.',
  },
  {
    degree: 'The Cambridge International School (Class XII) - CBSE',
    institution: 'The Cambridge International School, New Delhi',
    period: '2022 - 2024',
    description: 'Completed high school specialization in Physics, Chemistry, Mathematics, and Computer Science. Recipient of academic excellence awards.',
  },
  {
    degree: 'The Cambridge International School (Class X) - CBSE',
    institution: 'The Cambridge International School, New Delhi',
    period: '2020 - 2022',
    description: 'Secured perfect scores in Mathematics and Computer Applications, establishing a strong foundation for core technology pursuits.',
  },
];

export default function EducationTimeline() {
  return (
    <div id="education-timeline" className="relative max-w-4xl mx-auto pl-4 md:pl-8">
      {/* Central Line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-neutral-800 to-neutral-900" />

      <div className="space-y-12">
        {EDUCATION_DATA.map((item, idx) => (
          <ScrollAnimatedSection
            key={idx}
            id={`education-item-${idx}`}
            delay={idx * 0.1}
            direction={idx % 2 === 0 ? 'left' : 'right'}
            className="relative pl-8 md:pl-12"
          >
            {/* Pulsing indicator node */}
            <div className="absolute left-[-11px] md:left-[-15px] top-1.5 w-6 h-6 rounded-full bg-neutral-950 border-2 border-purple-500 flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.4)]">
              <GraduationCap className="w-3 h-3 text-purple-400" />
            </div>

            {/* Content card */}
            <div className="bg-neutral-900/20 border border-white/5 p-6 md:p-8 rounded-2xl backdrop-blur-md hover:border-white/10 transition-all duration-300 group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-purple-400 transition-colors font-display">
                  {item.degree}
                </h3>
                <span className="inline-flex items-center text-xs text-purple-300 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 w-fit">
                  <Calendar className="w-3 h-3 mr-1" />
                  {item.period}
                </span>
              </div>

              <p className="text-sm text-neutral-300 font-medium mb-1">
                {item.institution}
              </p>

              {item.grade && (
                <div className="inline-flex items-center text-xs text-neutral-400 font-mono mb-4 bg-white/5 px-2.5 py-1 rounded">
                  <Award className="w-3.5 h-3.5 text-yellow-500 mr-1.5" />
                  <span>{item.grade}</span>
                </div>
              )}

              <p className="text-sm text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </ScrollAnimatedSection>
        ))}
      </div>
    </div>
  );
}
