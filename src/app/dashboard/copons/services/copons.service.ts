import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CoponsService {

    constructor(private http : HttpClient) { }
token = localStorage.getItem("token")
headers=new HttpHeaders().set(
                'Authorization',
                `Bearer ${this.token}`
            )
    getAllCopons():Observable<any>{
        return this.http.get<any>(`${environment.api}/coupons`,{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("error in getting all copons"+err)
                return throwError(()=>err)
            })
        )
    }

    createCopon(code:string,value:number):Observable<any>{
        return this.http.post<any>(`${environment.api}/coupons`,{code,value},{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("error in creating copon")
                return throwError(()=>err)
            })
        )
    }

    deleteCopon(coponId:string):Observable<any>{
        return this.http.delete<any>(`${environment.api}/coupons/${coponId}`,{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("error deleting copon"+err)
                return throwError(()=>err)
            })
        )
    }

}
