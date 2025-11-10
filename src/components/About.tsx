import { useTranslation } from "react-i18next";

const About = () => {
  const { t, i18n } = useTranslation();
  const isAmharic = i18n.language === "am";

  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-justify">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          {t("about.title")}
        </h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          {t("about.paragraph1")}
        </p>

        {/* Section 1: Growth and Clergy */}
        <h3 className="text-2xl font-bold text-foreground mb-4 mt-8">
          {t("about.section1Title")}
        </h3>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          {t("about.section1Content")}
        </p>

        {/* Section 2: Worship Location */}
        <h3 className="text-2xl font-bold text-foreground mb-4 mt-8">
          {t("about.section2Title")}
        </h3>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          {t("about.section2Content")}
        </p>

        {/* Section 3: Constitution and Bylaws */}
        <h3 className="text-2xl font-bold text-foreground mb-4 mt-8">
          {t("about.section3Title")}
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t("about.section3Content")}
          {isAmharic && (
            <a
              href={t("about.paragraph2LinkUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline transition-colors ml-1"
            >
              {t("about.paragraph2LinkText")}
            </a>
          )}
        </p>
      </div>
    </section>
  );
};

export default About;
