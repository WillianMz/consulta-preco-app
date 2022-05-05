import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigFormPage } from './config-form.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigFormPageRoutingModule {}
