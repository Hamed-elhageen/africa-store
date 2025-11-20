import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateCouponResponse, DeleteCouponResponse, GetAllCouponsResponse } from '../models/copons';

@Injectable({
    providedIn: 'root'
})
export class CoponsService {

    constructor(private http : HttpClient) { }

    get headers(){
        const token = localStorage.getItem("token")
        return new HttpHeaders().set(
                'Authorization',
                `Bearer ${token}`
        )
    }
    getAllCopons():Observable<GetAllCouponsResponse>{
        return this.http.get<GetAllCouponsResponse>(`${environment.api}/coupons`,{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("error in getting all copons"+err)
                return throwError(()=>err)
            })
        )
    }

    createCopon(code:string,value:number):Observable<CreateCouponResponse>{
        return this.http.post<CreateCouponResponse>(`${environment.api}/coupons`,{code,value},{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("error in creating copon")
                return throwError(()=>err)
            })
        )
    }

    deleteCopon(coponId:string):Observable<DeleteCouponResponse>{
        return this.http.delete<DeleteCouponResponse>(`${environment.api}/coupons/${coponId}`,{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("error deleting copon"+err)
                return throwError(()=>err)
            })
        )
    }

}
