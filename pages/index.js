import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProgramStats from '../components/ProgramStats';
import Highlights from '../components/Highlights';
import Stats from '../components/Stats';
import ProgramValue from '../components/ProgramValue';
import Mentors from '../components/Mentors';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>learnBetter - Masters in Computer Science: Cloud Computing & AI System Design</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Navbar />
        <Hero />
        <ProgramStats />
        <Highlights />
        <Stats />
        <ProgramValue />
        <Mentors />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
