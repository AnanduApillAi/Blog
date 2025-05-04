import { Github, ExternalLink } from 'lucide-react';
import dashboard from '../../public/images/dashboard-react.jpg'
import netflix from '../../public/images/netflix-thumbnail.webp'
import webSrapper from '../../public/images/web-scapper.jpeg'
import chessMate from '../../public/images/chess-mate.jpg'
import codEX from '../../public/images/codex.jpg'
import formBuilder from '../../public/images/form-Builder.webp'
import Image from 'next/image';

const Projects = () => {
  const projects = [
    { 
      title:"CodEX",
      description:"A platform for saving code snippets with rendering preview",
      image:codEX,
      technologies:["Next.js","Tailwind CSS","Shadcn UI","IndexedDB"],
      links:{
        github:"https://github.com/AnanduApillAi/codex",
        live:"https://codex.anandu.dev"
      }
    },
    {
      title:"ChessMate",
      description:"A multiplayer chess platform with real-time gameplay powered by WebSockets.",
      image:chessMate,
      technologies : ["React", "WebSockets","Express.js"],
      links :{
        github: "https://github.com/AnanduApillAi/chessMate",
        live: "https://chess-mate.anandu.dev"
      }
    },
    {
      title:"Form Builder",
      description:"A platform for creating forms with drag and drop interface and ai and allows to export the form as a json file",
      image:formBuilder,
      technologies:["Next.js","Tailwind CSS","Kendo UI","Generative AI", "OpenAI"],
      links:{
        github:"https://github.com/AnanduApillAi/kendo-forms",
        live:"https://kendo-forms.vercel.app/"
      }
    },
    {
      title: "Netflix Clone",
      description: "Netflix clone created using React and integrated with the Movie Database (TMDb) API.",
      image: netflix,
      technologies: ["React.js", "Node.js", "MongoDB", "TMDb","Express"],
      links: {
        github: "https://github.com/AnanduApillAi/netflixClone",
        live: "https://playful-treacle-b83101.netlify.app/"
      }
    },
    {
      title: "Web-Scrapper",
      description: "web scraping tool that extracts and displays all active links from a given web page.",
      image: webSrapper,
      technologies: ["Node.js", "React", "Cheerio","Axios","Express"],
      links: {
        github: "https://github.com/AnanduApillAi/web-scraper",
        live: "https://github.com/AnanduApillAi/web-scraper"
      }
    }
    
  ];

  return (
    <section id="projects" className="flex flex-col justify-center relative py-16 px-4 md:px-16 w-full lg:w-[80%]">
      <div>
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
              className="rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                background: 'var(--portfolio-zinc)',
                boxShadow: `
                  0 4px 6px rgba(var(--portfolio-accent-rgb), 0.05),
                  0 10px 15px rgba(var(--portfolio-accent-rgb), 0.1)
                `
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden group">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Technologies */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-md bg-black/50 backdrop-blur-sm text-white font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 
                    className="text-lg font-medium"
                    style={{ color: 'var(--portfolio-text)' }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={project.links.github}
                      className="p-2 rounded-full hover:bg-black/10 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5" style={{ color: 'var(--portfolio-text)' }} />
                    </a>
                    <a
                      href={project.links.live}
                      className="p-2 rounded-full hover:bg-black/10 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-5 h-5" style={{ color: 'var(--portfolio-text)' }} />
                    </a>
                  </div>
                </div>
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
