import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, NavController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  selectedDate: string = ''; 
  email: string = '';
  password: string = '';
  registroStatus: string = ''; 

  constructor(
    private alertController: AlertController,
    private menu: MenuController,
    private navCtrl: NavController,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.menu.close("mainMenu");
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async guardar() {
    if (
      this.nombre.trim() === '' ||
      this.apellido.trim() === '' ||
      this.selectedDate.trim() === '' ||
      this.email.trim() === '' ||
      this.password.trim() === ''
    ) {
      this.presentAlert('Rellene todos los datos solicitados');
    } else {
      this.register()
    }
  }

  async register() {
    const success = await this.authService.registerUser(
      this.nombre,
      this.apellido,
      new Date(this.selectedDate), // Convierte de string a date 
      this.email,
      this.password
    );
    this.registroStatus = success ? 'Registro exitoso' : 'Error al registrar';
    this.presentAlert(this.registroStatus);
  }
}