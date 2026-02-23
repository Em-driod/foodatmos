export interface IlorinLocation {
  name: string;
  lat: number;
  lng: number;
  keywords: string[];
  landmarks: string[];
}

// Custom Ilorin location database with precise coordinates
export const ILORIN_LOCATIONS: IlorinLocation[] = [
  // Central Ilorin Areas
  {
    name: 'Ilorin City Center',
    lat: 8.4966,
    lng: 4.5421,
    keywords: ['ilorin', 'city center', 'downtown', 'central market', 'emirs palace'],
    landmarks: ['Kwara State Emir\'s Palace', 'Central Market', 'Ilorin Central Mosque', 'Metropolitan Square']
  },
  {
    name: 'Oke Ogba / Afon Road',
    lat: 8.4966,
    lng: 4.5421,
    keywords: ['oke ogba', 'afon road', 'nepa office', 'nepa', 'afon', 'oke-ogba'],
    landmarks: ['NEPA Office', 'Afon Road Junction', 'Oke Ogba Market', 'Power Station']
  },
  
  // Government & Commercial Areas
  {
    name: 'GRA / Government Reserved Area',
    lat: 8.4967,
    lng: 4.5425,
    keywords: ['gra', 'government reserved area', 'secretariat', 'kwara hotel', 'government house'],
    landmarks: ['Kwara Hotel', 'Government House', 'State Secretariat', 'Civil Service Commission']
  },
  {
    name: 'Murtala / Post Office',
    lat: 8.5069,
    lng: 4.5312,
    keywords: ['murtala', 'post office', 'general hospital', 'federal medical center'],
    landmarks: ['General Hospital', 'Post Office', 'Federal Medical Center', 'Murtala Bridge']
  },
  
  // Educational Areas
  {
    name: 'Tanke / Oke-Odo',
    lat: 8.4886,
    lng: 4.5419,
    keywords: ['tanke', 'oke odo', 'oke-odo', 'university', 'unilorin', 'student area'],
    landmarks: ['University of Ilorin', 'Kwara State Polytechnic', 'Tanke Market', 'UNILORIN Gate', 'Student Union']
  },
  
  // Residential Areas
  {
    name: 'Adewole / Adewole Estate',
    lat: 8.4934,
    lng: 4.5534,
    keywords: ['adewole', 'adewole estate', 'st barnabas', 'geri alimi', 'post office'],
    landmarks: ['St. Barnabas School', 'Geri Alimi Roundabout', 'Adewole Market', 'Nigeria Postal Service']
  },
  {
    name: 'Taiwo / Okelele',
    lat: 8.5167,
    lng: 4.5178,
    keywords: ['taiwo', 'okelele', 'taiwo road', 'okelele area'],
    landmarks: ['Taiwo Road', 'Okelele Market', 'Taiwo Shopping Complex']
  },
  {
    name: 'Unity Road / Challenge',
    lat: 8.5084,
    lng: 4.5247,
    keywords: ['unity road', 'challenge', 'challenge bus stop', 'challenge area'],
    landmarks: ['Challenge Bus Stop', 'Unity Road Junction', 'Challenge Shopping Complex']
  },
  
  // Eastern Areas
  {
    name: 'Agric / Fate',
    lat: 8.4734,
    lng: 4.5623,
    keywords: ['agric', 'fate', 'agriculture', 'ministry of agriculture', 'yebumot'],
    landmarks: ['Ministry of Agriculture', 'Fate Basin', 'Yebumot Hotel', 'Agric Market']
  },
  
  // Western Areas
  {
    name: 'Ganmo / Omosebi',
    lat: 8.3987,
    lng: 4.8512,
    keywords: ['ganmo', 'omosebi', 'ganmo garage', 'old oyo road', 'sawmill'],
    landmarks: ['Ganmo Garage', 'Omosebi Market', 'Old Oyo Road Junction', 'Sawmill Area']
  },
  {
    name: 'Airport Area',
    lat: 8.4423,
    lng: 4.5945,
    keywords: ['airport', 'ilorin airport', 'aviation college', 'federal airport'],
    landmarks: ['Ilorin International Airport', 'Aviation College', 'Airport Terminal', 'Federal Airports Authority']
  },
  
  // Southern Areas
  {
    name: 'Asadam',
    lat: 8.4845,
    lng: 4.5321,
    keywords: ['asadam', 'sango', 'budo', 'oja', 'oba'],
    landmarks: ['Asadam Market', 'Sango Junction', 'Budo Area', 'Oja Oba']
  },
  {
    name: 'Sango',
    lat: 8.4700,
    lng: 4.5200,
    keywords: ['sango', 'sango junction', 'sango area'],
    landmarks: ['Sango Market', 'Sango Junction', 'Sango Filling Station']
  },
  {
    name: 'Budo',
    lat: 8.4600,
    lng: 4.5100,
    keywords: ['budo', 'budo area'],
    landmarks: ['Budo Community', 'Budo Market']
  },
  {
    name: 'Oja',
    lat: 8.4500,
    lng: 4.5000,
    keywords: ['oja', 'oja market', 'oja area'],
    landmarks: ['Oja Market', 'Oja Community Center']
  },
  {
    name: 'Oba',
    lat: 8.4400,
    lng: 4.4900,
    keywords: ['oba', 'oba area', 'oba market'],
    landmarks: ['Oba Market', 'Oba Community']
  },
  
  // Northern Areas
  {
    name: 'Surulere',
    lat: 8.5200,
    lng: 4.5600,
    keywords: ['surulere', 'surulere area'],
    landmarks: ['Surulere Community', 'Surulere Market']
  },
  {
    name: 'Ipata',
    lat: 8.5300,
    lng: 4.5700,
    keywords: ['ipata', 'ipata area'],
    landmarks: ['Ipata Community', 'Ipata Market']
  },
  {
    name: 'Ogun',
    lat: 8.5400,
    lng: 4.5800,
    keywords: ['ogun', 'ogun area'],
    landmarks: ['Ogun Community', 'Ogun Market']
  },
  {
    name: 'Oyun',
    lat: 8.5500,
    lng: 4.5900,
    keywords: ['oyun', 'oyun area'],
    landmarks: ['Oyun Community', 'Oyun River']
  },
  {
    name: 'Share',
    lat: 8.5600,
    lng: 4.6000,
    keywords: ['share', 'share area'],
    landmarks: ['Share Community', 'Share Market']
  },
  {
    name: 'Pata',
    lat: 8.5700,
    lng: 4.6100,
    keywords: ['pata', 'pata area'],
    landmarks: ['Pata Community', 'Pata Market']
  }
];

