import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  post = {
    title: '',
    body: '',
    userId: 1,
  };

  userEmail: string = '';
  emailDisplay: string = '';

  constructor(private router: Router, private postService: PostsService) {}

  onSubmit(): void {
    if (this.post.title && this.post.body) {
      this.postService.addPost(this.post).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
      });
    }
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    if (userData) {
      const parsedUser = JSON.parse(userData);
      this.userEmail = parsedUser?.username || 'No Email';
    } else {
      this.userEmail = 'No';
    }

    this.emailDisplay = this.userEmail;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}

/*


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


*/
