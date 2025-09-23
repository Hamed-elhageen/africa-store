import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordService } from '../../services/forget-password.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
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
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent {

    verificationForm=new FormGroup({
        firstNumber:new FormControl('',[Validators.required,     Validators.pattern('^[0-9]$')]),
        secondNumber:new FormControl('',[Validators.required,     Validators.pattern('^[0-9]$')]),
        thirdNumber:new FormControl('',[Validators.required,     Validators.pattern('^[0-9]$')]),
        fourthNumber:new FormControl('',[Validators.required,     Validators.pattern('^[0-9]$')] ),
    })                                                  //each input field will accept only one number
                                                     // picking up the input fields to work on
    get firstNumber(){
        return this.verificationForm.get('firstNumber')
    }
    get secondNumber(){
        return this.verificationForm.get('secondNumber')
    }
    get thirdNumber(){
        return this.verificationForm.get('thirdNumber')
    }
    get fourthNumber(){
        return this.verificationForm.get('fourthNumber')
    }




    handle: string = '';
    constructor(private forgetPasswordService:ForgetPasswordService , private router:Router, private ngxSpinner:NgxSpinnerService)
    {
        const storedEmail = localStorage.getItem('handle');
        if (storedEmail) {
            this.handle= storedEmail;
        } else {
            this.router.navigate(['/authentication/forgotpassword']);
    }
    }



  // Auto-focus to the next field when one is filled
    onInputChange(event: any, nextInput: HTMLInputElement) {
    if (event.target.value.length === 1 && nextInput) {
        nextInput.focus();
    }
    }






     // Handle form submission
  onSubmit() {
    if (this.verificationForm.invalid) return;
    const code = `${this.verificationForm.value.firstNumber}${this.verificationForm.value.secondNumber}${this.verificationForm.value.thirdNumber}${this.verificationForm.value.fourthNumber}`;
    this.ngxSpinner.show();
    // Call service to verify OTP code
    this.forgetPasswordService.verifyResetCode(this.handle, code).subscribe({
        next: (res) => {
            this.ngxSpinner.hide();
            Toast.fire({
                icon: 'success',
                title: 'Verified',
                text: 'تم تأكيد الكود الخاص بك , يمكنك تغير كلمة المرور الان .'
        });
        this.router.navigateByUrl('/authentication/updatepassword');
        localStorage.setItem("code",code)                                                                                                          //here we saved the code to be sent with the password and new password
      },
      error: (err) => {
        this.ngxSpinner.hide();
        Toast.fire({
          icon: 'error',
          title: 'Invalid Code',
          text:  'الكود الذى ادخلته غير صحيح'
        });
      }
    });
  }
    }






