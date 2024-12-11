import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  postForm: FormGroup;
  postId: number = 0;
  errorMessage: string | null = null;
  postData: any | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    // Inicializamos el formulario con validaciones
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    // Obtenemos el ID del post desde la ruta
    this.postId = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);

    // Cargar los datos del post
    this.fetchPostDetails();
  }

  fetchPostDetails(): void {
    this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${this.postId}`)
      .subscribe({
        next: (data) => {
          this.postData = data;
          this.postForm.setValue({
            title: data.title,
            body: data.body
          });
        },
        error: (err) => {
          this.errorMessage = 'No se pudo obtener el post. Intenta más tarde.';
        }
      });
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      return;
    }

    const updatedPost = {
      id: this.postId,
      title: this.postForm.value.title,
      body: this.postForm.value.body,
      userId: this.postData?.userId || 1
    };

    this.http.put(`https://jsonplaceholder.typicode.com/posts/${this.postId}`, updatedPost)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.errorMessage = 'Hubo un error al guardar los cambios.';
        }
      });
  }

  get title() {
    return this.postForm.get('title');
  }

  get body() {
    return this.postForm.get('body');
  }
}
