import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { Etiqueta } from 'src/app/models/etiqueta';

@Component({
  selector: 'app-etiqueta-preco-form',
  templateUrl: './etiqueta-preco-form.page.html',
  styleUrls: ['./etiqueta-preco-form.page.scss'],
})
export class EtiquetaPrecoFormPage implements OnInit {

  barcode: string;
  etiquetas: Etiqueta[] = [];
  etiqForm: FormGroup;
  databaseName: string;
  solicitacao: string;

  constructor(
    public toastController: ToastController,
    private actRoute: ActivatedRoute,
    public alertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private socialSharing: SocialSharing,
    private db: DatabaseService
  ) {
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

  readBarcode(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.barcode = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }

  exportarLista(){
    this.solicitacao = 'TABELA DE PREÇOS\n\n';

    this.etiquetas.forEach(p => {
      this.solicitacao += `${p.qtd} x ${p.codbarras}\n`;
      this.solicitacao += `${p.produtoNome}\n`;
      this.solicitacao += '-----------------------------\n';
    });

    this.solicitacao += '\n WILLIAN';
  }

  enviarPorWhats(){
    this.exportarLista();

    this.socialSharing.shareViaWhatsApp(this.solicitacao)
    .then(() => {
      //executar algo
    }).catch((e) => alert(e));
  }

  enviarPorTeleg(){
    this.exportarLista();

    this.socialSharing.shareVia('telegram',this.solicitacao)
    .then(() => {
      //executar algo
    }).catch((e) => alert(e));
  }

  enviarPorEmail(){
    this.exportarLista();

    this.socialSharing.shareViaEmail(this.solicitacao,'Solicitação de Etiquetas', null)
    .then(() => {
      //executar algo
    }).catch((e) => alert(e));
  }

  adicionar(){
    this.db.createEtiqueta(this.codigobarras, this.qtd);
    this.listar();
  }

  async limparLista(){
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
            this.db.deleteEtiquetas();
          }
        }
      ]
    });

    await alert.present();
  }

  async removerItem(codbarras: string){
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
            this.db.removeProdutoListaEtiq(codbarras);
            this.listar();
          }
        }
      ]
    });

    await alert.present();
  }

  private listar(){
    this.db.getAllEtiquetas()
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
      });
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
