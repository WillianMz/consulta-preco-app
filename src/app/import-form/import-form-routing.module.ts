import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportFormPage } from './import-form.page';

const routes: Routes = [
  {
    path: '',
    component: ImportFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportFormPageRoutingModule {}
