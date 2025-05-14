import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  addTemperature(data: any) {
    return this.http.post(`${this.apiUrl}/temperature`, data);
  }

  addHumidity(data: any) {
    return this.http.post(`${this.apiUrl}/humidity`, data);
  }

  getCityData(city: string) {
    return this.http.get(`${this.apiUrl}/temperature/${city}`);
    // Adaptez pour l'humidité selon vos besoins
  }
}
