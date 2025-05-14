import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [], // Supprime si le fichier n'existe pas
  imports: [RouterModule] // Ajout pour router-outlet
})
export class HomeComponent { }
