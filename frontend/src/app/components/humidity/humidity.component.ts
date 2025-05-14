import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  imports: [CommonModule, ReactiveFormsModule] // Ajout crucial ici
})
export class HumidityComponent implements OnInit {
  data: any;
  form: FormGroup; // Déclaration explicite

  constructor(
    private api: ApiService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      city: ['Paris', Validators.required],
      value: [50, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.getHumidity(this.form.value.city!).subscribe({
      next: (res) => this.data = res,
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.api.addHumidity(this.form.value).subscribe({
        next: () => this.loadData(),
        error: (err) => console.error(err)
      });
    }
  }
}
