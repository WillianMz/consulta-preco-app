import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtos: Produto[];

  constructor() { }

  getByBarcode(barcode: string): Produto{
    const p1 = new Produto();
    p1.id = 1;
    p1.codbarras = '7891360623090';
    p1.nome = 'MARCA-TEXTO GRIFPEN';
    p1.precoVenda = '2,99';
    return p1;
  }
}
