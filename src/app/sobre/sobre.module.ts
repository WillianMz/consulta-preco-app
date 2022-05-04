import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SobrePageRoutingModule } from './sobre-routing.module';

import { SobrePage } from './sobre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SobrePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SobrePage]
})
export class SobrePageModule {}
