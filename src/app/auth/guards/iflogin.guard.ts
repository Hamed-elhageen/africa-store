import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';

export const ifloginGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService= inject(LoginService)
    let  isLogged:boolean=false ;

    authService.isUserLoggedSubject.subscribe({
        next:(res)=>{
            isLogged=res;
        },
        error:(error)=>{
            console.error(error)
        }
    })




    if(isLogged){
        return true;
    }
    else{
    //i want to make the message appears to be dynamic not the same for the cart and fav , so i will get from the pass the place iam going to
    // نجيب اسم الـ route
    const currentPath = route.routeConfig?.path;
    // نحدد الرسالة حسب المكان
    let message = 'Please login to access this page';

    if (currentPath?.includes('cart')) {
        message = 'You must login to access your cart';
    } else if (currentPath?.includes('favorites')) {
        message = 'You must login to access your favorites';
    }


        Swal.fire({
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#1C6F37',
        cancelButtonColor: '#d33'
    }).then((result) => {
        if(result.isConfirmed){
            router.navigate(['/authentication/login']);
        }
    });
        return false;

    }
};
