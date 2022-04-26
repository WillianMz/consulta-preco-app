import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ProdutoService } from './services/produto.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private plataform: Platform,
    private produtoService: ProdutoService
  ) {
    this.startApp();
  }

  startApp(){
    this.plataform.ready().then(() => {
      this.produtoService.createDatabase();
    });
  }
}
