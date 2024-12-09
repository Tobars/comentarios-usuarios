import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailsComponent } from './all-post/post-details/post-details.component';
import { AllPostComponent } from './all-post/all-posts.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
  {path: '', component : AllPostComponent},
  { path: 'all-posts', component: AllPostComponent },
  { path: 'post-details/:id', component: PostDetailsComponent },  // Ruta con parámetro :id
  { path: '**', component: ErrorComponent } // Ruta de error para manejar rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
