// Official Ilorin LGAs and Areas for simple selection
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

// Official Ilorin areas with accurate coordinates
export const ILORIN_AREAS: IlorinArea[] = [
  // Ilorin West LGA
  {
    id: 'oke-ogba',
    name: 'Oke Ogba / NEPA Office',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4966, lng: 4.5421 },
    deliveryFee: 400
  },
  {
    id: 'ganmo',
    name: 'Ganmo',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4467, lng: 4.5890 },
    deliveryFee: 600
  },
  {
    id: 'airport',
    name: 'Airport Area',
    lga: 'Ilorin West',
    coordinates: { lat: 8.4423, lng: 4.5945 },
    deliveryFee: 800
  },
  
  // Ilorin East LGA
  {
    id: 'tanke',
    name: 'Tanke / University Area',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4886, lng: 4.5419 },
    deliveryFee: 400
  },
  {
    id: 'agric',
    name: 'Agric / Fate',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4734, lng: 4.5623 },
    deliveryFee: 500
  },
  {
    id: 'oke-odo',
    name: 'Oke-Odo',
    lga: 'Ilorin East',
    coordinates: { lat: 8.4800, lng: 4.5500 },
    deliveryFee: 400
  },
  
  // Ilorin South LGA
  {
    id: 'asadam',
    name: 'Asadam',
    lga: 'Ilorin South',
    coordinates: { lat: 8.4845, lng: 4.5321 },
    deliveryFee: 500
  },
  {
    id: 'sango',
    name: 'Sango',
    lga: 'Ilorin South',
    coordinates: { lat: 8.4700, lng: 4.5200 },
    deliveryFee: 600
  },
  {
    id: 'budo',
    name: 'Budo',
    lga: 'Ilorin South',
    coordinates: { lat: 8.4600, lng: 4.5100 },
    deliveryFee: 700
  },
  {
    id: 'oja-oba',
    name: 'Oja Oba',
    lga: 'Ilorin South',
    coordinates: { lat: 8.4500, lng: 4.5000 },
    deliveryFee: 800
  },
  
  // Ilorin Central LGA
  {
    id: 'gra',
    name: 'GRA / Government Reserved Area',
    lga: 'Ilorin Central',
    coordinates: { lat: 8.4967, lng: 4.5425 },
    deliveryFee: 400
  },
  {
    id: 'adewole',
    name: 'Adewole Estate',
    lga: 'Ilorin Central',
    coordinates: { lat: 8.4934, lng: 4.5534 },
    deliveryFee: 500
  },
  {
    id: 'murtala',
    name: 'Murtala / Post Office',
    lga: 'Ilorin Central',
    coordinates: { lat: 8.5069, lng: 4.5312 },
    deliveryFee: 400
  },
  {
    id: 'taiwo',
    name: 'Taiwo / Okelele',
    lga: 'Ilorin Central',
    coordinates: { lat: 8.5167, lng: 4.5178 },
    deliveryFee: 500
  },
  {
    id: 'challenge',
    name: 'Challenge / Unity Road',
    lga: 'Ilorin Central',
    coordinates: { lat: 8.5084, lng: 4.5247 },
    deliveryFee: 400
  },
  
  // Ilorin North LGA
  {
    id: 'surulere',
    name: 'Surulere',
    lga: 'Ilorin North',
    coordinates: { lat: 8.5200, lng: 4.5600 },
    deliveryFee: 600
  },
  {
    id: 'ipata',
    name: 'Ipata',
    lga: 'Ilorin North',
    coordinates: { lat: 8.5300, lng: 4.5700 },
    deliveryFee: 700
  },
  {
    id: 'ogun',
    name: 'Ogun',
    lga: 'Ilorin North',
    coordinates: { lat: 8.5400, lng: 4.5800 },
    deliveryFee: 800
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

// Get kitchen location (Oke Ogba)
export const getKitchenLocation = () => {
  const kitchen = ILORIN_AREAS.find(area => area.id === 'oke-ogba');
  return kitchen || ILORIN_AREAS[0]; // Fallback to first area
};
