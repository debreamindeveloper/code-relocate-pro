import { useTranslation } from "react-i18next";
import constitutionPdf from "@/assets/ቃለ ዓዋዲ 2009 ዓ.ም Optimized.pdf";
import bylawsPdf from "@/assets/toWEBP/Etiopian_ortodoksisen_kirkon_suomenkielinen_sääntö_26_11_24_.pdf";

const About = () => {
  const { t, i18n } = useTranslation();
  const isAmharic = i18n.language === "am";
  const isFinnish = i18n.language === "fi";


  return (
    <section id="about"  className="relative z-10 -mt-6 md:-mt-10 px-4 md:px-8 lg:px-16">
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
            <div>
              <a
              href={bylawsPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline transition-colors ml-1"
            >
              {t("about.paragraph3LinkText")}
            </a>
            <span> ፣ </span>
            <a
              href={constitutionPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline transition-colors ml-1"
            >
              {t("about.paragraph2LinkText")}
            </a>  
            </div>
          )}
           {isFinnish && (
            <div>
              <a
              href={bylawsPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline transition-colors ml-1"
            >
              {t("about.paragraph3LinkText")}
            </a>
           
            </div>
          )}
        </p>
      </div>
    </section>
  );
};

export default About;
