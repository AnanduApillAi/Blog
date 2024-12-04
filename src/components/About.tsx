
const About = () => {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center relative py-16 px-4 md:px-16 w-full lg:w-[80%]">
      <div className="">
        <h2 
          className="text-3xl sm:text-4xl font-bold mb-12"
          style={{ color: 'var(--portfolio-text)' }}
        >
          About Me
        </h2>

        <div className="">
          <div className="space-y-6">
            <p style={{ color: 'var(--portfolio-secondary)' }} className="text-lg">
            I am a self-taught Full Stack Developer with a passion for crafting seamless and impactful digital experiences. My journey into software development is driven by curiosity, problem-solving, and a love for innovation.
            </p>
            <p style={{ color: 'var(--portfolio-secondary)' }} className="text-lg">
            With expertise spanning both frontend and backend development, I specialize in designing scalable, maintainable, and performance-driven solutions. My skill set includes modern technologies like React, Node.js, PostgreSQL, and TypeScript, enabling me to deliver projects that are not just functional but also delightful to use.
            </p>
            <p style={{ color: 'var(--portfolio-secondary)' }} className="text-lg">
            I am particularly focused on building accessible, user-friendly applications that solve real-world problems. I believe in combining clean design with efficient code, ensuring that every project I undertake adheres to industry best practices and standards.
            </p>
            <p style={{ color: 'var(--portfolio-secondary)' }} className="text-lg">
            Beyond coding, I enjoy staying updated with the latest trends in tech and continuously sharpening my skills. My goal is to contribute to meaningful projects that leave a positive impact while continually growing as a developer.
            </p>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default About;