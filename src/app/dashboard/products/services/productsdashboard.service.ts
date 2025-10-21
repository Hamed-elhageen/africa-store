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
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjZjMzJlODU2MDBmMDI5MDAwMTQyOSIsImlhdCI6MTc2MTA0MTc3MSwiZXhwIjoxNzYxMTI4MTcxfQ.btfpFOpuF-JtE7F7CEk45RhMj0E3O8e3ET_5vLfXFSY`
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



}

