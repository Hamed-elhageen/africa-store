import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CategoriesResponse, SingleCategoryResponse } from '../models/categories-response';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    constructor(private http:HttpClient){

    }

    getAllCategories():Observable<CategoriesResponse>{
        return this.http.get<CategoriesResponse>(environment.api +"/category").pipe(
            catchError((error)=>{
                console.log("the error here is "+error.message)
                return throwError(()=>error)
            })
        )
    }


    getSingleCategory(catId:string):Observable<SingleCategoryResponse>{
        return this.http.get<SingleCategoryResponse>(`${environment.api}/category/${catId}`).pipe(
            catchError((err)=>{
                console.log(err);
                return throwError(()=>err)
            })
        )
    }
}
