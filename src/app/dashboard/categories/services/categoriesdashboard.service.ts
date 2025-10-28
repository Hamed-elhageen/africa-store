import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FormBuilder } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class CategoriesdashboardService {
//this service is for all the operations on the categories by the admin like add update , delete and edit
    constructor(private http:HttpClient) {}

    //getting all the categories
    getAllCategories():Observable<any>{
            return this.http.get<any>(environment.api +"/category").pipe(
                catchError((error)=>{
                    // console.log("the error here is "+error.message)
                    return throwError(()=>error)
        })
            )
        }





        //add category with formData
headers=new HttpHeaders().set(
                'Authorization',
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjZjMzJlODU2MDBmMDI5MDAwMTQyOSIsImlhdCI6MTc2MTU5ODcyOSwiZXhwIjoxNzYxNjg1MTI5fQ.p01GwzhT2w5nD3sA9I7AJXtNAun_qZ8sKTxWGHAZduc`
            )
        addCategory(formData:FormData):Observable<any>{
            return this.http.post<any>(environment.api+"/category",formData,{headers:this.headers}).pipe(
                catchError((err)=>{
                    return throwError(()=>err)
                })
            )
        }



        //update category given to it id and the form data
        updateCategory(categoryId:string , formData:FormData):Observable<any>{
            return this.http.patch<any>(environment.api+`/category/${categoryId}`,formData,{headers:this.headers}).pipe(
                catchError((err)=>{
                    return throwError(()=>err)
                })
            )
        }



        //get single category with id

        getSingleCategory(categoryId:string):Observable<any>{
            return this.http.get<any>(environment.api+`/category/${categoryId}`).pipe(
                catchError((error)=>{
                    return throwError(()=>error)
                })
            )
        }





        //delete category with id
        deleteCategory(catId:string):Observable<any>{
            return this.http.delete<any>(environment.api+`/category/${catId}`,{headers:this.headers}).pipe(
                catchError((error)=>{
                    return throwError(()=>error)
                })
            )
        }
}
