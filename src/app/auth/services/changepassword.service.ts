import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChangepasswordService {

    constructor(private http : HttpClient) {
}
//take care to pass the data to the sever with the names it want
    changePassword(old_password:string,new_password:string,new_password_confirmation:string):Observable<any>{
        const token = localStorage.getItem('token')
        return this.http.put<any>(environment.apiUrl+'/auth/password/change_password',{old_password,new_password,new_password_confirmation},{headers: {
        Authorization: `Bearer ${token}`}
        }).pipe(
                catchError(err=>{
                                console.log("login error ",err);
                                return throwError(()=>err)
                            })
            )
    }
    //here in this function you should send the token that deterimines that the user is logged in with the request , to let the server who you are , so you send it in headers specially in Authorization to be authorized , if you didnt send it , it will give you that you are not authorized to do this action
}
