/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent } from 'react';
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Send,
  Sparkles,
  ExternalLink,
  Code2,
  X,
  FileDown,
  Compass,
  CheckCircle,
  MessageSquare,
  Trash2,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import profilePic from '../assets/WhatsApp Image 2026-06-29 at 10.15.00 PM.jpeg';
import clockverseImage from '../assets/clockverse.jpg';
import resumeBuilderImage from '../assets/Resume builder.jpg';
import skysenseImage from '../assets/skysense.jpg';
import dayPlannerImage from '../assets/DayPlanner.jpg';

// Custom components
import StarBackground from './components/StarBackground';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import EducationTimeline from './components/EducationTimeline';
import SkillsGrid from './components/SkillsGrid';
import ScrollAnimatedSection from './components/ScrollAnimatedSection';
import { Project } from './types';

const PROJECTS_DATA: Project[] = [
  {
    id: 'clockverse',
    title: 'ClockVerse',
    tag: 'INTERACTIVE APP',
    tagColorClass: 'text-teal-300 border-teal-500/20 bg-teal-500/5',
    image: clockverseImage,
    description: 'A premium, highly interactive digital clock ecosystem designed with immersive glassmorphism aesthetics and custom themes.',
    longDescription: 'ClockVerse is a beautiful web dashboard that redefines how time is visualised in a browser. Built with precision glassmorphism overlays, customizable ambient neon glowing accents, dynamic visual timers, stopwatches, world clock offsets, and custom dark presets. Fully responsive design featuring seamless transitions, fluid mechanics, and local preference storage.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Git & GitHub'],
    liveUrl: 'https://srishtijayara.github.io/ClockVerse/',
    githubUrl: '#',
  },
  {
    id: 'resume-builder',
    title: 'Resume Builder',
    tag: 'VERCEL WEB APP',
    tagColorClass: 'text-blue-300 border-blue-500/20 bg-blue-500/5',
    image: resumeBuilderImage,
    description: 'A modern, responsive resume creator application that compiles user details into standard professional resume layouts in real-time.',
    longDescription: 'Resume Builder empowers students and professionals to compile gorgeous, ATS-friendly resume sheets on-the-fly. Integrates custom state tracking for personal details, academic history, project milestones, and tech expertise. Instantly formats, live-updates template designs, and exports into neat standard layouts.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Vercel Deployment'],
    liveUrl: 'https://resume-builder-9kdar9dxs-srishti-jayara-s-projects.vercel.app/',
    githubUrl: '#',
  },
  {
    id: 'skysense',
    title: 'SkySense',
    tag: 'WEATHER DASHBOARD',
    tagColorClass: 'text-indigo-300 border-indigo-500/20 bg-indigo-500/5',
    image: skysenseImage,
    description: 'An interactive weather application providing real-time conditions, forecasts, and location insights with modern animations.',
    longDescription: 'SkySense offers an immersive meteorology dashboard utilizing beautiful climate animations. Features geographic coordinate lookup, atmospheric humidity gauges, wind velocity vectors, and interactive 5-day predictive grids. Dynamic elements automatically re-style standard layouts based on warm, cool, or overcast states.',
    technologies: ['JavaScript', 'CSS3', 'Weather API', 'Responsive Design'],
    liveUrl: 'https://srishtijayara.github.io/SkySense/',
    githubUrl: '#',
  },
  {
    id: 'day-planner',
    title: 'Day Planner',
    tag: 'PRODUCTIVITY APP',
    tagColorClass: 'text-purple-300 border-purple-500/20 bg-purple-500/5',
    image: dayPlannerImage,
    description: 'A minimalist daily calendar and task scheduling dashboard that enables users to structure their day-to-day work plans.',
    longDescription: 'Day Planner integrates smart timeline grids with a modular task engine for professional productivity. Includes task categorisation, responsive calendar scheduling overlays, priority status toggles, persistent state synchronization, and a custom focused dark theme for visual comfort.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Local Storage'],
    liveUrl: 'https://srishtijayara.github.io/DAY-PLANNER/',
    githubUrl: '#',
  },
];

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Contact Form States
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submittedMessages, setSubmittedMessages] = useState<ContactMessage[]>([]);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load submissions on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_messages');
    if (saved) {
      try {
        setSubmittedMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved messages', e);
      }
    }

    const handleScrollButtonVisibility = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScrollButtonVisibility);
    return () => window.removeEventListener('scroll', handleScrollButtonVisibility);
  }, []);

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = formName.trim();
    const trimmedEmail = formEmail.trim();
    const trimmedMessage = formMessage.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/meebzprr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      if (response.ok) {
        const newMessage: ContactMessage = {
          id: Math.random().toString(36).substring(2, 9),
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setSubmittedMessages((prev) => {
          const updated = [newMessage, ...prev];
          localStorage.setItem('portfolio_messages', JSON.stringify(updated));
          return updated;
        });

        setFormName('');
        setFormEmail('');
        setFormMessage('');

        setShowSuccessNotification(true);
        setTimeout(() => {
          setShowSuccessNotification(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Failed to send message via Formspree', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteMessage = (id: string) => {
    const updated = submittedMessages.filter((msg) => msg.id !== id);
    setSubmittedMessages(updated);
    localStorage.setItem('portfolio_messages', JSON.stringify(updated));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-purple-500/30 selection:text-white pb-10">
      {/* Background Canvas Star Animation */}
      <StarBackground />

      {/* Floated Navigation Header */}
      <Navbar />

      {/* Main Container */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-32 pb-24 overflow-hidden">
        
        {/* ================= HERO SECTION ================= */}
        <section
          id="home"
          className="min-h-[85vh] flex flex-col items-center justify-center text-center relative max-w-5xl mx-auto select-none pt-12 md:pt-16"
        >
          {/* Subtle cosmic background lights */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-fuchsia-500/5 blur-[120px] pointer-events-none" />

          <ScrollAnimatedSection delay={0.1} direction="down">
            <span className="text-neutral-400 tracking-[0.3em] text-xs font-semibold mb-6 uppercase inline-block">
              HI, I'M
            </span>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection delay={0.2} direction="up">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-8 text-white drop-shadow-2xl">
              SRISHTI JAYARA
            </h1>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection delay={0.3} direction="up" className="z-20">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 text-fuchsia-400 rounded-full px-5 py-2 mb-8 hover:bg-purple-500/20 hover:border-purple-400/30 transition-all duration-300">
              <Code2 className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold tracking-wider uppercase">
                WEB DEVELOPER &amp; DESIGNER
              </span>
            </div>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection delay={0.4} direction="up" className="max-w-2xl">
            <p className="text-neutral-400 text-base sm:text-lg md:text-xl leading-relaxed mb-12 font-sans font-light">
              A passionate developer focused on building clean, accessible, and
              visually engaging web experiences. I love turning ideas into
              interactive products that make a real impact.
            </p>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection delay={0.5} direction="up">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
              <button
                id="hero-get-in-touch"
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-white font-bold text-sm bg-gradient-to-r from-fuchsia-500 to-purple-600 shadow-xl shadow-fuchsia-500/20 hover:shadow-fuchsia-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer text-center"
              >
                Get In Touch
              </button>
              <button
                id="hero-explore-works"
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-neutral-300 font-semibold text-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer inline-flex items-center justify-center space-x-2"
              >
                <Compass className="w-4 h-4 text-neutral-400" />
                <span>Explore Projects</span>
              </button>
            </div>
          </ScrollAnimatedSection>

          {/* Social Icons Strip */}
          <ScrollAnimatedSection delay={0.6} direction="up">
            <div className="flex space-x-3.5" id="hero-social-links">
              <a
                href="mailto:srishtijayara@gmail.com"
                className="p-3 rounded-full bg-neutral-900/40 border border-white/5 text-neutral-400 hover:text-white hover:bg-neutral-800/60 hover:border-white/15 transition-all duration-300"
                title="Email Address"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/SrishtiJayara"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-neutral-900/40 border border-white/5 text-neutral-400 hover:text-white hover:bg-neutral-800/60 hover:border-white/15 transition-all duration-300"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/srishti-jayara-74238532b/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-neutral-900/40 border border-white/5 text-neutral-400 hover:text-white hover:bg-neutral-800/60 hover:border-white/15 transition-all duration-300"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </ScrollAnimatedSection>
        </section>

        {/* ================= ABOUT ME SECTION ================= */}
        <section id="about" className="py-24 max-w-6xl mx-auto scroll-mt-20">
          <div className="text-center mb-16">
            <span className="text-purple-500 tracking-[0.2em] text-[10px] md:text-xs font-bold uppercase mb-2 block">
              PROFILE OVERVIEW
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white font-display">
              About Me
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Bio Card Grid */}
            <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
              <ScrollAnimatedSection direction="left" className="h-full">
                <div className="bg-neutral-900/20 border border-white/5 p-8 rounded-2xl backdrop-blur-md relative overflow-hidden group h-full flex flex-col justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="flex items-center space-x-3 mb-6 relative z-10">
                    <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white font-display">
                      Who I Am
                    </h3>
                  </div>

                  <p className="text-neutral-300 leading-relaxed mb-4 text-sm md:text-base font-light">
                    I am a Web Developer &amp; Designer pursuing my Bachelor of
                    Technology in Computer Science &amp; Engineering. I'm highly
                    focused on turning creative concepts into solid, interactive
                    frontend architectures.
                  </p>
                  <p className="text-neutral-300 leading-relaxed text-sm md:text-base font-light">
                    By blending clean coding practices with thoughtful user
                    experience principles, I aim to craft responsive digital products
                    that are not only visually impressive but also fully accessible and
                    performant.
                  </p>
                </div>
              </ScrollAnimatedSection>

              {/* Stat Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ScrollAnimatedSection direction="up" delay={0.1}>
                  <div className="bg-neutral-900/20 border border-white/5 p-6 rounded-2xl text-center backdrop-blur-md hover:border-white/10 transition-all duration-300">
                    <h4 className="text-4xl font-black text-blue-400 mb-1.5 font-display tracking-tight">
                      2028
                    </h4>
                    <p className="text-[10px] text-neutral-400 tracking-widest uppercase font-bold">
                      GRADUATION YEAR
                    </p>
                  </div>
                </ScrollAnimatedSection>

                <ScrollAnimatedSection direction="up" delay={0.2}>
                  <div className="bg-neutral-900/20 border border-white/5 p-6 rounded-2xl text-center backdrop-blur-md hover:border-white/10 transition-all duration-300">
                    <h4 className="text-4xl font-black text-fuchsia-400 mb-1.5 font-display tracking-tight">
                      5
                    </h4>
                    <p className="text-[10px] text-neutral-400 tracking-widest uppercase font-bold">
                      PROJECTS DEPLOYED
                    </p>
                  </div>
                </ScrollAnimatedSection>
              </div>
            </div>

            {/* Profile Picture Card */}
            <div className="lg:col-span-1 flex flex-col items-center justify-between">
              <ScrollAnimatedSection direction="right" className="w-full max-w-sm">
                <div className="bg-gradient-to-br from-purple-500/30 to-blue-500/30 p-[1px] rounded-2xl shadow-xl hover:shadow-purple-500/10 transition-shadow duration-500 aspect-square w-full max-w-sm mx-auto overflow-hidden">
                  <div className="bg-neutral-950 rounded-[1.5rem] h-full w-full flex items-center justify-center relative overflow-hidden group">
                    <img
                      src={profilePic}
                      alt="Srishti Jayara Profile Portrait"
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-[1.5rem] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              </ScrollAnimatedSection>
              <p className="mt-4 self-center text-2xl md:text-3xl font-extrabold tracking-[0.2em] uppercase text-white text-center">
                Srishti Jayara
              </p>
            </div>
          </div>
        </section>

        {/* ================= EDUCATION SECTION ================= */}
        <section id="education" className="py-24 max-w-6xl mx-auto scroll-mt-20">
          <div className="text-center mb-16">
            <span className="text-purple-500 tracking-[0.2em] text-[10px] md:text-xs font-bold uppercase mb-2 block">
              ACADEMIC TIMELINE
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white font-display">
              Education
            </h2>
          </div>

          <EducationTimeline />
        </section>

        {/* ================= SKILLS SECTION ================= */}
        <section id="skills" className="py-24 max-w-6xl mx-auto scroll-mt-20">
          <div className="text-center mb-16">
            <span className="text-purple-500 tracking-[0.2em] text-[10px] md:text-xs font-bold uppercase mb-2 block">
              EXPERTISE &amp; TOOLS
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white font-display">
              My Skills
            </h2>
          </div>

          <SkillsGrid />
        </section>

        {/* ================= PROJECTS SECTION ================= */}
        <section id="projects" className="py-24 max-w-6xl mx-auto scroll-mt-20">
          <div className="text-center mb-16">
            <span className="text-purple-500 tracking-[0.2em] text-[10px] md:text-xs font-bold uppercase mb-2 block">
              MY WORKS
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white font-display">
              Web Apps &amp; Design Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {PROJECTS_DATA.map((project, index) => (
              <ScrollAnimatedSection
                key={project.id}
                id={`animated-project-card-${project.id}`}
                delay={index * 0.1}
                direction="up"
              >
                <ProjectCard project={project} onOpenModal={setSelectedProject} />
              </ScrollAnimatedSection>
            ))}
          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <section id="contact" className="py-24 max-w-6xl mx-auto scroll-mt-20">
          <div className="text-center mb-16">
            <span className="text-purple-500 tracking-[0.2em] text-[10px] md:text-xs font-bold uppercase mb-2 block">
              GET IN TOUCH
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white font-display">
              Connect With Me
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Contact Information Cards */}
            <ScrollAnimatedSection direction="left">
              <div className="bg-neutral-900/20 border border-white/5 p-8 rounded-2xl backdrop-blur-md h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 font-display">
                    Let's collaborate.
                  </h3>
                  <p className="text-neutral-400 mb-8 leading-relaxed font-light text-sm">
                    I am open to Web Development &amp; Design internships, freelance
                    opportunities, or creative collaborations. Send a message, and
                    let's build something beautiful!
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mr-4 shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mb-0.5">
                          Email Me
                        </p>
                        <a
                          href="mailto:srishtijayara@gmail.com"
                          className="text-white hover:text-purple-400 transition-colors font-medium text-sm"
                        >
                          srishtijayara@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mr-4 shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mb-0.5">
                          Location
                        </p>
                        <p className="text-white font-medium text-sm">New Delhi, India</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5">
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mb-4">
                    FOLLOW MY WORK
                  </p>
                  <div className="flex space-x-3" id="contact-social-strip">
                    <a
                      href="https://github.com/SrishtiJayara"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/srishti-jayara-74238532b/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollAnimatedSection>

            {/* Live Message & Input Forms */}
            <ScrollAnimatedSection direction="right">
              <div className="bg-neutral-900/20 border border-white/5 p-8 rounded-2xl backdrop-blur-md">
                <form onSubmit={handleContactSubmit} className="space-y-5" id="portfolio-contact-form">
                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2"
                      htmlFor="form-name"
                    >
                      Full Name
                    </label>
                    <input
                      id="form-name"
                      name="name"
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full rounded-xl bg-neutral-950/60 border border-white/5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm text-white px-4 py-3 placeholder-neutral-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2"
                      htmlFor="form-email"
                    >
                      Email Address
                    </label>
                    <input
                      id="form-email"
                      name="email"
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full rounded-xl bg-neutral-950/60 border border-white/5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm text-white px-4 py-3 placeholder-neutral-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2"
                      htmlFor="form-message"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      required
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Hi Srishti, I saw your portfolio and would like to discuss..."
                      className="w-full rounded-xl bg-neutral-950/60 border border-white/5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm text-white px-4 py-3 placeholder-neutral-600 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    id="btn-contact-submit"
                    disabled={isSubmitting}
                    className="w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-xs font-bold tracking-wider uppercase rounded-full text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-neutral-950 transition-all duration-300 shadow-lg shadow-indigo-600/20 cursor-pointer mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <Send className="ml-2 w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </ScrollAnimatedSection>
          </div>

          {/* ================= OPTIONAL LIVE MESSAGE CENTER ================= */}
          {submittedMessages.length > 0 && null}
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer id="app-footer" className="relative z-10 border-t border-white/5 pt-10 pb-8 text-center select-none">
        <p className="text-xs text-neutral-500 tracking-wider">
          &copy; {new Date().getFullYear()} Srishti Jayara. All Rights Reserved.
        </p>
        <p className="text-[10px] text-neutral-600 mt-2 tracking-widest uppercase">
          Crafted with React, Tailwind &amp; Motion
        </p>
      </footer>

      {/* ================= PROJECT DETAILS MODAL ================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="project-modal-backdrop"
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              id="project-modal-card"
              className="bg-neutral-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                id="btn-close-modal"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-950/60 border border-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Banner Image */}
              <div className="relative h-60 bg-neutral-950 select-none">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-left-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span
                    className={`inline-block text-[10px] font-extrabold px-3 py-1 rounded-full mb-2 ${selectedProject.tagColorClass}`}
                  >
                    {selectedProject.tag}
                  </span>
                  <h3 className="text-2xl font-black text-white font-display">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
                    Project Concept
                  </h4>
                  <p className="text-sm text-neutral-300 leading-relaxed font-light">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
                    Technologies Implemented
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 bg-white/5 border border-white/15 text-neutral-300 rounded-full font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Simulated Architecture Panel (Highly custom & professional) */}
                <div className="bg-neutral-950/60 rounded-xl p-4 border border-white/5">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">
                    Architecture Specs
                  </span>
                  <div className="font-mono text-[11px] text-emerald-400/90 leading-relaxed space-y-1">
                    <p>// Client Engine Configuration</p>
                    <p>⚡ status: "DEPLOYED_STABLE"</p>
                    <p>🌐 environment: "Vite + SPA Runtime"</p>
                    <p>🚀 rendering_strategy: "CSR (Client-Side Rendering)"</p>
                  </div>
                </div>

                {/* External Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      className="flex-1 inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:opacity-95 text-white text-xs font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg shadow-fuchsia-500/10"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Launch Live App</span>
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      className="flex-1 inline-flex items-center justify-center space-x-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold py-3 px-6 rounded-full transition-all duration-300"
                    >
                      <Github className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Explore Source</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FLOATING SUCCESS TOAST ================= */}
      <AnimatePresence>
        {showSuccessNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            id="success-toast-notification"
            className="fixed bottom-6 right-6 z-50 bg-neutral-900 border border-purple-500/30 p-4 rounded-xl flex items-center space-x-3.5 shadow-2xl backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Message Ready to Send!</p>
              <p className="text-[10px] text-neutral-400">
                Your message was prepared for srishtijayara@gmail.com.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FLOATING BACK TO TOP BUTTON ================= */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            id="floating-back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-neutral-900/90 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 hover:bg-neutral-800 transition-all shadow-2xl cursor-pointer"
            title="Back to Top"
          >
            <ChevronUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
