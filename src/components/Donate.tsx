import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Heart, Building2 } from "lucide-react";

const Donate = () => {
  const { t } = useTranslation();

  return (
    <section id="donate" className="py-20 px-4 bg-accent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("donate.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("donate.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Main Account */}
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">
                {t("donate.mainAccount.title")}
              </h3>
            </div>

            <p className="text-muted-foreground mb-6">
              {t("donate.mainAccount.description")}
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {t("donate.iban")}
                </p>
                <p className="font-mono text-lg text-primary font-bold">
                  FI83 8000 9710 2023 12
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {t("donate.bic")}
                </p>
                <p className="font-mono text-lg text-primary font-bold">
                  DABAFIHH
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {t("donate.accountHolder")}
                </p>
                <p className="text-foreground">Ethiopian Orthodoks</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {t("donate.reference")}
                </p>
                <p className="text-foreground">Daily Operations</p>
              </div>
            </div>

            {/* Mobile Pay */}
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground mb-1">
                MobilePay
              </p>
              <p className="font-mono text-lg text-primary font-bold">83818</p>
            </div>
          </Card>

          {/* Building Committee Account */}
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">
                {t("donate.buildingAccount.title")}
              </h3>
            </div>

            <p className="text-muted-foreground mb-6">
              {t("donate.buildingAccount.description")}
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {t("donate.iban")}
                </p>
                <p className="font-mono text-lg text-primary font-bold">
                  FI21 8146 9710 2540 86
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {t("donate.bic")}
                </p>
                <p className="font-mono text-lg text-primary font-bold">
                  DABAFIHH
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {t("donate.accountHolder")}
                </p>
                <p className="text-foreground">Ethiopian Orthodoks</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {t("donate.reference")}
                </p>
                <p className="text-foreground">Building Committee</p>
              </div>
            </div>

            {/* Mobile Pay */}
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground mb-1">
                MobilePay
              </p>
              <p className="font-mono text-lg text-primary font-bold">21814</p>
            </div>
          </Card>
        </div>

        <div className="mt-12 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-center text-foreground">{t("donate.thankYou")}</p>
        </div>
      </div>
    </section>
  );
};

export default Donate;
