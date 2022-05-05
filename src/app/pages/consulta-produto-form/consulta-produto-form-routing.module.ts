import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaProdutoFormPage } from './consulta-produto-form.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaProdutoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaProdutoFormPageRoutingModule {}
