import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigFormPageRoutingModule } from './config-form-routing.module';

import { ConfigFormPage } from './config-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigFormPageRoutingModule
  ],
  declarations: [ConfigFormPage]
})
export class ConfigFormPageModule {}
