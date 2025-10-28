import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(private http : HttpClient) { }
headers=new HttpHeaders().set(
                'Authorization',
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjNmNTM3NjIyYTU3OWUwZWI4YTQyMSIsImlhdCI6MTc2MTY0MDQ5MSwiZXhwIjoxNzYxNzI2ODkxfQ.Qjgm-o_xyGIPNyB87HSfDMTcI_Qw-aWCyEZjxgx3XVk`
            )
    getCartProducts():Observable<any>{
        return this.http.get<any>(`${environment.api}/cart`,{headers:this.headers}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }

    addToCart(productId:string):Observable<any>{
        return this.http.post<any>(`${environment.api}/cart`,{productId:productId,quantity:1},{headers:this.headers}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }

    deleteProduct(prdId:string):Observable<any>{
        return this.http.delete<any>(`${environment.api}/cart/${prdId}`,{headers:this.headers}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }

  deleteAllProducts():Observable<any>{
        return this.http.delete<any>(`${environment.api}/cart`,{headers:this.headers}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }
}
