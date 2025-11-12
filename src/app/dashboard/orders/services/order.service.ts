import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http:HttpClient) { }

    token = localStorage.getItem("token")
    headers=new HttpHeaders().set(
                    'Authorization',
                    `Bearer ${this.token}`
                )
    getAllOrders():Observable<any>{
        return this.http.get(`${environment.api}/order`,{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("error in getting all orders" + err)
                return throwError(()=>err)
            })
        )
    }

    updateOrderStatus(orderId:string,status:string):Observable<any>{
        return this.http.patch(`${environment.api}/order/${orderId}/status`,{status},{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("error in updating order status "+err)
                return throwError(()=>err)
            })
        )
    }

    getSingeOrder(orderId:string):Observable<any>{
        return this.http.get(`${environment.api}/order/${orderId}`,{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("erorr in get singe order"+err)
                return throwError(()=>err)
            })
        )
    }



    deleteOrder(orderId:string):Observable<any>{
        return this.http.delete(`${environment.api}/order/${orderId}`,{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("erorr in delete order"+err)
                return throwError(()=>err)
            })
        )
    }
}
