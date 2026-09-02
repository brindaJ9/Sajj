export interface WeatherData {
  temperature: number;
  weatherCode: number;
  condition: string;
  icon: string;
  city?: string;
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
