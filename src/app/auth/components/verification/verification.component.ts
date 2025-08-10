import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordService } from '../../services/forget-password.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent {


    verificationForm=new FormGroup({
        firstNumber:new FormControl('',Validators.required),
        secondNumber:new FormControl('',Validators.required),
        thirdNumber:new FormControl('',Validators.required),
        fourthNumber:new FormControl('',Validators.required),
    })

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

    email: string = '';

    constructor(private forgetPasswordService:ForgetPasswordService ,
        private router:Router,
        private ngxSpinner:NgxSpinnerService
    ){
        const storedEmail = localStorage.getItem('resetEmail');
    if (storedEmail) {
      this.email = storedEmail;
    } else {
    //   this.router.navigate(['/authentication/forgotpassword']);
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
    this.forgetPasswordService.verifyResetCode(this.email, code).subscribe({
      next: (res) => {
        this.ngxSpinner.hide();
        Swal.fire({
          icon: 'success',
          title: 'Verified',
          text: 'Code is correct. You can now reset your password.'
        });
        this.router.navigateByUrl('/authentication/updatepassword');
      },
      error: (err) => {
        this.ngxSpinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Invalid Code',
          text: err?.error?.message || 'The code is incorrect. Please try again.'
        });
      }
    });
  }
    }






