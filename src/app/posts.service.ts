import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  // Obtener un comentario por su ID
  getCommentById(id: number): Observable<Comment> {
    const url = `https://jsonplaceholder.typicode.com/comments/${id}`; // URL correcta para comentarios
    return this.http.get<Comment>(url);
  }

  // Obtener todos los comentarios
  getComments(): Observable<Comment[]> {
    const url = 'https://jsonplaceholder.typicode.com/comments';
    return this.http.get<Comment[]>(url);
  }
}
