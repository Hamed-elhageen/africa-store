import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ForgetPasswordResponse } from './../models/forget-password-response';
import { VerifyCodeResponse } from '../models/verify-code-response';
import { ResetPasswordResponse } from '../models/reset-password-response';

@Injectable({
    providedIn: 'root'
})
export class ForgetPasswordService {
    constructor(private httpClient:HttpClient,
    public router:Router,
    public ngxSpinner:NgxSpinnerService,
    @Inject(PLATFORM_ID) private platformId: Object
    ) { }


//handle is the email sent to the server
//   this if the function that will send the email to the server , if everything is good at server .. it will return a code of four numbers , if there is an error , it will be handeled , all of this in the component that will use the service which is now update password
    sendVerifyCode(handle:string):Observable<ForgetPasswordResponse>{
        const url = environment.api + '/auth/password/forgot_password';
        return this.httpClient.post<ForgetPasswordResponse>(url, {handle}).pipe(
            catchError((err)=>{
                console.log("error in send verify code " +err)
                return throwError(()=>err)
            })
        )
    }





    // this is the seconde step now , this function will be used in the otp verification , and when clicking send i will send the code and the email to the server , when we use in the compoent , if everything is good , it will take us to update password page else , it will show error message
    // we wrote the email here handle as it wrote at the backend
    verifyResetCode(handle: string, code: string): Observable<VerifyCodeResponse> {
        return this.httpClient.post<VerifyCodeResponse>(environment.api + "/auth/password/validate_code", { handle, code }).pipe(
            catchError(err => {
            console.log("verify code error", err);
            return throwError(() => err);
        })
        );
    }








//take caaaaaaare  to pass the values to the server as the back end want , with the same names or it will give you error 422 (data not like the server want )
// Update Password: After verifying OTP, user can update password
resetPassword(handle: string, code:string, password:string, password_confirmation:string):Observable<ResetPasswordResponse> {
    return this.httpClient.post<ResetPasswordResponse>(
        `${environment.api}/auth/password/reset_password`,
        { handle,  code,password,password_confirmation }
    ).pipe(
        catchError(err => {
        console.error("resetPassword error", err);
        return throwError(() => err);
    })
    );
}
}
