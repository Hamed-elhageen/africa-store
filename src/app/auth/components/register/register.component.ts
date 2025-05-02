import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';




// configuration for sweetalert
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    passwordVisibility: boolean = false;

    togglePasswordVisibility() {
        this.passwordVisibility = !this.passwordVisibility;
    }

    // ***************************************************************************************
    //  authentication

    // firstly picking up the form and its input fields
    get nameInput() {
        return this.registerForm.get('nameInput');
    }
    get emailInput() {
        return this.registerForm.get('emailInput');
    }
    get passwordInput() {
        return this.registerForm.get('passwordInput');
    }

    registerForm = new FormGroup({
        nameInput: new FormControl('', [Validators.required]),
        emailInput: new FormControl('', [
            Validators.required,
            Validators.pattern(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            ),
        ]),
        passwordInput: new FormControl('', [
            Validators.required,
            Validators.pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
            ),
        ]),
    });







    //constructor and services dependency injection
    constructor(private registerService:RegisterService,
        public router:Router,
        public ngxSpinner:NgxSpinnerService                                       //for handling loading animations
    ){}



    register(){
        if(this.registerForm.valid){
            this.ngxSpinner.show();                                                                                              //here iam checking if the form is good and there are no errors in it show, first show the spinner
            const formData=this.createFormData();                                                                    //after that i will create and object containing the form data using the funciton createFormData  which is declared under

            this.registerService.register(formData).subscribe({                                                   //here we used the function register which is in the register service and it takes from us the form data and if every thing is good at the server and the user is not logged before , it will return a token
                next:(response)=>{
                    this.handleSuccess(response.access)                                                               //this token will be passed to the handleSuccess function which is declared under and will add the token to the local storage and update isUserLoggedSubject to true
                },
                error:(err)=>{
                    this.handleError(err);                                                                                       //if the reqeust is sent and where there any errors , it will be handled in the handError function which is declared under
                }
            })
        }
    }













createFormData(){                                                                                         //this is the function to create the data writen in the form by the user as object and will be passed in the post reqeust
    const formData=new FormData;
    formData.append('name',this.nameInput?.value || '')
    formData.append('email',this.emailInput?.value || '')
    formData.append('password',this.passwordInput?.value||'')
    return formData;
}










handleSuccess(response:any){
    this.ngxSpinner.hide()
    const token = response.access;
this.registerService.handleRegisterSuccess(token);

Toast.fire({
    icon: 'success',
    title: 'تم التسجيل بنجاح'
  });
}














errorMessage: string = '';

handleError(error: any) {
  this.ngxSpinner.hide();

  if (error instanceof HttpErrorResponse) {
    if (error.status === 400) {
      this.errorMessage = 'البريد الإلكتروني مستخدم بالفعل أو البيانات غير صحيحة';
    } else if (error.status === 500) {
      this.errorMessage = 'حدث خطأ في الخادم';
    } else if (error.status === 0) {
      this.errorMessage = 'تأكد من اتصال الإنترنت';
    } else {
      this.errorMessage = 'حدث خطأ غير متوقع';
    }
  } else {
    this.errorMessage = 'حدث خطأ غير معروف';
  }

  Toast.fire({
    icon: 'error',
    title: this.errorMessage,
  });
}
















}













