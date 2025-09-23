import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ChangepasswordService } from '../../services/changepassword.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {
passwordVisibility:boolean=false;
togglePasswordVisibility(){
    this.passwordVisibility=!this.passwordVisibility
}















    //for authentication ********************************************************************************************************************
    changePassword!:FormGroup;


ngOnInit(): void {
        // Retrieve data from localStorage or a shared service

      this.changePassword = new FormGroup(
    {

         oldPasswordInput: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      ]),

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

    //picking up the form and its input

    get oldPasswordInput(){
        return this.changePassword.get('oldPasswordInput')
    }
    get newPasswordInput(){
        return this.changePassword.get('newPasswordInput')
    }
     get passwordConfirmationInput(){
        return this.changePassword.get('passwordConfirmationInput')
    }









passwordsMatchValidator(): ValidatorFn {
  return (group: AbstractControl): { [key: string]: any } | null => {
    const password = group.get('newPasswordInput')?.value;
    const confirmPassword = group.get('passwordConfirmationInput')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  };
}







constructor(private changePasswordService:ChangepasswordService,
    private router:Router,
    private ngxSpinner:NgxSpinnerService
){}





    onSubmit() {
        if (this.changePassword.invalid) return;
        const old_password=this.changePassword.value.oldPasswordInput||'';
        const new_password = this.changePassword.value.newPasswordInput || '';
        const new_password_confirmation=this.changePassword.value.passwordConfirmationInput||'';
        this.ngxSpinner.show();

        this.changePasswordService.changePassword(old_password, new_password,new_password_confirmation).subscribe({
          next: () => {
            this.ngxSpinner.hide();
            Swal.fire({
              icon: 'success',
              title: 'Password changed',
              text: 'Your password has been successfully changed.'
            });
            this.router.navigateByUrl('/');
          },
          error: (err) => {
            this.ngxSpinner.hide();
            Swal.fire({
              icon: 'error',
              title: 'Update Failed',
              text: err?.error?.message || 'There was a problem changing your password.'
            });
          }
        });
      }

}
