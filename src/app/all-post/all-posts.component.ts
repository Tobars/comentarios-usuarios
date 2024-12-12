import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
})
export class AllPostComponent implements OnInit {
  posts: any[] = [];
  userEmail: string = '';
  emailDisplay: string = '';
  selectedPostId: number | null = null;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit(): void {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((data) => {
        this.posts = data;
      });
  }

  getUserShownOnBar() {
    this.postsService.getUserShownOnBar();
  }

  selectPostForDeletion(postId: number): void {
    this.selectedPostId = postId;
  }

  logout(): void {
    this.postsService.logout();
  }
  deletePost() {
    this.postsService.deletePost();
  }
}
