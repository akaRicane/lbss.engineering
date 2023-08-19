type TextBookType = {
  [key: string]: {
    [key: string]: string;
  };
};

const TEXT_BOOK: TextBookType = {
  HEADER_WELCOME: {
    en: "Welcome to lbss.engineering!",
    fr: "Bienvenue sur lbss.engineering!",
  },
  LANGUAGE: {
    en: "english",
    fr: "français",
  },
  LINK_TO_HOME: {
    en: "To home",
    fr: "Retour à l'acceuil",
  },
  LINK_TO_BETATEST: {
    en: "To betatest",
    fr: "Aller à betatest",
  },
  LINK_TO_PRODUCTS: {
    en: "To products",
    fr: "Voir les produits",
  },
  "#PRODUCTS_PRESENTATION": {
    en: "Our products",
    fr: "Nos solutions",
  },
  "#PRODUCTS_PRESENTATION_ASTAR": {
    en: "hello i am a good software to do some creative coding and live performances !! Buy me please !",
    fr: "je suis Astar, le gentil logiciel trop cool",
  },
  "#PRODUCTS_PRESENTATION_LBSSCLOUD": {
    en: "work in progress ...",
    fr: "encore en cours de développement!",
  },
  LINK_TO_ASTAR: {
    en: "To ASTAR",
    fr: "Aller à ASTAR",
  },
  "#ASTAR_OVERVIEW_1": {
    en: "Welcome to Astar, the revolutionary desktop application designed to ignite your creative coding journey like never before. Developed by LBSS.Art, Astar is your gateway to a realm where code and creativity seamlessly converge. Whether you're an artist, developer, or performer, Astar empowers you to craft dynamic interactive experiences that captivate and inspire. With Astar, you're not just creating; you're composing, performing, and captivating audiences in real-time.",
    fr: "Bienvenue dans l'univers d'Astar, une application de bureau révolutionnaire conçue pour éveiller votre voyage de codage créatif comme jamais auparavant. Développé par LBSS.Art, Astar est votre passerelle vers un monde où le code et la créativité fusionnent en parfaite harmonie. Que vous soyez artiste, développeur ou interprète, Astar vous permet de créer des expériences interactives dynamiques qui captivent et inspirent. Avec Astar, vous ne créez pas simplement ; vous composez, interprétez et captez les publics en temps réel.",
  },
  "#ASTAR_OVERVIEW_2": {
    en: "At the heart of Astar lies a philosophy: \"Take control, unlock creativity.\" Imagine a canvas where you can bring your coding sketches to life, from the ethereal glimmer of p5.js visuals to the immersive landscapes of three.js and OpenGL. With Astar, you're not merely writing lines of code; you're crafting visual symphonies that dance with your imagination. Embrace the power of controls as Astar bridges the gap between your interface and code, enabling the orchestration of knobs, pads, switches, colors, and more, seamlessly integrated into your projects.",
    fr: "Au cœur d'Astar réside une philosophie : \"Prenez le contrôle, libérez la créativité.\" Imaginez une toile où vous pouvez donner vie à vos esquisses de code, de l'éclat éthéré des visuels p5.js aux paysages immersifs de three.js et OpenGL. Avec Astar, vous ne rédigez pas seulement des lignes de code ; vous créez des symphonies visuelles qui dansent avec votre imagination. Embrassez la puissance des contrôles, car Astar comble l'écart entre votre interface et votre code, permettant l'orchestration de boutons rotatifs, de pads, d'interrupteurs, de couleurs, et bien plus encore, parfaitement intégrée à vos projets.",
  },
  "#ASTAR_OVERVIEW_3": {
    en: "Astar isn't just a software; it's your creative companion that adapts to your unique artistic journey. Envision live performances that pulse with the rhythm of your code, powered by Astar's live performance focus honed over years of VJing. Dive into the world of creative development as Astar redefines your coding process, seamlessly intertwining control and innovation. Beyond the screen, Astar extends its reach through MIDI, OSC, and UDP protocols, letting you explore the uncharted territories of interactive hardware. With Astar, stage design and content creation merge, as your vision takes tangible form through hardware control and artistic expression. Welcome to Astar: where your creativity sets the course and the code becomes a canvas.",
    fr: "Astar n'est pas simplement un logiciel ; c'est votre compagnon créatif qui s'adapte à votre voyage artistique unique. Envisagez des performances live qui pulsent au rythme de votre code, alimentées par la focalisation des performances en direct d'Astar, affinée au fil des années de VJing. Plongez dans le monde du développement créatif alors qu'Astar redéfinit votre processus de codage, en entrelaçant parfaitement le contrôle et l'innovation. Au-delà de l'écran, Astar étend son influence à travers les protocoles MIDI, OSC et UDP, vous permettant d'explorer les territoires inexplorés du matériel interactif. Avec Astar, la conception de scène et la création de contenu fusionnent, tandis que votre vision prend forme tangible grâce au contrôle matériel et à l'expression artistique. Bienvenue dans l'univers d'Astar : où votre créativité trace la voie et le code devient une toile.",
  },
  LINK_TO_LBSSCLOUD: {
    en: "To LBSS CLOUD",
    fr: "Aller à LBSS CLOUD",
  },
  LINK_TO_ABOUT: {
    en: "To about",
    fr: "En savoir plus",
  },
  LINK_TO_ACCOUNT: {
    en: "My account",
    fr: "Mon profil",
  },
  LINK_TO_LBSSART: {
    en: "visit lbss.art website",
    fr: "jette un oeil à lbss.art",
  },
  FAIL_TEXT: {
    en: "Fail!",
    fr: "Une erreur est survenue!",
  },
};

export function TextGetter(props: string, language: string = "en"): string {
  var fetched = "fail";
  if (TEXT_BOOK[props]) {
    if (TEXT_BOOK[props][language]) {
      fetched = TEXT_BOOK[props][language];
    } else {
      fetched = TEXT_BOOK[props]["en"];
    }
    // console.log(`Query ${props} ${language}`, "Found", fetched);
  } else {
    // console.log(`Fail to fetch query ${props} ${language}`);
  }

  return fetched;
}

export function getKeyFromMessage(message: string, language: string = "en"): string | undefined {
  for (const key in TEXT_BOOK) {
    if (TEXT_BOOK[key][language] === message) {
      return key;
    }
  }
  return undefined; // Return undefined if no key matches the provided message
}
