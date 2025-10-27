import { Card } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/integrations/azure";
import { Skeleton } from "@/components/ui/skeleton";

const Events = () => {
  const { t } = useTranslation();

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

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
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {events?.map((event) => (
              <Card
                key={event.rowKey}
                className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 bg-card border-border"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-card-foreground mb-2">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {event.description}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-secondary" />
                    {new Date(event.eventDate).toLocaleDateString()}
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-secondary" />
                      {event.location}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
