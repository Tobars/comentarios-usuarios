import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Asegúrate de importar Router para la redirección

@Component({
  selector: 'app-no-auth',
  standalone: true,
  imports: [],
  templateUrl: './no-auth.component.html',
  styleUrls: ['./no-auth.component.css']  // Usa 'styleUrls' en lugar de 'styleUrl'
})
export class NoAuthComponent {

  // Inyecta el router para navegar entre las páginas
  constructor(private router: Router) { }

  // Método que navega a la página de inicio
  navigateHome(): void {
    this.router.navigate(['/']);  // Redirige a la página de inicio o cualquier ruta que desees
  }

}
