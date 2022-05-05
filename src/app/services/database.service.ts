import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from '@ionic/angular';
import { Produto } from '../models/produto';
import { Etiqueta } from '../models/etiqueta';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: SQLiteObject;
  dbName = 'produtos.db';

  constructor(
    private sqlite: SQLite,
    private sqlPort: SQLitePorter,
    public toastController: ToastController
  ) {
    //this.create();
  }

  //criar banco de dados
  createDatabase(){
    this.sqlite.create({
      name: this.dbName,
      location: 'default'
    }).then((dbObject: SQLiteObject) => {
      this.db = dbObject;
    }).catch((e) => console.log(e));
  }

  //verifica se existe dados na tabela informada
  dataExistsCheck(tableName: string){
    return new Promise((res, rej) => {
      this.db.executeSql('SELECT count(*) AS numRows FROM ' + tableName, [])
        .then((data: any) => {
          const numRows = data.rows.item(0).numRows;
          res(numRows);
        }).catch((e) => rej(e));
    });
  }

  //importa os dados JSON fornecidos para o banco de dados do aplicativo
  importJSON(json: any){
    return new Promise((resolve, reject) => {
      this.sqlPort.importJsonToDb(this.db, json)
        .then((data) => {
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  //remove todas as tabelas e dados do banco de dados
  clearDatabase(){
    return new Promise((resolve, reject) => {
      this.sqlPort.wipeDb(this.db)
        .then((data) =>{
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  //exporta dados SQL do banco de dados
  exportSQL() {
    return new Promise((resolve, reject) => {
      this.sqlPort.exportDbToSql(this.db)
        .then((data) => {
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  //importa os dados SQL fornecidos para o banco de dados do aplicativo
  importSQL(sql: any) {
    return new Promise((resolve, reject) => {
      this.sqlPort.importSqlToDb(this.db, sql)
        .then((data) => {
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  createTables(){
    // eslint-disable-next-line max-len
    this.db.executeSql('CREATE TABLE IF NOT EXISTS produto(id INTEGER PRIMARY KEY, codbarras VARCHAR(13), nome VARCHAR(40), preco_venda VARCHAR(10))', [])
      .catch(e => this.exibirMensagem(`Erro ao criar tabelas. ${e}`,'danger'));
    // eslint-disable-next-line max-len
    this.db.executeSql('CREATE TABLE IF NOT EXISTS etiqueta(codbarras VARCHAR(13), qtd INTEGER,	CONSTRAINT fk_codbarras FOREIGN KEY(codbarras) REFERENCES produto(codbarras))', [])
      .catch(er => this.exibirMensagem(`Erro ao criar tabela etiqueta. ${er}`, 'danger'));
  }

  clearTables(){
    this.db.executeSql('DELETE FROM etiqueta', [])
      .catch(e => this.exibirMensagem(`Erro: ${e}`,'danger'));

    // eslint-disable-next-line max-len
    this.db.executeSql('DELETE FROM produto', [])
      .catch(er => this.exibirMensagem(`Erro: ${er}`, 'danger'));
  }

  //produtos
  createProduto(id: number, codbarras: string, nome: string, precoVenda: string){
    this.db.executeSql('INSERT INTO produto VALUES(?,?,?,?)', [id, codbarras, nome, precoVenda])
      .catch(e => this.exibirMensagem(`Erro ao inserir produto. Erro: ${e}`,'danger'));
  }

  getProduto(barcode: string){
    const produto = this.db.executeSql('SELECT * FROM produto WHERE codbarras = ?', [barcode]);
    return produto;
  }

  //etiquetas
  createEtiqueta(codbarras: string, qtd: number){
    this.db.executeSql('INSERT INTO etiqueta VALUES(?,?)',[codbarras, qtd])
      .catch(ex => this.exibirMensagem(`Erro ao inserir nova etiqueta ${ex}`, 'danger'));
  }

  getAllEtiquetas(){
    // eslint-disable-next-line max-len
    const etiquetas = this.db.executeSql('SELECT e.codbarras, e.qtd, p.nome  FROM etiqueta e INNER JOIN produto p ON e.codbarras = p.codbarras',[]);
    return etiquetas;
  }

  deleteEtiquetas(){
    this.db.executeSql('DELETE FROM etiqueta',[])
      .catch(ex => this.exibirMensagem(`Erro ao excluir etiquetas ${ex}`, 'danger'));
  }

  removeProdutoListaEtiq(codbarras: string){
    this.db.executeSql('DELETE FROM etiqueta WHERE codbarras = ?',[codbarras])
      .catch(ex => this.exibirMensagem(`Erro ao excluir etiqueta ${ex}`, 'danger'));
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
