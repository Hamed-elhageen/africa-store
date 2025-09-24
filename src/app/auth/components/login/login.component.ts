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
    position: 'top-end',
    customClass: {
  popup: 'my-toast-style'
    },
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: false,
  });

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
    //those for handling the password input field eye icon
    passwordVisibility:boolean=false
    togglePasswordVisibility(){
    this.passwordVisibility=!this.passwordVisibility;
 }
//  ****************************************************************************************************************************************************
// authentication start

// linking the form and its fields in html with reactive forms
loginForm = new FormGroup({
    email: new FormControl('', [Validators.required ,Validators.email]),
    password: new FormControl('', [Validators.required ,Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    )]),
  });


//here we picked up the two input fields
get email(){
    return this.loginForm.get('email')
}
get password(){
    return this.loginForm.get('password')
}
//now you can use those fields directly




    constructor(private loginService:LoginService ,private router:Router, private spinner:NgxSpinnerService  )                                        // firstly , if you want to use ngxspinner animation for handling loading spinner animations , you should do       "npm install ngx-spinner" and after that go to app module.ts and import  the two modules      "import { NgxSpinnerModule } from "ngx-spinner";"     "import { BrowserAnimationsModule } from '@angular/platform-browser/animations';" and put them in imports and now ;you can go to your component which is login here and "import { NgxSpinnerService } from 'ngx-spinner';" and inject the service to your component constructor and use it
    {
            //constructor is the first thing to be executed when the opeining the component
    }


                                                                                                                                         //as i said to you in the service , first you will send the request with the login function and after that you handle the error function and success fucntion , and here you need create from data funciton to send the input fields values as form data with the login request

    login(){                                                                                                                          //this is the login function which i will use when clicking on login button and it will use the service and the fucntions inside it to handle the login request process and sending the token to the local storage after it using handle success function , but first , i check on the form , if theere are no errors an all its input fields are valid , execute what iside it
        if(this.loginForm.valid){                                                                                            //cecking of the form is valid , means checking that all its input fields are valid
            this.spinner.show();
            const formData =this.createFormData();                                                          //using the funciton createformData which i did under , i will get the data in the form in the shape of formdata
            this.loginService.login(formData).subscribe({                                                      //using the login funciton which is in the service which sends the request and when it returns a response with a token i will be passed to handle success fucntion which will send the token to the local storage and update the login status;
                                                                                                                                        //as you know login function was taking as a parameter the data in the form and take it to the backend to check
                next:(response)=>this.handleSuccess(response),                                         //if there is no error , it will execute next function which contains handle success function taking the response of the request
                error:(err)=>this.handleError(err)                                                                  // and if there is an error it will execute the error function which execute handleerror function
            })
        }
    }
    //summary : when sending the request with the form data the user enters in the input fields , if everything is good and data sent to the server successfully , we will execute the handlesuccess function which takes the token and saves it to local storage and update login status and show you a toast with successfully login , if there were an error , it will execute the handleerror function which checks on the errror type and gives you a toast with it . and take care , if we executes handle success or handle error , we should stop the spinner loading




    createFormData(){
        const formData=new FormData;                                                                                 //i will make an object called form data , inside it i will put the values of the input fields of the form and these form data will be sent to the server when logging in
        formData.append('email' , this.email?.value || '' );
        formData.append('password',this.password?.value || '' )
        return formData
    }









    handleSuccess(response:any){                                                                                    //you use this function in login function above and you passed to it a response and now we will know what it will do to this response
        this.spinner.hide();
        const token =response.data.token;                                                                              //now you picked up the token back from the backend
        this.loginService.handleLoginSuccess(token);                                                      //this function was taking the token and save it to the local storage
        Toast.fire({
            icon: 'success',
            title: `${response.message}`
        });

setTimeout(() => {
        this.router.navigate(['/']); // Go to homepage
      }, 1000);
    }







    errorMessage: string = '';
    handleError(error: any) {
        this.spinner.hide();
        if (error instanceof HttpErrorResponse) {                                                                                                         //here iam checking if the error comes from the server when response
            if (error.status === 401) {
            this.errorMessage = `${error?.error?.message}`||'يوجد خطأ فى اسم المستخدم او كلمه السر';
            } else if (error.status === 500) {
            this.errorMessage =`${error?.error?.message}`|| 'حدث خطأ في الخادم';
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
