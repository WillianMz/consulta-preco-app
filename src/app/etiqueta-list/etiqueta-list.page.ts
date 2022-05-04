import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Etiqueta } from './../models/etiqueta';
import { ProdutoService } from './../services/produto.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-etiqueta-list',
  templateUrl: './etiqueta-list.page.html',
  styleUrls: ['./etiqueta-list.page.scss'],
})
export class EtiquetaListPage implements OnInit {
  barcode: string;
  etiquetas: Etiqueta[] = [];
  etiqForm: FormGroup;
  databaseName: string;

  constructor(
    private produtoService: ProdutoService,
    private sqlite: SQLite,
    public toastController: ToastController,
    private router: Router,
    private actRoute: ActivatedRoute,
    public alertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private socialSharing: SocialSharing
  ) {
    this.databaseName = 'preco_produto.db';
    const p = {qtd: 1, codbarras:'', produtoNome:''};
    this.startForm(p);
   }

  get codigobarras(){
    return this.etiqForm.get('codbarras').value;
  }

  get qtd(){
    return this.etiqForm.get('qtd').value;
  }

  ngOnInit() {
    this.actRoute.queryParams.subscribe(
      params => {
        this.barcode = params.barcode;
      }
    );
  }

  ionViewWillEnter(){
    this.listar();
  }

  exportWhats(){
    this.socialSharing.shareViaWhatsApp('CONSULTAPRECO APP').then(() => {
      alert('OK');
    }).catch((e) => alert(e));
  }

  exportTeleg(){
    this.socialSharing.shareVia('telegram','CONSULTAPRECO APP').then(() => {
      alert('OK');
    }).catch((e) => alert(e));
  }

  exportEmail(){
    this.socialSharing.shareViaEmail('CONSULTAPRECO APP','',[]).then(() => {
      alert('OK');
    }).catch((e) => alert(e));
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

  async limparLista() {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'A lista será apagada! Confirma?',
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
            this.deleteEtiquetas();
          }
        }
      ]
    });

    await alert.present();
  }

  async removerItem(codbarras: string) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'O item será removido! Confirma?',
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
            this.removerProdutoDaLista(codbarras);
          }
        }
      ]
    });

    await alert.present();
  }

  readBarcode(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.barcode = barcodeData.text;
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

  adicionar(){
    this.sqlite.create({
      name: 'preco_produto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO etiqueta VALUES(?,?)',[this.codigobarras, this.qtd])
        .catch(ex => this.exibirMensagem(`Erro ao inserir nova etiqueta ${ex}`, 'danger'));
    }).catch(e => this.exibirMensagem(`Erro. ${e}`, 'danger'));

    this.listar();
  }

  listar(){
    this.etiquetas = [];
    this.sqlite.create({
      name: 'preco_produto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT e.codbarras, e.qtd, p.nome  FROM etiqueta e INNER JOIN produto p ON e.codbarras = p.codbarras',[])
      .then(res => {
        if(res.rows.length > 0) {
          for(let i = 0; i < res.rows.length; i++){
            const item = res.rows.item(i);
            const etiq = new Etiqueta();
            etiq.codbarras = item.codbarras;
            etiq.qtd = item.qtd;
            etiq.produtoNome = item.nome;
            this.etiquetas.push(etiq);
          }
        }
      }).catch(ex => this.exibirMensagem(`Erro: ${ex}`, 'danger'));
    }).catch(e => this.exibirMensagem(`Erro. ${e}`, 'danger'));
  }

  deleteEtiquetas(){
    this.sqlite.create({
      name: 'preco_produto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM etiqueta',[])
        .catch(ex => this.exibirMensagem(`Erro ao excluir etiquetas ${ex}`, 'danger'));
    }).catch(e => this.exibirMensagem(`Erro. ${e}`, 'danger'));

    this.listar();
  }

  removerProdutoDaLista(codbarras: string){
    this.sqlite.create({
      name: 'preco_produto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM etiqueta WHERE codbarras = ?',[codbarras])
        .catch(ex => this.exibirMensagem(`Erro ao excluir etiqueta ${ex}`, 'danger'));
    }).catch(e => this.exibirMensagem(`Erro. ${e}`, 'danger'));

    this.listar();
  }

  private startForm(etiqueta: Etiqueta){
    this.etiqForm = new FormGroup({
      qtd: new FormControl(etiqueta.qtd, [
        Validators.required
      ]),
      codbarras: new FormControl(etiqueta.codbarras, [
        Validators.required
      ])
    });
  }

}
