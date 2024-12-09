import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../posts.service';
import { CommonModule } from '@angular/common';
import { AllPostComponent } from '../all-posts.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, AllPostComponent, RouterModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent {
  comment: any;
errorMessage: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postService: PostsService
  ) {}

  ngOnInit() {
    // Obtener el ID del comentario desde la URL
    const commentId = this.route.snapshot.paramMap.get('id');
    if (commentId) {
      // Llamar al servicio para obtener el comentario por su ID
      this.postService
        .getCommentById(parseInt(commentId))
        .subscribe((comment) => {
          this.comment = comment;
        });
    }
  }
}
