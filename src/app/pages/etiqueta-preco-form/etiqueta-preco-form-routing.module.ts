import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtiquetaPrecoFormPage } from './etiqueta-preco-form.page';

const routes: Routes = [
  {
    path: '',
    component: EtiquetaPrecoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtiquetaPrecoFormPageRoutingModule {}
