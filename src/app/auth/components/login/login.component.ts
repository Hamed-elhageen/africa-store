import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';



//  configuration for sweet alert , data about the alert which will appear and you can change it                           This creates a reusable toast notification with custom styling and position.
// Will be used to show login success or error messages.
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: false,
  });


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

 correctPassword:string="12345abcde"
 passwordVisibility:boolean=false
 togglePasswordVisibility(){
    this.passwordVisibility=!this.passwordVisibility;
 }
//  ****************************************************************************************************************************************************
// authentication start
// this is for authentication
get email(){
    return this.loginForm.get('email')
}
get password(){
    return this.loginForm.get('password')
}





// linking the form and its fields in html with reactive forms
loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });




    constructor(private loginService:LoginService ,
        private router:Router,
        private spinner:NgxSpinnerService                                          // firstly , if you want to use ngxspinner animation for handling loading spinner animations , you should do       "npm install ngx-spinner" and after that go to app module.ts and import  the two modules      "import { NgxSpinnerModule } from "ngx-spinner";"     "import { BrowserAnimationsModule } from '@angular/platform-browser/animations';" and put them in imports and now ;you can go to your component which is login here and "import { NgxSpinnerService } from 'ngx-spinner';" and inject the service to your component constructor and use it
    ){}






    login(){                                                                                                                          //this is the login function which i will use when clicking on login button and it will use the service and the fucntions inside it to handle the login request process and sending the token to the local storage after it using handle success function
        if(this.loginForm.valid){
            this.spinner.show();
            const formData =this.createFormData();                                                          //using the funciton createformData which i did under , i will get the data in the form in the shape of formdata

            this.loginService.login(formData).subscribe({                                                      //using the login funciton which is in the service which sends the request and when it returns a response with a token i will be passed to handle success fucntion which will send the token to the local storage and update the login status;
                                                                                                                                        //as you know login function was taking as a parameter the data in the form and take it to the backend to check
                next:(response)=>this.handleSuccess(response),
                error:(err)=>this.handleError(err)
            })
        }
    }









    createFormData(){
        const formData=new FormData;                                                                                 //i will make an object called form data , inside it i will put the values of the input fields of the form
        formData.append('email' , this.loginForm.get('email')?.value || '' );
        formData.append('password',this.loginForm.get('password')?.value || '' )
        return formData
    }









    handleSuccess(response:any){                                                                                    //you use this function in login function above and you passed to it a response and now we will know what it will do to this response
        this.spinner.hide();
        const token =response.access;
        this.loginService.handleLoginSuccess(token);                                                      //this function was taking the token and save it to the local storage
        // this.loginService.isUserLoggedSubject.next(true);
        this.router.navigate(['/']); // Go to homepage
        Toast.fire({
          icon: 'success',
          title: 'تم تسجيل الدخول بنجاح'
        });

    }












    errorMessage: string = '';
    handleError(error: any) {
        this.spinner.hide();

        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.errorMessage = 'يوجد خطأ فى اسم المستخدم او كلمه السر';
          } else if (error.status === 500) {
            this.errorMessage = 'حدث خطأ في الخادم';
          } else if (error.status === 0) {
            this.errorMessage = 'حدث خطأ في الانترنت';
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
