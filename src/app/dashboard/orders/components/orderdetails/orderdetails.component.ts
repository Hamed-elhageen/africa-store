import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { get } from 'http';
import Swal from 'sweetalert2';
import {  NgxSpinnerService } from 'ngx-spinner';
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
// بيانات الطلب جاية من الأب أو Dummy data
    @Input() order: any = {
        id: 'ORD12345',
        customer: {
            name: 'Ahmed Ali',
            phone: '01001234567',
            address: '123 Street, Cairo, Egypt'
        },
        date: '2025-11-12 14:35',
        status: 'Processing',
        paymentMethod: 'Card',
        total: 1450,
        discount: 50,
        products: [
            { name: 'Product 1', quantity: 2, price: 300, image: '/maged-mostafa.webp' },
            { name: 'Product 2', quantity: 1, price: 500, image: '/maged-mostafa.webp' },
            { name: 'Product 3', quantity: 3, price: 100, image: '/maged-mostafa.webp' }
        ]
    }

    // تحسب المجموع النهائي بعد الخصم
    get finalTotal() {
        return this.order.total - (this.order.discount || 0);
    }




    //********************************************************************************************************** **********************************************/
    orderId!:string  ;
    choosenOrder:any;
    constructor(private ordersService:OrderService , private activateRoute:ActivatedRoute , private spinner:NgxSpinnerService){}
    ngOnInit(): void {
        this.activateRoute.paramMap.subscribe((params)=>{
            this.orderId!=params.get("orderId")
        })

        if(this.orderId){
            this.ordersService.getSingeOrder(this.orderId).subscribe({
                next:(result)=>{
                    this.choosenOrder=result.data;
                },
                error:(err)=>{
                    console.log("error in getting singe order"+err)
                }
            })
        }
    }


    currentStatus!:string;
    onChangeStatus(event:any) {
        this.currentStatus=event.target.value;
}

    updateStatus(){
        this.spinner.show()
        this.ordersService.updateOrderStatus(this.orderId,this.currentStatus).subscribe({
            next:(result)=>{
                Toast.fire({
                    icon:"success",
                    title:`${result.message}`,
                })
                this.spinner.hide();
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
