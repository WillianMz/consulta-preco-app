import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsutaFormPage } from './consuta-form.page';

const routes: Routes = [
  {
    path: '',
    component: ConsutaFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsutaFormPageRoutingModule {}
