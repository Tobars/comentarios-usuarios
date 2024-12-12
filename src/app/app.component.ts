import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AllPostComponent } from './core/layout/all-post/all-posts.component';
import { PostDetailsComponent } from './core/layoutbackup/all-post/post-details/post-details.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'user-comments';
  userEmail: string = '';
  emailDisplay: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    if (userData) {
      const parsedUser = JSON.parse(userData);
      this.userEmail = parsedUser?.email || 'No Email';
    } else {
      this.userEmail = 'No Email';
    }

    this.emailDisplay = this.userEmail;
  }
}
