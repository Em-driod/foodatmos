export interface IlorinLocation {
  name: string;
  lat: number;
  lng: number;
  keywords: string[];
  landmarks: string[];
}

// Custom Ilorin location database with precise coordinates
export const ILORIN_LOCATIONS: IlorinLocation[] = [
  {
    name: 'Tanke / Oke-Odo',
    lat: 8.4886,
    lng: 4.5419,
    keywords: ['tanke', 'oke odo', 'oke-odo', 'university', 'unilorin', 'student area'],
    landmarks: ['University of Ilorin', 'Kwara State Polytechnic', 'Tanke Market', 'UNILORIN Gate', 'Student Union']
  },
  {
    name: 'GRA / Government Reserved Area',
    lat: 8.4967,
    lng: 4.5425,
    keywords: ['gra', 'government reserved area', 'secretariat', 'kwara hotel', 'government house'],
    landmarks: ['Kwara Hotel', 'Government House', 'State Secretariat', 'Civil Service Commission']
  },
  {
    name: 'Adewole / Adewole Estate',
    lat: 8.4934,
    lng: 4.5534,
    keywords: ['adewole', 'adewole estate', 'st barnabas', 'geri alimi', 'post office'],
    landmarks: ['St. Barnabas School', 'Geri Alimi Roundabout', 'Adewole Market', 'Nigeria Postal Service']
  },
  {
    name: 'Agric / Fate',
    lat: 8.4734,
    lng: 4.5623,
    keywords: ['agric', 'fate', 'agriculture', 'ministry of agriculture', 'yebumot'],
    landmarks: ['Ministry of Agriculture', 'Fate Basin', 'Yebumot Hotel', 'Agric Market']
  },
  {
    name: 'Ganmo / Omosebi',
    lat: 8.4467,
    lng: 4.5890,
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
  {
    name: 'Ilorin City Center',
    lat: 8.4966,
    lng: 4.5421,
    keywords: ['ilorin', 'city center', 'downtown', 'central market', 'emirs palace'],
    landmarks: ['Kwara State Emir\'s Palace', 'Central Market', 'Ilorin Central Mosque', 'Metropolitan Square']
  },
  {
    name: 'Murtala / Post Office',
    lat: 8.5069,
    lng: 4.5312,
    keywords: ['murtala', 'post office', 'general hospital', 'federal medical center'],
    landmarks: ['General Hospital', 'Post Office', 'Federal Medical Center', 'Murtala Bridge']
  },
  {
    name: 'Unity Road / Challenge',
    lat: 8.5084,
    lng: 4.5247,
    keywords: ['unity road', 'challenge', 'challenge bus stop', 'challenge area'],
    landmarks: ['Challenge Bus Stop', 'Unity Road Junction', 'Challenge Shopping Complex']
  },
  {
    name: 'Taiwo / Okelele',
    lat: 8.5167,
    lng: 4.5178,
    keywords: ['taiwo', 'okelele', 'taiwo road', 'okelele area'],
    landmarks: ['Taiwo Road', 'Okelele Market', 'Taiwo Shopping Complex']
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
