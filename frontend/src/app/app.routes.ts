import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { HumidityComponent } from './components/humidity/humidity.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'temperature', component: TemperatureComponent },
  { path: 'humidity', component: HumidityComponent },
  { path: '**', redirectTo: '' }
];
