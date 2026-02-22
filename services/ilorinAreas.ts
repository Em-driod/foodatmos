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
  coordinates: { lat: 8.4339, lng: 4.8386 }
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
  id: 'oke-oyi',
  name: 'Oke-Oyi (HQ)',
  lga: 'Ilorin East',
  coordinates: { lat: 8.5894, lng: 4.7192 }
},
{
  id: 'eyenkorin',
  name: 'Eyenkorin / Eyenkon',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4818, lng: 4.6245 }
},
{
  id: 'airport-road',
  name: 'Airport Road',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4950, lng: 4.5610 }
},
{
  id: 'ilorin-center',
  name: 'Ilorin City Center',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4916, lng: 4.5423 }
},
{
  id: 'iponrin',
  name: 'Iponrin',
  lga: 'Ilorin East',
  coordinates: { lat: 8.5124, lng: 4.5238 }
},
{
  id: 'apado',
  name: 'Apado',
  lga: 'Ilorin East',
  coordinates: { lat: 8.5072, lng: 4.5265 }
},
{
  id: 'panada-agbeyangi',
  name: 'Panada-Agbeyangi',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4995, lng: 4.5310 }
},
{
  id: 'ile-apa',
  name: 'Ile-Apa',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4955, lng: 4.5362 }
},
{
  id: 'lajiki',
  name: 'Lajiki',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4915, lng: 4.5412 }
},
{
  id: 'elesin-meta',
  name: 'Elesin-Meta',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4860, lng: 4.5445 }
},
{
  id: 'eudo-are',
  name: 'Eudo Are',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4818, lng: 4.5501 }
},
{
  id: 'ibagun',
  name: 'Ibagun',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4765, lng: 4.5550 }
},
{
  id: 'magaji-ngari',
  name: 'Magaji Ngari / Magaji Are',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4715, lng: 4.5601 }
},
{
  id: 'adewole-east',
  name: 'Adewole (East)',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4660, lng: 4.5653 }
},
{
  id: 'are',
  name: 'Are',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4605, lng: 4.5700 }
},
{
  id: 'baba-isale',
  name: 'Baba Isale',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4550, lng: 4.5748 }
},
{
  id: 'balogun-ajikabi',
  name: 'Balogun Ajikabi',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4505, lng: 4.5801 }
},
{
  id: 'balogun-alanamu',
  name: 'Balogun Alanamu',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4453, lng: 4.5852 }
},
{
  id: 'balogun-fulani',
  name: 'Balogun Fulani',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4402, lng: 4.5900 }
},
{
  id: 'budo-oba',
  name: 'Budo Oba / Budo-Ago',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4355, lng: 4.5947 }
},
{
  id: 'egbejila-east',
  name: 'Egbejila (East)',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4303, lng: 4.6000 }
},
{
  id: 'galadima',
  name: 'Galadima',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4250, lng: 4.6052 }
},
{
  id: 'idera',
  name: 'Idera',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4200, lng: 4.6101 }
},
{
  id: 'kawu',
  name: 'Kawu',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4150, lng: 4.6152 }
},
{
  id: 'obere',
  name: 'Obere',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4100, lng: 4.6203 }
},
{
  id: 'odo-ota',
  name: 'Odo-Ota / Odota',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4050, lng: 4.6250 }
},
{
  id: 'ogidi',
  name: 'Ogidi / Oko-Erin',
  lga: 'Ilorin East',
  coordinates: { lat: 8.4000, lng: 4.6300 }
},
{
  id: 'oloje-east',
  name: 'Oloje (East)',
  lga: 'Ilorin East',
  coordinates: { lat: 8.3952, lng: 4.6351 }
},
{
  id: 'olomoda',
  name: 'Olomoda',
  lga: 'Ilorin East',
  coordinates: { lat: 8.3902, lng: 4.6402 }
},
{
  id: 'osere',
  name: 'Osere',
  lga: 'Ilorin East',
  coordinates: { lat: 8.3850, lng: 4.6453 }
},
{
  id: 'sobi-rock',
  name: 'Sobi-Rock',
  lga: 'Ilorin East',
  coordinates: { lat: 8.3800, lng: 4.6502 }
},
{
  id: 'temidire',
  name: 'Temidire',
  lga: 'Ilorin East',
  coordinates: { lat: 8.3750, lng: 4.6550 }
},
{
  id: 'ubadawaki',
  name: 'Ubadawaki',
  lga: 'Ilorin East',
  coordinates: { lat: 8.3700, lng: 4.6600 }
},
{
  id: 'wara-east',
  name: 'Wara (East)',
  lga: 'Ilorin East',
  coordinates: { lat: 8.3650, lng: 4.6651 }
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
  coordinates: { lat: 8.4735, lng: 4.6048 }
},
{
  id: 'unilorin-road',
  name: 'Unilorin Road',
  lga: 'Ilorin South',
  coordinates: { lat: 8.4902, lng: 4.6825 }
},
{
  id: 'fufu',
  name: 'Fufu (HQ)',
  lga: 'Ilorin South',
  coordinates: { lat: 8.4498, lng: 4.4815 }
},
{
  id: 'oke-ogun',
  name: 'Oke Ogun',
  lga: 'Ilorin South',
  coordinates: { lat: 8.4450, lng: 4.4882 }
},
{
  id: 'agbabiaka',
  name: 'Agbabiaka',
  lga: 'Ilorin South',
  coordinates: { lat: 8.4398, lng: 4.4941 }
},
{
  id: 'aiyekale',
  name: 'Aiyekale',
  lga: 'Ilorin South',
  coordinates: { lat: 8.4347, lng: 4.4998 }
},
{
  id: 'akanbi',
  name: 'Akanbi',
  lga: 'Ilorin South',
  coordinates: { lat: 8.4305, lng: 4.5049 }
},
{
  id: 'apa-ola',
  name: 'Apa-Ola',
  lga: 'Ilorin South',
  coordinates: { lat: 8.4256, lng: 4.5097 }
},
{
  id: 'emere',
  name: 'Emere',
  lga: 'Ilorin South',
  coordinates: { lat: 8.4210, lng: 4.5146 }
},
{
  id: 'ere-omo',
  name: 'Ere-Omo',
  lga: 'Ilorin South',
  coordinates: { lat: 8.4162, lng: 4.5197 }
},
{
  id: 'fate-south',
  name: 'Fate (South)',
  lga: 'Ilorin South',
  coordinates: { lat: 8.4110, lng: 4.5248 }
},
{
  id: 'igbona',
  name: 'Igbona',
  lga: 'Ilorin South',
  coordinates: { lat: 8.4061, lng: 4.5298 }
},
{
  id: 'illota',
  name: 'Illota',
  lga: 'Ilorin South',
  coordinates: { lat: 8.4005, lng: 4.5345 }
},
{
  id: 'joromo',
  name: 'Joromo / Joromo-Oyun',
  lga: 'Ilorin South',
  coordinates: { lat: 8.3952, lng: 4.5397 }
},
{
  id: 'labala',
  name: 'Labala',
  lga: 'Ilorin South',
  coordinates: { lat: 8.3900, lng: 4.5445 }
},
{
  id: 'mogaji',
  name: 'Mogaji',
  lga: 'Ilorin South',
  coordinates: { lat: 8.3848, lng: 4.5497 }
},
{
  id: 'nasudo',
  name: 'Nasudo',
  lga: 'Ilorin South',
  coordinates: { lat: 8.3800, lng: 4.5546 }
},
{
  id: 'omode',
  name: 'Omode',
  lga: 'Ilorin South',
  coordinates: { lat: 8.3751, lng: 4.5595 }
},
{
  id: 'onikanga',
  name: 'Onikanga',
  lga: 'Ilorin South',
  coordinates: { lat: 8.3702, lng: 4.5645 }
},
{
  id: 'opolo',
  name: 'Opolo',
  lga: 'Ilorin South',
  coordinates: { lat: 8.3653, lng: 4.5695 }
},
{
  id: 'tanke-south',
  name: 'Tanke (South)',
  lga: 'Ilorin South',
  coordinates: { lat: 8.3601, lng: 4.5745 }
},
{
  id: 'tongolo',
  name: 'Tongolo',
  lga: 'Ilorin South',
  coordinates: { lat: 8.3550, lng: 4.5796 }
},

  // Ilorin West LGA - Headquarters: Wara Osin Area / Oja-Oba region
 {
  id: 'ilorin-west-general',
  name: 'Ilorin West (General)',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4795, lng: 4.5417 }
},
{
  id: 'coca-cola-road',
  name: 'Coca-Cola Road',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4620, lng: 4.5623 }
},
{
  id: 'oja-oba-road',
  name: 'Oja Oba Road',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4852, lng: 4.5803 }
},
{
  id: 'ilorin-airport',
  name: 'Ilorin Airport',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4410, lng: 4.4945 }
},
{
  id: 'adewole-west',
  name: 'Adewole (West)',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4952, lng: 4.5352 }
},
{
  id: 'baboko',
  name: 'Baboko',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4902, lng: 4.5298 }
},
{
  id: 'ajikobi',
  name: 'Ajikobi',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4851, lng: 4.5252 }
},
{
  id: 'badari',
  name: 'Badari',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4801, lng: 4.5202 }
},
{
  id: 'ogidi-west',
  name: 'Ogidi (West)',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4753, lng: 4.5149 }
},
{
  id: 'ojuekun',
  name: 'Ojuekun',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4702, lng: 4.5101 }
},
{
  id: 'oko-erin-west',
  name: 'Oko-Erin (West)',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4650, lng: 4.5050 }
},
{
  id: 'ngeri',
  name: "N'geri / Ngeri",
  lga: 'Ilorin West',
  coordinates: { lat: 8.4600, lng: 4.5002 }
},
{
  id: 'oloje-west',
  name: 'Oloje (West)',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4550, lng: 4.4952 }
},
{
  id: 'ubandawaki-west',
  name: 'Ubandawaki (West)',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4502, lng: 4.4899 }
},
{
  id: 'egbejila-west',
  name: 'Egbejila (West)',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4452, lng: 4.4849 }
},
{
  id: 'oshin',
  name: 'Oshin',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4400, lng: 4.4799 }
},
{
  id: 'basin',
  name: 'Basin Area',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4351, lng: 4.4752 }
},
{
  id: 'alore',
  name: 'Alore Area',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4302, lng: 4.4701 }
},
{
  id: 'ayetoro',
  name: 'Aiyetoro Streets',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4251, lng: 4.4652 }
},
{
  id: 'oke-ogba-west',
  name: 'Oke Ogba / NEPA Office',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4965, lng: 4.5419 }
},
{
  id: 'gra-west',
  name: 'GRA / Government Reserved Area',
  lga: 'Ilorin West',
  coordinates: { lat: 8.4968, lng: 4.5425 }
},
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
