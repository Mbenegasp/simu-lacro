import { Component, signal, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PantalonService } from '../../services/pantalon-service';
import { Pantalon, PantalonFormulario } from '../../models/pantalon';
import { Formulario } from '../formulario/formulario';

@Component({
  selector: 'app-detalle-pantalones',
  imports: [Formulario],
  templateUrl: './detalle-pantalones.html',
  styleUrl: './detalle-pantalones.css',
})
export class DetallePantalones {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly pantalonService = inject(PantalonService);

  private readonly id = this.route.snapshot.paramMap.get('id')!;
  protected readonly pantalon = signal<Pantalon | undefined>(undefined);
  protected readonly isEditing = signal(false);

  ngOnInit() {
    this.pantalonService.getById(this.id).subscribe({
      next: (pantalon) => {
        this.pantalon.set(pantalon);
      },
      error: () => {
        alert('El producto no existe, o la conexion con el servidor falló');
        this.router.navigate(['/']);
      },
    });
  }

  borrarPantalon() {
    if (!confirm('Desea eliminar el pantaloncito?')) return;
    this.pantalonService.delete(this.id).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Redirigiendo a catalogo');
        this.router.navigate(['/']);
      },
    });
  }

  guardarPantalonEditado(pantalonEditado : PantalonFormulario) {
    if(!confirm('desea actualizar los datos')) return;
    this.pantalonService.update(pantalonEditado, this.id).subscribe({
      next: (rta) => {
        this.pantalon.set(rta);
        this.isEditing.set(false);
      },
      error: () => {
        alert('Hubo un error con la conexion al servidor');
      }
    });
  }

  toggleEditing() {
    this.isEditing.update(v => !v);
  }
}
