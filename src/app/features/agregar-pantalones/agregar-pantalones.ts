import { Component, inject } from '@angular/core';
import { Formulario } from '../formulario/formulario';
import { PantalonService } from '../../services/pantalon-service';
import { PantalonFormulario } from '../../models/pantalon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-pantalones',
  imports: [Formulario],
  templateUrl: './agregar-pantalones.html',
  styleUrl: './agregar-pantalones.css',
})
export class AgregarPantalones {
  private readonly router = inject(Router);
  private readonly pantalonService = inject(PantalonService);

  guardarPantalon(pantalon: PantalonFormulario) {
    this.pantalonService.add(pantalon).subscribe({
      next: (pantaloncito) => {
        console.log(pantaloncito);
        this.router.navigate(['/']);
      },
      error: () => {
        alert('fallo la conexion con el servidor');
      },
    });
  }
}
