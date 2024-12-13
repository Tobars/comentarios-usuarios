import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../data.model';
import { Router } from '@angular/router';
import { AllPostComponent } from '../layout/all-post/all-posts.component';

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient, private router: Router) {}
  public apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  posts: any[] = [];
  mainUser: string = '';
  emailDisplay: string = '';
  selectedPostId: number | null = null;

  // Obtener un comentario por su ID
  getCommentById(id: number): Observable<Comment> {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`; // URL correcta para comentarios
    return this.http.get<Comment>(url);
  }

  // Obtener todos los comentarios
  getComments(): Observable<Comment[]> {
    const url = 'https://jsonplaceholder.typicode.com/comments';
    return this.http.get<Comment[]>(url);
  }
  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  deletePost(): void {
    const postIdToDelete =
      this.selectedPostId !== null ? this.selectedPostId : 1;

    this.http.delete(`${this.apiUrl}/${postIdToDelete}`).subscribe(
      (response) => {
        console.log('Post eliminado con éxito', response);
        // Elimina el post de la lista local
        this.posts = this.posts.filter((post) => post.id !== postIdToDelete);
        this.selectedPostId = null; // Resetea el ID seleccionado
      },
      (error) => {
        console.error('Error al eliminar el post', error);
        alert('Hubo un error al eliminar el post');
      }
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  getUserShownOnBar(): void {
    const userData = localStorage.getItem('user');

    if (userData) {
      const parsedUser = JSON.parse(userData);
      this.mainUser = parsedUser?.username || 'No Email';
    } else {
      this.mainUser = 'No user data'; 
    }
  }


  testing() {
    console.log(this.mainUser);
  }
}
