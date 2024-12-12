import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class LoginComponent {
  private apiLoginUrl = 'https://fakestoreapi.com/auth/login'; // URL de la API de login

  constructor(private router: Router, private http: HttpClient) {}

  loginToken(form: NgForm) {
    const { username, password } = form.value;



    const loginData = {
      username: username,
      password: password,
    };

    // Realizar la solicitud POST al API de login
    this.http.post<any>(this.apiLoginUrl, loginData).subscribe(
      (response) => {
        console.log('Login Success', response);

        if (response.token) {

          console.log(response.token)
          localStorage.setItem('authToken', response.token);

          // Guardar los datos del usuario si es necesario
          localStorage.setItem('user', JSON.stringify({
            username: username,
            token: response.token
          }));

          // Redirigir a la página principal (o cualquier otra ruta después de login)
          this.router.navigate(['/']);
        } else {
          alert('Login fallido, no se recibió el token');
        }
      },
      (error) => {
        console.error('Login Error', error);
        alert('Hubo un error al intentar iniciar sesión');
      }
    );
  }
}
