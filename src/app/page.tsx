import About from '@/components/About';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import Projects from '@/components/projects';
import RecentBlogs from '@/components/RecentBlogs';
import ScrollWrapper from '@/components/ScrollWrapper'
export default async function Home() {
  return (
    <ScrollWrapper>
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <RecentBlogs />
      </main>
    </ScrollWrapper>
  );
}