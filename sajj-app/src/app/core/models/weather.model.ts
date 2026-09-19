export interface WeatherData {
  temperature: number;
  weatherCode: number;
  condition: string;
  icon: string;
  city?: string;
  country?: string;
}

export interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
  };
}

export interface ReverseGeocodeResponse {
  address?: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
  };
  display_name?: string;
}
