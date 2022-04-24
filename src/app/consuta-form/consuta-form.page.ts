import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

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
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
