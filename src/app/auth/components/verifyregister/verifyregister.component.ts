import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { RegisterService } from '../../services/register.service';
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
    selector: 'app-verifyregister',
    templateUrl: './verifyregister.component.html',
    styleUrl: './verifyregister.component.scss'
})
export class VerifyregisterComponent implements OnInit{
    handle: string = '';
    verificationForm=new FormGroup({
         //each input field will accept only one number
        firstNumber:new FormControl('',[Validators.required,     Validators.pattern('^[0-9]$')]),
        secondNumber:new FormControl('',[Validators.required,     Validators.pattern('^[0-9]$')]),
        thirdNumber:new FormControl('',[Validators.required,     Validators.pattern('^[0-9]$')]),
        fourthNumber:new FormControl('',[Validators.required,     Validators.pattern('^[0-9]$')] ),
    })

    // take care of very important thing , you are sending the email ( handle ) with the code and the email i stored in local storage when registering
    constructor(private registerService:RegisterService ,private router:Router,private ngxSpinner:NgxSpinnerService)
    {}

    ngOnInit(): void {
            const storedEmail = localStorage.getItem('handle');
            if (storedEmail) {
                this.handle = storedEmail;
            } else {
            this.router.navigate(['/authentication/register']);
        }
    }


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



    // Auto-focus to the next or previous field
onInputChange(event: any,nextInput?: HTMLInputElement | null,prevInput?: HTMLInputElement | null) {
    const input = event.target as HTMLInputElement;                                                                                                                         //here i pick up the input element i input in
  // لو كتب رقم → يروح للبعده
    if (input.value.length === 1 && nextInput) {
        nextInput.focus();
    }
  // لو مسح (Backspace) → يرجع للقبله
    if (input.value.length === 0 && prevInput) {
        prevInput.focus();
    }
}



     // Handle form submission
onSubmit() {
    if (this.verificationForm.invalid) return;
    const code = `${this.verificationForm.value.firstNumber}${this.verificationForm.value.secondNumber}${this.verificationForm.value.thirdNumber}${this.verificationForm.value.fourthNumber}`;
    this.ngxSpinner.show();
    // Call service to verify OTP code
    this.registerService.verifyUser(this.handle, code).subscribe({
        next: (res) => {
            this.ngxSpinner.hide();
            Toast.fire({
                icon: 'success',
                text:   `${res.message} ||` || 'user registered successfully , login now!'
        });
        this.router.navigateByUrl('/authentication/login');
        localStorage.removeItem('handle');                                                                                                       //after verification delete the register email from the local storage
        },
        error: (err) => {
            this.ngxSpinner.hide();
            Toast.fire({
                icon: 'error',
                text: `${err?.error?.message}` || "Failed to create the account",
            });
        }
    });
    }
}
