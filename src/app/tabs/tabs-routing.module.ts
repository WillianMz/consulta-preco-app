import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../consuta-form/consuta-form.module').then(m => m.ConsutaFormPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../etiqueta-list/etiqueta-list.module').then(m => m.EtiquetaListPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../sobre/sobre.module').then(m => m.SobrePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
