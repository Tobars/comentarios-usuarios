import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

      setTimeout(() => {
        this.posts = this.posts.filter(post => post.id !== this.selectedPostId);
        console.log(`Post con ID ${this.selectedPostId} eliminado.`);
        this.selectedPostId = null;
      }, 200);

  }


}
