import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { WeatherData, GeolocationCoordinates, OpenMeteoResponse } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly OPEN_METEO_API = 'https://api.open-meteo.com/v1/forecast';
  private platformId = inject(PLATFORM_ID);
  
  // Signals for reactive state
  weatherData = signal<WeatherData | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * Get current weather based on user's location
   * Requests geolocation permission and fetches weather data
   */
  async getCurrentWeather(): Promise<void> {
    // Only run in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    try {
      const coords = await this.getUserLocation();
      await this.fetchWeather(coords);
    } catch (err) {
      this.handleError(err);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Get user's current location using Geolocation API
   */
  private getUserLocation(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        {
          timeout: 10000,
          enableHighAccuracy: false
        }
      );
    });
  }

  /**
   * Fetch weather data from Open-Meteo API
   */
  private async fetchWeather(coords: GeolocationCoordinates): Promise<void> {
    const url = `${this.OPEN_METEO_API}?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,weather_code&temperature_unit=celsius`;

    try {
      const response = await this.http.get<OpenMeteoResponse>(url).toPromise();
      
      if (response?.current) {
        const weatherData: WeatherData = {
          temperature: Math.round(response.current.temperature_2m),
          weatherCode: response.current.weather_code,
          condition: this.mapWeatherCodeToCondition(response.current.weather_code),
          icon: this.mapWeatherCodeToIcon(response.current.weather_code)
        };
        
        this.weatherData.set(weatherData);
      }
    } catch (err) {
      throw new Error('Failed to fetch weather data');
    }
  }

  /**
   * Map WMO weather code to human-readable condition
   * Based on WMO Code Table 4677
   */
  private mapWeatherCodeToCondition(code: number): string {
    const conditionMap: Record<number, string> = {
      0: 'Clear',
      1: 'Mainly Clear',
      2: 'Partly Cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Foggy',
      51: 'Light Drizzle',
      53: 'Drizzle',
      55: 'Heavy Drizzle',
      61: 'Light Rain',
      63: 'Rain',
      65: 'Heavy Rain',
      71: 'Light Snow',
      73: 'Snow',
      75: 'Heavy Snow',
      77: 'Snow Grains',
      80: 'Light Showers',
      81: 'Showers',
      82: 'Heavy Showers',
      85: 'Light Snow Showers',
      86: 'Snow Showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with Hail',
      99: 'Thunderstorm with Hail'
    };

    return conditionMap[code] || 'Unknown';
  }

  /**
   * Map WMO weather code to emoji icon
   */
  private mapWeatherCodeToIcon(code: number): string {
    // Clear/Sunny (0-1)
    if (code <= 1) return '☀️';
    
    // Partly Cloudy (2)
    if (code === 2) return '🌤️';
    
    // Cloudy/Overcast (3)
    if (code === 3) return '☁️';
    
    // Fog (45, 48)
    if (code === 45 || code === 48) return '🌫️';
    
    // Drizzle (51, 53, 55)
    if (code >= 51 && code <= 55) return '🌦️';
    
    // Rain (61, 63, 65, 80, 81, 82)
    if ((code >= 61 && code <= 65) || (code >= 80 && code <= 82)) return '🌧️';
    
    // Snow (71, 73, 75, 77, 85, 86)
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) return '❄️';
    
    // Thunderstorm (95, 96, 99)
    if (code >= 95) return '⛈️';
    
    return '☁️'; // Default fallback
  }

  /**
   * Handle errors gracefully
   */
  private handleError(err: any): void {
    // Check if we're in a browser environment
    if (typeof GeolocationPositionError !== 'undefined' && err instanceof GeolocationPositionError) {
      switch (err.code) {
        case err.PERMISSION_DENIED:
          this.error.set('location_denied');
          break;
        case err.POSITION_UNAVAILABLE:
          this.error.set('location_unavailable');
          break;
        case err.TIMEOUT:
          this.error.set('location_timeout');
          break;
        default:
          this.error.set('location_error');
      }
    } else if (err?.message === 'Geolocation not supported') {
      this.error.set('geolocation_not_supported');
    } else {
      this.error.set('weather_fetch_failed');
    }
    
    // Set weatherData to null so UI can show fallback
    this.weatherData.set(null);
  }

  /**
   * Reset weather state
   */
  resetWeather(): void {
    this.weatherData.set(null);
    this.error.set(null);
    this.isLoading.set(false);
  }
}
