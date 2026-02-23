// Official Kwara State LGAs and Areas for delivery
export interface IlorinArea {
  id: string;
  name: string;
  lga: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  deliveryFee?: number;
}

export const AREA_EXTRA_FEES: Record<string, number> = {
  // Ifelodun LGA (closest - kitchen is in Ganmo)
  ganmo: 0,
  share: 500,
  idofian: 500,
  'oro-ago': 600,

  // Ilorin South LGA
  tanke: 800,
  tanke_oke_odo: 800,
  fate: 900,
  fate_tipper_garage: 900,
  pipe_line: 850,
  zango: 800,
  harmony_estate: 900,
  kulende: 900,
 
  oke_odo: 800,
  akanbi_1: 950,
  akanbi_2: 950,
  balogun_fulani: 900,

  // Ilorin West LGA
  taiwo: 800,
   gerin_alimi_axis: 950,
  unity: 700,
  'post-office': 800,
  'oja-tuntun': 800,
  'oja-oba': 800,
  'aiyetoro/asadam': 800,
  pakata: 900,
  'isale-koko': 850,
  'isale-aluko': 850,
  'idi-ape': 800,
  kuntu: 900,
  adewole: 800,
  baboko: 900,
  ajikobi: 900,
  badari: 950,
  alanamu: 950,
  gambari: 1000,
  gra: 800,
  'oke-ogba': 800,
  'ilorin-west-general': 800,

  // Ilorin East LGA
  oke_oyi: 1000,
  apan: 1000,
  maraba: 900,
  ile_apa: 700,
  odo_okun: 1000,
  oke_ese: 1000,
  agbogunmati: 1000,

  // Asa LGA
  afon: 800,
  ogbondoroko: 800,
  pampo: 800,
  ogele: 800,
  olowokere: 800,
  yowere: 800,
  'aboto-odo': 800,
  'ila-oja': 800,
  owode: 800,
  onire: 800,
  okesho: 800,
  'budo-egba': 800,
  adigbongbo: 800,

  // Baruten LGA
  kosubosu: 5000,
  'ilesha-baruba': 5000,
  chikanda: 5000,

  // Edu LGA
  lafiagi: 4000,
  tsada: 4000,

  // Ekiti LGA
  'araromi-opin': 3500,
  'isolo-opin': 3500,

  // Irepodun LGA
  'omu-aran': 3000,

  // Isin LGA
  'owu-isin': 3500,
  isin: 3500,

  // Kaiama LGA
  kaiama: 5500,
  adena: 5500,

  // Moro LGA
  'bode-saadu': 3000,
  jebba: 4500,

  // Offa LGA
  offa: 2500,
  'offa-ikun': 2500,
  'offa-garage': 2500,

  // Oke-Ero LGA
  iloffa: 4000,
  'erin-ile': 3500,

  // Oyun LGA
  ilemona: 3000,
  ijagbo: 3000,

  // Pategi LGA
  pategi: 6000,
  nupeko: 6000,
};

export const LGA_DEFAULT_EXTRA_FEES: Record<string, number> = {
  'Ilorin South': 900,
  'Ilorin West': 800,
  Ifelodun: 0
};

