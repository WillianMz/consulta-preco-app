import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtiquetaListPage } from './etiqueta-list.page';

const routes: Routes = [
  {
    path: '',
    component: EtiquetaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtiquetaListPageRoutingModule {}
