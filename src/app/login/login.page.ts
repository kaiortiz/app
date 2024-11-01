import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  login(){
    this.navCtrl.navigateForward(['/home'],{
      queryParams: {
        email: this.email,
        password: this.password
      }
    });
  }
}
