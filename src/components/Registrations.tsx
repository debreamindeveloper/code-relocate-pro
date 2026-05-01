import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Droplets, ExternalLink, HeartHandshake, UserPlus } from "lucide-react";

const Registrations = () => {
  const { t } = useTranslation();

  const items = [
    {
      icon: UserPlus,
      title: t("registrations.register.title"),
      description: t("registrations.register.description"),
      url: "https://teklehaymanot-fi.chmeetings.com/en/Register",
    },
    {
      icon: Droplets,
      title: t("registrations.baptism.title"),
      description: t("registrations.baptism.description"),
      url: "https://teklehaymanot-fi.chmeetings.com/forms/93EDFC00A14680A1",
    },
    {
      icon: HeartHandshake,
      title: t("registrations.marriage.title"),
      description: t("registrations.marriage.description"),
      url: "https://teklehaymanot-fi.chmeetings.com/forms/73A588595329AD06",
    },
  ];

  return (
    <section id="registrations" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("registrations.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("registrations.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.url}
                className="p-8 flex flex-col hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-card-foreground">
                    {item.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6 flex-1">
                  {item.description}
                </p>
                <Button asChild className="w-full">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("registrations.openForm")}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Registrations;
