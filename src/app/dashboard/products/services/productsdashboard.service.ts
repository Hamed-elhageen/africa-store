import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { error } from 'console';

@Injectable({
    providedIn: 'root'
})
export class ProductsdashboardService {
//this service is for all the operations on the producst by the admin like add update , delete and edit
constructor(private http : HttpClient){ }
    getAllProducts():Observable<any>{
        return this.http.get<any>(environment.api+"/products").pipe(
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }




headers=new HttpHeaders().set(
                'Authorization',
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDQ1ZGE2YjE1OGE4Mzg5M2FlODI4OSIsImlhdCI6MTc2MDg3MTY0MSwiZXhwIjoxNzYwOTU4MDQxfQ.C2TwH6jxjFRIzKgU4FQz6l_abg9Hrl0Jx16OCWMiols`
            )
    addProduct(formData:FormData):Observable<any>{
        return this.http.post<any>(environment.api+"/products",formData,{headers:this.headers}).pipe(
            catchError((error)=>{
                return throwError(()=>error)
            })
        )
    }




}

