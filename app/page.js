import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Music from "@/components/Music";
import Videos from "@/components/Videos";
import Bio from "@/components/Bio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Music />
        <Videos />
        <Bio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
