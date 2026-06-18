import type { MultilingualText } from "@/integrations/azure";
import pressHero from "@/assets/asset-pics/Press-relase-4.jpg";
import pressPhoto1 from "@/assets/asset-pics/press-release.jpg";
import pressPhoto2 from "@/assets/asset-pics/Church.jpeg";

export interface PressReleaseImage {
  src: string;
  alt: MultilingualText;
}

export interface PressRelease {
  id: string;
  date: string;
  headline: MultilingualText;
  excerpt: MultilingualText;
  body: MultilingualText;
  heroImage: string;
  gallery: PressReleaseImage[];
}

// To add a release:
//   1. Drop photos into src/assets/press/<slug>/ (or src/assets/asset-pics/)
//   2. Import them at the top of this file
//   3. Push a new entry to the front of PRESS_RELEASES below
// Body paragraphs split on a blank line (\n\n).
export const PRESS_RELEASES: PressRelease[] = [
  {
    id: "2026-pihlajanmaki-acquisition",
    date: "2026-06-17",
    headline: {
      en: "The First Ethiopian Orthodox Tewahedo Church Building Purchased in Finland",
      fi: "Ensimmäinen Etiopian ortodoksisen tewahedo-kirkon kirkkorakennus on ostettu Suomesta",
      am: "በፊንላንድ የመጀመሪያዋ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን ሕንጻ ቤተ ክርስቲያን ተገዛ",
    },
    excerpt: {
      en: "After ten years of fundraising, the parish has acquired a permanent church building in Pihlajanmäki, Helsinki — the first Ethiopian Orthodox Tewahedo Church property in Finland.",
      fi: "Kymmenen vuoden varainkeruun jälkeen seurakunta on hankkinut pysyvän kirkkorakennuksen Pihlajanmäestä Helsingistä — Etiopian ortodoksisen tewahedo-kirkon ensimmäinen kiinteistö Suomessa.",
      am: "ለዐሥር ዓመታት ከተደረገ ጥረት በኋላ ቤተ ክርስቲያኗ በሄልሲንኪ ፕህልያንማኪ ቋሚ ሕንጻ ቤተ ክርስቲያን አግኝታለች — በፊንላንድ የመጀመሪያው የኢ.ኦ.ተ.ቤ.ክ ንብረት።",
    },
    body: {
      en:
        "The Helsinki Debre Amin Abune Teklehaimanot Church, under the Nordic and Greece Diocese of the Ethiopian Orthodox Tewahedo Church (EOTC), has successfully purchased its own church building today, June 17, 2026 (Sene 10, 2018 according to the Ethiopian calendar). For the past ten years, the church had established a building committee to raise funds and search for a suitable property to call its own. As a result of these efforts, a grand building located in the beautiful area of \"Pihlajanmäki\" in Helsinki—which previously belonged to the Evangelical Lutheran Church of Finland—has been fully paid for and acquired as the permanent property of the Ethiopian Orthodox Tewahedo Church. The funds for the purchase were raised through the collaborative efforts of local Ethiopian parishioners across Finland, their Eritrean spiritual brothers and sisters, and Finnish well-wishers touched by Christian love.\n\n" +
        "After the church carries out all necessary renovations and preparations in accordance with its canons and traditions, it will soon begin celebrating the Holy Liturgy and other spiritual services. Beyond being a place of religious education for children, adolescents, and youth, the building will serve as a center for moral education, culture, and language. It will also become a social hub for Ethiopians to share their joys and sorrows—a great spiritual sanctuary of Ethiopia planted in a foreign land. In view of the building's aesthetic value and significance to the local neighborhood, no changes will be made to its exterior appearance, and it will remain as it was.\n\n" +
        "The Ethiopian Orthodox Tewahedo Church is one of the six Oriental Orthodox Churches; it has over 50 million followers and a history spanning 2,000 years. The church is also a founding member of the World Council of Churches.\n\n" +
        "Following the acquisition, the administrator of the church and General Manager of the Nordic and Greece Diocese, Priest Lemma Besufikad, extended his congratulations to the local parishioners and all Orthodox believers.",
      fi:
        "Etiopian ortodoksisen tewahedo-kirkon Nordian ja Kreikan hiippakuntaan kuuluva Helsingin Debre Amin Abune Teklehaymanot -seurakunta on ostanut oman kirkkorakennuksen tänään 17. kesäkuuta 2026. Kirkko on viimeisen kymmenen vuoden ajan toiminut rakennuskomitean kautta keräten varoja ja etsien toiminnalleen sopivaa omaa kiinteistöä. Tämän työn tuloksena Helsingin Pihlajanmäen kauniilla alueella sijaitseva, aiemmin Suomen evankelis-luterilaiselle kirkolle kuulunut suuri rakennus on ostettu kokonaan omaksi, ja siitä on tullut Etiopian ortodoksisen tewahedo-kirkon pysyvää omaisuutta. Rakennuksen ostoon tarvittavat varat kerättiin yhteistyössä, johon osallistuivat Suomessa asuvien etiopialaisten seurakuntalaisten lisäksi heidän uskonveljensä eritrealaiset sekä kristillisen rakkauden koskettamat suomalaiset.\n\n" +
        "Kun kirkko on tehnyt rakennukseen tarvittavat kunnostukset ja valmistelut kirkon kanonien ja perinteiden mukaisesti, siellä aloitetaan lähitulevaisuudessa liturgiat ja muut hengelliset palvelukset. Rakennus toimii erityisesti lasten, varhaisnuorten ja nuorten uskonnonopetuksen paikkana, ja sen lisäksi se tulee olemaan moraali- ja tapakasvatuksen, kulttuurin sekä kielen keskus. Siitä tulee myös etiopialaisten sosiaalinen kohtauspaikka, jossa jaetaan ilot ja surut – suuri Etiopian hengellinen linnake, joka on perustettu siirtolaisuudessa. Rakennuksen alueellisen kauneuden ja merkityksen vuoksi sen ulkoasuun ei tehdä muutoksia, vaan se säilyy entisellään.\n\n" +
        "Etiopian ortodoksinen tewahedo-kirkko on yksi kuudesta orientaalisesta ortodoksisesta kirkosta. Sillä on yli 50 miljoonaa seuraajaa ja 2000-vuotinen historia. Kirkko on myös Kirkkojen maailmanneuvoston perustajajäsen.\n\n" +
        "Kaupan toteutumisen jälkeen kirkon kirkkoherra sekä Nordian ja Kreikan hiippakunnan pääsihteeri, Isä Lemma Besufikad, välitti onnittelunsa seurakuntalaisille ja kaikille ortodokseille.",
      am:
        "በኢ.ኦ.ተ.ቤ.ክ በኖርዲክና ግሪክ ሀገረ ስብከተ የሄልሲንኪ ደብረ አሚን አቡነ ተክለሃይማኖት ቤተክርስቲያን ሕንጻ ቤተ ክርስቲያን ዛሬ ሰኔ ፲ ቀን ፳፻፲፰ ዓ.ም ግዢ ተፈጸመ። ቤተ ክርስቲያኗ ላለፉት ዐሥር ዓመታት የሕንጻ አሠሪ ኮምቴ አቋቁማ የራሷ የሆነ ሕንጻ እንዲኖራት ገንዘብ የማሰባሰብ እና ለአገልግሎት ምቹ የሆኑ ሕንጻዎች ስታፈላልግ ቆይታለች። በዚህም በሄልሲንኪ ከተማ \"ፕህልያንማኪ\" (Pihlajanmäki) በተባለው ውብ አካባቢ የሚገኘውና ቀደም ሲል የፊንላንድ ሉተራን ቤተ ክርስቲያን ንብረት የነበረው ታላቅ ሕንጻ ሙሉ በሙሉ ክፍያው በመክፈል የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን ቋሚ ንብረት ሆኖ ተገዝቷል። ለሕንጻው መግዣ የሚሆነውን ገንዘብ በመላው ፊንላንድ የሚገኙ የአጥቢያው ምዕመናን ኢትዮጵያውያ ብቻ ሳይሆኑ የሃይማኖት ወንድሞቻቸው የሆኑ ኤርትራውያንና በክርስቲያናዊ ፍቅር የተነኩ ፊንላንዳውያንም ሁሉ ተባብረዋል።\n\n" +
        "ቤተ ክርስቲያኗ በሕንጻው ላይ አስፈላጊውን ሁሉ እድሳት እና በቤተ ክርስቲያኗ ቀኖና እና ሥርዓት መሠረት ዝግጅቶት ካደረገች በኋላ በቅርብ ጊዜ የቅድሳሴ እና ሌሎች መንፈሳዊ አገልግሎቶች ትጀምርበታለች። ሕንጻው በተለይም ለሕጻት፣ አዳጊዎች እና ወጣቶች ሃይማኖት መማሪያ ከመሆን ባሻገር የግብረ ገብነትን፣ ባህልን እና ቋንቋ ማዕከል ሆኖ ያገለግላል። እንዲሁም የኢትዮጵያውያን ማኅበራዊ መገናኛ፣ የደስታና የሃዘን መካፈያ፣ እንዲሁም በስደት ሀገር የተተከለች ታላቅ የኢትዮጵያ መንፈሳዊ አምባ ትሆናለች። ሕንጻው ለአካባቢው ካለው ውበት እና ጠቀሜታ አንጻር፣ በውጫዊ ገጽታ ላይ ምንም ለውጥ ሳይደረግበት እንዲሁም ከዚህ በፊት እንደነበረው የሚቀጥል ይሆናል።\n\n" +
        "የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ከ6ቱ የኦሬንታል ኦርቶዶክስ አንዷ ስትሆን፤ ከ50 ሚሊዮን ተከታይ እና ለ2000 ዓመት የዘለቀ ታሪክ ያላት ቤተ ክርስቲያን ናት። ቤተ ክርስቲያኗ የዓለም አብያተ ክርስቲያናት ምክር ቤት መሥራች እና አባል ናት።\n\n" +
        "ከግዢው በኋላ የቤተ ክርስቲያኗ አስተዳዳሪ እና የኖርዲክ እና ግሪክ ሀገረ ስብከት ዋና ሥራ አስኪያጅ መልአከ አሚን ቀሲስ ለማ በሱፍቃድ ለአጥቢያው ምዕምናን እና ለመላው ኦርቶክሳዊያን እንኳን ደስ አላችሁ በማለት መልእክታቸውን አስተላልፈዋል።",
    },
    heroImage: pressHero,
    gallery: [
      {
        src: pressPhoto1,
        alt: {
          en: "Helsinki Debre Amin Abune Teklehaimanot Church building in Pihlajanmäki",
          fi: "Helsingin Debre Amin Abune Teklehaymanot -seurakunnan kirkkorakennus Pihlajanmäessä",
          am: "የሄልሲንኪ ደብረ አሚን አቡነ ተክለሃይማኖት ቤተ ክርስቲያን ሕንጻ በፕህልያንማኪ",
        },
      },
      {
        src: pressPhoto2,
        alt: {
          en: "Church building exterior view",
          fi: "Kirkkorakennuksen ulkonäkymä",
          am: "የቤተ ክርስቲያኑ ሕንጻ የውጭ እይታ",
        },
      },
    ],
  },
];

export const getLatestRelease = (): PressRelease | undefined =>
  [...PRESS_RELEASES].sort((a, b) => b.date.localeCompare(a.date))[0];
