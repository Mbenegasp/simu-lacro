import { Component } from '@angular/core';
import { inject } from '@angular/core'; 
import { PantalonService } from '../../services/pantalon-service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-catalogo',
  imports: [],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  private readonly pantalonService = inject(PantalonService);
  private readonly router = inject(Router);

  protected readonly pantalones = toSignal(this.pantalonService.getAll(), {
    initialValue: []
  })

  verDetalle(id : string | number){
    this.router.navigate(['/detalle', id])
  }

}
