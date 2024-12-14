"use client";
import React, { useState, useEffect, useRef } from 'react';

import { FaGithub, FaLinkedinIn, FaReddit, FaFileDownload } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiCode } from "react-icons/bi";
import { SiX } from "react-icons/si";
import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';

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

const NavIndicator = () => {
  const sectionsRef = useRef<{ [key: string]: boolean }>({});
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    ['home', 'about', 'experience', 'projects', 'blogs'].forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
        sectionsRef.current[id] = true;
      }
    });

    return () => {
      const currentSectionsRef = sectionsRef.current;
      Object.keys(currentSectionsRef).forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          observer.unobserve(section);
        }
      });
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const section = document.querySelector(`#${sectionId}`);
      if (section) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const top = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  return (
    <div className="fixed bottom-28 right-12 hidden lg:flex flex-col items-start space-y-6 z-20">
      {[
        { label: 'Home', sectionId: 'home' },
        { label: 'ABOUT', sectionId: 'about' },
        { label: 'EXPERIENCE', sectionId: 'experience' },
        { label: 'PROJECTS', sectionId: 'projects' },
        { label: 'BLOGS', sectionId: 'blogs' },
      ].map((item) => (
        <button
          key={item.label}
          onClick={() => scrollToSection(item.sectionId)}
          className={`group flex items-center transition-all duration-100 bg-transparent border-0 cursor-pointer ${activeSection === item.sectionId ? 'active' : ''
            }`}
        >
          <div className="w-20">
            <div
              className={`w-12 h-[2px] ml-auto transition-all duration-100 group-hover:w-20 ${activeSection === item.sectionId ? 'active-line' : ''
                }`}
              style={{
                background: 'var(--portfolio-secondary)',
                backgroundImage: 'linear-gradient(to right, var(--portfolio-accent), var(--portfolio-secondary))',
              }}
            />
          </div>
          <span
            className={`text-lg tracking-wider font-light transition-all duration-100 ml-4 ${activeSection === item.sectionId ? 'active' : 'group-hover:opacity-100'
              }`}
            style={{
              color: 'var(--portfolio-secondary)',
            }}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

const TechStackScroll = ({ techs, direction = 'right' }) => (
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
    'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs'
  ];

  return (
    <section className='py-6'>
      <div className="flex flex-col justify-between relative">


        <div className="portfolioHeader absolute top-3 md:top-8 right-4 md:right-8 z-50 flex items-center justify-center  gap-8">
          <Link href="/blog"
            className="px-4 py-1 rounded-lg bg-[#1a1b26] text-theme-tertiary transition-all duration-200 hover:text-theme-secondary"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            Blog
          </Link>
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
          <div className="space-y-8 sm:space-y-6 mt-8">
            <h2
              className="text-xl sm:text-2xl font-medium flex items-center gap-2"
              style={{ color: 'var(--portfolio-accent)' }}
            >
              <BiCode className="w-5 h-5 sm:w-6 sm:h-6" />
              <TypeWriter text="Hello There," />
            </h2>

            <h1
              className="text-5xl sm:text-6xl md:text-8xl font-bold"
              style={{ color: 'var(--portfolio-text)' }}
            >
              <span className="text-3xl sm:text-4xl md:text-6xl font-bold mr-4 sm:mr-6 md:mr-8"
                style={{ color: 'var(--portfolio-text)' }}>
                I&apos;m
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
            <div className='flex gap-4 flex-col sm:flex-row justify-start items-center'>
              <div className="flex gap-4">
                {[
                  { Icon: FaGithub, label: 'Github', href: 'https://github.com/AnanduA-6' },
                  { Icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://www.linkedin.com/in/anandu-dev/' },
                  { Icon: MdEmail, label: 'Email', href: 'anandu.a.dev@gmail.com' },
                  { Icon: SiX, label: 'Twiiter', href: 'https://x.com/anandu_a_dev' },
                  { Icon: FaReddit, label: 'Reddit', href: 'https://x.com/anandu_a_dev' }
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="p-3 sm:p-4 rounded-md transition-all duration-200 group transform hover:-translate-y-1"
                    style={{

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

              {/* Add this inside your Hero component, after the paragraph */}
              <button
                onClick={() => {
                  window.open('/Anandu_Resume.pdf#toolbar=0&navpanes=0&view=FitH', 'Anandu A - Resume');
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 hover:transform hover:-translate-y-1 w-fit"
                style={{
                  background: 'var(--portfolio-accent)',
                  color: 'var(--portfolio-text)'
                }}
              >
                <FaFileDownload className="w-5 h-5" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tech stack section - Fixed at bottom */}
        <div className="w-full pb-8 px-4 md:px-16">
          <div className="max-w-full md:max-w-[60%] space-y-3">
            <TechStackScroll techs={frontendTechs} direction="right" />
            <TechStackScroll techs={backendTechs} direction="left" />
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

    </section>

  );
};

export default Hero;