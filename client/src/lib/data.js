import FRANCE from "/images/france.jpg";
import MAROC from "/images/maroc.jpg";
import CANADA from "/images/canada.jpg";
import { Car, Hotel, Plane } from "lucide-react";

import MEMBER1 from "/images/member1.jpg";
import MEMBER2 from "/images/member2.jpg";
import MEMBER3 from "/images/member3.jpg";
import MEMBER4 from "/images/member4.jpg";

export const services = [
  {
    title: "Étudier à l'étranger",
    description:"Des conseils et des services pour étudier dans les meilleures universités à l'étranger.",
    icon: Plane,
    link: "/services/etudier-a-l-etranger",
  },
  {
    title: "Tourisme",
    description:"Des voyages organisés et des séjours sur mesure pour découvrir le monde.",
    icon: Hotel,
    link: "/services/voyages-touristiques",
  },
  {
    title: "Évacuation Sanitaire",
    description:"Une assistance médicale et un rapatriement en cas d'urgence à l'étranger.",
    icon: Car,
    link: "/services/evacuation-sanitaire",
  },
  {
    title: "Billeterie",
    description:"Les meilleurs tarifs pour vos billets d'avion, de train et de bus.",
    icon: Car,
    link: "/services/billeterie",
  },
];

export const testimonials = [
  {
    quote:
      "Une expérience incroyable ! L'équipe a parfaitement organisé notre voyage.",
    author: "Marie Dubois",
    role: "Voyage à Bali",
  },
  {
    quote:
      "Service impeccable et destinations de rêve. Je recommande vivement !",
    author: "Pierre Martin",
    role: "Tour d'Europe",
  },
  {
    quote:
      "Des souvenirs inoubliables grâce à leur expertise et leurs conseils.",
    author: "Sophie Laurent",
    role: "Safari en Afrique",
  },
];

export const destinations = [
  {
    id: 1,
    title: "France",
    image: FRANCE,
    shortDescription: "La ville de l'amour et de la lumière",
    fullDescription:
      "Paris, capitale de la France, est célèbre pour sa culture, son architecture et sa gastronomie. Découvrez la Tour Eiffel, le Louvre, et bien plus encore. ",
    price: "à partir de 599€",
    duration: "3-7 jours",
    continent: "europe",
    rating: 4.8,
  },

  {
    id: 2,
    title: "Maroc",
    image: MAROC,
    shortDescription: "Le pays des mille et une nuits",
    fullDescription:
      "Le Maroc, pays d'Afrique du Nord, est connu pour sa divers ité culturelle, ses villes impériales et ses paysages désertiques. Découvrez Marrakech, Casablanca, et bien plus encore.",
    price: "à partir de 999€",
    duration: "7-14 jours",
    continent: "afrique",
    rating: 4.5,
  },
  {
    id: 3,
    title: "Canada",
    image: CANADA,
    shortDescription: "Le pays des grands espaces",
    fullDescription:
      "Le Canada, deuxième plus grand pays du monde, est réputé pour ses paysages spectaculaires, ses parcs nationaux et sa faune sauvage. Découvrez Toronto, Vancouver, et bien plus encore.",
    price: "à partir de 799€",
    duration: "5-10 jours",
    continent: "amerique",
    rating: 4.7,
  },
  
];

export const continents = [
  { value: "Europe", label: "Europe" },
  { value: "Asie", label: "Asie" },
  { value: "Amerique", label: "Amérique" },
  { value: "Afrique", label: "Afrique" },
  { value: "Oceanie", label: "Océanie" },
]


export const partners = [
  { name: "Partner 1", logo: "https://sovetudes.vercel.app/partenaires/p1.jpeg" },
  { name: "Partner 2", logo: "https://sovetudes.vercel.app/partenaires/p2.jpeg" },
  { name: "Partner 3", logo: "https://sovetudes.vercel.app/partenaires/p3.jpeg" },
  { name: "Partner 4", logo: "https://sovetudes.vercel.app/partenaires/p4.jpeg" },
  { name: "Partner 5", logo: "https://sovetudes.vercel.app/partenaires/p5.jpeg" },
  { name: "Partner 6", logo: "https://sovetudes.vercel.app/partenaires/p6.jpeg" },
  { name: "Partner 7", logo: "https://sovetudes.vercel.app/partenaires/p7.jpeg" },

];

export const teams = [
  {
    name: "Jane Doe",
    role: "CEO",
    image: MEMBER1,
  },
  {
    name: "John Doe",
    role: "Travel Agent",
    image: MEMBER2,
  },
  {
    name: "Alice Doe",
    role: "Customer Support",
    image: MEMBER3,
  },
  {
    name: "Bob Doe",
    role: "Marketing",
    image: MEMBER4,
  },
];

