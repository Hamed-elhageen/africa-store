import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    email!: string;
  code!: string;
    //picking up the form and its input
    get newPasswordInput(){
        return this.updatePassword.get('newPasswordInput')
    }
updatePassword=new FormGroup({
    newPasswordInput: new FormControl('' ,[Validators.required, Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    )])
})



constructor(private forgotPasswordService:ForgetPasswordService,
    private router:Router,
    private ngxSpinner:NgxSpinnerService
){}
    ngOnInit(): void {
        // Retrieve data from localStorage or a shared service
    this.email = localStorage.getItem('email')!;
    this.code = localStorage.getItem('code')!;
    }





    onSubmit() {
        if (this.updatePassword.invalid) return;

        const newPassword = this.updatePassword.value.newPasswordInput || '';

        this.ngxSpinner.show();

        this.forgotPasswordService.updatePassword(this.email, newPassword, this.code).subscribe({
          next: () => {
            this.ngxSpinner.hide();
            Swal.fire({
              icon: 'success',
              title: 'Password Updated',
              text: 'Your password has been successfully updated.'
            });
            this.router.navigateByUrl('/authentication/login');
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
