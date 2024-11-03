import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  selectedDate: string = ''; // o utiliza Date si es una fecha
  email: string = '';
  password: string = '';

  constructor(
    private alertController: AlertController,
    private menu: MenuController,
    private navCtrl: NavController
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

  guardar() {
    if (
      this.nombre.trim() === '' ||
      this.apellido.trim() === '' ||
      (typeof this.selectedDate === 'string' && this.selectedDate.trim() === '') ||
      this.email.trim() === '' ||
      this.password.trim() === ''
    ) {
      this.presentAlert('Rellene todos los datos solicitados');
    } else {
      this.presentAlert(
        `Registrado correctamente. ¡Te damos la bienvenida, ${this.nombre} ${this.apellido}!`
      );

      // Navegar a la página de inicio con parámetros
      this.navCtrl.navigateForward(['/home'], {
        queryParams: {
          email: this.email,
          password: this.password
        }
      });
    }
  }
}
