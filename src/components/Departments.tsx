import { Card } from "@/components/ui/card";
import { User, Mail, Phone, Users, Building2, ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

const Departments = () => {
  const { t } = useTranslation();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    const updateVisibleSlides = () => {
      setVisibleSlides(window.innerWidth < 768 ? 1 : 3);
    };

    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);

    return () => window.removeEventListener("resize", updateVisibleSlides);
  }, []);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Organizational hierarchy data
  const generalAssembly = {
    name: t("departments.generalAssembly.name"),
    head: t("departments.generalAssembly.head"),
    email: t("departments.generalAssembly.email"),
    phone: t("departments.generalAssembly.phone"),
  };

  const parishCouncil = {
    name: t("departments.parishCouncil.name"),
    members: [
      {
        role: t("departments.parishCouncil.chair.role"),
        name: t("departments.parishCouncil.chair.name"),
        email: t("departments.parishCouncil.chair.email"),
        phone: t("departments.parishCouncil.chair.phone"),
      },
      {
        role: t("departments.parishCouncil.viceChair.role"),
        name: t("departments.parishCouncil.viceChair.name"),
        email: t("departments.parishCouncil.viceChair.email"),
        phone: t("departments.parishCouncil.viceChair.phone"),
      },
      {
        role: t("departments.parishCouncil.secretary.role"),
        name: t("departments.parishCouncil.secretary.name"),
        email: t("departments.parishCouncil.secretary.email"),
        phone: t("departments.parishCouncil.secretary.phone"),
      },
      {
        role: t("departments.parishCouncil.member.role"),
        name: t("departments.parishCouncil.member.name"),
        email: t("departments.parishCouncil.member.email"),
        phone: t("departments.parishCouncil.member.phone"),
      },
      {
        role: t("departments.parishCouncil.financeHead.role"),
        name: t("departments.parishCouncil.financeHead.name"),
        email: t("departments.parishCouncil.financeHead.email"),
        phone: t("departments.parishCouncil.financeHead.phone"),
      },
      {
        role: t("departments.parishCouncil.cashier.role"),
        name: t("departments.parishCouncil.cashier.name"),
        email: t("departments.parishCouncil.cashier.email"),
        phone: t("departments.parishCouncil.cashier.phone"),
      },
      {
        role: t("departments.parishCouncil.member2.role"),
        name: t("departments.parishCouncil.member2.name"),
        email: t("departments.parishCouncil.member2.email"),
        phone: t("departments.parishCouncil.member2.phone"),
      },
    ],
  };

  const departments = [
    {
      id: 1,
      name: t("departments.youth.name"),
      head: t("departments.youth.head"),
      email: t("departments.youth.email"),
      phone: t("departments.youth.phone"),
    },
    {
      id: 2,
      name: t("departments.choir.name"),
      head: t("departments.choir.head"),
      email: t("departments.choir.email"),
      phone: t("departments.choir.phone"),
    },
    {
      id: 3,
      name: t("departments.children.name"),
      head: t("departments.children.head"),
      email: t("departments.children.email"),
      phone: t("departments.children.phone"),
    },
    {
      id: 4,
      name: t("departments.welfare.name"),
      head: t("departments.welfare.head"),
      email: t("departments.welfare.email"),
      phone: t("departments.welfare.phone"),
    },
  ];

  return (
    <section id="departments" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("departments.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("departments.subtitle")}
          </p>
        </div>

        {/* Organizational Hierarchy */}
        <div className="space-y-8">
          {/* General Assembly - Top Level */}
          <div className="flex justify-center">
            <Card className="p-6 bg-primary/5 border-primary/20 border-4 max-w-md w-full">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-card-foreground">
                  {generalAssembly.name}
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-secondary" />
                  <span className="font-semibold">{generalAssembly.head}</span>
                </div>
                {generalAssembly.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 text-secondary" />
                    <a
                      href={`mailto:${generalAssembly.email}`}
                      className="hover:text-primary transition-colors"
                    >
                      {generalAssembly.email}
                    </a>
                  </div>
                )}
                {generalAssembly.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-secondary" />
                    <a
                      href={`tel:${generalAssembly.phone}`}
                      className="hover:text-primary transition-colors"
                    >
                      {generalAssembly.phone}
                    </a>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Hierarchy Arrow */}
          <div className="flex justify-center py-4">
            <ArrowDown
              className="w-8 h-8"
              style={{ color: "#C8CFDA" }}
              strokeWidth={3}
            />
          </div>

          {/* Parish Council - Second Level */}
          <div>
            <h3 className="text-2xl font-bold text-center text-foreground mb-6">
              {parishCouncil.name}
            </h3>
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full relative"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {parishCouncil.members.map((member, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 basis-full md:basis-1/3"
                  >
                    <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 bg-card border-border h-full">
                      <div className="mb-4">
                        <h4 className="text-lg font-bold text-card-foreground">
                          {member.role}
                        </h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4 text-secondary" />
                          <div>
                            <p className="font-semibold text-card-foreground">
                              {member.name}
                            </p>
                          </div>
                        </div>
                        {member.email && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="w-4 h-4 text-secondary" />
                            <a
                              href={`mailto:${member.email}`}
                              className="hover:text-primary transition-colors"
                            >
                              {member.email}
                            </a>
                          </div>
                        )}
                        {member.phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-4 h-4 text-secondary" />
                            <a
                              href={`tel:${member.phone}`}
                              className="hover:text-primary transition-colors"
                            >
                              {member.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 md:-left-12 lg:-left-16" />
              <CarouselNext className="right-0 md:-right-12 lg:-right-16" />
            </Carousel>
          </div>

          {/* Hierarchy Arrow */}
          <div className="flex justify-center py-4">
            <ArrowDown className="w-8 h-8 text-secondary" strokeWidth={3} />
          </div>

          {/* Departments - Third Level */}
          <div>
            <h3 className="text-2xl font-bold text-center text-foreground mb-6">
              {t("departments.departmentsTitle")}
            </h3>
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full relative"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {departments.map((dept) => (
                  <CarouselItem
                    key={dept.id}
                    className="pl-2 md:pl-4 basis-full md:basis-1/3"
                  >
                    <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 bg-card border-border h-full">
                      <div className="mb-4">
                        <h4 className="text-lg font-bold text-card-foreground">
                          {dept.name}
                        </h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4 text-secondary" />
                          <div>
                            <p className="font-semibold text-card-foreground">
                              {dept.head}
                            </p>
                          </div>
                        </div>
                        {dept.email && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="w-4 h-4 text-secondary" />
                            <a
                              href={`mailto:${dept.email}`}
                              className="hover:text-primary transition-colors"
                            >
                              {dept.email}
                            </a>
                          </div>
                        )}
                        {dept.phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-4 h-4 text-secondary" />
                            <a
                              href={`tel:${dept.phone}`}
                              className="hover:text-primary transition-colors"
                            >
                              {dept.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 md:-left-12 lg:-left-16" />
              <CarouselNext className="right-0 md:-right-12 lg:-right-16" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Departments;
