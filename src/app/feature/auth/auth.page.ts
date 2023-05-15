import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {

  constructor(
    private router: Router
  ) { }

  goLogin(url: string){
    this.router.navigateByUrl(`auth/${url}`);
  }

}
