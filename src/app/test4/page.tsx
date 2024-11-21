"use client"
import React from 'react';
import { Menu, X, Sun, Moon, Github, Linkedin, Mail, Code, Globe } from 'lucide-react';

const AboutPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  
  const skills = [
    { name: "Frontend Development", items: ["React", "TypeScript", "Next.js", "Tailwind CSS"] },
    { name: "Backend Development", items: ["Node.js", "Express", "PostgreSQL", "RESTful APIs"] },
    { name: "Tools & Methods", items: ["Git", "Docker", "Agile", "CI/CD"] }
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      description: "Full-stack Next.js application with Stripe integration and headless CMS",
      tech: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
      link: "#"
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "React dashboard with real-time data visualization and filtering",
      tech: ["React", "Socket.io", "D3.js", "Node.js"],
      link: "#"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className={`absolute top-0 left-0 bottom-0 w-64 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold">MONO</span>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="space-y-4">
                <a href="#" className="block py-2 hover:text-blue-500">Home</a>
                <a href="#" className="block py-2 hover:text-blue-500">Topics</a>
                <a href="#" className="block py-2 hover:text-blue-500">About</a>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`sticky top-0 z-40 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <span className="text-xl font-bold">MONO</span>
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="hover:text-blue-500">Home</a>
              <a href="#" className="hover:text-blue-500">Topics</a>
              <a href="#" className="hover:text-blue-500">About</a>
            </nav>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-gray-100">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">John Doe</h1>
          <p className={`text-xl mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Full Stack Web Developer
          </p>
          <div className="flex justify-center space-x-4">
            <Github className="h-6 w-6" />
            <Linkedin className="h-6 w-6" />
            <Mail className="h-6 w-6" />
          </div>
        </div>

        <section className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 mb-8`}>
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Full-stack web developer with 5+ years of experience building scalable applications. 
            Passionate about clean code, performance optimization, and creating exceptional user experiences.
          </p>
        </section>

        <section className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 mb-8`}>
          <h2 className="text-2xl font-bold mb-6">Skills</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((category, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-3">{category.name}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6`}>
          <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-bold mb-2">{project.title}</h3>
                <p className={`mb-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className={`px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                      {tech}
                    </span>
                  ))}
                </div>
                <a href={project.link} className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span>View Project</span>
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;