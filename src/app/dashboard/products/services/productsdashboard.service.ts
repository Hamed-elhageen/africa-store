import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { error } from 'console';
import { env } from 'process';

@Injectable({
    providedIn: 'root'
})
export class ProductsdashboardService {
constructor(private http : HttpClient){ }
//query params is passed as an object and behind the scene it is converted to that         /products?category=68ed728b9e7d27851235846a
    getAllProducts(queryParams?:{[key:string]:any} ):Observable<any>{
        let params = new HttpParams();
        if(queryParams){
            Object.keys(queryParams).forEach((key)=>{
                if(queryParams[key]!==undefined&&queryParams[key]!==null){
                    params=params.set(key,queryParams[key])
                }
            })
        }
        params=params.set("[pagination][limit]","1000")
        return this.http.get<any>(`${environment.api}/products`,{params}).pipe(
            catchError((err)=>{
                console.log("the error is " + err)
                return throwError(()=>err)
            })
        )
    }




headers=new HttpHeaders().set(
                'Authorization',
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjZjMzJlODU2MDBmMDI5MDAwMTQyOSIsImlhdCI6MTc2MTQ2Mzk4MCwiZXhwIjoxNzYxNTUwMzgwfQ.LWg08kzhozkO7Xg1iRdZhm3AF548bNSiCEO4SfuFoBc`
            )
    addProduct(formData:FormData,catId:string):Observable<any>{
        return this.http.post<any>(`${environment.api}/products/${catId}`,formData,{headers:this.headers}).pipe(
            catchError((error)=>{
                return throwError(()=>error)
            })
        )
    }





    deleteProduct(prdId:string):Observable<any>{
        return this.http.delete<any>(`${environment.api}/products/${prdId}`,{headers:this.headers}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }


    updateProduct(formData:FormData,prdId:string):Observable<any>{
        return this.http.patch<any>(`${environment.api}/products/${prdId}`,formData,{headers:this.headers}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }


        gitSingleProduct(prdId:string):Observable<any>{
        return this.http.get<any>(`${environment.api}/products/${prdId}`,{headers:this.headers}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }







}

