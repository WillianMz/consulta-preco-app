import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtiquetaPrecoFormPageRoutingModule } from './etiqueta-preco-form-routing.module';

import { EtiquetaPrecoFormPage } from './etiqueta-preco-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EtiquetaPrecoFormPageRoutingModule
  ],
  declarations: [EtiquetaPrecoFormPage]
})
export class EtiquetaPrecoFormPageModule {}
