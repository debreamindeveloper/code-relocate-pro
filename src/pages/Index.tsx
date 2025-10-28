import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Events from "@/components/Events";
import Map from "@/components/Map";
import Contact from "@/components/Contact";
import Donate from "@/components/Donate";
import Footer from "@/components/Footer";

const Index = () => {
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
        <Donate />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
