import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // Para hacer peticiones HTTP
import { CommonModule } from '@angular/common'; // Para usar directivas comunes como ngFor
import { RouterModule } from '@angular/router'; // Para routerLink
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Usamos el modal de Bootstrap

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostComponent implements OnInit {
  posts: any[] = [];
  userEmail: string = '';   // Variable para almacenar el correo
  emailDisplay: string = ''; // Variable para mostrar el correo en la interfaz
  postIdToDelete: number | null = null; // Guardamos el ID del post a eliminar

  constructor(private router: Router, private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    if (userData) {
      const parsedUser = JSON.parse(userData);

      this.userEmail = parsedUser?.email || 'No Email';

      this.emailDisplay = this.userEmail;

    } else {
      this.userEmail = 'No Email';
      this.emailDisplay = this.userEmail;
    }

    // Cargar posts
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(data => {
        this.posts = data;
      });
  }

  logout(): void {
    localStorage.removeItem('user'); // Eliminamos el 'user' de localStorage
    this.router.navigate(['/login']); // Redirigimos al login
  }

  confirmDelete(postId: number): void {
    this.postIdToDelete = postId; // Guardamos el ID del post a eliminar
    const modal = new window.bootstrap.Modal(document.getElementById('confirmDeleteModal') as HTMLElement);
    modal.show(); // Mostramos el modal
  }

  deletePost(postId: number): void {
    if (postId) {
      // Realizamos la solicitud DELETE a la API
      this.http.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .subscribe({
          next: () => {
            // Si la eliminación fue exitosa, actualizamos la tabla
            this.posts = this.posts.filter(post => post.id !== postId);
            // Cerramos el modal
            const modal = new window.bootstrap.Modal(document.getElementById('confirmDeleteModal') as HTMLElement);
            modal.hide();
          },
          error: (err) => {
            alert('Error al eliminar el post.');
            console.error(err);
          }
        });
    }
  }

  addPost(): void {
    this.router.navigate(['/all-posts']);
  }
}
