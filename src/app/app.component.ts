import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AllPostComponent } from './all-post/all-posts.component';
import { PostDetailsComponent } from './all-post/post-details/post-details.component';
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




  constructor (private router: Router, private http: HttpClient){


  }

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

    logout(): void {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }


  }




/*

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


*/
