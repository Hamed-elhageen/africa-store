import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { AllProductsResponse, Create_DeleteProductResponse, SingleProductResponse, UpdateProductResponse } from '../models/products';

@Injectable({
    providedIn: 'root'
})
export class ProductsdashboardService {
constructor(private http : HttpClient){ }

    get headers() {
        const token = localStorage.getItem("token");
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

//query params is passed as an object and behind the scene it is converted to that         /products?category=68ed728b9e7d27851235846a and so on
    getAllProducts(queryParams?:{[key:string]:any} ):Observable<AllProductsResponse>{
        let params = new HttpParams();
        if(queryParams){
            Object.keys(queryParams).forEach((key)=>{
                if(queryParams[key]!==undefined&&queryParams[key]!==null){
                    params=params.set(key,queryParams[key])
                }
            })
        }
        params=params.set("[pagination][limit]","1000")                                                                //iam setting it from here since we havent got pagination in design
        return this.http.get<AllProductsResponse>(`${environment.api}/products`,{params}).pipe(
            catchError((err)=>{
                console.log("error in getting all the products in dashboard " + err)
                return throwError(()=>err)
            })
        )
    }



    addProduct(formData:FormData,catId:string):Observable<Create_DeleteProductResponse>{
        return this.http.post<Create_DeleteProductResponse>(`${environment.api}/products/${catId}`,formData,{headers:this.headers}).pipe(
            catchError((error)=>{
                console.log("error in creating product in dashbaord" + error)
                return throwError(()=>error)
            })
        )
    }



    deleteProduct(prdId:string):Observable<Create_DeleteProductResponse>{
        return this.http.delete<Create_DeleteProductResponse>(`${environment.api}/products/${prdId}`,{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("error in deleting product in dashboard" +err)
                return throwError(()=>err)
            })
        )
    }


    updateProduct(formData:FormData,prdId:string):Observable<UpdateProductResponse>{
        return this.http.patch<UpdateProductResponse>(`${environment.api}/products/${prdId}`,formData,{headers:this.headers}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }


        gitSingleProduct(prdId:string):Observable<SingleProductResponse>{
        return this.http.get<SingleProductResponse>(`${environment.api}/products/${prdId}`).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }







}

