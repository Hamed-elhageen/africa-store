import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';

export const ifadminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(LoginService);

  // أولاً نعرف هل هو logged in ولا لأ
  const isLoggedIn = authService.isUserLoggedIn;
  const isAdmin = authService.isAdmin();

  if (isLoggedIn && isAdmin) {
    // ✅ لو مسجل دخول وفعلاً admin
    return true;
  } else {
    // ❌ لو مش admin أو مش logged in
    let message = '';

    if (!isLoggedIn) {
      message = 'You must login first to access the admin dashboard.';
    } else if (!isAdmin) {
      message = 'Access denied. Only admins can open the dashboard.';
    }

    Swal.fire({
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d33'
    }).then(() => {
      // لو مش لوجين يرجعه على صفحة اللوجين
      if (!isLoggedIn) {
        router.navigate(['/authentication/login']);
      } else {
        // لو logged in بس مش admin نوديه على الصفحة الرئيسية
        router.navigate(['/home']);
      }
    });

    return false;
  }
};