// Official Kwara State areas with accurate coordinates
const RAW_ILORIN_AREAS: IlorinArea[] = [
  // Asa LGA - Headquarters: Afon
  {
    id: 'afon',
    name: 'Afon',
    lga: 'Asa',
    coordinates: { lat: 8.31313, lng: 4.52738 } // Afon town coordinates :contentReference[oaicite:0]{index=0}
  },
  {
    id: 'ogbondoroko',
    name: 'Ogbondoroko',
    lga: 'Asa',
    coordinates: { lat: 8.39630, lng: 4.60120 } // Ogbondoroko village coordinates :contentReference[oaicite:1]{index=1}
  },
  {
    id: 'pampo',
    name: 'Pampo',
    lga: 'Asa',
    coordinates: { lat: 8.3180, lng: 4.5400 } // Approximate center near Pampo (in Afon district) :contentReference[oaicite:2]{index=2}
  },
  {
    id: 'ogele',
    name: 'Ogele / Ogele Ward',
    lga: 'Asa',
    coordinates: { lat: 8.3270, lng: 4.5300 } // Approximate within Ogele ward area :contentReference[oaicite:3]{index=3}
  },
  {
    id: 'olowokere',
    name: 'Olowokere',
    lga: 'Asa',
    coordinates: { lat: 8.3250, lng: 4.5200 } // Estimated locality within Asa LGA :contentReference[oaicite:4]{index=4}
  },
  {
    id: 'yowere',
    name: 'Yowere / Sosoki',
    lga: 'Asa',
    coordinates: { lat: 8.3450, lng: 4.5000 } // Rough approximate central point of Yowere/Sosoki ward :contentReference[oaicite:5]{index=5}
  },
  {
    id: 'aboto-odo',
    name: 'Aboto-Odo / Odo-Ode',
    lga: 'Asa',
    coordinates: { lat: 8.3300, lng: 4.4900 } // Approx between Aboto & Odo-Ode :contentReference[oaicite:6]{index=6}
  },
  {
    id: 'ila-oja',
    name: 'Ila-Oja',
    lga: 'Asa',
    coordinates: { lat: 8.3400, lng: 4.5150 } // Approx center of Ila-Oja ward :contentReference[oaicite:7]{index=7}
  },
  {
    id: 'owode',
    name: 'Owode / Owo-de',
    lga: 'Asa',
    coordinates: { lat: 8.3500, lng: 4.5500 } // Approx around Owode ward area :contentReference[oaicite:8]{index=8}
  },
  {
    id: 'onire',
    name: 'Onire / Onive / Odegiwa',
    lga: 'Asa',
    coordinates: { lat: 8.3600, lng: 4.5350 } // Approx for Onire ward :contentReference[oaicite:9]{index=9}
  },
  {
    id: 'okesho',
    name: 'Okesho',
    lga: 'Asa',
    coordinates: { lat: 8.3300, lng: 4.4800 } // Approx for Okesho ward :contentReference[oaicite:10]{index=10}
  },
  {
    id: 'budo-egba',
    name: 'Budo-Egba',
    lga: 'Asa',
    coordinates: { lat: 8.3100, lng: 4.5600 } // Approx center of Budo-Egba ward :contentReference[oaicite:11]{index=11}
  },
  {
    id: 'adigbongbo',
    name: 'Adigbongbo / Awe / Orimaro',
    lga: 'Asa',
    coordinates: { lat: 8.3400, lng: 4.4950 } // Approx center of Adigbongbo ward :contentReference[oaicite:12]{index=12}
  },

  // Baruten LGA - Headquarters: Kosubosu
  {
    id: 'kosubosu',
    name: 'Kosubosu',
    lga: 'Baruten',
    coordinates: { lat: 9.5526, lng: 3.4096 }
  },
  {
    id: 'ilesha-baruba',
    name: 'Ilesha Baruba',
    lga: 'Baruten',
    coordinates: { lat: 9.5581, lng: 3.5902 }
  },
  {
    id: 'chikanda',
    name: 'Chikanda',
    lga: 'Baruten',
    coordinates: { lat: 9.4289, lng: 3.7583 }
  },

  // Edu LGA - Headquarters: Lafiagi
  {
    id: 'lafiagi',
    name: 'Lafiagi',
    lga: 'Edu',
    coordinates: { lat: 8.8539, lng: 5.4143 }
  },
  {
    id: 'tsada',
    name: 'Tsada',
    lga: 'Edu',
    coordinates: { lat: 8.8882, lng: 5.3826 }
  },
  // Ekiti LGA - Headquarters: Araromi-Opin
  {
    id: 'araromi-opin',
    name: 'Araromi-Opin',
    lga: 'Ekiti',
    coordinates: { lat: 8.0946, lng: 5.0641 }
  },
  {
    id: 'isolo-opin',
    name: 'Isolo-Opin',
    lga: 'Ekiti',
    coordinates: { lat: 8.0824, lng: 5.0589 }
  },
  // Ifelodun LGA - Headquarters: Share
  {
    id: 'share',
    name: 'Share',
    lga: 'Ifelodun',
    coordinates: { lat: 8.3666, lng: 4.8658 }
  },
  {
    id: 'ganmo',
    name: 'Ganmo',
    lga: 'Ifelodun',
    coordinates: { lat: 8.3987, lng: 4.8512 }
  },
  {
    id: 'idofian',
    name: 'Idofian',
    lga: 'Ifelodun',
    coordinates: { lat: 8.3294, lng: 4.8519 }
  },
  {
    id: 'oro-ago',
    name: 'Oro-Ago',
    lga: 'Ifelodun',
    coordinates: { lat: 8.4102, lng: 4.9156 }
  },
  // Ilorin East LGA - Headquarters: Oke Oyi

  {
    id: "oke_oyi",
    name: "Oke-Oyi",
    lga: "Ilorin East",
    coordinates: { lat: 8.5236, lng: 4.6061 }
  },
  {
    id: "apan",
    name: "Apan",
    lga: "Ilorin East",
    coordinates: { lat: 8.5102, lng: 4.6415 }
  },
  {
    id: "marafa",
    name: "Marafa / Maraba",
    lga: "Ilorin East",
    coordinates: { lat: 8.5158, lng: 4.6293 }
  },
  {
    id: "ile_apa",
    name: "Ile-Apa",
    lga: "Ilorin East",
    coordinates: { lat: 8.5354, lng: 4.6522 }
  },
  {
    id: "odo_okun",
    name: "Odo-Okun",
    lga: "Ilorin East",
    coordinates: { lat: 8.5079, lng: 4.6187 }
  },
  {
    id: "oke_ese",
    name: "Oke-Ese",
    lga: "Ilorin East",
    coordinates: { lat: 8.5421, lng: 4.6674 }
  },
  {
    id: "agbogunmati",
    name: "Agbogunmati",
    lga: "Ilorin East",
    coordinates: { lat: 8.4986, lng: 4.6339 }
  },

  // Ilorin South LGA - Headquarters: Fufu
  {
    id: "tanke",
    name: "Tanke",
    lga: "Ilorin South",
    coordinates: { lat: 8.4706, lng: 4.5969 }
  },
  {
    id: "tanke_oke_odo",
    name: "Tanke Oke-Odo",
    lga: "Ilorin South",
    coordinates: { lat: 8.4682, lng: 4.6027 }
  },
  {
    id: "fate",
    name: "Fate",
    lga: "Ilorin South",
    coordinates: { lat: 8.4594, lng: 4.5838 }
  },
  {
    id: "fate_tipper_garage",
    name: "Fate Tipper Garage",
    lga: "Ilorin South",
    coordinates: { lat: 8.4551, lng: 4.5796 }
  },
  {
    id: "pipe_line",
    name: "Pipeline",
    lga: "Ilorin South",
    coordinates: { lat: 8.4661, lng: 4.5908 }
  },
  {
    id: "zango",
    name: "Zango",
    lga: "Ilorin South",
    coordinates: { lat: 8.4749, lng: 4.5863 }
  },
  {
    id: "harmony_estate",
    name: "Harmony Estate",
    lga: "Ilorin South",
    coordinates: { lat: 8.4628, lng: 4.6074 }
  },
  {
    id: "kulende",
    name: "Kulende",
    lga: "Ilorin South",
    coordinates: { lat: 8.4517, lng: 4.5989 }
  },
  {
    id: "gerin_alimi_axis",
    name: "Gerin Alimi Axis",
    lga: "Ilorin South",
    coordinates: { lat: 8.4469, lng: 4.5735 }
  },
  {
    id: "oke_odo",
    name: "Oke-Odo",
    lga: "Ilorin South",
    coordinates: { lat: 8.4718, lng: 4.6061 }
  },
  {
    id: "akanbi_1",
    name: "Akanbi I",
    lga: "Ilorin South",
    coordinates: { lat: 8.4635, lng: 4.5728 }
  },
  {
    id: "akanbi_2",
    name: "Akanbi II",
    lga: "Ilorin South",
    coordinates: { lat: 8.4562, lng: 4.5694 }
  },
  {
    id: "balogun_fulani",
    name: "Balogun Fulani",
    lga: "Ilorin South",
    coordinates: { lat: 8.4483, lng: 4.5881 }
  },
  // Ilorin West LGA - Headquarters: Wara Osin Area / Oja-Oba region

  {
    id: 'ilorin-west-general',
    name: 'Ilorin West (General)',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4950, lng: 4.5480 }
  },

  // Major Roads & Districts
  { id: 'taiwo', name: 'Taiwo Road', lga: 'Ilorin West', coordinates: { lat: 8.4938, lng: 4.5559 } },
  { id: 'unity', name: 'Unity Road', lga: 'Ilorin West', coordinates: { lat: 8.4972, lng: 4.5521 } },
  { id: 'post-office', name: 'Post Office Area', lga: 'Ilorin West', coordinates: { lat: 8.4961, lng: 4.5510 } },
  { id: 'oja-tuntun', name: 'Oja Tuntun', lga: 'Ilorin West', coordinates: { lat: 8.4926, lng: 4.5584 } },
  { id: 'oja-oba', name: 'Oja Oba', lga: 'Ilorin West', coordinates: { lat: 8.4943, lng: 4.5547 } },
  { id: 'aiyetoro/asadam', name: 'aiyetoro', lga: 'Ilorin West', coordinates: { lat: 8.4632, lng: 4.4956 } },

  // Residential / Traditional Areas
  { id: 'pakata', name: 'Pakata', lga: 'Ilorin West', coordinates: { lat: 8.4894, lng: 4.5462 } },
  { id: 'isale-koko', name: 'Isale Koko', lga: 'Ilorin West', coordinates: { lat: 8.4881, lng: 4.5528 } },
  { id: 'isale-aluko', name: 'Isale Aluko', lga: 'Ilorin West', coordinates: { lat: 8.4873, lng: 4.5481 } },
  { id: 'idi-ape', name: 'Idi Ape', lga: 'Ilorin West', coordinates: { lat: 8.4902, lng: 4.5602 } },
  { id: 'kuntu', name: 'Kuntu', lga: 'Ilorin West', coordinates: { lat: 8.4914, lng: 4.5426 } },

  // Well-known Ilorin West Neighborhoods
  { id: 'adewole', name: 'Adewole', lga: 'Ilorin West', coordinates: { lat: 8.5015, lng: 4.5488 } },
  { id: 'baboko', name: 'Baboko', lga: 'Ilorin West', coordinates: { lat: 8.4989, lng: 4.5431 } },
  { id: 'ajikobi', name: 'Ajikobi', lga: 'Ilorin West', coordinates: { lat: 8.4964, lng: 4.5368 } },
  { id: 'badari', name: 'Badari', lga: 'Ilorin West', coordinates: { lat: 8.4932, lng: 4.5324 } },
  { id: 'alanamu', name: 'Alanamu', lga: 'Ilorin West', coordinates: { lat: 8.4921, lng: 4.5355 } },
  { id: 'gambari', name: 'Gambari', lga: 'Ilorin West', coordinates: { lat: 8.4897, lng: 4.5296 } },

  // Estates / High-value Areas
  { id: 'gra', name: 'GRA (Government Reserved Area)', lga: 'Ilorin West', coordinates: { lat: 8.5042, lng: 4.5461 } },
  { id: 'oke-ogba', name: 'Oke-Ogba / NEPA Area', lga: 'Ilorin West', coordinates: { lat: 8.5034, lng: 4.5452 } },

  // Irepodun LGA - Headquarters: Omu-Aran
  {
    id: 'omu-aran',
    name: 'Omu-Aran',
    lga: 'Irepodun',
    coordinates: { lat: 8.1386, lng: 5.1016 }
  },

  // Isin LGA - Headquarters: Owu-Isin
  {
    id: 'owu-isin',
    name: 'Owu-Isin',
    lga: 'Isin',
    coordinates: { lat: 8.1181, lng: 5.2142 }
  },
  {
    id: 'isin',
    name: 'Isin',
    lga: 'Isin',
    coordinates: { lat: 8.1035, lng: 5.2020 }
  },

  // Kaiama LGA - Headquarters: Kaiama
  {
    id: 'kaiama',
    name: 'Kaiama',
    lga: 'Kaiama',
    coordinates: { lat: 9.6158, lng: 4.9147 }
  },
  {
    id: 'adena',
    name: 'Adena',
    lga: 'Kaiama',
    coordinates: { lat: 9.6002, lng: 4.9005 }
  },

  // Moro LGA - Headquarters: Bode-Saadu
  {
    id: 'bode-saadu',
    name: 'Bode-Saadu',
    lga: 'Moro',
    coordinates: { lat: 8.9495, lng: 4.6828 }
  },
  {
    id: 'jebba',
    name: 'Jebba',
    lga: 'Moro',
    coordinates: { lat: 9.4338, lng: 4.8341 }
  },

  // Offa LGA - Headquarters: Offa
  {
    id: 'offa',
    name: 'Offa',
    lga: 'Offa',
    coordinates: { lat: 8.1510, lng: 4.7155 }
  },
  {
    id: 'offa-ikun',
    name: 'Offa-Ikun',
    lga: 'Offa',
    coordinates: { lat: 8.1505, lng: 4.7180 }
  },
  {
    id: 'offa-garage',
    name: 'Offa Garage Area',
    lga: 'Offa',
    coordinates: { lat: 8.1402, lng: 4.7008 }
  },

  // Oke-Ero LGA - Headquarters: Iloffa
  {
    id: 'iloffa',
    name: 'Iloffa',
    lga: 'Oke-Ero',
    coordinates: { lat: 8.7831, lng: 5.3489 }
  },
  {
    id: 'erin-ile',
    name: 'Erin-Ile',
    lga: 'Oke-Ero',
    coordinates: { lat: 8.7504, lng: 4.9162 }
  },

  // Oyun LGA - Headquarters: Ilemona
  {
    id: 'ilemona',
    name: 'Ilemona',
    lga: 'Oyun',
    coordinates: { lat: 8.6670, lng: 4.9165 }
  },
  {
    id: 'ijagbo',
    name: 'Ijagbo',
    lga: 'Oyun',
    coordinates: { lat: 8.6834, lng: 4.8832 }
  },

  // Pategi LGA - Headquarters: Pategi
  {
    id: 'pategi',
    name: 'Pategi',
    lga: 'Pategi',
    coordinates: { lat: 8.7332, lng: 5.7829 }
  },
  {
    id: 'nupeko',
    name: 'Nupeko',
    lga: 'Pategi',
    coordinates: { lat: 8.7005, lng: 5.7498 }
  }
];

