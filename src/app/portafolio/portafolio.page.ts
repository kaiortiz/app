import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'; 

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.page.html',
  styleUrls: ['./portafolio.page.scss'],
})
export class PortafolioPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
        // Cerrar menú
        this.menu.close("mainMenu"); 
  }

}
