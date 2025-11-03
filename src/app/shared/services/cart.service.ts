import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(private http : HttpClient) { }
headers=new HttpHeaders().set(
                'Authorization',
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjNmNTM3NjIyYTU3OWUwZWI4YTQyMSIsImlhdCI6MTc2MjE1NTE0NCwiZXhwIjoxNzYyMjQxNTQ0fQ.L-wAw5iax9LbFstERwg4_vCofSBZei2aWhc36XjlZLw`
            )
    getCartProducts():Observable<any>{
        return this.http.get<any>(`${environment.api}/cart`,{headers:this.headers}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            }),
            tap((res) => {
      const count = res?.data?.products?.length || 0;
      this.setCartCount(count);
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
            tap(() => {
                const current = this.cartCount.value;
                this.setCartCount(current - 1); // 👈 تحديث العدد
            }),
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }


    updateProduct(prdId:string, newQuantity:number):Observable<any>{
        return this.http.patch<any>(`${environment.api}/cart`,{productId:prdId,quantity:newQuantity},{headers:this.headers}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }













    // here we will make a behaviour subject to handle the cart Products count and subscribe on it in navbar to be updated when it is changed
    //if you want to pass data from parent to childe : using @INput
    //if you want to pass data from child to pared : using @Output and eventEmitter
    //if there is no relation like cart and navbar , you use a centralized service and behaviour subject and subscribe on it in any place you want

    cartCount = new BehaviorSubject<number>(0);
    getCartCount (){
        return this.cartCount.asObservable();
    }
    setCartCount(count:number){
        this.cartCount.next(count)
    }
}
