import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-consuta-form',
  templateUrl: './consuta-form.page.html',
  styleUrls: ['./consuta-form.page.scss'],
})
export class ConsutaFormPage implements OnInit {

  constructor(
    private barcodeScanner: BarcodeScanner
  ) { }

  ngOnInit() {
  }

  readBarcode(){
    this.barcodeScanner.scan().then(barcodeData => {
      alert(barcodeData.text);
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
