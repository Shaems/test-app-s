import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginLayoutPageRoutingModule } from './login-layout-routing.module';

import { LoginLayoutPage } from './login-layout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginLayoutPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginLayoutPage]
})
export class LoginLayoutPageModule {}
