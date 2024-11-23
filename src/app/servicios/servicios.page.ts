import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'; 

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
    // Cerrar menú
    this.menu.close("mainMenu"); 
  }

}
