import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordService } from '../../services/forget-password.service';
import Swal from 'sweetalert2';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
email:string=""

// for authentication **********************************************************************

            constructor(private forgetPasswordService:ForgetPasswordService,
                public ngxSpinner :NgxSpinnerService,
                public router: Router
            ){

            }


    get emailInput(){
        return this.forgetPassword.get('emailInput');
    }



    forgetPassword=new FormGroup({                                                                                                                                                            //for picking up the form and its input fields
        emailInput:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        ])
    })




    onSubmit(){
        if (this.forgetPassword.invalid) return;
        const email=this.emailInput?.value ?? '';
        this.ngxSpinner.show()
        this.forgetPasswordService.sendVerifyCode(email).subscribe({
            next: () => {
                this.ngxSpinner.hide();
              Swal.fire({
                icon: 'success',
                title: 'تم إرسال الكود',
                text: 'تم إرسال كود التحقق إلى بريدك الإلكتروني.',
              });
                      // Store the email temporarily (maybe in localStorage or a shared service)
                localStorage.setItem('resetEmail',email);
                this.router.navigateByUrl("/authentication/verification")
            },
            error: (err) => {
                this.ngxSpinner.hide();
              Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: err.error?.message || 'حدث خطأ ما. حاول مرة أخرى.',
              });
            }
          });
        }






    }


