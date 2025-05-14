import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html'
})
export class ViewDataComponent {
  city = '';
  data: any;

  constructor(private weatherService: WeatherService) { }

  search() {
    this.weatherService.getCityData(this.city).subscribe(res => {
      this.data = res;
    });
  }
}
