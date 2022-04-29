import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'consuta-form',
    loadChildren: () => import('./consuta-form/consuta-form.module').then( m => m.ConsutaFormPageModule)
  },  {
    path: 'produto-list',
    loadChildren: () => import('./produto-list/produto-list.module').then( m => m.ProdutoListPageModule)
  },
  {
    path: 'etiqueta-list',
    loadChildren: () => import('./etiqueta-list/etiqueta-list.module').then( m => m.EtiquetaListPageModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./sobre/sobre.module').then( m => m.SobrePageModule)
  },
  {
    path: 'import-form',
    loadChildren: () => import('./import-form/import-form.module').then( m => m.ImportFormPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
