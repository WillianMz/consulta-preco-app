import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsutaFormPageRoutingModule } from './consuta-form-routing.module';

import { ConsutaFormPage } from './consuta-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsutaFormPageRoutingModule
  ],
  declarations: [ConsutaFormPage]
})
export class ConsutaFormPageModule {}
