'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AnimatedSection, AnimatedContainer, AnimatedItem } from '@/components/ui/animated-section';
import { author } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

const techStack = [
  { name: 'React', icon: '⚛️', category: 'Frontend' },
  { name: 'TypeScript', icon: '💎', category: 'Language' },
  { name: 'JavaScript', icon: '🟨', category: 'Language' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'Styling' },
  { name: 'Node.js', icon: '🟢', category: 'Backend' },
  { name: 'MongoDB', icon: '🍃', category: 'Database' },
  { name: 'Python', icon: '✨', category: 'Animation' },
  { name: 'Framer Motion', icon: '🎞️', category: 'Animation' },
];

const timeline = [
  {
    year: '2022',
    title: 'Design + Code Passion',
    description: 'Discovered passion for UI/UX design, storytelling, and modern web experiences.',
  },
  {
    year: '2023',
    title: 'Started B.Tech Journey',
    description:
      'Began Computer Science degree at GCET, Anand and started building full-stack and UI-focused projects.',
  },
  {
    year: '2024',
    title: 'Internship & Industry Exposure',
    description: 'Worked as Web Intern at Ediglobe and Campus Ambassador at InternsElite.',
  },
  {
    year: '2025',
    title: 'Hackathons & Real Projects',
    description:
      'Led and participated in national and global hackathons while building production-ready web applications.',
  },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/IhitJoshi', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/ihit-joshi-a82859300/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:joshiihitc@gmail.com', label: 'Email' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-12 font-serif">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center md:items-start gap-12 border-b border-gray-200 pb-12"
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-black flex items-center justify-center text-white text-6xl font-serif tracking-tighter">
              {author.name.charAt(0)}
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 text-xl border border-gray-200">
              👋
            </div>
          </motion.div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-serif text-4xl md:text-5xl mb-3 tracking-tight font-bold text-black"
            >
              {author.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 mb-4 font-sans"
            >
              UI/UX Designer & Web Developer
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-5 text-sm text-gray-500 mb-6 font-sans"
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>Anand, India</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Building since 2023</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 mb-8 max-w-xl font-sans leading-relaxed text-base"
            >
              I design and develop clean, user-centric digital experiences. Passionate about
              blending creativity with code, I focus on intuitive interfaces, smooth animations, and
              scalable web applications that solve real-world problems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center md:justify-start gap-3"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Tech Stack */}
      <AnimatedSection className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl tracking-tight font-bold text-black mb-3">Tech Stack</h2>
            <p className="text-gray-500 font-sans text-sm uppercase tracking-wider">Technologies I work with daily</p>
          </div>

          <AnimatedContainer
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
            staggerChildren={0.05}
          >
            {techStack.map((tech) => (
              <AnimatedItem key={tech.name}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition-all duration-200 hover:border-gray-300"
                >
                  <div className="text-4xl mb-2">{tech.icon}</div>
                  <p className="font-medium text-black font-sans text-sm mb-1">{tech.name}</p>
                  <p className="text-xs text-gray-400 font-sans uppercase tracking-wide">{tech.category}</p>
                </motion.div>
              </AnimatedItem>
            ))}
          </AnimatedContainer>
        </div>
      </AnimatedSection>

      {/* Timeline */}
      <AnimatedSection className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl tracking-tight font-bold text-black mb-3">The Journey</h2>
            <p className="text-gray-500 font-sans text-sm uppercase tracking-wider">Key milestones along the way</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 md:-translate-x-px" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-black rounded-full md:-translate-x-1.5 ring-4 ring-white border border-gray-200" />

                  {/* Content */}
                  <div
                    className={`flex-1 pl-10 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}
                  >
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                      <span className="text-gray-400 font-mono text-xs uppercase tracking-wider">{item.year}</span>
                      <h3 className="font-serif text-xl mt-2 mb-2 font-semibold text-black">{item.title}</h3>
                      <p className="text-gray-500 text-sm font-sans leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 text-center shadow-sm">
            <div className="relative z-10">
              <h2 className="font-serif text-3xl md:text-4xl mb-4 tracking-tight font-bold text-black">
                Let's <span className="border-b-2 border-black pb-0.5">Connect</span>
              </h2>
              <p className="text-gray-500 mb-8 max-w-lg mx-auto font-sans leading-relaxed">
                Whether you want to discuss ideas, collaborate on projects, or just say hello — I'd
                love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="mailto:joshiihitc@gmail.com">
                  <Button className="bg-black text-white hover:bg-gray-800 gap-2 px-6 py-2 rounded-full font-sans text-sm tracking-wide transition-all duration-200">
                    <Mail className="w-4 h-4" />
                    Get in Touch
                  </Button>
                </a>
                <Link href="/">
                  <Button variant="outline" className="gap-2 border-gray-300 text-black hover:bg-gray-100 rounded-full px-6 py-2 font-sans text-sm">
                    Read the Blog
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}