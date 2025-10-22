import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { error } from 'console';
import { env } from 'process';

@Injectable({
    providedIn: 'root'
})
export class ProductsdashboardService {
//this service is for all the operations on the producst by the admin like add update , delete and edit
constructor(private http : HttpClient){ }
    getAllProducts():Observable<any>{
        return this.http.get<any>(environment.api+"/products"+"?[pagination][limit]=15").pipe(
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }




headers=new HttpHeaders().set(
                'Authorization',
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjZjMzJlODU2MDBmMDI5MDAwMTQyOSIsImlhdCI6MTc2MTEzMzk3MCwiZXhwIjoxNzYxMjIwMzcwfQ.vycDmOhPnlp36VdoA8cW_6wr80dAtw183mmZVWjjAZo`
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

