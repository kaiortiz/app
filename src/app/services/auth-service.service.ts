import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public dbInstance!: SQLiteObject;

  constructor(private sqlite: SQLite) { 
    this.initializeDatabase();
  }

  async initializeDatabase() {
    this.dbInstance = await this.sqlite.create({
      name: 'mydatabase.db',
      location: 'default',
    });
    await this.createTables();
  }

  // Crear tabla con campos
  async createTables() {
    await this.dbInstance.executeSql(
      `CREATE TABLE IF NOT EXISTS users(
        nombre TEXT,
        apellido TEXT,
        fecha_nacimiento DATE,
        email TEXT PRIMARY KEY,
        password TEXT
      )`, 
      []
    );
  }

  // Registrar usuario 
  async registerUser(nombre: string, apellido: string, fecha_nacimiento: Date, email: string, password: string) {
    try {
      await this.dbInstance.executeSql(
        `INSERT INTO users (nombre, apellido, fecha_nacimiento, email, password)
        VALUES (?, ?, ?, ?, ?)`,
        [nombre, apellido, fecha_nacimiento, email, password]
      );
      return true;
    } catch (error) {
      console.error('Error al registrar usuario: ', error);
      return false;
    }
  }

  // Iniciar sesión del usuario
  async loginUser(email: string, password: string): Promise<boolean> {
    const result = await this.dbInstance.executeSql(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );
    return result.rows.length > 0;
  }
}
