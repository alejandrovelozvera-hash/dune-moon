import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Music from "@/components/Music";
import Videos from "@/components/Videos";
import Bio from "@/components/Bio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { LangProvider } from "@/lib/i18n";

export default function Home() {
  return (
    <LangProvider>
      <ScrollProgress />
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
    </LangProvider>
  );
}
