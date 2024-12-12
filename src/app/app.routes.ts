import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailsComponent } from './core/layoutbackup/all-post/post-details/post-details.component';
import { AllPostComponent } from './core/layout/all-post/all-posts.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { NoAuthComponent } from './core/auth/pages/no-auth/no-auth.component';
import { AuthGuard } from './core/auth/verificar.guard';
import { AddComponent } from './core/layout/all-post/add/add.component';
import { PostEditComponent } from './core/layoutbackup/all-post/post-details/post-edit/post-edit.component';

export const routes: Routes = [
  { path: '', component: AllPostComponent, canActivate: [AuthGuard] },
  { path: 'all-posts', canActivate: [AuthGuard], component: AllPostComponent },
  {
    path: 'post-edit/:id',
    canActivate: [AuthGuard],
    component: PostEditComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'add', canActivate: [AuthGuard], component: AddComponent },
  { path: 'no-auth', component: NoAuthComponent },
  {
    path: 'post-details/:id',
    canActivate: [AuthGuard],
    component: PostDetailsComponent,
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
