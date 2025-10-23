import { Injectable } from '@angular/core';
import { Category } from '../../shared/modles/category';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
    constructor(private http:HttpClient){

    }

        getAllCategories():Observable<any>{
        return this.http.get<any>(environment.api +"/category").pipe(
            catchError((error)=>{
                console.log("the error here is "+error.message)
                return throwError(()=>error)
            })
        )
    }


    getSingleCategory(catId:string):Observable<any>{
        return this.http.get<any>(`${environment.api}/category/${catId}`).pipe(
            catchError((err)=>{
                console.log(err);
                return throwError(()=>err)
            })
        )
    }
}
