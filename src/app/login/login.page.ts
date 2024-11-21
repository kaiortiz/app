import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private alertController: AlertController, private authService: AuthServiceService ) { }

  ngOnInit() {
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

  // Validación formato email | función
  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión básica para validación de email
    return emailRegex.test(email);
  }

  // Verificación campo correo no esté vacío
  async login() {
    if (!this.email) {
      this.mostrarAlerta('Ingrese su correo');
      return;
    }

    // Validar formato de email
    if (!this.validarEmail(this.email)) {
      this.mostrarAlerta('Formato de correo inválido');
      return;
    }

    // Validar contraseña no esté vacía
    if (!this.password) {
      this.mostrarAlerta('Ingrese contraseña');
      return;
    }

    // Verificar que la contraseña tenga exactamente 4 dígitos
    if (this.password.length !== 4) {
      this.mostrarAlerta('La contraseña debe tener 4 dígitos');
      return;
    }
    /*
    // Si pasa todas las validaciones, se dirige a home
    this.navCtrl.navigateForward(['/home'], {
      queryParams: {
        email: this.email,
        password: this.password
      }
    });
  }
  registro() { 
    this.navCtrl.navigateForward(['/registro']);
  } */

    // Validar credenciales con el servicio de autenticación
  const isAuthenticated = await this.authService.loginUser(this.email, this.password);
  if (isAuthenticated) {
    // Si la autenticación es correcta, navega a la página "home"

     // Guardar el nombre del usuario en Local Storage
     localStorage.setItem('username', this.email );

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

} 

