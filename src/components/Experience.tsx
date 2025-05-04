"use client";

const Experience = () => {
  const experiences = [
    {
      title: "Front End Developer",
      company: "Tapclone",
      period: "November 2022 - June 2023",
      description: `
        Worked on building fast, user-friendly web applications that tackled real-world business problems. 
        Focused on improving the frontend experience using React.js while ensuring the backend was robust and efficient. 
        Collaborated closely with the team to deliver projects on time and with great results.
      `,
      technologies: ["React", "Javascript", "TailwindCSS", "Node.js",'Next.js','TypeScript']
    },
    {
      title: "Front End Developer",
      company: "Extravelmoney",
      period: "July 2023 - Present",
      description: `
        Played a key role in developing and improving their website and dashboards. 
        Worked on making the user interface intuitive and the backend workflows seamless. 
        Took ownership of PHP tasks, improving efficiency and reliability across their systems.
      `,
      technologies: ["PHP", "React","Next.js", "TypeScript", "TailwindCSS", "REST APIs", 'JavaScript','Jest']
    },
    {
      title: "Front-End Developer Consultant",
      company: "Veeble Hosting",
      period: "2023 - Present",
      description: `
        Providing front-end expertise to enhance the look and feel of their hosting platform. 
        Focused on creating clean, responsive designs and ensuring a smooth user experience. 
        Worked closely with the team to align the frontend with their technical goals.
      `,
      technologies: ["React", "CSS", "HTML", "JavaScript", "Next.js", "TypeScript", "TailwindCSS", "REST APIs", 'Jest', 'Storybook', 'Shadcn/UI']
    }
  ];
  

  return (
    <section id="experience" className="flex flex-col justify-center relative py-16 px-4 md:px-16 w-full lg:w-[80%]">
      <div className="">
        <h2 
          className="text-3xl sm:text-4xl font-bold mb-12"
          style={{ color: 'var(--portfolio-text)' }}
        >
          Experience
        </h2>

        <div className="space-y-12">
          {experiences.map((experience,index ) => (
            <div key={index}
            className="relative p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:translate-y-[-4px]"
            style={{ 
              background: 'var(--background-primary)',
              boxShadow: `
                0 0 5px rgba(var(--portfolio-accent-rgb), 0.1),
                0 0 20px rgba(var(--portfolio-accent-rgb), 0.1),
                0 0 35px rgba(var(--portfolio-accent-rgb), 0.1)
              `,
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="space-y-4">
              <div className="flex justify-between flex-wrap gap-2">
                <h3 
                  className="text-xl font-semibold"
                  style={{ color: 'var(--portfolio-text)' }}
                >
                  {experience.title}
                </h3>
                <span style={{ color: 'var(--portfolio-accent)' }}>
                  {experience.period}
                </span>
              </div>
              
              <p 
                className="text-lg"
                style={{ color: 'var(--portfolio-accent)' }}
              >
                {experience.company}
              </p>
              
              <p style={{ color: 'var(--portfolio-secondary)' }}>
                {experience.description}
              </p>
        
              <div className="flex flex-wrap gap-2 pt-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm rounded-full"
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
          </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;