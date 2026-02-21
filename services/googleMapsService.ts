// Google Maps API Service for accurate geocoding
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

export interface GoogleMapsLocation {
  lat: number;
  lng: number;
  formatted_address: string;
  place_id: string;
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
}

// Geocode address using Google Maps API
export const geocodeWithGoogleMaps = async (address: string): Promise<GoogleMapsLocation | null> => {
  try {
    if (!GOOGLE_MAPS_API_KEY) {
      console.error('Google Maps API key not configured. Please set REACT_APP_GOOGLE_MAPS_API_KEY in your .env file');
      return null;
    }
    
    console.log('Geocoding with Google Maps:', address);
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Google Maps API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const result = data.results[0];
      
      console.log('Google Maps geocoding successful:', result);
      
      return {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        formatted_address: result.formatted_address,
        place_id: result.place_id,
        address_components: result.address_components
      };
    } else {
      console.error('Google Maps geocoding failed:', data.status, data.error_message);
      return null;
    }
  } catch (error) {
    console.error('Error calling Google Maps API:', error);
    return null;
  }
};

// Get place details using place_id
export const getPlaceDetails = async (placeId: string): Promise<GoogleMapsLocation | null> => {
  try {
    if (!GOOGLE_MAPS_API_KEY) {
      console.error('Google Maps API key not configured. Please set REACT_APP_GOOGLE_MAPS_API_KEY in your .env file');
      return null;
    }
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Google Maps API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status === 'OK' && data.result) {
      const result = data.result;
      
      return {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        formatted_address: result.formatted_address,
        place_id: result.place_id,
        address_components: result.address_components
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
};

// Auto-complete suggestions (requires Places API)
export const getPlaceSuggestions = async (input: string): Promise<any[]> => {
  try {
    if (!GOOGLE_MAPS_API_KEY) {
      console.error('Google Maps API key not configured. Please set REACT_APP_GOOGLE_MAPS_API_KEY in your .env file');
      return [];
    }
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&components=country:NG|locality:Ilorin&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Google Maps API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status === 'OK' && data.predictions) {
      return data.predictions;
    }
    
    return [];
  } catch (error) {
    console.error('Error getting place suggestions:', error);
    return [];
  }
};

// Validate if location is in Ilorin area
export const isIlorinArea = (location: GoogleMapsLocation): boolean => {
  // Check if address components contain Ilorin indicators
  const hasIlorin = location.address_components.some(component => 
    component.long_name.toLowerCase().includes('ilorin') ||
    component.short_name.toLowerCase().includes('ilorin') ||
    component.types.includes('locality') && component.long_name.toLowerCase().includes('ilorin')
  );

  // Check if coordinates are within reasonable range for Ilorin
  const isWithinIlorinRange = 
    location.lat >= 8.3 && location.lat <= 8.6 &&
    location.lng >= 4.4 && location.lng <= 4.7;

  return hasIlorin || isWithinIlorinRange;
};

// Get kitchen location using Google Maps (NEPA Office, Afon Road, Oke Ogba, Ilorin)
export const getKitchenLocation = async (): Promise<GoogleMapsLocation | null> => {
  const kitchenAddress = "NEPA Office, Afon Road, Oke Ogba, Ilorin, Nigeria";
  return await geocodeWithGoogleMaps(kitchenAddress);
};
