import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html'
})
export class AddDataComponent {
  addForm = new FormGroup({
    type: new FormControl('temperature'),
    city: new FormControl(''),
    value: new FormControl('')
  });

  constructor(private weatherService: WeatherService) { }

  onSubmit() {
    const data = this.addForm.value;
    if (data.type === 'temperature') {
      this.weatherService.addTemperature(data).subscribe();
    } else {
      this.weatherService.addHumidity(data).subscribe();
    }
    this.addForm.reset();
  }
}
