import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public alertController: AlertController
  ) { }

  async alert(header: string = "", message: string = "") {
    const alert = await this.alertController.create({
      cssClass: 'alert-controller',
      header: header,
      message: message,
      animated: true,
      buttons: ['OK']
    });

    await alert.present();
  }
}