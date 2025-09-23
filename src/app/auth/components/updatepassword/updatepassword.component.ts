import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.scss'
})
export class UpdatepasswordComponent implements OnInit {
//for password visibility and eye icon
passwordVisibility:boolean=false;
togglePasswordVisibility(){
    this.passwordVisibility=!this.passwordVisibility
}

    //for authentication ********************************************************************************************************************
    handle!: string;
    code!: string;                                             //those are at the local storage are save from the previous stages
    constructor(private forgotPasswordService:ForgetPasswordService,private router:Router,private ngxSpinner:NgxSpinnerService)
{}


updatePassword!:FormGroup;
ngOnInit(): void {
        // Retrieve data from localStorage or a shared service
    this.handle = localStorage.getItem('handle')!;
    this.code = localStorage.getItem('code')!;


    this.updatePassword = new FormGroup(
    {
        newPasswordInput: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
        passwordConfirmationInput: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)])
    },
    { validators: this.passwordsMatchValidator() } // ✅ على مستوى الفورم كله custom validator to check that the pasword and password confirmation are mathcing
    );
    }


    passwordsMatchValidator(): ValidatorFn {
        return (group: AbstractControl): { [key: string]: any } | null => {
        const password = group.get('newPasswordInput')?.value;
        const confirmPassword = group.get('passwordConfirmationInput')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
    };
}


    //picking up the form and its input
    get newPasswordInput(){
        return this.updatePassword.get('newPasswordInput')
    }
     get passwordConfirmationInput(){
        return this.updatePassword.get('passwordConfirmationInput')
    }










    onSubmit() {
        if (this.updatePassword.invalid) return;
        const password = this.updatePassword.value.newPasswordInput || '';
        const password_confirmation=this.updatePassword.value.passwordConfirmationInput||'';                                           //here i picked up the values of the password and confirm password which set in the input fields
        this.ngxSpinner.show();

        this.forgotPasswordService.updatePassword(this.handle, this.code ,password ,password_confirmation).subscribe({                         //in our back end and most of backends you should send the code and email which are stored in local storage from the previos tow stages and after that we will remove them from local storage
            next: () => {
                this.ngxSpinner.hide();
                Toast.fire({
                    icon: 'success',
                    title: 'Password Updated',
                    text: 'تم تغيير كلمة المرور بنجاح , سجل دخولك الان'
            });
            this.router.navigateByUrl('/authentication/success');
            localStorage.removeItem("handle")
            localStorage.removeItem("code")
            },
            error: (err) => {
                this.ngxSpinner.hide();
            Toast.fire({
                icon: 'error',
                title: 'Update Failed',
                text: err?.error?.message || 'حدث خطأ اثناء تغيير كلمة المرور'
            });
            }
        });
    }

}
