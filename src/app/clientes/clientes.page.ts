import { Component, OnInit } from '@angular/core';
import { MiapiService } from '../services/miapi.service'
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  users: any[] = [];
  nuevoUsuario = { name: '', email: '' }; // Datos del nuevo usuario

  constructor(private miapiService: MiapiService, private menu: MenuController, private alertController: AlertController) { }

  ngOnInit() {
    // Cerrar menú
    this.menu.close("mainMenu");
     // Llama al método GET y suscríbete a los datos
     this.miapiService.getUsers().subscribe(
      (data) => {
        this.users = data; // Almacena los datos en una variable
      },
      (error) => {
        this.mostrarAlerta(error);
        //console.error('Error al obtener los usuarios:', error);
      }
    );
  }
  // Método para mostrar alerta ****
  async mostrarAlerta(mensaje:any) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}