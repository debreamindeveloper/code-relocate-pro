import logo from "@/assets/logo.jpg";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close menu after navigation
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-1">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src={logo}
              alt="Saint Teklehaimanot"
              className="h-8 w-8 object-contain rounded-lg"
            />
            <h1 className="text-sm md:text-lg font-semibold text-foreground hidden sm:block">
              {t("header.churchName")}
            </h1>
          </button>

          <nav className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("header.about")}
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("header.services")}
            </button>
            <button
              onClick={() => scrollToSection("events")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("header.events")}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("header.contact")}
            </button>
            <button
              onClick={() => scrollToSection("donate")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("header.donate")}
            </button>
            <LanguageSwitcher />
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left py-2"
              >
                {t("header.about")}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left py-2"
              >
                {t("header.services")}
              </button>
              <button
                onClick={() => scrollToSection("events")}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left py-2"
              >
                {t("header.events")}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left py-2"
              >
                {t("header.contact")}
              </button>
              <button
                onClick={() => scrollToSection("donate")}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left py-2"
              >
                {t("header.donate")}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
