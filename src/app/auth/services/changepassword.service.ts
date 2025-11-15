import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { changePasswordResponse } from '../models/change-password-response';

@Injectable({
    providedIn: 'root'
})
export class ChangepasswordService {

token=window.localStorage.getItem("token")
headers=new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.token}`
        )

        constructor(private http : HttpClient) {}

//take care to pass the data to the sever with the names it want
    changePassword(old_password:string,new_password:string,new_password_confirmation:string):Observable<changePasswordResponse>{
        return this.http.put<changePasswordResponse>(environment.api+'/users/me/password',{old_password,new_password,new_password_confirmation},{headers: this.headers}).pipe(
                catchError(err=>{
                        console.log("change password error ",err);
                        return throwError(()=>err)
                            })
            )
    }
}
