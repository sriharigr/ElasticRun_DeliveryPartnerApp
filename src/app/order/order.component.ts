import { Component, OnInit, Input, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderService } from '../services/order.service';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {


  order: any;
  orderId: string;
  selectedVerificationMethod: any;
  isBeingVerified: any = false;
  verificationValue: any;
   messaging: any;
   isPayBeingUpdated: any = false;
   isOrderVerified: any = false;
  constructor(private activatedRoute: ActivatedRoute, public alertController: AlertController,
              public db: AngularFirestore, private orderService: OrderService,
              private qrScanner: QRScanner
              ) {
    // const things = db.collection('orders').valueChanges();
    // this.messaging = firebase.messaging();
    // this.messaging.usePublicVapidKey('BGVW67T9sV7YnKNt40V570Sb-ZP2FZifB3pCDLO7f07h_OUJ2ZLHCF4WMThoex1gE9GKx29-bH2dHLXvHqfebgM');
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.orderId = params.orderId;
      this.orderService.get(this.orderId).subscribe((response: any) => {
        this.order = response.data[0];
      });
    });
  }

  selectVerificationMethod(event: any) {
    this.selectedVerificationMethod = event.detail.value;
    if (this.selectedVerificationMethod === 'QR') {
       this.verificationMethodUnavailable();
       this.selectedVerificationMethod = '';
    }
   }

  verify() {
    if (!this.isBeingVerified) {
      if (this.selectedVerificationMethod !== undefined && this.selectedVerificationMethod !== '') {
        if (this.verificationValue !== undefined && this.verificationValue !== '') {
          this.isBeingVerified = true;
          console.log(this.verificationValue);
          this.isBeingVerified = false;
          this.isOrderVerified = true;
        } else {
          this.OTPValueAlert();
        }
      } else {
        this.verificationMethodAlert();
      }
    }
  }

  confirmPayment() {
    this.isPayBeingUpdated = true;
    this.orderService.update(this.orderId, 'COMPLETED').subscribe((response: any) => {
     this.order.status = 'COMPLETED';
     this.isPayBeingUpdated = false;
    });
  }
  confirmHandover() {
    this.isPayBeingUpdated = true;
    this.orderService.update(this.orderId, 'COMPLETED').subscribe((response: any) => {
      this.order.status = 'COMPLETED';
      this.isPayBeingUpdated = false;
     });
  }


  async verificationMethodAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Please select a verification method to proceed further',
      buttons: ['OK']
    });

    await alert.present();
  }

  async OTPValueAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: `Please provide a valid ${this.selectedVerificationMethod} to proceed further`,
      buttons: ['OK']
    });

    await alert.present();
  }
  async verificationMethodUnavailable() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: `${this.selectedVerificationMethod} Verification Method is currently unavailable. Please try a different one`,
      buttons: ['OK']
    });

    await alert.present();
  }

}
