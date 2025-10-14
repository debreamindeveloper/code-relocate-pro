import { Card } from "@/components/ui/card";
import { useTranslation } from 'react-i18next';
import sundayService from "@/assets/sunday-service-new.jpg";
import youthMinistry from "@/assets/youth-ministry-new.jpg";
import bibleStudy from "@/assets/bible-study-new.jpg";
import choir from "@/assets/worship-choir-new.jpg";
import childrensMinistry from "@/assets/childrens-ministry-new.jpg";
import prayerMeeting from "@/assets/prayer-meeting-new.jpg";

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t('services.sundayWorship.title'),
      image: sundayService,
      description: t('services.sundayWorship.description')
    },
    {
      title: t('services.youthMinistry.title'),
      image: youthMinistry,
      description: t('services.youthMinistry.description')
    },
    {
      title: t('services.bibleStudy.title'),
      image: bibleStudy,
      description: t('services.bibleStudy.description')
    },
    {
      title: t('services.choir.title'),
      image: choir,
      description: t('services.choir.description')
    },
    {
      title: t('services.childrens.title'),
      image: childrensMinistry,
      description: t('services.childrens.description')
    },
    {
      title: t('services.prayer.title'),
      image: prayerMeeting,
      description: t('services.prayer.description')
    }
  ];

  return (
    <section id="services" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
