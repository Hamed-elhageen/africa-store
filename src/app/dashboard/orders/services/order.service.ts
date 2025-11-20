import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DeleteOrderResponse, GetAllOrdersResponse, GetSingleOrderResponse, UpdateOrderStatusResponse } from '../models/orders';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http:HttpClient) { }

    get headers(){
        const token = localStorage.getItem("token")
        return new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        )
    }
    getAllOrders():Observable<GetAllOrdersResponse>{
        return this.http.get<GetAllOrdersResponse>(`${environment.api}/order`,{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("error in getting all orders" + err)
                return throwError(()=>err)
            })
        )
    }

    updateOrderStatus(orderId:string,status:string):Observable<UpdateOrderStatusResponse>{
        return this.http.patch<UpdateOrderStatusResponse>(`${environment.api}/order/${orderId}/status`,{status},{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("error in updating order status "+err)
                return throwError(()=>err)
            })
        )
    }

    getSingeOrder(orderId:string):Observable<GetSingleOrderResponse>{
        return this.http.get<GetSingleOrderResponse>(`${environment.api}/order/${orderId}`,{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("erorr in get singe order"+err)
                return throwError(()=>err)
            })
        )
    }


    deleteOrder(orderId:string):Observable<DeleteOrderResponse>{
        return this.http.delete<DeleteOrderResponse>(`${environment.api}/order/${orderId}`,{headers:this.headers}).pipe(
            catchError((err)=>{
                console.log("erorr in delete order"+err)
                return throwError(()=>err)
            })
        )
    }
}
