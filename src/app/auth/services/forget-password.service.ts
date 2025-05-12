import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { error } from 'node:console';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
    private accessToken: string | null = null;
    public httpOptionAuth: { headers: HttpHeaders } = { headers: new HttpHeaders() };
  constructor(private httpClient:HttpClient,
    public router:Router,
    public ngxSpinner:NgxSpinnerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }



//   this if the function that will send the email to the server , if everything is good at server .. it will return a code of four numbers , if there is an error , it will handeled , all of this in the component that will use the service which is now update password
    sendVerifyCode(email:string):Observable<any>{
        this.ngxSpinner.show();
        return this.httpClient.post<any>(environment.apiUrl+'/auth/forgetPassword' , {email}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }












    // this is the seconde step now , this function will be used in the otp verification , and when clicking send i will send the code and the email to the server , when we use in the compoent , if everything is good , it will take us to update password page else , it will show error message

    verifyResetCode(email: string, code: string): Observable<any> {
        return this.httpClient.post<any>(environment.apiUrl + "/users/verify-code/", { email, code }).pipe(
          catchError(err => {
            console.log("verify code error", err);
            return throwError(() => err);
          })
        );
      }














// Update Password: After verifying OTP, user can update password
updatePassword(email: string, newPassword: string, code: string) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/users/update-password/`,
      { email, newPassword, code },
      this.httpOptionAuth
    ).pipe(
      catchError(err => {
        console.error("updatePassword error", err);
        return throwError(() => err);
      })
    );
  }









     // Update HTTP options with token if available
  private updateHttpOptions() {
    const token =      isPlatformBrowser(this.platformId) ?localStorage.getItem('token') : '';
    this.accessToken = token;
    this.httpOptionAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`
      })
    };
  }





}
