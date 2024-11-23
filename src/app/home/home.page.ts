import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  email: string = '';
  password: string = '';
  bienvenidos: string = 'Bienvenid@';

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private menu: MenuController) {}

  ngOnInit() { 
    // Cerrar menú
    this.menu.close("mainMenu"); 
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.password = params['password'];
    });
  }

  goToPortafolio() {
    this.navCtrl.navigateForward('/portafolio');
  }

  goToServicios() {
    this.navCtrl.navigateForward('/servicios');
  }
}
