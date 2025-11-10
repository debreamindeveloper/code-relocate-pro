import { Card } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/integrations/azure";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const Events = () => {
  const { t, i18n } = useTranslation();

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  // Helper function to get translated text with fallback to English
  const getTranslatedText = (
    multilingualField: { en?: string; fi?: string; am?: string } | string
  ): string => {
    if (typeof multilingualField === "string") {
      return multilingualField;
    }

    const currentLang = i18n.language;
    const text =
      multilingualField[currentLang as keyof typeof multilingualField] ||
      multilingualField.en ||
      "";
    return text;
  };

  return (
    <section id="events" className="py-20 px-4 bg-accent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("events.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("events.subtitle")}
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : events && events.length > 3 ? (
          <>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {events.map((event) => (
                  <CarouselItem
                    key={event.rowKey}
                    className="pl-2 md:pl-4 basis-full md:basis-1/3"
                  >
                    <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 bg-card border-border h-full">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-card-foreground mb-2">
                          {getTranslatedText(event.title)}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {getTranslatedText(event.description)}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 text-secondary" />
                          {new Date(event.eventDate).toLocaleDateString()}
                        </div>
                        {getTranslatedText(event.location) && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 text-secondary" />
                            {getTranslatedText(event.location)}
                          </div>
                        )}
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                {t("events.notePrefix")}
                <button
                  onClick={scrollToContact}
                  className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors"
                >
                  {t("events.noteLinkText")}
                </button>
                {t("events.noteSuffix")}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {events?.map((event) => (
                <Card
                  key={event.rowKey}
                  className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 bg-card border-border"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">
                      {getTranslatedText(event.title)}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {getTranslatedText(event.description)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-secondary" />
                      {new Date(event.eventDate).toLocaleDateString()}
                    </div>
                    {getTranslatedText(event.location) && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-secondary" />
                        {getTranslatedText(event.location)}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                {t("events.notePrefix")}
                <button
                  onClick={scrollToContact}
                  className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors"
                >
                  {t("events.noteLinkText")}
                </button>
                {t("events.noteSuffix")}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Events;
