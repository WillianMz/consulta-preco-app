import { Component, OnInit } from '@angular/core';
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

  constructor(
    private barcodeScanner: BarcodeScanner,
    private produtoService: ProdutoService,
    private sqlite: SQLite,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.produto = new Produto();
    this.populateTable();
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
      name: 'preco_produto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      // eslint-disable-next-line max-len
      db.executeSql('CREATE TABLE IF NOT EXISTS produto(id INTEGER PRIMARY KEY, codbarras VARCHAR(13), nome VARCHAR(40), preco_venda VARCHAR(10))', [])
      .then(res =>  this.exibirMensagem('Banco de dados OK','success'))
      .catch(e => this.exibirMensagem('Erro ao criar tabelas','danger'));
      /* db.executeSql('SELECT * FROM produto ORDER BY nome', [])
      .then(res => {
        if(res.rows.length === 0 ){
          db.executeSql('INSERT INTO produto VALUES (?,?,?,?)', [1,'789160623090','MARCA-TEXTO GRIFPEN','2,99']);
          db.executeSql('INSERT INTO produto VALUES (?,?,?,?)', [2,'7896572000547','CANETA ESF.COMPACTOR','3,99']);
          db.executeSql('INSERT INTO produto VALUES (?,?,?,?)', [3,'7891360498506','CANETA FINEPEN FABER','4,99']);
          db.executeSql('INSERT INTO produto VALUES (?,?,?,?)', [4,'7897476666471','CANETA ESF.PRETA','5,99']);
        }
      }).catch(e => alert('ERRO DE INSERT: ' + e)); */
    }).catch(ex => this.exibirMensagem('Erro','danger'));
  }

  getProduto(barcode: string){
    console.log('get_produto');
    this.sqlite.create({
      name: 'preco_produto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM produto WHERE codbarras = ?', [barcode])
      .then(res => {
        if(res.rows.length > 0) {
          const p = new Produto();
          p.id = res.rows.item(0).id;
          p.codbarras = res.rows.item(0).codbarras;
          p.nome = res.rows.item(0).nome;
          p.precoVenda = res.rows.item(0).preco_venda;
          this.produto = p;
        }
        else{
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
