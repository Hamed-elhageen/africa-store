import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FormBuilder } from '@angular/forms';
import { add_updateCategoryResponse,  DeleteCategoryResponse,  GetAllCategoriesResponse, GetSingleCategoryResponse } from '../models/categories';

@Injectable({
    providedIn: 'root'
})
export class CategoriesdashboardService  {
//this service is for all the operations on the categories by the admin like add update , delete and edit
    constructor(private http:HttpClient) {}

        get headers() {
        const token = localStorage.getItem("token");
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getAllCategories():Observable<GetAllCategoriesResponse>{
            return this.http.get<GetAllCategoriesResponse>(environment.api +"/category").pipe(
                catchError((error)=>{
                    console.log("error in get all categories in dashboard in categories module "+error.message)
                    return throwError(()=>error)
        })
            )
        }



        addCategory(formData:FormData):Observable<add_updateCategoryResponse>{
            return this.http.post<add_updateCategoryResponse>(environment.api+"/category",formData,{headers:this.headers}).pipe(
                catchError((err)=>{
                    return throwError(()=>err)
                })
            )
        }



        //update category given to it id and the form data
        updateCategory(categoryId:string , formData:FormData):Observable<add_updateCategoryResponse>{
            return this.http.patch<add_updateCategoryResponse>(environment.api+`/category/${categoryId}`,formData,{headers:this.headers}).pipe(
                catchError((err)=>{
                    return throwError(()=>err)
                })
            )
        }



        //get single category with id
        getSingleCategory(categoryId:string):Observable<GetSingleCategoryResponse>{
            return this.http.get<GetSingleCategoryResponse>(environment.api+`/category/${categoryId}`).pipe(
                catchError((error)=>{
                    return throwError(()=>error)
                })
            )
        }



        //delete category with id
        deleteCategory(catId:string):Observable<DeleteCategoryResponse>{
            return this.http.delete<DeleteCategoryResponse>(environment.api+`/category/${catId}`,{headers:this.headers}).pipe(
                catchError((error)=>{
                    return throwError(()=>error)
                })
            )
        }
}
