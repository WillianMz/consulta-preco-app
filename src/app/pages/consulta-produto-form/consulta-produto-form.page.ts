import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { Produto } from 'src/app/models/produto';

@Component({
  selector: 'app-consulta-produto-form',
  templateUrl: './consulta-produto-form.page.html',
  styleUrls: ['./consulta-produto-form.page.scss'],
})
export class ConsultaProdutoFormPage implements OnInit {

  produtos: Produto[];
  produto: Produto;
  visivel: boolean;
  marcaVisivel: boolean;
  barcode: string;

  constructor(
    private barcodeScanner: BarcodeScanner,
    public toastController: ToastController,
    private router: Router,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.marcaVisivel = true;
  }

  solicitarEtiqueta(){
    this.router.navigate(['/tabs/etiqueta'], {queryParams: {barcode: this.produto.codbarras}});
  }

  clickBusca(){
    this.obterProduto(this.barcode);
  }

  readBarcode(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.obterProduto(barcodeData.text);
    }).catch(err => {
      console.log('Error', err);
    });
  }

  obterProduto(barcode: string){
    this.db.getProduto(barcode)
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
      });
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
          handler: () => { }
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
          handler: () => { }
        }
      ]
    });
    await toast.present();
  }

}
