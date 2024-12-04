"use client";

const Experience = () => {
  const experiences = [
    {
      title: "Senior Frontend Engineer",
      company: "Tech Corp",
      period: "2022 - Present",
      description: "Lead frontend development for multiple high-impact projects. Implemented performant, accessible web applications using React and Next.js.",
      technologies: ["React", "TypeScript", "Next.js", "TailwindCSS"]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions",
      period: "2020 - 2022",
      description: "Developed and maintained full-stack applications. Worked with diverse tech stack and implemented various client solutions.",
      technologies: ["Node.js", "React", "MongoDB", "Express"]
    }
  ];

  return (
    <section id="experience" className="min-h-screen flex flex-col justify-center relative py-16 px-4 md:px-16 w-full lg:w-[80%]">
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