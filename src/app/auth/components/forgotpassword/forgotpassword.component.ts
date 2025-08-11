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
            ){}

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
            next: () => {
                this.ngxSpinner.hide();
              Swal.fire({
                icon: 'success',
                title: 'تم إرسال الكود',
                text: 'تم إرسال كود التحقق إلى بريدك الإلكتروني.',
              });
                      // Store the email temporarily (maybe in localStorage or a shared service)
                localStorage.setItem('handle',handle);
                this.router.navigateByUrl("/authentication/verification")
            },
            error: (err) => {
                this.ngxSpinner.hide();
                console.log("the error is :" +err)
              Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text:  'حدث خطأ ما. حاول مرة أخرى.',
              });
            }
          });
        }

    }


