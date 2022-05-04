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
  fileUpload: any;
  fileName: any;

  fileToUpload: File | null = null;
  reader  = new FileReader();

  json: string;

  constructor(
    private http: HttpClient,
    private prodService: ProdutoService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  public uploadFile(files: FileList): void{
    if(files && files.length > 0){
      const file: File = files.item(0);
      //console.log('upload file: ' + 'nome: ' + file.name + 'tamanho: ' + file.size + 'tipo: ' + file.type);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      console.log(file);
      reader.onload = (e) => {
        const fileContent: string = reader.result as string;
        //console.log('fileContent: ' + fileContent);
        this.json = fileContent;
        console.log(this.json);
        //const lines: string[] = fileContent.split('\n');
        //console.log(lines);
        /* alert(fileContent);
        console.log(e); */
      };
    }
  }

  onFileSelected(event) {
    /* const file: File = event.target.files[0];

    this.reader.readAsDataURL(file);
    console.log(this.reader);

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('thumbnail', file);
      this.http.post(`../../assets/${this.fileName}`, formData);
      //const upload$ = this.http.post(`../../assets/${this.fileName}`, formData);
      //upload$.subscribe();

      console.log(this.fileName);
      console.log(formData);
      //console.log(upload$);
    } */
  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

  loadProdutos(){
    this.loadFileJson('../../assets/produtos.json');
  }

  async loadFileJson(path: string){
    /* this.http.get<Produto[]>(path).subscribe(
      response => {
        this.produtos = response;
        console.log(this.produtos);
      }
    );

    if(this.produtos.length > 0) {
      this.produtos.forEach(p => {
      this.prodService.insertProduto(p.id, p.codbarras, p.nome, p.preco_venda);
      });
    } */

    console.log(this.json);
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
