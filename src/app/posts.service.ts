import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './data.model';

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
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

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
}
