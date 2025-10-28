import { Facebook, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-6">
          <p className="text-lg font-semibold mb-2">{t("footer.churchName")}</p>
          <p className="text-white/80 mb-6">{t("footer.tagline")}</p>
          <div className="flex justify-center gap-6">
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

        <div className="text-center pt-6 border-t border-white/20">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} {t("footer.churchName")}.{" "}
            {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
