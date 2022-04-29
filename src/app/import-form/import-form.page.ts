import { Produto } from './../models/produto';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-form',
  templateUrl: './import-form.page.html',
  styleUrls: ['./import-form.page.scss'],
})
export class ImportFormPage implements OnInit {

  records: any[] = [];
  produtos: Produto[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.http.get<Produto[]>('../../assets/produtos.json').subscribe(
      response => {
        this.produtos = response;
        console.log(this.produtos);
      }
    );
  }

}
