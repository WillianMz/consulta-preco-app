import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Produto } from 'src/app/models/produto';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.page.html',
  styleUrls: ['./config-form.page.scss'],
})
export class ConfigFormPage implements OnInit {

  produtos: Produto[] = [];
  fileUpload: any;
  json: string;

  constructor(
    private alertController: AlertController,
    private db: DatabaseService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  public uploadFile(files: FileList){
    if(files && files.length > 0){
      const file: File = files.item(0);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      console.log(file);
      reader.onload = (e) => {
        const fileContent: string = reader.result as string;
        this.json = fileContent;
      };
    }
  }

  async loadFileJson(){
    if(this.json){

      const loading = await this.loadingController.create({
        cssClass: 'backdrop-opacity',
        message: 'Aguarde...\n Importando dados',
        animated: true,
        spinner: 'lines'
      });
      await loading.present();

      //cria o banco e as tabelas caso nao exista
      this.db.createDatabase();
      //importa os dados do aquivo
      this.db.importJSON(this.json).then((res) => {
        loading.dismiss();
        this.exibirMensagem('Importação de dados finalizada!','success');
      }).catch((e) => alert(e));
    }
    else{
      this.exibirMensagem('Selecione o arquivo de dados para importação','warning');
    }
  }

  async limparTabelas() {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Todos os dados serão excluídos! Confirma?',
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
            //this.db.clearTables();
            this.clearTables();
          }
        }
      ]
    });

    await alert.present();
  }

  async limparBancoDeDados(){
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'O banco de dados será excluído! Confirma?',
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
            //this.db.clearDatabase();
            this.clearDatabase();
          }
        }
      ]
    });

    await alert.present();
  }

  async clearTables(){
    const loading = await this.loadingController.create({
      cssClass: 'backdrop-opacity',
      message: 'Aguarde...<br> Limpado dados',
      animated: true,
      spinner: 'lines'
    });
    await loading.present();

    this.db.clearTables();
    loading.dismiss();
  }

  async clearDatabase(){
    const loading = await this.loadingController.create({
      cssClass: 'backdrop-opacity',
      message: 'Aguarde...\n Apagando banco de dados',
      animated: true,
      spinner: 'lines'
    });
    await loading.present();

    this.db.clearDatabase();
    loading.dismiss();
  }

  //metodos privados
  private async exibirMensagem(mensagem: string, cor: string) {
    const toast = await this.toastController.create({
      header: 'Consulta Preco',
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

}
