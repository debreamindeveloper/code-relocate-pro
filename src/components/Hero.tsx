import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import hero1 from "@/assets/hero-new.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";

// main view
const Hero = () => {
  const { t } = useTranslation();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  const heroImages = [hero1, hero2, hero3, hero4, hero5];

  return (
    <section className="relative flex items-center justify-center overflow-hidden h-[40vh] md:h-[48vh] lg:h-[calc(100vh-175px)]">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
        className="absolute inset-0 w-full h-full"
      >
        <CarouselContent className="ml-0 h-full">
          {heroImages.map((image, index) => (
            <CarouselItem
              key={index}
              className="pl-0 basis-full h-full relative"
            >
              <img
                src={image}
                alt={`Hero ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
              {index !== 0 && (
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-end md:justify-center text-center text-white px-4 pb-8 md:pb-0">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-xl md:text-6xl font-bold mb-2 md:mb-6 drop-shadow-lg">
                    {t("hero.title")}
                  </h1>
                  <p className="text-sm md:text-2xl mb-3 md:mb-8 drop-shadow-md">
                    {t("hero.subtitle")}
                  </p>
                  <div className="flex flex-row gap-2 md:gap-4 justify-center">
                    <Button
                      onClick={() => scrollToSection("about")}
                      size="sm"
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/90 md:h-11 md:px-8"
                    >
                      {t("hero.learnMore")}
                    </Button>
                    <Button
                      onClick={() => scrollToSection("contact")}
                      size="sm"
                      variant="outline"
                      className="bg-white/10 text-white border-white/20 hover:bg-white/20 md:h-11 md:px-8"
                    >
                      {t("hero.visitUs")}
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center justify-end py-4 md:py-8">
        <div className="flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                current === index ? "bg-white w-8" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
