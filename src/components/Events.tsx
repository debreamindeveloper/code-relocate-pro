import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

const Events = () => {
  const { t } = useTranslation();
  
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('event_date', new Date().toISOString().split('T')[0])
        .order('event_date', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: openingHours, isLoading: hoursLoading } = useQuery({
    queryKey: ['opening_hours'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('opening_hours')
        .select('*')
        .order('day_of_week', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="events" className="py-20 px-4 bg-accent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('events.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('events.subtitle')}
          </p>
        </div>

        {eventsLoading ? (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {events?.map((event) => (
              <Card
                key={event.id}
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
                    {new Date(event.event_date).toLocaleDateString()}
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

        {/* Opening Hours Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-foreground mb-8">
            Opening Hours
          </h3>
          {hoursLoading ? (
            <Skeleton className="h-64 w-full max-w-2xl mx-auto" />
          ) : (
            <Card className="max-w-2xl mx-auto p-6 bg-card border-border">
              <div className="space-y-4">
                {openingHours?.map((day) => (
                  <div
                    key={day.id}
                    className="flex justify-between items-center py-3 border-b border-border last:border-0"
                  >
                    <span className="font-semibold text-card-foreground">
                      {day.day_name}
                    </span>
                    <div className="flex items-center gap-2">
                      {day.is_closed ? (
                        <span className="text-muted-foreground">Closed</span>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 text-secondary" />
                          <span className="text-muted-foreground">
                            {day.open_time?.slice(0, 5)} - {day.close_time?.slice(0, 5)}
                          </span>
                        </>
                      )}
                    </div>
                    {day.notes && (
                      <span className="text-sm text-muted-foreground italic ml-4">
                        {day.notes}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default Events;
