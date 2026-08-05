import Nav from "@/components/Nav";
import LangBar from "@/components/LangBar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Music from "@/components/Music";
import Videos from "@/components/Videos";
import Bio from "@/components/Bio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { LangProvider } from "@/lib/i18n";

export default function Home() {
  return (
    <LangProvider>
      <ScrollProgress />
      <Nav />
      <LangBar />
      <main>
        <Hero />
        <Marquee />
        <Music />
        <Videos />
        <Bio />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </LangProvider>
  );
}
