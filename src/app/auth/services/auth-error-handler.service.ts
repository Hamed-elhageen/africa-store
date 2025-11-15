import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    customClass: {
        popup: 'my-toast-style'
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
});
@Injectable({
    providedIn: 'root'
})
export class AuthErrorHandlerService {

constructor(private spinner :NgxSpinnerService) { }
    handleError(error: any): string {
        this.spinner.hide()
        let message = 'Something went wrong , Try again later';
        if (error instanceof HttpErrorResponse) {

        if (error.status === 401) {
            message = error?.error?.message || 'Error in Data you entered';
        }
        else if (error.status === 500) {
            message = error?.error?.message || 'Thers is an error in the server , please try again later';
        }
        else if (error.status === 0) {
            message = error?.error?.message ||'Internet Error , check your connection';
        }
        else {
            message = 'Unexpected Error occured';
        }

    } else {
    message = 'Unkown Error';
    }

    Toast.fire({
        icon: 'error',
        title: message,
    });

    return message;
    }
}
