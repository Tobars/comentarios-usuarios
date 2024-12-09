import { Component, OnInit } from '@angular/core';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostsService } from '../posts.service';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [PostDetailsComponent, CommonModule, NgFor, RouterModule],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css',
})
export class AllPostComponent implements OnInit {
  comments: any[] = [];

  constructor(
    private readonly postService: PostsService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    // Fetch all comments initially
    this.postService.getComments().subscribe((comments) => {
      this.comments = comments;
    });
  }

  goToDetails(commentId: number): void {
    // Asegúrate de que el ID sea correcto y redirige a la página de detalles
    console.log('Redirigiendo a post-details con ID:', commentId); // Para depurar
    this.router.navigate(['post-details', commentId]);
  }

}
