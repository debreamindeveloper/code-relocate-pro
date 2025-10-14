import { Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-lg font-semibold mb-2">Our Church</p>
        <p className="text-white/80 mb-4">
          Growing in faith, serving in love
        </p>
        <div className="flex justify-center gap-6 mb-4">
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
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} Our Church. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
