import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { changePasswordResponse } from '../models/change-password-response';

@Injectable({
    providedIn: 'root'
})
export class ChangepasswordService {

    constructor(private http : HttpClient) {

}

token=window.localStorage.getItem("token")
headers=new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.token}`
        )

//take care to pass the data to the sever with the names it want
    changePassword(old_password:string,new_password:string,new_password_confirmation:string):Observable<changePasswordResponse>{
        const token = localStorage.getItem('token')
        return this.http.put<changePasswordResponse>(environment.api+'/users/me/password',{old_password,new_password,new_password_confirmation},{headers: this.headers
    }).pipe(
                catchError(err=>{
                        console.log("change password error ",err);
                        return throwError(()=>err)
                            })
            )
    }
    //here in this function you should send the token that deterimines that the user is logged in with the request , to let the server who you are , so you send it in headers specially in Authorization to be authorized , if you didnt send it , it will give you that you are not authorized to do this action
}
