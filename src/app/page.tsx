// app/page.tsx
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/projects';
import RecentBlogs from '@/components/RecentBlogs';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>

      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="experience" >
        <Experience />
      </section>

      <section id="projects" >
        <Projects />
      </section>

      <section id="blogs" >
        <RecentBlogs />
      </section>

      <section  >
        <Footer />
      </section>
      
    </main>
  );
}