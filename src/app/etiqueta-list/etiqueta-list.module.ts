import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtiquetaListPageRoutingModule } from './etiqueta-list-routing.module';

import { EtiquetaListPage } from './etiqueta-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtiquetaListPageRoutingModule
  ],
  declarations: [EtiquetaListPage]
})
export class EtiquetaListPageModule {}
