import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailsComponent } from './all-post/post-details/post-details.component';
import { AllPostComponent } from './all-post/all-posts.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './Login/login.component';
import { NoAuthComponent } from '../guard/no-auth/no-auth.component';
import { AuthGuard } from '../guard/verificar.guard';
import { AddComponent } from './add/add.component';
import { PostEditComponent } from './all-post/post-edit/post-edit.component';

export const routes: Routes = [
  { path: '', component: AllPostComponent, canActivate: [AuthGuard] },
  { path: 'all-posts', canActivate: [AuthGuard], component: AllPostComponent },
  { path: 'post-edit/:id', canActivate:[AuthGuard], component: PostEditComponent},
  { path: 'login', component: LoginComponent },
  { path: 'add', canActivate:[AuthGuard], component: AddComponent},
  { path: 'no-auth', component: NoAuthComponent },
  { path: 'post-details/:id', canActivate:[AuthGuard], component: PostDetailsComponent },
  { path: '**', component: ErrorComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