export const ILORIN_AREAS: IlorinArea[] = RAW_ILORIN_AREAS.map((area) => ({
  ...area,
  deliveryFee: AREA_EXTRA_FEES[area.id] ?? LGA_DEFAULT_EXTRA_FEES[area.lga] ?? area.deliveryFee
}));

// Get areas by LGA
export const getAreasByLGA = (lga: string) => {
  return ILORIN_AREAS.filter(area => area.lga === lga);
};

// Get all LGAs
export const getAllLGAs = () => {
  const lgas = [...new Set(ILORIN_AREAS.map(area => area.lga))];
  return lgas;
};

// Get area by ID
export const getAreaById = (id: string) => {
  return ILORIN_AREAS.find(area => area.id === id);
};

// Cache for kitchen location to avoid repeated geocoding calls
let cachedKitchenLocation: any = null;

// Get kitchen location (Ganmo, Ifelodun LGA) - uses geocoding for precision
export const getKitchenLocation = async () => {
  // Return cached location if available
  if (cachedKitchenLocation) {
    console.log('Using cached kitchen location:', cachedKitchenLocation);
    return cachedKitchenLocation;
  }

  try {
    // Import geocoding service dynamically to avoid circular dependencies
    const { geocodeAddress } = await import('./geocoding');

    // Try to get precise coordinates for Ganmo, Ifelodun
    const geocodedLocation = await geocodeAddress('Ganmo, Ifelodun LGA, Kwara State');

    if (geocodedLocation) {
      console.log('Using geocoded kitchen location:', geocodedLocation);
      cachedKitchenLocation = {
        id: 'ganmo',
        name: 'Ganmo',
        lga: 'Ifelodun',
        coordinates: {
          lat: geocodedLocation.lat,
          lng: geocodedLocation.lng
        }
      };
      return cachedKitchenLocation;
    }
  } catch (error) {
    console.warn('Geocoding failed for kitchen location, using fallback:', error);
  }

  // Final fallback - use manually verified coordinates for Ganmo
  console.log('Using manually verified coordinates for Ganmo');
  cachedKitchenLocation = {
    id: 'ganmo',
    name: 'Ganmo',
    lga: 'Ifelodun',
    coordinates: { lat: 8.3987, lng: 4.8512 } // Manually verified coordinates
  };
  return cachedKitchenLocation;
};
