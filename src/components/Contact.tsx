import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { fetchOpeningHours } from "@/services/openingHoursService";
import { Skeleton } from "@/components/ui/skeleton";

const Contact = () => {
  const { t } = useTranslation();

  const { data: openingHours, isLoading } = useQuery({
    queryKey: ["opening_hours"],
    queryFn: fetchOpeningHours,
  });

  return (
    <section id="contact" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("contact.mainTitle")}
          </h2>
          <p className="text-lg text-muted-foreground italic">
            {t("contact.verse")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 border-border bg-card">
            <h3 className="text-2xl font-bold text-card-foreground mb-6">
              {t("contact.title")}
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1">
                    {t("contact.address")}
                  </h4>
                  <p className="text-muted-foreground">
                    Laurintie 145
                    <br />
                    01300 Vantaa, Finland
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1">
                    {t("contact.phone")}
                  </h4>
                  <a
                    href="tel:+358503405585"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +358 50 340 5585
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1">
                    {t("contact.email")}
                  </h4>
                  <a
                    href="mailto:info@teklehaymanot.fi"
                    className="text-muted-foreground hover:text-primary transition-colors break-all"
                  >
                    info@teklehaymanot.fi
                  </a>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-border bg-card">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-secondary" />
              <h3 className="text-2xl font-bold text-card-foreground">
                {t("contact.openingHours")}
              </h3>
            </div>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <div className="space-y-3">
                {openingHours?.map((hour) => (
                  <div
                    key={hour.id}
                    className="flex justify-between items-center py-2 border-b border-border last:border-0"
                  >
                    <span className="font-medium text-card-foreground">
                      {hour.day_name}
                    </span>
                    <span className="text-muted-foreground">
                      {hour.is_closed
                        ? "Closed"
                        : `${hour.open_time?.slice(
                            0,
                            5
                          )} - ${hour.close_time?.slice(0, 5)}`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
