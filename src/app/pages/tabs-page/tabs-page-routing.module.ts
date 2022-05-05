import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPagePage } from './tabs-page.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPagePage,
    children: [
      {
        path:'consulta',
        loadChildren: () => import('../consulta-produto-form/consulta-produto-form.module').then(m => m.ConsultaProdutoFormPageModule)
      },
      {
        path: 'etiqueta',
        loadChildren: () => import('../etiqueta-preco-form/etiqueta-preco-form.module').then(m => m.EtiquetaPrecoFormPageModule)
      },
      {
        path: 'config',
        loadChildren: () => import('../config-form/config-form.module').then(m => m.ConfigFormPageModule)
      },
      {
        path: '',
        redirectTo: 'consulta',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPagePageRoutingModule {}
