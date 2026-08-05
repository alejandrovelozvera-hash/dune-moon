import ManifestHeader from "@/components/ManifestHeader";
import LangBar from "@/components/LangBar";
import ManifestHero from "@/components/ManifestHero";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { LangProvider } from "@/lib/i18n";

export const metadata = {
  title: "En Mi Mente · La Historia | Dune Moon",
  description:
    "La historia de En Mi Mente: una canción de Alejandro Veloz (Dune Moon) que nació en 2020, durante el confinamiento en Ecuador, sobre el amor y la ausencia. Manifiesto completo, caletazo sessions y la versión 2026.",
};

export default function ManifiestoPage() {
  return (
    <LangProvider>
      <ManifestHeader />
      <LangBar />
      <main>
        <ManifestHero />
      </main>
      <Footer />
      <BackToTop />
    </LangProvider>
  );
}