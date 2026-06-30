/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExternalLink, Github, Code2, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  return (
    <div
      id={`project-card-${project.id}`}
      className="group relative flex flex-col bg-neutral-900/30 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md hover:border-white/15 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/5 hover:-translate-y-1 h-full"
    >
      {/* Background Gradient Accent on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image Section */}
      <div className="relative h-52 overflow-hidden select-none bg-neutral-950">
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Tag Overlay */}
        <div
          id={`project-tag-${project.id}`}
          className={`absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-extrabold px-3 py-1.5 rounded-full flex items-center ${project.tagColorClass}`}
        >
          <Sparkles className="w-3 h-3 mr-1" />
          <span>{project.tag}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 font-display group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-neutral-400 leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        {/* Tech Stack & Links */}
        <div>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-2.5 py-1 bg-white/5 border border-white/10 text-neutral-300 rounded-full font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-end border-t border-white/5 pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-neutral-400 hover:text-white transition-all inline-flex items-center"
                title="Live Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
