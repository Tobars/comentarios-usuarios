import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  emailDisplay: string = '';
  isDarkMode: boolean = false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getUserShownOnBar();
    this.emailDisplay = this.postsService.mainUser;
  }

  getUserShownOnBar() {
    this.postsService.getUserShownOnBar();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    // Aquí puedes añadir la lógica para activar/desactivar el modo oscuro, como cambiar clases globales
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }
}
