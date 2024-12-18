import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
    selector: 'app-all-posts',
    standalone: true,
    templateUrl: './all-posts.component.html',
    styleUrls: ['./all-posts.component.css'],
    imports: [CommonModule, RouterModule, NavBarComponent]
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

  testing(){
    this.postsService.testing();



  }
}
