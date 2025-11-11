import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomecontrolService {

  constructor(private http : HttpClient) { }
 token = localStorage.getItem("token")
headers=new HttpHeaders().set(
                'Authorization',
                `Bearer ${this.token}`
            )



        createHomeBanner(formData:FormData):Observable<any>{
        return this.http.post(`${environment.api}/home`,formData,{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("error in update home banner"+err)
                return throwError(()=>err)
            })
        )
    }
}
