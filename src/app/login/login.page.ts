import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service.service';
import { MenuController } from '@ionic/angular'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private authService: AuthServiceService,
    private menu: MenuController
  ) {}

  ngOnInit() {
        // Cerrar menú
        this.menu.close("mainMenu"); 
  }

  // Alerta de error
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  // Validación de formato de email
  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión básica para validación de email
    return emailRegex.test(email);
  }

  // Función para iniciar sesión
  async login() {
    if (!this.email) {
      this.mostrarAlerta('Ingrese su correo');
      return;
    }

    if (!this.validarEmail(this.email)) {
      this.mostrarAlerta('Formato de correo inválido');
      return;
    }

    if (!this.password) {
      this.mostrarAlerta('Ingrese contraseña');
      return;
    }

    if (this.password.length !== 4) {
      this.mostrarAlerta('La contraseña debe tener 4 dígitos');
      return;
    }

    // Validar credenciales con el servicio de autenticación
    const isAuthenticated = await this.authService.loginUser(this.email, this.password);
    if (isAuthenticated) {
      // Si la autenticación es correcta, navega a la página "home"
      localStorage.setItem('username', this.email); // Guardar el nombre del usuario en Local Storage

      this.navCtrl.navigateForward(['/home'], {
        queryParams: {
          email: this.email
        }
      });
    } else {
      // Muestra alerta si las credenciales son incorrectas
      this.mostrarAlerta('Correo o contraseña incorrectos.');
    }
  }

  // Función para navegar al registro
  registro() {
    this.navCtrl.navigateForward(['/registro']);
  }
}

