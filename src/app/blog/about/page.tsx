"use client"
import React from 'react';
import { Code, Github, Twitter, Linkedin, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-theme-secondary rounded-xl p-8 shadow-sm">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-accent-primary rounded-full mx-auto mb-6 flex items-center justify-center">
            <Code size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-theme-primary mb-4">Full Stack Developer</h1>
          <div className="max-w-2xl mx-auto mb-8">
            <blockquote className="text-2xl italic font-serif text-accent-primary">
              "Eat Code Sleep Repeat"
            </blockquote>
          </div>
          
          <div className="flex justify-center items-center gap-8 text-theme-secondary">
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-accent-primary transition-colors" 
              aria-label="GitHub Profile"
            >
              <Github size={28} />
            </a>
            <a 
              href="https://twitter.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-accent-primary transition-colors" 
              aria-label="Twitter Profile"
            >
              <Twitter size={28} />
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-accent-primary transition-colors" 
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={28} />
            </a>
            <a 
              href="https://yourportfolio.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-accent-primary transition-colors" 
              aria-label="Portfolio Website"
            >
              <Globe size={28} />
            </a>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6 text-theme-secondary">
          <p className="text-center leading-relaxed">
            Welcome to my corner of the web! I'm a full-stack developer with a passion for creating
            efficient, scalable web applications that solve real-world problems.
          </p>
          
          <p className="text-center leading-relaxed">
            Through this blog, I share my experiences, insights, and learning journey in the world
            of web development. My goal is to contribute to the developer community while exploring
            new opportunities in the tech industry.
          </p>

          <p className="text-center leading-relaxed">
            Currently seeking remote opportunities where I can leverage my expertise in building
            modern web applications and collaborate with forward-thinking teams.
          </p>

          <div className="text-center pt-8">
            <a 
              href="https://yourportfolio.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-accent-primary text-white rounded-lg hover:bg-accent-secondary transition-colors"
            >
              View My Portfolio
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}