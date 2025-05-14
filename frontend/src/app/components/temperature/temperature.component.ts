import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Ajout de FormGroup
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  imports: [CommonModule, ReactiveFormsModule] // Ajout crucial ici
})
export class TemperatureComponent implements OnInit {
  data: any;
  form: FormGroup; // Déclaration explicite

  constructor(
    private api: ApiService,
    private fb: FormBuilder
  ) {
    // Initialisation du formulaire ici, après que fb soit injecté
    this.form = this.fb.group({
      city: ['Paris', Validators.required],
      value: [20, [Validators.required, Validators.min(-50), Validators.max(60)]]
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.getTemperature(this.form.value.city!).subscribe({
      next: (res) => this.data = res,
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.api.addTemperature(this.form.value).subscribe({
        next: () => this.loadData(),
        error: (err) => console.error(err)
      });
    }
  }
}
