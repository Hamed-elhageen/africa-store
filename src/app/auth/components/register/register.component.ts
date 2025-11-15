import { Component, OnInit } from '@angular/core';
import {AbstractControl,FormControl,FormGroup,ValidatorFn,Validators,} from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthErrorHandlerService } from './../../services/auth-error-handler.service';
// configuration for sweetalert
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 6000,
    timerProgressBar: false,
});

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
    passwordVisibility: boolean = false;
    errorMessage: string = '';
    registerForm!: FormGroup;

    constructor(
        private registerService: RegisterService,
        private errorHandlerService:AuthErrorHandlerService,
        public router: Router,
        public ngxSpinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.registerForm = new FormGroup(
            {
                nameInput: new FormControl('', [Validators.required,Validators.pattern(/^(?![0-9]+$)[a-zA-Z\u0600-\u06FF\s]+$/),]),
                emailInput: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),]),
                passwordInput: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),]),
                confirmPasswordInput: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),]),
            },
            {
                validators: this.passwordsMatchValidator(), //the validator of the match and mismatch between password input and confirm password input , is put on the form level not on the confirm password validators , because it compare between tow fields and when you put it inside one of this , it wont see the another
            }
        );
    }

    // firstly picking up the form and its input fields so i can work on them
    get nameInput() {
        return this.registerForm.get('nameInput');
    }
    get emailInput() {
        return this.registerForm.get('emailInput');
    }
    get passwordInput() {
        return this.registerForm.get('passwordInput');
    }
    get confirmPasswordInput() {
        return this.registerForm.get('confirmPasswordInput');
    }

    togglePasswordVisibility() {
        this.passwordVisibility = !this.passwordVisibility;
    }

    //custom validator for password matching
    passwordsMatchValidator(): ValidatorFn {
        return (group: AbstractControl): { [key: string]: any } | null => {
            const password = group.get('passwordInput')?.value;
            const confirmPassword = group.get('confirmPasswordInput')?.value;
            return password === confirmPassword
                ? null
                : { passwordsMismatch: true };
        };
    }

    register() {
        if (this.registerForm.valid) {
            this.ngxSpinner.show();
            this.registerService
                .register(this.nameInput?.value,this.emailInput?.value,this.passwordInput?.value,this.confirmPasswordInput?.value).subscribe({
                    next: (response) => {
                        this.ngxSpinner.hide();
                        this.router.navigateByUrl('/authentication/verifyregister');                                               //this token will be passed to the handleSuccess function which is declared under and will add the token to the local storage and update isUserLoggedSubject to true
                        localStorage.setItem('handle',this.registerForm.value.emailInput);                                 //now i save the email to the local storage because i will use it in the verify register to send with the code (not needing to put input field and take it from the user again => best user experience)
                        Toast.fire({
                            icon: 'success',
                            title: `${response.message}`|| "OTP Verification code Sent successfull to you email",
                        });
                    },
                    error: (err) => {
                        console.log('error in register', err.error.data);
                        this.errorHandlerService.handleError(err)
                    },
                });
        }
    }
}
