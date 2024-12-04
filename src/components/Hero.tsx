"use client";
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Code } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const TypeWriter = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [displayText, text, speed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono">
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>▋</span>
    </span>
  );
};

const NavIndicator = () => (
    <div className="fixed bottom-16 right-12 hidden lg:flex flex-col items-start space-y-6 z-20">
      {[
        { label: 'ABOUT', href: '#' },
        { label: 'EXPERIENCE', href: '#' },
        { label: 'PROJECTS', href: '#' },
      ].map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="group flex items-center transition-all duration-300"
        >
          <div className="w-20">  {/* Fixed width container for line */}
            <div 
              className="w-12 h-[2px] ml-auto transition-all duration-300 group-hover:w-20"
              style={{
                background: 'var(--portfolio-secondary)',
                backgroundImage: 'linear-gradient(to right, var(--portfolio-accent), var(--portfolio-secondary))'
              }}
            />
          </div>
          <span
            className="text-lg tracking-wider font-light opacity-60 group-hover:opacity-100 transition-all duration-300 ml-4"
            style={{
              color: 'var(--portfolio-secondary)',
            }}
          >
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );

const TechStackScroll = ({ techs, direction = 'right', type }) => (
  <div className="overflow-hidden whitespace-nowrap py-1">
    <div 
      className={`inline-block animate-scroll-${direction}`}
      style={{
        animationDuration: '20s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear'
      }}
    >
      {[...techs, ...techs].map((tech, i) => (
        <span
          key={i}
          className={`inline-block px-3 py-1 mx-2 rounded-md text-xs sm:text-sm`}
          style={{ 
            background: 'var(--portfolio-zinc)',
            color: 'var(--portfolio-text)'
          }}
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
);

const Hero = () => {
  const frontendTechs = [
    'React', 'Next.js', 'TypeScript', 'TailwindCSS', 'JavaScript', 'HTML/CSS', 'Redux'
  ];
  
  const backendTechs = [
    'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Python', 'Django', 'REST APIs'
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      <div className="portfolioHeader absolute top-8 right-8 z-50">
        <ThemeToggle />
      </div>

      {/* Navigation Indicator */}
      <NavIndicator />

      {/* Dot pattern background */}
      <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-10">
        {Array.from({ length: 96 }).map((_, i) => (
          <div 
            key={i} 
            className="w-2 h-2 rounded-full"
            style={{ background: 'var(--portfolio-secondary)' }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="flex-1 px-4 md:px-16 pt-16 pb-8 relative z-10">
        <div className="space-y-8">
          <h2 
            className="text-xl sm:text-2xl font-medium flex items-center gap-2"
            style={{ color: 'var(--portfolio-accent)' }}
          >
            <Code className="w-5 h-5 sm:w-6 sm:h-6" />
            <TypeWriter text="Hello There," />
          </h2>
          
          <h1 
            className="text-5xl sm:text-6xl md:text-8xl font-bold"
            style={{ color: 'var(--portfolio-text)' }}
          >
            <span className="text-3xl sm:text-4xl md:text-6xl font-bold mr-4 sm:mr-6 md:mr-8"
                style={{ color: 'var(--portfolio-text)' }}>
                    I'm
            </span>
            Anandu.
          </h1>
          
          <div className="space-y-6 max-w-2xl">
            <h2 
              className="text-2xl sm:text-3xl font-semibold"
              style={{ color: 'var(--portfolio-text)' }}
            >
              Software Engineer / Full Stack Developer
            </h2>
            
            <p style={{ color: 'var(--portfolio-secondary)' }} className="text-lg sm:text-xl">
              I specialize in building seamless, scalable, and accessible digital solutions for the web.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {[
              { Icon: Github, label: 'Github', href: '#' },
              { Icon: Linkedin, label: 'LinkedIn', href: '#' },
              { Icon: Mail, label: 'Email', href: 'mailto:example@email.com' }
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="p-3 sm:p-4 rounded-md transition-all duration-200 group transform hover:-translate-y-1"
                style={{ 
                  background: 'var(--portfolio-zinc)',
                  color: 'var(--portfolio-text)',
                  ':hover': {
                    background: 'var(--portfolio-zinc-hover)'
                  }
                }}
                aria-label={label}
              >
                <Icon 
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-colors"
                  style={{ color: 'var(--portfolio-text)' }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Tech stack section - Fixed at bottom */}
      <div className="w-full pb-8 px-4 md:px-16">
        <div className="max-w-full md:max-w-[60%] space-y-3">
          <TechStackScroll techs={frontendTechs} direction="right" type="frontend" />
          <TechStackScroll techs={backendTechs} direction="left" type="backend" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-left {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-right {
          animation: scroll-right 20s linear infinite;
        }
        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;