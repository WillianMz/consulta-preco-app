import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
    private db: DatabaseService
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
    this.db.importJSON(this.json).then((res) => {
      alert('Importação finalizada');
    }).catch((e) => alert(e));
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
            this.db.clearTables();
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
            this.db.clearDatabase();
          }
        }
      ]
    });

    await alert.present();
  }

}
