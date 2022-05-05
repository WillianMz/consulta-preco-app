import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaProdutoFormPageRoutingModule } from './consulta-produto-form-routing.module';

import { ConsultaProdutoFormPage } from './consulta-produto-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaProdutoFormPageRoutingModule
  ],
  declarations: [ConsultaProdutoFormPage]
})
export class ConsultaProdutoFormPageModule {}
