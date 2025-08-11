import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ForgetPasswordService } from '../../services/forget-password.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.scss'
})
export class UpdatepasswordComponent implements OnInit {

passwordVisibility:boolean=false;
togglePasswordVisibility(){
    this.passwordVisibility=!this.passwordVisibility
}















    //for authentication ********************************************************************************************************************
    handle!: string;
    code!: string;                                             //those are at the local storage are save from the previous stages
updatePassword!:FormGroup;



    //picking up the form and its input
    get newPasswordInput(){
        return this.updatePassword.get('newPasswordInput')
    }
     get passwordConfirmationInput(){
        return this.updatePassword.get('passwordConfirmationInput')
    }









passwordsMatchValidator(): ValidatorFn {
  return (group: AbstractControl): { [key: string]: any } | null => {
    const password = group.get('newPasswordInput')?.value;
    const confirmPassword = group.get('passwordConfirmationInput')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  };
}







constructor(private forgotPasswordService:ForgetPasswordService,
    private router:Router,
    private ngxSpinner:NgxSpinnerService
){}
    ngOnInit(): void {
        // Retrieve data from localStorage or a shared service
    this.handle = localStorage.getItem('handle')!;
    this.code = localStorage.getItem('code')!;






      this.updatePassword = new FormGroup(
    {
      newPasswordInput: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      ]),
      passwordConfirmationInput: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      ])
    },
    { validators: this.passwordsMatchValidator() } // ✅ على مستوى الفورم كله
  );
    }





    onSubmit() {
        if (this.updatePassword.invalid) return;
        const password = this.updatePassword.value.newPasswordInput || '';
        const password_confirmation=this.updatePassword.value.passwordConfirmationInput||'';
        this.ngxSpinner.show();

        this.forgotPasswordService.updatePassword(this.handle, this.code ,password ,password_confirmation).subscribe({
          next: () => {
            this.ngxSpinner.hide();
            Swal.fire({
              icon: 'success',
              title: 'Password Updated',
              text: 'Your password has been successfully updated.'
            });
            this.router.navigateByUrl('/authentication/login');
            localStorage.removeItem("handle")
            localStorage.removeItem("code")
          },
          error: (err) => {
            this.ngxSpinner.hide();
            Swal.fire({
              icon: 'error',
              title: 'Update Failed',
              text: err?.error?.message || 'There was a problem updating your password.'
            });
          }
        });
      }

}
