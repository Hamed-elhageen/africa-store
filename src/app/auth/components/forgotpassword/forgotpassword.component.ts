import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordService } from '../../services/forget-password.service';
import Swal from 'sweetalert2';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthErrorHandlerService } from '../../services/auth-error-handler.service';
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
    forgetPassword=new FormGroup({                                                                                                                                                            //for picking up the form and its input fields
        emailInput:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)])
    })

    constructor(private forgetPasswordService:ForgetPasswordService,private errorHandler:AuthErrorHandlerService,public ngxSpinner :NgxSpinnerService,public router: Router)
        {}

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
                    title: `${response.message}`||"OTP Code sent to your mail successfully",
                });
                localStorage.setItem('handle',handle);                                                                                                    // Store the email the user entered in the local storage since we will send it again with the new password and password confirmation
                this.router.navigateByUrl("/authentication/verification")                                                                      //go to the OTP  verification page
            },

            error: (err) => {
                this.ngxSpinner.hide();
                console.log("error when sending the email for forgot password" +err)
                this.errorHandler.handleError(err)
        }
    })
}

}


