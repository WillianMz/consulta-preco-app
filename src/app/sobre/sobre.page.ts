import { ProdutoService } from './../services/produto.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {

  produtos: Produto[] = [];

  constructor(
    private http: HttpClient,
    private prodService: ProdutoService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  loadProdutos(){
    this.loadFileJson('../../assets/produtos.json');
  }

  loadFileJson(path: string){
    this.http.get<Produto[]>(path).subscribe(
      response => {
        this.produtos = response;
        //console.log(this.produtos);
      }
    );

    if(this.produtos.length > 0) {
      this.produtos.forEach(p => {
        this.prodService.insertProduto(p.id, p.codbarras, p.nome, p.preco_venda);
        //console.log(p.preco_venda);
      });
    }

  }

  clearBase(){
    this.prodService.clearTables();
  }

  async limparBase() {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'O Banco de dados local será apagado. Todos os dados serão perdidos! Confirma?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          id: 'confirm-button',
          handler: () => {
            this.clearBase();
          }
        }
      ]
    });

    await alert.present();
  }

}
