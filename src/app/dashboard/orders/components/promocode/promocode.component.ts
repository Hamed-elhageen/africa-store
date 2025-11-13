import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.component.html',
  styleUrl: './promocode.component.scss'
})
export class PromocodeComponent {


    constructor(private ordersService:OrderService , private spinner :NgxSpinnerService){

    }

    promoCodeForm=new FormGroup({
        promoCode:new FormControl("",[Validators.required]),
        discountPercentage:new FormControl("",[Validators.required])
    })

    get promoCode(){
        return this.promoCodeForm.get("promoCode")
    }
    get discountPercentage(){
        return this.promoCodeForm.get("discountPercentage")
    }




    createPromoCode(){
        this.spinner.show();
        this.ordersService.createPromoCode(this.promoCode?.value!, this.discountPercentage?.value!).subscribe({
            next:(result)=>{
Swal.fire({
    title: 'Done Successfully',
    text: result?.message||'Promo code created successfully',
    icon: 'success',
    confirmButtonColor: '#1C6F37',      // لون زرار الحذف
    confirmButtonText: 'Ok!',
    })
    this.spinner.hide()
            },
            error:(err)=>{
Swal.fire({
    title: 'Failed!!',
    text: err?.message||'Failed to create promo code',
    icon: 'error',
    confirmButtonColor: '#d33',      // لون زرار الحذف
    confirmButtonText: 'Ok!',
    })
    this.spinner.hide()
            }
        })
    }
}
