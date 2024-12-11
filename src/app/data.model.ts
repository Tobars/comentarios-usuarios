import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definición del modelo para Post y Comment
export interface Post {
  userId: number;
  title: string;
  body: string;
  id?: number; // id es opcional ya que será generado por la API
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  // Obtener un comentario por su ID
  getCommentById(id: number): Observable<Comment> {
    const url = `https://jsonplaceholder.typicode.com/comments/${id}`;
    return this.http.get<Comment>(url);
  }

  // Obtener todos los comentarios
  getComments(): Observable<Comment[]> {
    const url = 'https://jsonplaceholder.typicode.com/comments';
    return this.http.get<Comment[]>(url);
  }

  // Agregar un nuevo post
  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }
}
