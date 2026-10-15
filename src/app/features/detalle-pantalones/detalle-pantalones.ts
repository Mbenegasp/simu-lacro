import { Component, signal, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PantalonService } from '../../services/pantalon-service';
import { Pantalon } from '../../models/pantalon';

@Component({
  selector: 'app-detalle-pantalones',
  imports: [],
  templateUrl: './detalle-pantalones.html',
  styleUrl: './detalle-pantalones.css',
})
export class DetallePantalones {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly pantalonService = inject(PantalonService);

  private readonly id = this.route.snapshot.paramMap.get('id')!;
  protected readonly pantalon = signal<Pantalon | undefined>(undefined);

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
}
