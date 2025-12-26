import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Events from "@/components/Events";
import Departments from "@/components/Departments";
import Map from "@/components/Map";
import Contact from "@/components/Contact";
import Donate from "@/components/Donate";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const Index = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Update document title based on selected language
    const titles = {
      am: "በፊንላንድ የሄልሲንኪ ደብረ አሚን አቡነ ተክለሃይማኖት ቤተ ክርስቲያን",
      en: "Debre Amin Abune Teklehaymanot Church, Helsinki, Finland",
      fi: "Helsingin Debre Amin Abune Teklehaymanot Kirkko",
    };

    document.title = titles[i18n.language as keyof typeof titles] || titles.en;
  }, [i18n.language]);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div className="pt-12">
        <About />
        <Services />
        <Events />
        <Map />
        <Contact />
        <Departments />
        <Donate />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
