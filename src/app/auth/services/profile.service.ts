import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProfileResponse, UpdateProfileResponse } from '../models/profile-response';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    constructor(private http:HttpClient) {
}
        token = localStorage.getItem("token")
        headers=new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.token}`
        )

//this is the function that will return the data of the user when you subscribe on it at any component, but take care you should give it the token of the user ( the token that determines that you are a user to return your data)
    showProfile():Observable<ProfileResponse>{
        return this.http.get<ProfileResponse>(environment.api+"/users/profile",{headers:this.headers})
    }

    //now we will create the function that updates the user details
    changeUserDetails(myFormData:FormData):Observable<UpdateProfileResponse>{
                      //we use formdata here to send images and text in the same reqeust with no problems
            return this.http.post<UpdateProfileResponse>(environment.api+"/users/profile" ,myFormData,{headers:this.headers}).pipe(catchError(err=>{
                return throwError(()=>err)
            }))
    }
    }

