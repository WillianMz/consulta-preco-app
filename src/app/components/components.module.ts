import { SobreComponent } from './sobre/sobre.component';
import { MarcaComponent } from './marca/marca.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ToolbarComponent,
    MarcaComponent,
    SobreComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ToolbarComponent,
    MarcaComponent,
    SobreComponent
  ]
})
export class ComponentsModule { }
