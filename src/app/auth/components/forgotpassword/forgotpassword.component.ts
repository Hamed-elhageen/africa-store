import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordService } from '../../services/forget-password.service';
import Swal from 'sweetalert2';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
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
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
email:string=""
// for authentication **********************************************************************
            constructor(private forgetPasswordService:ForgetPasswordService,public ngxSpinner :NgxSpinnerService,public router: Router)
            {

            }

forgetPassword=new FormGroup({                                                                                                                                                            //for picking up the form and its input fields
        emailInput:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        ])
    })
    get emailInput(){
        return this.forgetPassword.get('emailInput');
    }




    onSubmit(){
        if (this.forgetPassword.invalid) return;
        const handle=this.emailInput?.value ?? '';
        this.ngxSpinner.show()
        this.forgetPasswordService.sendVerifyCode(handle).subscribe({
            next: (response) => {
                this.ngxSpinner.hide();
                Toast.fire({
                    icon: 'success',
                    title: `${response.message}`,
                });
                      // Store the email the user entered in the local storage since we will send it again with the new password and password confirmation
                localStorage.setItem('handle',handle);
                this.router.navigateByUrl("/authentication/verification")                                               //go to the OTP  verification page
            },

            error: (err) => {
                this.ngxSpinner.hide();
                this.handleError(err)
        }
    })
}

    private handleError(error: any) {
        let message = 'حدث خطأ غير متوقع، حاول مرة أخرى لاحقًا';
    if (error.status === 0) {
        message ='لا يوجد اتصال بالسيرفر، تحقق من الإنترنت';
    } else if (error.status === 400) {
        message = `${error?.error?.data?.user}` ||'البريد الإلكتروني غير صحيح';
    } else if (error.status === 404 || error.status==422) {
        message = `${error?.error?.data?.user}` ||'البريد الإلكتروني غير مسجل';
    }
    else if (error.status === 500) {
        message =`${error?.error?.data?.user}` || 'مشكلة في السيرفر، حاول لاحقًا';
    }

    Toast.fire({
    icon: 'error',
    title: message,
    confirmButtonText: 'حسناً'
 });
}
    }