export const findIlorinLocation = (address: string): IlorinLocation | null => {
  const lowerAddress = address.toLowerCase();
  
  // Score each location based on keyword matches
  let bestMatch: IlorinLocation | null = null;
  let bestScore = 0;
  
  for (const location of ILORIN_LOCATIONS) {
    let score = 0;
    
    // Check for exact name match
    if (lowerAddress.includes(location.name.toLowerCase())) {
      score += 10;
    }
    
    // Check for keyword matches
    for (const keyword of location.keywords) {
      if (lowerAddress.includes(keyword)) {
        score += 3;
      }
    }
    
    // Check for partial matches
    if (lowerAddress.includes(location.name.toLowerCase().split(' / ')[0])) {
      score += 5;
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = location;
    }
  }
  
  return bestMatch;
};

export const getAllLocationSuggestions = (): string[] => {
  return ILORIN_LOCATIONS.map(loc => loc.name);
};

export const getLocationByKeywords = (keywords: string[]): IlorinLocation | null => {
  const lowerKeywords = keywords.map(k => k.toLowerCase());
  
  for (const location of ILORIN_LOCATIONS) {
    const hasMatch = location.keywords.some(keyword => 
      lowerKeywords.some(userKeyword => userKeyword.includes(keyword))
    );
    
    if (hasMatch) {
      return location;
    }
  }
  
  return null;
};
