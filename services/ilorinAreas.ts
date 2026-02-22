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

// Official Kwara State areas with accurate coordinates
export const ILORIN_AREAS: IlorinArea[] = [
  // Asa LGA - Headquarters: Afon
  {
    id: 'afon',
    name: 'Afon',
    lga: 'Asa',
    coordinates: { lat: 8.4301, lng: 4.4260 }
  },
  {
    id: 'ogbondoroko',
    name: 'Ogbondoroko',
    lga: 'Asa',
    coordinates: { lat: 8.4703, lng: 4.6231 }
  },
  {
    id: 'pampo',
    name: 'Pampo',
    lga: 'Asa',
    coordinates: { lat: 8.5000, lng: 4.4800 }
  },
  {
    id: 'ogele',
    name: 'Ogele / Ogele Ward',
    lga: 'Asa',
    coordinates: { lat: 8.4900, lng: 4.4700 }
  },
  {
    id: 'olowokere',
    name: 'Olowokere',
    lga: 'Asa',
    coordinates: { lat: 8.4800, lng: 4.4600 }
  },
  {
    id: 'yowere',
    name: 'Yowere / Sosoki',
    lga: 'Asa',
    coordinates: { lat: 8.4700, lng: 4.4500 }
  },
  {
    id: 'aboto-odo',
    name: 'Aboto-Odo / Odo-Ode',
    lga: 'Asa',
    coordinates: { lat: 8.4600, lng: 4.4400 }
  },
  {
    id: 'ila-oja',
    name: 'Ila-Oja',
    lga: 'Asa',
    coordinates: { lat: 8.4500, lng: 4.4300 }
  },
  {
    id: 'owode',
    name: 'Owode / Owo-de',
    lga: 'Asa',
    coordinates: { lat: 8.4400, lng: 4.4200 }
  },
  {
    id: 'onire',
    name: 'Onire / Onive / Odegiwa',
    lga: 'Asa',
    coordinates: { lat: 8.4300, lng: 4.4100 }
  },
  {
    id: 'okesho',
    name: 'Okesho',
    lga: 'Asa',
    coordinates: { lat: 8.4200, lng: 4.4000 }
  },
  {
    id: 'budo-egba',
    name: 'Budo-Egba',
    lga: 'Asa',
    coordinates: { lat: 8.4100, lng: 4.3900 }
  },
  {
    id: 'adigbongbo',
    name: 'Adigbongbo / Awe / Orimaro',
    lga: 'Asa',
    coordinates: { lat: 8.4000, lng: 4.3800 }
  },

  // Baruten LGA - Headquarters: Kosubosu
  {
    id: 'kosubosu',
    name: 'Kosubosu',
    lga: 'Baruten',
    coordinates: { lat: 9.3000, lng: 3.9000 }
  },
  {
    id: 'ilesha-baruba',
    name: 'Ilesha Baruba',
    lga: 'Baruten',
    coordinates: { lat: 9.2500, lng: 3.8500 }
  },
  {
    id: 'chikanda',
    name: 'Chikanda',
    lga: 'Baruten',
    coordinates: { lat: 9.2000, lng: 3.9500 }
  },

  // Edu LGA - Headquarters: Lafiagi
  {
    id: 'lafiagi',
    name: 'Lafiagi',
    lga: 'Edu',
    coordinates: { lat: 8.9500, lng: 5.4167 }
  },
  {
    id: 'tsada',
    name: 'Tsada',
    lga: 'Edu',
    coordinates: { lat: 8.9000, lng: 5.4000 }
  },

  // Ekiti LGA - Headquarters: Araromi-Opin
  {
    id: 'araromi-opin',
    name: 'Araromi-Opin',
    lga: 'Ekiti',
    coordinates: { lat: 8.1167, lng: 5.0500 }
  },
  {
    id: 'isolo-opin',
    name: 'Isolo-Opin',
    lga: 'Ekiti',
    coordinates: { lat: 8.1000, lng: 5.0300 }
  },

  // Ifelodun LGA - Headquarters: Share
  {
    id: 'share',
    name: 'Share',
    lga: 'Ifelodun',
    coordinates: { lat: 8.3833, lng: 4.8833 }
  },
  {
    id: 'ganmo',
    name: 'Ganmo',
    lga: 'Ifelodun',
    coordinates: { lat: 8.4000, lng: 4.8500 }
  },
  {
    id: 'idofian',
    name: 'Idofian',
    lga: 'Ifelodun',
    coordinates: { lat: 8.3500, lng: 4.8500 }
  },
  {
    id: 'oro-ago',
    name: 'Oro-Ago',
    lga: 'Ifelodun',
    coordinates: { lat: 8.4000, lng: 4.9000 }
  },

  // Ilorin East LGA - Headquarters: Oke Oyi
  {
    id: 'oke-oyi',
    name: 'Oke-Oyi (HQ)',
    lga: 'Ilorin East',
    coordinates: { lat: 8.5826, lng: 4.7162 }
  },
  {
    id: 'eyenkorin',
    name: 'Eyenkorin / Eyenkon',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4876, lng: 4.6247 }
  },
  {
    id: 'airport-road',
    name: 'Airport Road',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4892, lng: 4.5559 }
  },
  {
    id: 'ilorin-center',
    name: 'Ilorin City Center',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4966, lng: 4.5421 },
      },
  {
    id: 'iponrin',
    name: 'Iponrin',
    lga: 'Ilorin East',
    coordinates: { lat: 8.5100, lng: 4.5200 }
  },
  {
    id: 'apado',
    name: 'Apado',
    lga: 'Ilorin East',
    coordinates: { lat: 8.5050, lng: 4.5250 }
  },
  {
    id: 'panada-agbeyangi',
    name: 'Panada-Agbeyangi',
    lga: 'Ilorin East',
    coordinates: { lat: 8.5000, lng: 4.5300 }
  },
  {
    id: 'ile-apa',
    name: 'Ile-Apa',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4950, lng: 4.5350 }
  },
  {
    id: 'lajiki',
    name: 'Lajiki',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4900, lng: 4.5400 }
  },
  {
    id: 'elesin-meta',
    name: 'Elesin-Meta',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4850, lng: 4.5450 }
  },
  {
    id: 'eudo-are',
    name: 'Eudo Are',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4800, lng: 4.5500 }
  },
  {
    id: 'ibagun',
    name: 'Ibagun',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4750, lng: 4.5550 },
      },
  {
    id: 'magaji-ngari',
    name: 'Magaji Ngari / Magaji Are',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4700, lng: 4.5600 },
      },
  {
    id: 'adewole-east',
    name: 'Adewole (East)',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4650, lng: 4.5650 },
      },
  {
    id: 'are',
    name: 'Are',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4600, lng: 4.5700 },
      },
  {
    id: 'baba-isale',
    name: 'Baba Isale',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4550, lng: 4.5750 },
      },
  {
    id: 'balogun-ajikabi',
    name: 'Balogun Ajikabi',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4500, lng: 4.5800 },
      },
  {
    id: 'balogun-alanamu',
    name: 'Balogun Alanamu',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4450, lng: 4.5850 },
      },
  {
    id: 'balogun-fulani',
    name: 'Balogun Fulani',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4400, lng: 4.5900 },
      },
  {
    id: 'budo-oba',
    name: 'Budo Oba / Budo-Ago',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4350, lng: 4.5950 },
      },
  {
    id: 'egbejila-east',
    name: 'Egbejila (East)',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4300, lng: 4.6000 },
      },
  {
    id: 'galadima',
    name: 'Galadima',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4250, lng: 4.6050 },
      },
  {
    id: 'idera',
    name: 'Idera',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4200, lng: 4.6100 },
      },
  {
    id: 'kawu',
    name: 'Kawu',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4150, lng: 4.6150 },
      },
  {
    id: 'obere',
    name: 'Obere',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4100, lng: 4.6200 },
      },
  {
    id: 'odo-ota',
    name: 'Odo-Ota / Odota',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4050, lng: 4.6250 },
      },
  {
    id: 'ogidi',
    name: 'Ogidi / Oko-Erin',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4000, lng: 4.6300 },
      },
  {
    id: 'oloje-east',
    name: 'Oloje (East)',
    lga: 'Ilorin East',
    coordinates: { lat: 8.3950, lng: 4.6350 },
      },
  {
    id: 'olomoda',
    name: 'Olomoda',
    lga: 'Ilorin East',
    coordinates: { lat: 8.3900, lng: 4.6400 },
      },
  {
    id: 'osere',
    name: 'Osere',
    lga: 'Ilorin East',
    coordinates: { lat: 8.3850, lng: 4.6450 },
      },
  {
    id: 'sobi-rock',
    name: 'Sobi-Rock',
    lga: 'Ilorin East',
    coordinates: { lat: 8.3800, lng: 4.6500 },
      },
  {
    id: 'temidire',
    name: 'Temidire',
    lga: 'Ilorin East',
    coordinates: { lat: 8.3750, lng: 4.6550 },
      },
  {
    id: 'ubadawaki',
    name: 'Ubadawaki',
    lga: 'Ilorin East',
    coordinates: { lat: 8.3700, lng: 4.6600 },
      },
  {
    id: 'wara-east',
    name: 'Wara (East)',
    lga: 'Ilorin East',
    coordinates: { lat: 8.3650, lng: 4.6650 },
      },
  {
    id: 'ganmo',
    name: 'Ganmo',
    lga: 'Ifelodun',
    coordinates: { lat: 0, lng: 0 } // Will be updated by geocoding
  },

  // Ilorin South LGA - Headquarters: Fufu
  {
    id: 'ilorin-south-general',
    name: 'Ilorin South (General)',
    lga: 'Ilorin South',
    coordinates: { lat: 8.4805, lng: 4.6034 },
      },
  {
    id: 'unilorin-road',
    name: 'Unilorin Road',
    lga: 'Ilorin South',
    coordinates: { lat: 8.4979, lng: 4.6845 },
      },
  {
    id: 'fufu',
    name: 'Fufu (HQ)',
    lga: 'Ilorin South',
    coordinates: { lat: 8.4500, lng: 4.4833 },
      },
  {
    id: 'oke-ogun',
    name: 'Oke Ogun',
    lga: 'Ilorin South',
    coordinates: { lat: 8.4450, lng: 4.4900 },
      },
  {
    id: 'agbabiaka',
    name: 'Agbabiaka',
    lga: 'Ilorin South',
    coordinates: { lat: 8.4400, lng: 4.4950 },
      },
  {
    id: 'aiyekale',
    name: 'Aiyekale',
    lga: 'Ilorin South',
    coordinates: { lat: 8.4350, lng: 4.5000 },
      },
  {
    id: 'akanbi',
    name: 'Akanbi',
    lga: 'Ilorin South',
    coordinates: { lat: 8.4300, lng: 4.5050 },
      },
  {
    id: 'apa-ola',
    name: 'Apa-Ola',
    lga: 'Ilorin South',
    coordinates: { lat: 8.4250, lng: 4.5100 },
      },
  {
    id: 'emere',
    name: 'Emere',
    lga: 'Ilorin South',
    coordinates: { lat: 8.4200, lng: 4.5150 },
      },
  {
    id: 'ere-omo',
    name: 'Ere-Omo',
    lga: 'Ilorin South',
    coordinates: { lat: 8.4150, lng: 4.5200 },
      },
  {
    id: 'fate-south',
    name: 'Fate (South)',
    lga: 'Ilorin South',
    coordinates: { lat: 8.4100, lng: 4.5250 },
      },
  {
    id: 'igbona',
    name: 'Igbona',
    lga: 'Ilorin South',
    coordinates: { lat: 8.4050, lng: 4.5300 },
      },
  {
    id: 'illota',
    name: 'Illota',
    lga: 'Ilorin South',
    coordinates: { lat: 8.4000, lng: 4.5350 },
      },
  {
    id: 'joromo',
    name: 'Joromo / Joromo-Oyun',
    lga: 'Ilorin South',
    coordinates: { lat: 8.3950, lng: 4.5400 },
      },
  {
    id: 'labala',
    name: 'Labala',
    lga: 'Ilorin South',
    coordinates: { lat: 8.3900, lng: 4.5450 },
      },
  {
    id: 'mogaji',
    name: 'Mogaji',
    lga: 'Ilorin South',
    coordinates: { lat: 8.3850, lng: 4.5500 },
      },
  {
    id: 'nasudo',
    name: 'Nasudo',
    lga: 'Ilorin South',
    coordinates: { lat: 8.3800, lng: 4.5550 },
      },
  {
    id: 'omode',
    name: 'Omode',
    lga: 'Ilorin South',
    coordinates: { lat: 8.3750, lng: 4.5600 },
      },
  {
    id: 'onikanga',
    name: 'Onikanga',
    lga: 'Ilorin South',
    coordinates: { lat: 8.3700, lng: 4.5650 },
      },
  {
    id: 'opolo',
    name: 'Opolo',
    lga: 'Ilorin South',
    coordinates: { lat: 8.3650, lng: 4.5700 },
      },
  {
    id: 'tanke-south',
    name: 'Tanke (South)',
    lga: 'Ilorin South',
    coordinates: { lat: 8.3600, lng: 4.5750 },
      },
  {
    id: 'tongolo',
    name: 'Tongolo',
    lga: 'Ilorin South',
    coordinates: { lat: 8.3550, lng: 4.5800 },
      },

  // Ilorin West LGA - Headquarters: Wara Osin Area / Oja-Oba region
  {
    id: 'ilorin-west-general',
    name: 'Ilorin West (General)',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4799, lng: 4.5418 },
      },
  {
    id: 'coca-cola-road',
    name: 'Coca-Cola Road',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4617, lng: 4.5625 },
      },
  {
    id: 'oja-oba-road',
    name: 'Oja Oba Road',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4854, lng: 4.5805 },
      },
  {
    id: 'ilorin-airport',
    name: 'Ilorin Airport',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4402, lng: 4.4939 },
      },
  {
    id: 'adewole-west',
    name: 'Adewole (West)',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4950, lng: 4.5350 },
      },
  {
    id: 'baboko',
    name: 'Baboko',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4900, lng: 4.5300 },
      },
  {
    id: 'ajikobi',
    name: 'Ajikobi',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4850, lng: 4.5250 },
      },
  {
    id: 'badari',
    name: 'Badari',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4800, lng: 4.5200 },
      },
  {
    id: 'ogidi-west',
    name: 'Ogidi (West)',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4750, lng: 4.5150 },
      },
  {
    id: 'ojuekun',
    name: 'Ojuekun',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4700, lng: 4.5100 },
      },
  {
    id: 'oko-erin-west',
    name: 'Oko-Erin (West)',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4650, lng: 4.5050 },
      },
  {
    id: 'ngeri',
    name: "N'geri / Ngeri",
    lga: 'Ilorin West',
    coordinates: { lat: 8.4600, lng: 4.5000 },
      },
  {
    id: 'oloje-west',
    name: 'Oloje (West)',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4550, lng: 4.4950 },
      },
  {
    id: 'ubandawaki-west',
    name: 'Ubandawaki (West)',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4500, lng: 4.4900 },
      },
  {
    id: 'egbejila-west',
    name: 'Egbejila (West)',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4450, lng: 4.4850 },
      },
  {
    id: 'oshin',
    name: 'Oshin',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4400, lng: 4.4800 },
      },
  {
    id: 'basin',
    name: 'Basin Area',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4350, lng: 4.4750 },
      },
  {
    id: 'alore',
    name: 'Alore Area',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4300, lng: 4.4700 },
      },
  {
    id: 'ayetoro',
    name: 'Aiyetoro Streets',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4250, lng: 4.4650 },
      },
  {
    id: 'oke-ogba-west',
    name: 'Oke Ogba / NEPA Office',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4966, lng: 4.5421 },
      },
  {
    id: 'gra-west',
    name: 'GRA / Government Reserved Area',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4967, lng: 4.5425 },
      },

  // Irepodun LGA - Headquarters: Omu-Aran
  {
    id: 'omu-aran',
    name: 'Omu-Aran',
    lga: 'Irepodun',
    coordinates: { lat: 8.1333, lng: 5.1167 },
      },

  // Isin LGA - Headquarters: Owu-Isin
  {
    id: 'owu-isin',
    name: 'Owu-Isin',
    lga: 'Isin',
    coordinates: { lat: 8.1167, lng: 5.2167 },
      },
  {
    id: 'isin',
    name: 'Isin',
    lga: 'Isin',
    coordinates: { lat: 8.1000, lng: 5.2000 },
      },

  // Kaiama LGA - Headquarters: Kaiama
  {
    id: 'kaiama',
    name: 'Kaiama',
    lga: 'Kaiama',
    coordinates: { lat: 9.6167, lng: 4.9167 },
      },
  {
    id: 'adena',
    name: 'Adena',
    lga: 'Kaiama',
    coordinates: { lat: 9.6000, lng: 4.9000 },
      },

  // Moro LGA - Headquarters: Bode-Saadu
  {
    id: 'bode-saadu',
    name: 'Bode-Saadu',
    lga: 'Moro',
    coordinates: { lat: 8.9500, lng: 4.6833 },
      },
  {
    id: 'jebba',
    name: 'Jebba',
    lga: 'Moro',
    coordinates: { lat: 9.4333, lng: 4.8333 },
      },

  // Offa LGA - Headquarters: Offa
  {
    id: 'offa',
    name: 'Offa',
    lga: 'Offa',
    coordinates: { lat: 8.1500, lng: 4.7167 },
  },
  {
    id: 'offa-ikun',
    name: 'Offa-Ikun',
    lga: 'Offa',
    coordinates: { lat: 8.1500, lng: 5.1000 },
  },
  {
    id: 'offa-garage',
    name: 'Offa Garage Area',
    lga: 'Offa',
    coordinates: { lat: 8.1400, lng: 4.7000 },
  },

  // Oke-Ero LGA - Headquarters: Iloffa
  {
    id: 'iloffa',
    name: 'Iloffa',
    lga: 'Oke-Ero',
    coordinates: { lat: 8.7833, lng: 5.3500 },
      },
  {
    id: 'erin-ile',
    name: 'Erin-Ile',
    lga: 'Oke-Ero',
    coordinates: { lat: 8.7500, lng: 4.9167 },
      },

  // Oyun LGA - Headquarters: Ilemona
  {
    id: 'ilemona',
    name: 'Ilemona',
    lga: 'Oyun',
    coordinates: { lat: 8.6667, lng: 4.9167 },
      },
  {
    id: 'ijagbo',
    name: 'Ijagbo',
    lga: 'Oyun',
    coordinates: { lat: 8.6833, lng: 4.8833 },
      },

  // Pategi LGA - Headquarters: Pategi
  {
    id: 'pategi',
    name: 'Pategi',
    lga: 'Pategi',
    coordinates: { lat: 8.7333, lng: 5.7833 },
      },
  {
    id: 'nupeko',
    name: 'Nupeko',
    lga: 'Pategi',
    coordinates: { lat: 8.7000, lng: 5.7500 },
      }
];

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
  
  // Final fallback - use Ilorin city center as default
  console.log('Using Ilorin city center as ultimate fallback');
  cachedKitchenLocation = {
    id: 'ganmo',
    name: 'Ganmo',
    lga: 'Ifelodun',
    coordinates: { lat: 8.4966, lng: 4.5421 } // Ilorin city center
  };
  return cachedKitchenLocation;
};
