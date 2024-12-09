import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AllPostComponent } from './all-post/all-posts.component';
import { PostDetailsComponent } from './all-post/post-details/post-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AllPostComponent, PostDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'user-comments';
}
