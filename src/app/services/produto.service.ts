import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { Produto } from '../models/produto';
import { Observable } from 'rxjs';

const url = 'http://10.0.10.13:80/consulta_preco_api';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtos: Produto[];
  databaseName: string;

  constructor(
    private sqlite: SQLite,
    public toastController: ToastController,
    private http: HttpClient
  ) {
    this.databaseName = 'preco_produto.db';
  }

  getProduto(codbarras: string): Observable<Produto>{
    //return this.http.get<Produto>(`${url}/get_produto.php?codbarras=${codbarras}`,
    //{headers: new HttpHeaders().set('UserEmail', email ) });
    return this.http.get<Produto>(`${url}/get_produto.php?codbarras=${codbarras}`);
  }

  createDatabase(){
    this.sqlite.create({
      name: 'preco_produto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      //tabela produto
      // eslint-disable-next-line max-len
      db.executeSql('CREATE TABLE IF NOT EXISTS produto(id INTEGER PRIMARY KEY, codbarras VARCHAR(13), nome VARCHAR(40), preco_venda VARCHAR(10))', [])
      //.then(res => this.exibirMensagem(`Banco de dados criado com sucesso` ,'success'))
      .catch(e => this.exibirMensagem(`Erro ao criar tabelas. ${e}`,'danger'));

      //tabela de etiquetas
      // eslint-disable-next-line max-len
      db.executeSql('CREATE TABLE IF NOT EXISTS etiqueta(codbarras VARCHAR(13), qtd INTEGER,	CONSTRAINT fk_codbarras FOREIGN KEY(codbarras) REFERENCES produto(codbarras))', [])
       .catch(er => this.exibirMensagem(`Erro ao criar tabela etiqueta. ${er}`, 'danger'));
    }).catch(ex => this.exibirMensagem(`Erro ao criar banco de dados ${ex}`,'danger'));
  }

  clearTables(){
    this.sqlite.create({
      name: 'preco_produto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      //tabela produto
      // eslint-disable-next-line max-len
      db.executeSql('DELETE FROM etiqueta', [])
      .then(res => this.exibirMensagem(`Banco de dados criado com sucesso` ,'success'))
      .catch(e => this.exibirMensagem(`Erro ao criar tabelas. ${e}`,'danger'));

      //tabela de etiquetas
      // eslint-disable-next-line max-len
      db.executeSql('DELETE FROM produto', [])
       .catch(er => this.exibirMensagem(`Erro ao criar tablea etiqueta. ${er}`, 'danger'));
    }).catch(ex => this.exibirMensagem(`Erro ao criar banco de dados ${ex}`,'danger'));
  }

  async insertProduto(id: number, codbarras: string, nome: string, precoVenda: string){
    await this.sqlite.create({
      name: 'preco_produto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      //tabela produto
      // eslint-disable-next-line max-len
      db.executeSql('INSERT INTO produto VALUES(?,?,?,?)', [id, codbarras, nome, precoVenda])
        .catch(e => this.exibirMensagem(`Erro ao criar tabelas. ${e}`,'danger'));
    }).catch(ex => this.exibirMensagem(`Erro ao criar banco de dados ${ex}`,'danger'));
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

}
