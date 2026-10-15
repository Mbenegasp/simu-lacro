import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Pantalon, PantalonFormulario } from '../models/pantalon';

@Injectable({
  providedIn: 'root',
})
export class PantalonService {
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/trousers';
  
  getAll(){
    return this.http.get<Pantalon[]>(this.url);
  }

  getById(id: string | number){
    return this.http.get<Pantalon>(`${this.url}/${id}`);
  }

  add(pantalon: PantalonFormulario){
    return this.http.post<Pantalon>(this.url, pantalon);
  }

  update(pantalon: Pantalon, id: string | number){
    return this.http.patch<Pantalon>(`${this.url}/${id}`, pantalon);
  }

  delete(id: string | number){
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
