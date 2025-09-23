import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-verifyregister',
  templateUrl: './verifyregister.component.html',
  styleUrl: './verifyregister.component.scss'
})
export class VerifyregisterComponent {
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




// take care of very important thing , you are sending the email ( handle ) with the code and the email i stored in local storage when registering
    handle: string = '';
    constructor(private registerService:RegisterService ,private router:Router,private ngxSpinner:NgxSpinnerService)
    {
        const storedEmail = localStorage.getItem('handle');
    if (storedEmail) {
        this.handle = storedEmail;
    } else {
        this.router.navigate(['/authentication/register']);
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
    if (this.verificationForm.invalid) return;                                                                                                    //first check the form if all its field are good
    const code = `${this.verificationForm.value.firstNumber}${this.verificationForm.value.secondNumber}${this.verificationForm.value.thirdNumber}${this.verificationForm.value.fourthNumber}`;
    this.ngxSpinner.show();
    // Call service to verify OTP code
    this.registerService.verifyUser(this.handle, code).subscribe({
        next: (res) => {
            this.ngxSpinner.hide();
            Swal.fire({
                icon: 'success',
                title: 'Verified',
                text:   `تم تسجيل بياناتك بنجاح , سجل دخولك الان`
        });
        this.router.navigateByUrl('/authentication/login');
        localStorage.removeItem('handle');                              //after verification delete the register email from the local storage
        },
        error: (err) => {
            this.ngxSpinner.hide();
            Swal.fire({
  icon: 'error',
  title: 'Invalid Code',
  text: 'الكود الذى ادخلته غير صحيح',
  width: '550px',
  padding: '1.5em',
  customClass: {
    popup: 'my-swal-popup'
  },
});
        }
    });
}
}
