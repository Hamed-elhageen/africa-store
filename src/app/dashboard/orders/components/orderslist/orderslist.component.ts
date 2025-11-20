import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Order } from '../../models/orders';

@Component({
  selector: 'app-orderslist',
  templateUrl: './orderslist.component.html',
  styleUrl: './orderslist.component.scss'
})
export class OrderslistComponent implements OnInit {
orders:Order[]=[]
    constructor(private ordersService:OrderService, private spinner :NgxSpinnerService){

    }
    ngOnInit(): void {
        this.getAllOrders();
    }

    getAllOrders(){
        this.spinner.show()
        this.ordersService.getAllOrders().subscribe({
            next:(result)=>{
                this.orders= result?.data?.data;
                this.spinner.hide()
            },
            error:(err)=>{
                console.log("failed to get the orders")
                this.spinner.hide()
            }
        })
    }



deleteOrder(orderId:string){
Swal.fire({
    title: 'Are you sure?',
    text: 'This order will be deleted with all its details!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',      // لون زرار الحذف
    cancelButtonColor: '#1C6F37',    // لون زرار الإلغاء
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
    }).then((result)=>{

    if(result.isConfirmed){
        this.spinner.show();
        this.ordersService.deleteOrder(orderId).subscribe({
            next:(result)=>{
            Swal.fire({
            title: 'Deleted!',
            text: result.message || 'Order had been deleted successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
            })
            this.orders = this.orders.filter(order=> order._id !== orderId);                             //updating the categories imediately after deleting a category
            this.spinner.hide();
            },

            error:(err)=>{
                this.spinner.show()
                Swal.fire({
                title: 'Error!',
            text: err.message || 'Something went wrong while deleting.',
            icon: 'error'
                })
                this.spinner.hide();
            }
        })
    }
  })
}

}
