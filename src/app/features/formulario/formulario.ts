import { Component, inject, output, input, } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cut, Size, CUTS, SIZES, PantalonFormulario, Pantalon } from '../../models/pantalon';
@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly form = this.fb.group({
    modelName: ['', Validators.required],
    salePrice: [0, [Validators.required, Validators.min(0)]],
    isInStore: [false],
    cut: this.fb.control<Cut | ''>('', Validators.required),
    size: this.fb.control<Size | ''>('', Validators.required),
    notes: ['', Validators.maxLength(200)],
  });

  protected readonly sizes = SIZES;
  protected readonly cuts = CUTS

  readonly submitted = output<PantalonFormulario>();
  readonly pantalon = input<Pantalon>();

  ngOnInit() {
    const p = this.pantalon();
    if (p){
      this.form.patchValue(p)
    }
  }
  
  submit(){
    if (this.form.invalid) return;
    this.submitted.emit(this.form.getRawValue() as PantalonFormulario);
  }

  clean(){
    this.form.reset();
  }
}
