import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
  standalone: true
})
export class LoginComponent {
  // Usuario por defecto
  private defaultUser = {
    email: 'info@tomdux.com',
    password: '123'  // Contrasena por defecto
  };

  constructor(private router: Router) {}

  // Metodo para manejar el login
  login(form: NgForm) {
    const { email, password } = form.value;

    if (email === this.defaultUser.email && password === this.defaultUser.password) {
      localStorage.setItem('user', JSON.stringify({ email }));
      this.router.navigate(['/']);
    } else {
      alert('Correo o contraseña incorrectos.');
    }
  }
}
