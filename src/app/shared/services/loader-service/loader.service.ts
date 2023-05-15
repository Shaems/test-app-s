import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    public loadingController: LoadingController,
  ) { }

  async showLoading() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  async dimissLoading() {
    return await this.loadingController.dismiss();
  }
}
