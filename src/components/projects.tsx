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
            <div
              key={index}
              className="group rounded-lg overflow-hidden"
              style={{ background: 'var(--portfolio-zinc)' }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div 
                  className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <a
                    href={project.links.github}
                    className="p-2 rounded-full hover:scale-110 transition-transform"
                    style={{ background: 'var(--portfolio-accent)' }}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={project.links.live}
                    className="p-2 rounded-full hover:scale-110 transition-transform"
                    style={{ background: 'var(--portfolio-accent)' }}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 
                  className="text-xl font-semibold"
                  style={{ color: 'var(--portfolio-text)' }}
                >
                  {project.title}
                </h3>
                
                <p style={{ color: 'var(--portfolio-secondary)' }}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full"
                      style={{ 
                        background: 'var(--portfolio-accent)',
                        color: 'var(--portfolio-text)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;