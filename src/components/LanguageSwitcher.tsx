import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import ukFlag from "@/assets/flag-uk.png";
import ethiopiaFlag from "@/assets/flag-ethiopia.png";
import finlandFlag from "@/assets/flag-finland.png";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "am", name: "አማርኛ", flag: ethiopiaFlag },
    { code: "fi", name: "Suomi", flag: finlandFlag },
    { code: "en", name: "English", flag: ukFlag },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <img
            src={currentLanguage.flag}
            alt={currentLanguage.name}
            className="w-5 h-4 object-cover"
          />
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => i18n.changeLanguage(language.code)}
            className="gap-2"
          >
            <img
              src={language.flag}
              alt={language.name}
              className="w-5 h-4 object-cover"
            />
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
