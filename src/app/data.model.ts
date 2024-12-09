import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// here I defined the model that I'll use
interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  // Find  a single comment by ID
  getCommentById(id: number): Observable<Comment> {
    const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
    return this.http.get<Comment>(url)

  }

  getComments(): Observable<Comment[]> {
    const url = 'https://jsonplaceholder.typicode.com/comments';
    return this.http.get<Comment[]>(url)





  }



  }




