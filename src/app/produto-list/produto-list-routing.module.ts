import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoListPage } from './produto-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProdutoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoListPageRoutingModule {}
