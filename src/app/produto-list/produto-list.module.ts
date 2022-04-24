import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutoListPageRoutingModule } from './produto-list-routing.module';

import { ProdutoListPage } from './produto-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdutoListPageRoutingModule
  ],
  declarations: [ProdutoListPage]
})
export class ProdutoListPageModule {}
