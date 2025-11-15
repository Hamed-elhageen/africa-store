import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ChangepasswordService } from '../../services/changepassword.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { AuthErrorHandlerService } from '../../services/auth-error-handler.service';
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 6000,
    timerProgressBar: false,
  });
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {
    passwordVisibility:boolean=false;
    changePassword!:FormGroup;

    constructor(private changePasswordService:ChangepasswordService,
    private errorHandlerService:AuthErrorHandlerService,
    private router:Router,
    private ngxSpinner:NgxSpinnerService
){}

ngOnInit(): void {
    this.changePassword = new FormGroup(
    {
        oldPasswordInput: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
        newPasswordInput: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) ]),
        passwordConfirmationInput: new FormControl('', [ Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)])
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


togglePasswordVisibility(){
    this.passwordVisibility=!this.passwordVisibility
}

passwordsMatchValidator(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: any } | null => {
    const password = group.get('newPasswordInput')?.value;
    const confirmPassword = group.get('passwordConfirmationInput')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
    };
}

    onSubmit() {
        if (this.changePassword.invalid) return;
        const old_password=this.changePassword.value.oldPasswordInput||'';
        const new_password = this.changePassword.value.newPasswordInput || '';
        const new_password_confirmation=this.changePassword.value.passwordConfirmationInput||'';
        this.ngxSpinner.show();

        this.changePasswordService.changePassword(old_password, new_password,new_password_confirmation).subscribe({
            next: (resonse) => {
                this.ngxSpinner.hide();
                Toast.fire({
                    icon: 'success',
                    title: `${resonse.message}`||"password updated successfully",
                });
                this.router.navigateByUrl('/authentication/login');
                localStorage.removeItem("token");
            },
            error: (err) => {
                this.ngxSpinner.hide();
                this.errorHandlerService.handleError(err)
        }
        });
    }

}
