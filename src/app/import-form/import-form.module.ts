import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportFormPageRoutingModule } from './import-form-routing.module';

import { ImportFormPage } from './import-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImportFormPageRoutingModule
  ],
  declarations: [ImportFormPage]
})
export class ImportFormPageModule {}
