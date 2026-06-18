import { useTranslation } from "react-i18next";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { MultilingualText } from "@/integrations/azure";
import { getLatestRelease } from "@/data/pressReleases";

const pickText = (
  value: MultilingualText | undefined,
  lang: string,
): string => {
  if (!value) return "";
  const key = lang as keyof MultilingualText;
  return value[key] ?? value.en ?? value.fi ?? value.am ?? "";
};

const formatDate = (iso: string, lang: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const locale = lang === "am" ? "en-US" : lang;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const PressRelease = () => {
  const { t, i18n } = useTranslation();
  const release = getLatestRelease();

  if (!release) return null;

  const lang = i18n.language;
  const headline = pickText(release.headline, lang);
  const body = pickText(release.body, lang);
  const paragraphs = body.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

  return (
    <section id="press" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
            {t("press.eyebrow")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            {headline}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("press.published")} {formatDate(release.date, lang)}
          </p>
        </div>

        {release.gallery.length > 0 && (
          <div className="mb-10">
            <Carousel
              opts={{ align: "start", loop: release.gallery.length > 1 }}
              className="w-full relative"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {release.gallery.map((img, idx) => (
                  <CarouselItem
                    key={idx}
                    className="pl-2 md:pl-4 basis-full md:basis-1/2"
                  >
                    <img
                      src={img.src}
                      alt={pickText(img.alt, lang)}
                      className="w-full h-64 md:h-80 object-cover rounded-lg"
                      loading="lazy"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {release.gallery.length > 1 && (
                <>
                  <CarouselPrevious className="left-0 md:-left-12" />
                  <CarouselNext className="right-0 md:-right-12" />
                </>
              )}
            </Carousel>
          </div>
        )}

        <div className="prose prose-lg max-w-none space-y-4">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="text-foreground leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressRelease;
