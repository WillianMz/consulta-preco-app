import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-consuta-form',
  templateUrl: './consuta-form.page.html',
  styleUrls: ['./consuta-form.page.scss'],
})
export class ConsutaFormPage implements OnInit {

  produtos: Produto[];
  produto: Produto;
  nomeProduto: string;
  codbarras: string;
  codigo: number;
  precoVenda: string;
  visivel: boolean;
  marcaVisivel: boolean;
  barcode: string;
  databaseName: string;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private produtoService: ProdutoService,
    private sqlite: SQLite,
    public toastController: ToastController,
    private router: Router
  ) {
    this.databaseName = 'preco_produto.db';
    this.marcaVisivel = true;
   }

  ngOnInit() {
    this.produto = new Produto();
    //this.populateTable();
  }

  async produtoNaoEncontrado() {
    const toast = await this.toastController.create({
      header: 'Consulta Produto',
      message: 'PRODUTO NÃO ENCONTRADO!',
      icon: 'information-circle',
      position: 'middle',
      color: 'warning',
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();
  }

  async exibirMensagem(mensagem: string, cor: string) {
    const toast = await this.toastController.create({
      header: 'Consulta Produto',
      message: mensagem,
      icon: 'information-circle',
      position: 'middle',
      color: cor,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();
  }

  populateTable(){
    this.sqlite.create({
      name: this.databaseName,
      location: 'default'
    }).then((db: SQLiteObject) => {
      // eslint-disable-next-line max-len
      db.executeSql('CREATE TABLE IF NOT EXISTS produto(id INTEGER PRIMARY KEY, codbarras VARCHAR(13), nome VARCHAR(40), preco_venda VARCHAR(10))', [])
      .then(res =>  this.exibirMensagem('Banco de dados OK','success'))
      .catch(e => this.exibirMensagem('Erro ao criar tabelas','danger'));
    }).catch(ex => this.exibirMensagem('Erro','danger'));
  }

  clickBusca(){
    this.getProduto(this.barcode);
    /* this.visivel = true;
    this.produto.codbarras = '789456123456';
    this.produto.nome = 'PRODUTO TESTE';
    this.produto.id = 123;
    this.produto.precoVenda = '3,59'; */
  }

  solicitarEtiqueta(){
    this.router.navigate(['/tabs/tab2'], {queryParams: {barcode: this.produto.codbarras}});
  }

  getProduto(barcode: string){
    console.log('get_produto');
    this.sqlite.create({
      name: this.databaseName,
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM produto WHERE codbarras = ?', [barcode])
      .then(res => {
        if(res.rows.length > 0) {
          const p = new Produto();
          p.id = res.rows.item(0).id;
          p.codbarras = res.rows.item(0).codbarras;
          p.nome = res.rows.item(0).nome;
          p.preco_venda = res.rows.item(0).preco_venda;
          this.produto = p;
          this.visivel = true;
          this.marcaVisivel = false;
        }
        else{
          this.visivel = false;
          this.marcaVisivel = true;
          this.produtoNaoEncontrado();
        }
      }).catch(ex1 => this.exibirMensagem('Erro','danger'));
    }).catch(ex2 => this.exibirMensagem('Erro','danger'));
  }

  readBarcode(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.getProduto(barcodeData.text);
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

  async doSearchBarChange($event){
    const value = $event.target.value;
    if(value && value.length === 13){
      this.getProduto(value);
    }
  }
}
