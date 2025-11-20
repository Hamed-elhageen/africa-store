import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { CartResponse, CreateOrderResponse, SendPromoCodeResponse, UpdateCartResponse } from '../models/cart-response';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(private http : HttpClient) { }
    get headers() {
        const token = localStorage.getItem("token");
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}


    // here we will make a behaviour subject to handle the cart Products count and subscribe on it in navbar to be updated when it is changed
    cartCount = new BehaviorSubject<number>(0);
    getCartCount (){
        return this.cartCount.asObservable();
    }
    setCartCount(count:number){
        this.cartCount.next(count)
    }

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

    addToCart(productId:string,productSize:string):Observable<CartResponse>{
        return this.http.post<CartResponse>(`${environment.api}/cart`,{productId:productId,quantity:1,productSize},{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("error in add to cart" + err)
                return throwError(()=>err)
            })
        )
    }

    deleteProduct(_id:string):Observable<CartResponse>{
        return this.http.delete<CartResponse>(`${environment.api}/cart/${_id}`,{headers:this.headers}).pipe(
            tap(() => {
                const current = this.cartCount.value;
                this.setCartCount(current - 1); // 👈 تحديث العدد
            }),
            catchError((err)=>{
                console.log("error in delete product from cart" + err)
                return throwError(()=>err)
            })
        )
    }


    updateProduct(productId:string,_id:string, newQuantity:number):Observable<UpdateCartResponse>{
        return this.http.patch<UpdateCartResponse>(`${environment.api}/cart`,{productId,_id,quantity:newQuantity},{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("error in deleting from cart" + err)
                return throwError(()=>err)
            })
        )
    }


    //*************************************************************************************************************************************** */
    //handling create order
    createOrder(username:string ,phone:string , address:string, paymentMethod:string , couponCode?:string):Observable<CreateOrderResponse>{
        return this.http.post<CreateOrderResponse>(`${environment.api}/order`,{username,phone,address,paymentMethod,couponCode},{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("error in creating order" + err)
                return throwError(()=>err)
            })
        )
    }


    sendPromoCode(code:string ,total:number):Observable<SendPromoCodeResponse>{
        return this.http.post<SendPromoCodeResponse>(`${environment.api}/coupons/apply`,{code,total},{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("error in sending promo code to the server");
                return throwError(()=>err)
            })
        )
    }
}
