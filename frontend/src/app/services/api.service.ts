import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Température
  getTemperature(city: string) {
    return this.http.get(`${this.apiUrl}/temperature/${city}`);
  }

  addTemperature(data: any) {
    return this.http.post(`${this.apiUrl}/temperature`, data);
  }

  // Humidité
  getHumidity(city: string) {
    return this.http.get(`${this.apiUrl}/humidity/${city}`);
  }

  addHumidity(data: any) {
    return this.http.post(`${this.apiUrl}/humidity`, data);
  }
}
