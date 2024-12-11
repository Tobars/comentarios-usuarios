import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostsService } from '../posts.service'


@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostComponent implements OnInit {
  posts: any[] = [];
  userEmail: string = '';
  emailDisplay: string = '';
  selectedPostId: number | null = null;
  apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    if (userData) {
      const parsedUser = JSON.parse(userData);
      this.userEmail = parsedUser?.email || 'No Email';
    } else {
      this.userEmail = 'No Email';
    }

    this.emailDisplay = this.userEmail;

    this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(data => {
        this.posts = data;
      });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  selectPostForDeletion(postId: number): void {
    this.selectedPostId = postId;
  }

  deletePost(): void {
    const postIdToDelete = this.selectedPostId !== null ? this.selectedPostId : 1;

    this.http.delete(`${this.apiUrl}/${postIdToDelete}`).subscribe(
      (response) => {
        console.log('Post eliminado con éxito', response);
        // Elimina el post de la lista local
        this.posts = this.posts.filter(post => post.id !== postIdToDelete);
        this.selectedPostId = null; // Resetea el ID seleccionado
      },
      (error) => {
        console.error('Error al eliminar el post', error);
        alert('Hubo un error al eliminar el post');
      }
    );
  }
}
