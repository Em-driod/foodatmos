export interface LocationSuggestion {
  area: string;
  examples: string[];
  format: string;
  landmarks: string[];
}

export interface UserLocation {
  lat: number;
  lng: number;
  area?: string;
}

// Ilorin area-specific address suggestions
export const ILORIN_AREAS: Record<string, LocationSuggestion> = {
  'Tanke': {
    area: 'Tanke / Oke-Odo',
    examples: [
      '123 Ahmadu Bello Way, Tanke, Ilorin',
      'Flat 2, Block A, Tanke Estate, Ilorin',
      'Opposite University Main Gate, Tanke, Ilorin',
      'Along Kwara State Polytechnic Road, Tanke'
    ],
    format: 'House Number, Street Name, Area, Ilorin',
    landmarks: ['University of Ilorin', 'Kwara State Polytechnic', 'Tanke Market', 'UNILORIN Gate']
  },
  'GRA': {
    area: 'GRA / Offa Road',
    examples: [
      '45 Reservation Road, GRA, Ilorin',
      'Plot 24, Government Reserved Area, Ilorin',
      'Beside Kwara Hotel, GRA, Ilorin',
      'Offa Road Junction, GRA, Ilorin'
    ],
    format: 'Plot/House Number, Street Name, GRA, Ilorin',
    landmarks: ['Kwara Hotel', 'Government House', 'Secretariat', 'Offa Road Junction']
  },
  'Adewole': {
    area: 'Adewole / Adewole Estate',
    examples: [
      '12 Adewole Street, Adewole Estate, Ilorin',
      'Block 5, Flat 3, Adewole Estate, Ilorin',
      'Behind St. Barnabas School, Adewole, Ilorin',
      'Along Geri Alimi Road, Adewole, Ilorin'
    ],
    format: 'House/Block Number, Street Name, Adewole, Ilorin',
    landmarks: ['St. Barnabas School', 'Geri Alimi Roundabout', 'Adewole Market', 'Post Office']
  },
  'Agric': {
    area: 'Agric / Fate',
    examples: [
      '78 Agriculture Road, Fate, Ilorin',
      'Plot 15, Agric Estate, Ilorin',
      'Beside Ministry of Agriculture, Fate, Ilorin',
      'Along Yebumot Road, Agric, Ilorin'
    ],
    format: 'House/Plot Number, Street Name, Fate/Agric, Ilorin',
    landmarks: ['Ministry of Agriculture', 'Fate Basin', 'Yebumot Hotel', 'Agric Market']
  },
  'Ganmo': {
    area: 'Ganmo / Omosebi',
    examples: [
      '23 Ganmo Road, Ganmo, Ilorin',
      'Plot 8, Omosebi Layout, Ilorin',
      'Near Ganmo Garage, Ganmo, Ilorin',
      'Along Old Oyo Road, Ganmo, Ilorin'
    ],
    format: 'House Number, Street Name, Ganmo/Omosebi, Ilorin',
    landmarks: ['Ganmo Garage', 'Omosebi Market', 'Old Oyo Road', 'Ganmo Junction']
  },
  'Airport': {
    area: 'Airport Area',
    examples: [
      '56 Airport Road, Ilorin',
      'Beside Ilorin Airport, Ilorin',
      'Along Airport Terminal Road, Ilorin',
      'Near Aviation College, Airport, Ilorin'
    ],
    format: 'House Number, Street Name, Airport Area, Ilorin',
    landmarks: ['Ilorin Airport', 'Aviation College', 'Airport Terminal', 'Federal Airports Authority']
  }
};

export const getAddressSuggestions = (userArea?: string): LocationSuggestion[] => {
  if (!userArea) {
    // Return all areas if no specific area detected
    return Object.values(ILORIN_AREAS);
  }
  
  // Find matching area (case-insensitive partial match)
  const matchedArea = Object.keys(ILORIN_AREAS).find(key => 
    key.toLowerCase().includes(userArea.toLowerCase()) ||
    userArea.toLowerCase().includes(key.toLowerCase())
  );
  
  if (matchedArea) {
    return [ILORIN_AREAS[matchedArea]];
  }
  
  // Return all areas if no match found
  return Object.values(ILORIN_AREAS);
};

export const detectUserArea = (lat: number, lng: number): string | null => {
  // Approximate area detection based on coordinates
  // These are rough boundaries for Ilorin areas
  
  const areas = [
    { name: 'Tanke', lat: 8.4886, lng: 4.5419, radius: 0.05 },
    { name: 'GRA', lat: 8.4967, lng: 4.5425, radius: 0.03 },
    { name: 'Adewole', lat: 8.4934, lng: 4.5534, radius: 0.04 },
    { name: 'Agric', lat: 8.4734, lng: 4.5623, radius: 0.05 },
    { name: 'Ganmo', lat: 8.4467, lng: 4.5890, radius: 0.06 },
    { name: 'Airport', lat: 8.4423, lng: 4.5945, radius: 0.04 }
  ];
  
  let closestArea = null;
  let minDistance = Infinity;
  
  areas.forEach(area => {
    const distance = calculateDistance(lat, lng, area.lat, area.lng);
    if (distance < area.radius && distance < minDistance) {
      minDistance = distance;
      closestArea = area.name;
    }
  });
  
  return closestArea;
};

export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const getCurrentLocation = (): Promise<UserLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const area = detectUserArea(latitude, longitude);
        resolve({
          lat: latitude,
          lng: longitude,
          area
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};

export const formatAddressHelp = (area?: string): string => {
  const suggestions = getAddressSuggestions(area);
  if (suggestions.length === 0) {
    return 'Try: House Number, Street Name, Area, Ilorin (e.g., 123 Ahmadu Bello Way, Tanke, Ilorin)';
  }
  
  const suggestion = suggestions[0];
  return `Format: ${suggestion.format}`;
};
