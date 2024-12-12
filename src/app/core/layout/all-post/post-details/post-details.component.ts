import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../../services/posts.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Comment } from '../../../../data.model';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  comment: Comment | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postService: PostsService
  ) {}

  ngOnInit(): void {
    const commentId = this.route.snapshot.paramMap.get('id');
    if (commentId) {
      this.fetchPostDetails(commentId);
    } else {
      this.errorMessage = 'El ID del comentario no es válido';
      this.isLoading = false;
    }
  }

  fetchPostDetails(commentId: string): void {
    this.postService.getCommentById(parseInt(commentId, 10)).subscribe({
      next: (comment) => {
        this.comment = comment;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage =
          'Hubo un error al cargar los detalles del comentario. Intenta más tarde.';
        this.isLoading = false;
      },
    });
  }
}
