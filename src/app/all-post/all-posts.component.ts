import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // Para hacer peticiones HTTP
import { CommonModule } from '@angular/common'; // Para usar directivas comunes como ngFor
import { RouterModule } from '@angular/router'; // Para routerLink

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

  constructor(private router: Router, private http: HttpClient) { }

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

    this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(data => {
        this.posts = data;
      });
  }

  logout(): void {
    localStorage.removeItem('user'); // Eliminamos el 'user' de localStorage
    this.router.navigate(['/login']); // Redirigimos al login
  }

  deletePost(postId: number): void {
    this.posts = this.posts.filter(post => post.id !== postId);
  }

  addPost(): void {
    this.router.navigate(['/all-posts']);
  }
}
