import { DatabaseService } from './services/database.service';
import { HttpClient } from '@angular/common/http';
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
    private produtoService: ProdutoService,
    private http: HttpClient,
    private db: DatabaseService
  ) {
    this.startApp();
  }

  startApp(){
    this.plataform.ready().then(() => {
      this.produtoService.createDatabase();
      this.db.create();
    });
  }

  /* ionViewDidLoad(){
    this.plataform.ready()
      .then(() => {
        setTimeout(() => {
          alert('WN SOFTWARE');
        }, 1500);
      });
  } */
}
