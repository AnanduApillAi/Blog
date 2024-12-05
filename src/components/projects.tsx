"use client";
import { Github, ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management and secure payment processing.",
      image: "/api/placeholder/600/400",
      technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      links: {
        github: "#",
        live: "#"
      }
    },
    {
      title: "Task Management App",
      description: "Collaborative task management platform with real-time updates and team features.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Firebase", "TailwindCSS"],
      links: {
        github: "#",
        live: "#"
      }
    }
  ];

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center relative py-16 px-4 md:px-16 w-full lg:w-[80%]">
      <div className="">
        <h2 
          className="text-3xl sm:text-4xl font-bold mb-12"
          style={{ color: 'var(--portfolio-text)' }}
        >
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index}
            className="rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            style={{ 
              background: 'var(--portfolio-zinc)',
              boxShadow: `
                0 4px 6px rgba(var(--portfolio-accent-rgb), 0.05),
                0 10px 15px rgba(var(--portfolio-accent-rgb), 0.1)
              `
            }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded-md"
                    style={{ 
                      background: tech,
                      color: '#fff'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4">
              <h3 
                className="text-lg font-medium mb-2"
                style={{ color: 'var(--portfolio-text)' }}
              >
                {project.title}
              </h3>
              <p 
                className="text-sm line-clamp-2"
                style={{ color: 'var(--portfolio-secondary)' }}
              >
                {project.description}
              </p>
            </div>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;