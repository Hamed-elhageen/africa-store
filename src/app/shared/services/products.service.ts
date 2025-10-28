import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

constructor(private http:HttpClient) { }
    products!: any[];
    headers=new HttpHeaders().set(
                    'Authorization',
                    `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjNmNTM3NjIyYTU3OWUwZWI4YTQyMSIsImlhdCI6MTc2MTYwMDcyOCwiZXhwIjoxNzYxNjg3MTI4fQ.2Zz4ESQo8Sgvnnd_JJZswMQFuOBzMNjYu9lRexT2ZO8`
                )

    //i here get all products with its opetional filteration with query params ,, when you pass a query param in the function (all are optional) the products are filtered based on them
    getAllProducts(queryParams?:{[key:string]:any}):Observable<any>{
        //by this way when you send the query params as object , when you want to pass only one query param , in the function in the component you pass its name and its value
        let params=new HttpParams;
        if(queryParams){
            Object.keys(queryParams).forEach((key)=>{
                if(queryParams[key]!==undefined && queryParams[key]!==null){
                    params=params.set(key,queryParams[key])
                }
            })
        }
        return this.http.get<any>(`${environment.api}/products`,{params}).pipe(
            catchError((err)=>{
                console.log(err)
                return throwError(()=>err)
            })
        )
    }




    getSingleProduct(prdId:string):Observable<any>{
        return this.http.get(`${environment.api}/products/${prdId}`,{headers:this.headers}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }


}
