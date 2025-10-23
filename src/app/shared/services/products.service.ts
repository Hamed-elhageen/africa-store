import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

constructor(private http:HttpClient) { }
    products!: any[];

    //i here get all products with its opetional filteration with query params ,, when you pass a query param in the function (all are optional) the products are filtered based on them
    getAllProducts(catId?:string , sortValue?:string,sortdir?:string):Observable<any>{

        let params=new HttpParams;
        if(catId){
            params=params.set("category",catId)
        }
        if(sortValue){
            params=params.set("[sort][by]","price")
        }
        if(sortdir){
            params=params.set("[sort][dir]",sortdir)
        }
        return this.http.get<any>(`${environment.api}/products`,{params}).pipe(
            catchError((err)=>{
                console.log(err)
                return throwError(()=>err)
            })
        )
    }



}
