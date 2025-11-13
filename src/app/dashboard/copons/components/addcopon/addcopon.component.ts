import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { CoponsService } from '../../services/copons.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    customClass: {
  popup: 'my-toast-style'
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
  });
@Component({
  selector: 'app-addcopon',
  templateUrl: './addcopon.component.html',
  styleUrl: './addcopon.component.scss'
})
export class AddcoponComponent {
constructor(private coponsService:CoponsService , private spinner :NgxSpinnerService , private router:Router){

    }

    promoCodeForm=new FormGroup({
        promoCode:new FormControl("",[Validators.required]),
        discountPercentage:new FormControl('',[Validators.required])
    })

    get promoCode(){
        return this.promoCodeForm.get("promoCode")
    }
    get discountPercentage(){
        return this.promoCodeForm.get("discountPercentage")
    }




    createPromoCode(){
        this.spinner.show();
        this.coponsService.createCopon(this.promoCode?.value!, Number( this.discountPercentage?.value!)).subscribe({
            next:(result)=>{
    this.spinner.hide()
Toast.fire({
    title: 'Done Successfully',
    text: result?.message||'Promo code created successfully',
    icon: 'success',
    })
this.router.navigateByUrl("/dashboard/copons")
            },
            error:(err)=>{
Swal.fire({
    title: 'Failed!!',
    text: err?.message||'Failed to create promo code',
    icon: 'error',
    confirmButtonColor: '#d33',
    confirmButtonText: 'Ok!',
    })
    this.spinner.hide()
            }
        })
    }
}