export const posts = [
  {
    id: 1,
    title: "Les 10 plus belles plages de Bali",
    slug: "10-plus-belles-plages-bali",
    excerpt: "Découvrez notre sélection des plus belles plages de Bali pour votre prochain voyage paradisiaque.",
    content: `
      Bali, l'île des dieux, regorge de plages magnifiques, chacune avec son propre charme. Voici notre sélection des 10 plus belles plages :

      1. Nusa Dua Beach
      Une plage de sable blanc immaculé avec des eaux cristallines, parfaite pour la baignade et le snorkeling.

      2. Uluwatu Beach
      Connue pour ses vagues impressionnantes et son temple perché sur une falaise, c'est le paradis des surfeurs.

      3. Jimbaran Beach
      Une plage paisible réputée pour ses restaurants de fruits de mer et ses couchers de soleil spectaculaires.

      4. Sanur Beach
      Une plage calme et peu profonde, idéale pour les familles, avec une belle promenade côtière.

      5. Kuta Beach
      La plage la plus populaire de Bali, parfaite pour l'apprentissage du surf et la vie nocturne.

      Et bien d'autres encore à découvrir...
    `,
    image:"https://cdn.pixabay.com/photo/2017/05/22/07/20/press-2333329_640.jpg",
    date: "2024-01-15",
    readTime: "5 min",
    author: "Marie Dubois",
    category: "Destinations",
  },
  {
    id: 2,
    title: "Guide de la street food à Bangkok",
    slug: "guide-street-food-bangkok",
    excerpt: "Les meilleurs spots pour déguster la cuisine de rue thaïlandaise authentique.",
    content: `
      Bangkok est réputée pour sa street food incroyable. Voici notre guide complet pour explorer les meilleurs spots :

      Les Meilleurs Quartiers
      - Chinatown (Yaowarat)
      - Victory Monument
      - Sukhumvit Soi 38
      - Or Tor Kor Market

      Que Manger ?
      1. Pad Thai
      Le plat emblématique de la Thaïlande, des nouilles sautées avec une sauce savoureuse.

      2. Som Tam
      Une salade de papaye verte épicée et rafraîchissante.

      3. Moo Ping
      Des brochettes de porc grillées marinées, parfaites pour un en-cas.

      4. Khao Man Gai
      Du riz au poulet simple mais délicieux.

      Conseils de Sécurité Alimentaire
      - Choisissez des stands populaires avec un bon débit
      - Regardez si les conditions d'hygiène sont bonnes
      - Évitez les glaçons dans les boissons
      
      Prix Moyens
      La plupart des plats coûtent entre 30 et 100 bahts (1-3€).
    `,
    image:"https://cdn.pixabay.com/photo/2015/10/17/20/52/work-993353_640.jpg",
    date: "2024-01-12",
    readTime: "8 min",
    author: "Pierre Martin",
    category: "Gastronomie",
  },
  {
    id: 3,
    title: "Safari en Tanzanie : Guide complet",
    slug: "safari-tanzanie-guide-complet",
    excerpt: "Tout ce que vous devez savoir pour organiser votre safari en Tanzanie.",
    content: `
      La Tanzanie offre certains des meilleurs safaris d'Afrique. Voici votre guide complet pour planifier votre aventure :

      Meilleure Période
      - Juin à octobre : Saison sèche, idéale pour l'observation des animaux
      - Décembre à mars : Migration des oiseaux
      - Avril à mai : Saison des pluies, paysages verdoyants

      Parcs Nationaux Incontournables
      1. Serengeti
      - Grande migration des gnous
      - Lions, léopards, éléphants
      - Vastes plaines à perte de vue

      2. Ngorongoro
      - Cratère volcanique unique
      - Concentration exceptionnelle d'animaux
      - Possibilité de voir des rhinocéros noirs

      3. Tarangire
      - Grands troupeaux d'éléphants
      - Baobabs centenaires
      - Moins touristique

      Conseils Pratiques
      - Réservez à l'avance pendant la haute saison
      - Prévoyez des vêtements adaptés
      - Apportez un bon appareil photo
      - Vaccins et visa nécessaires

      Budget
      - Safari budget : 200-300$/jour
      - Safari confort : 400-600$/jour
      - Safari luxe : 800$+/jour
    `,
    image: "/placeholder.svg",
    date: "2024-01-10",
    readTime: "10 min",
    author: "Sophie Laurent",
    category: "Aventure",
  },
]


export const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
]

export const appointmentTypes = [
  {
    value: "etudier-à-l-étranger",
    label: "Étudier à l'étranger",
    description: "Des conseils et des services pour étudier dans les meilleures universités à l'étranger."
  },
  {
    value: "tourisme",
    label: "Tourisme",
    description: "Des voyages organisés et des séjours sur mesure pour découvrir le monde."
  },
  {
    value: "évacuation-sanitaire",
    label: "Évacuation Sanitaire",
    description: "Une assistance médicale et un rapatriement en cas d'urgence à l'étranger."
  },
  {
    value: "billeterie",
    label: "Billeterie",
    description: "Les meilleurs tarifs pour vos billets d'avion, de train et de bus."
  }
]

export const chartData = [
  {
    name: "Jan",
    total: 1200,
    sales: 900,
    visits: 2400,
  },
  {
    name: "Fév",
    total: 2100,
    sales: 1400,
    visits: 3000,
  },
  {
    name: "Mar",
    total: 1800,
    sales: 1200,
    visits: 2800,
  },
  {
    name: "Avr",
    total: 2400,
    sales: 1800,
    visits: 3200,
  },
  {
    name: "Mai",
    total: 2700,
    sales: 2000,
    visits: 3600,
  },
  {
    name: "Jun",
    total: 3000,
    sales: 2400,
    visits: 4000,
  },
  {
    name: "Jul",
    total: 2500,
    sales: 1900,
    visits: 3400,
  },
  {
    name: "Aoû",
    total: 2800,
    sales: 2200,
    visits: 3800,
  },
  {
    name: "Sep",
    total: 3200,
    sales: 2600,
    visits: 4200,
  },
  {
    name: "Oct",
    total: 3500,
    sales: 2800,
    visits: 4600,
  },
  {
    name: "Nov",
    total: 3800,
    sales: 3000,
    visits: 5000,
  },
  {
    name: "Déc",
    total: 4000,
    sales: 3200,
    visits: 5400,
  },
]

