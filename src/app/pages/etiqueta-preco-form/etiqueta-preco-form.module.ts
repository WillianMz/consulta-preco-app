import { ComponentsModule } from './../../components/components.module';
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
    EtiquetaPrecoFormPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EtiquetaPrecoFormPage]
})
export class EtiquetaPrecoFormPageModule {}
