import { Facebook, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-primary text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold mb-2">{t('footer.churchName')}</p>
            <p className="text-white/80 mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex justify-center md:justify-start gap-6">
              <a
                href="https://www.facebook.com/eotcHelsinkiTekleHaymanot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCBCfrKUOEixZtQMTxeuaQ_Q"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Visit our YouTube channel"
              >
                <Youtube size={24} />
              </a>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-lg font-semibold mb-2">{t('footer.donate.title')}</p>
            <p className="text-white/80 mb-2">{t('footer.donate.description')}</p>
            <div className="text-sm text-white/90">
              <p className="font-medium">{t('footer.donate.bankAccount')}</p>
              <p className="font-mono">FI21 8146 9710 2540 86</p>
              <p className="font-medium mt-1">{t('footer.donate.beneficiary')}</p>
              <p>Ethiopian Orthodoks</p>
            </div>
          </div>
        </div>
        
        <div className="text-center pt-6 border-t border-white/20">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} {t('footer.churchName')}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
