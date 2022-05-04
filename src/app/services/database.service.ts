import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: SQLiteObject;
  dbName = 'preco_produto.db';

  constructor(
    private sqlite: SQLite,
    private sqlPort: SQLitePorter
  ) {
    this.create();
  }

  //criar banco de dados
  create(){
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
  clear(){
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

  //ETIQUETAS
}
