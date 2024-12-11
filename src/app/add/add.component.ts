import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  post = {
    title: '',
    body: '',
    userId: 1
  };

  constructor(private router: Router, private postService: PostsService) {}

  onSubmit(): void {
    if (this.post.title && this.post.body) {
      this.postService.addPost(this.post).subscribe({
        next: () => {
          this.router.navigate(['/']);
        }
      });
    }
  }
}
