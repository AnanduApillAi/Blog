import About from '@/components/About';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import Projects from '@/components/projects';

export default async function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
    </main>
  );
}