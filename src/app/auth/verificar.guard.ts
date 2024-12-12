import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const usuarioAuth = localStorage.getItem('user'); // Verificar si existe el usuario en localStorage

  if (usuarioAuth) {
    return true; // Usuario autenticado, permite el acceso
  } else {
    router.navigate(['/login']);
    return false;
  }
};
