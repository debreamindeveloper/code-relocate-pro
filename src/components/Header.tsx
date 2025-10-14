import logo from "@/assets/saintteklehaimanot.jpg";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-1">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src={logo}
              alt="Saint Teklehaimanot"
              className="h-8 w-8 object-contain rounded-lg"
            />
            <h1 className="text-sm md:text-lg font-semibold text-foreground hidden sm:block">
              ሄልሲንኪ ደብረ አሚን አቡነ ተክለሃይማኖት ቤተ ክርስትያን
            </h1>
          </button>

          <nav className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t('header.about')}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t('header.services')}
            </button>
            <button
              onClick={() => scrollToSection('events')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t('header.events')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t('header.contact')}
            </button>
            <LanguageSwitcher />
          </nav>

          <div className="md:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
