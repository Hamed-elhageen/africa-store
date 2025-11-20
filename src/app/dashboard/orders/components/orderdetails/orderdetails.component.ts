import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { get } from 'http';
import Swal from 'sweetalert2';
import {  NgxSpinnerService } from 'ngx-spinner';
import { Order } from '../../models/orders';
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    customClass: {
    popup: 'my-toast-style'
    },
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: false,
    });
@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.scss'
})
export class OrderdetailsComponent implements OnInit {
    orderId!:string |null ;
    choosenOrder!:Order;
    currentStatus!:string;
    constructor(private ordersService:OrderService , private activateRoute:ActivatedRoute , private spinner:NgxSpinnerService ,private router:Router){}
    ngOnInit(): void {
        this.spinner.show()
        this.activateRoute.paramMap.subscribe((params)=>{
            this.orderId =params.get("orderId")
            console.log(this.orderId)
            if(this.orderId){
            this.ordersService.getSingeOrder(this.orderId).subscribe({
                next:(result)=>{
                    this.choosenOrder=result.data;
                    this.spinner.hide()
                },
                error:(err)=>{
                    console.log("error in getting singe order"+err)
                    this.spinner.hide()
                }
            })
        }
    })
    }

    //here we didnt used reactive forms so , i used event here rather than vlaue changes
    onChangeStatus(event:Event) {
        this.currentStatus=(event.target  as HTMLSelectElement).value;
}

    updateStatus(){
        this.spinner.show()
        this.ordersService.updateOrderStatus(this.orderId!,this.currentStatus).subscribe({
            next:(result)=>{
                Toast.fire({
                    icon:"success",
                    title:`${result.message}`,
                })
                this.spinner.hide();
                this.router.navigateByUrl("/dashboard/orders/orderslist")
            },
            error:(err)=>{
                Toast.fire({
                    icon:"success",
                    title:`${err.message}`,
                })
            }
        })
    }

}
