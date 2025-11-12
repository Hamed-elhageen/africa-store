import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { CartResponse, UpdateCartResponse } from '../models/cart-response';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(private http : HttpClient) { }
    token=localStorage.getItem("token")
headers=new HttpHeaders().set(
                'Authorization',
                `Bearer ${this.token}`
            )
    getCartProducts():Observable<CartResponse>{
        return this.http.get<CartResponse>(`${environment.api}/cart`,{headers:this.headers}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            }),
            tap((res) => {
      const count = res?.data?.products?.length || 0;
      this.setCartCount(count);
    })
        )
    }

    addToCart(productId:string):Observable<CartResponse>{
        return this.http.post<CartResponse>(`${environment.api}/cart`,{productId:productId,quantity:1},{headers:this.headers}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }

    deleteProduct(prdId:string):Observable<CartResponse>{
        return this.http.delete<CartResponse>(`${environment.api}/cart/${prdId}`,{headers:this.headers}).pipe(
            tap(() => {
                const current = this.cartCount.value;
                this.setCartCount(current - 1); // 👈 تحديث العدد
            }),
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }


    updateProduct(prdId:string, newQuantity:number):Observable<UpdateCartResponse>{
        return this.http.patch<UpdateCartResponse>(`${environment.api}/cart`,{productId:prdId,quantity:newQuantity},{headers:this.headers}).pipe(
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

    //************************************************************************************************************************** */
    //handling create order

    createOrder(phone:string , address:string, paymentMethod:string):Observable<any>{
        return this.http.post<any>(`${environment.api}/order`,{phone,address,paymentMethod},{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("error in creating order" + err)
                return throwError(()=>err)
            })
        )
    }
}
