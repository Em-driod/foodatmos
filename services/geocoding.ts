import { findIlorinLocation, IlorinLocation } from './ilorinLocations';

export interface GeocodingResult {
  lat: number;
  lng: number;
  display_name: string;
  address: {
    road?: string;
    suburb?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
  };
}

export const geocodeAddress = async (address: string): Promise<GeocodingResult | null> => {
  try {
    console.log('Geocoding address:', address);
    
    // First try our custom Ilorin location database
    const ilorinLocation = findIlorinLocation(address);
    if (ilorinLocation) {
      console.log('Found location in Ilorin database:', ilorinLocation);
      
      return {
        lat: ilorinLocation.lat,
        lng: ilorinLocation.lng,
        display_name: `${address}, Ilorin, Kwara State, Nigeria`,
        address: {
          suburb: ilorinLocation.name,
          city: 'Ilorin',
          state: 'Kwara State',
          country: 'Nigeria'
        }
      };
    }
    
    console.log('Not found in Ilorin database, trying Nominatim API...');
    
    // Fallback to Nominatim API with Nigeria bias
    const searchQuery = `${address}, Ilorin, Nigeria`;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&countrycodes=ng`,
      {
        headers: {
          'User-Agent': 'AtmosFood App'
        }
      }
    );

    if (!response.ok) {
      console.error('Geocoding request failed:', response.status, response.statusText);
      throw new Error(`Geocoding request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Geocoding response:', data);
    
    if (data && data.length > 0) {
      const result = data[0];
      console.log('Selected result:', result);
      
      return {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        display_name: result.display_name,
        address: result.address || {}
      };
    }
    
    console.log('No results found for address:', address);
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    
    // Final fallback: Return Ilorin city center
    console.log('Using Ilorin city center as fallback');
    return {
      lat: 8.4966,
      lng: 4.5421,
      display_name: 'Ilorin City Center, Kwara State, Nigeria',
      address: {
        city: 'Ilorin',
        state: 'Kwara State',
        country: 'Nigeria'
      }
    };
  }
};

export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  // Haversine formula to calculate distance between two points
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
