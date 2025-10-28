import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-maincart',
  templateUrl: './maincart.component.html',
  styleUrl: './maincart.component.scss'
})
export class MaincartComponent implements OnInit {
    constructor(private cartService:CartService , private spinner:NgxSpinnerService){

    }
        cartProducts:any[]=[];
        theLength:any;

    ngOnInit(): void {
        this.spinner.show()
        this.cartService.getCartProducts().subscribe({
            next:(result)=>{
                this.cartProducts=result.data.products;
                console.log(this.cartProducts)
                this.theLength=result?.data?.products?.length;
                this.spinner.hide()
            },
            error:(err)=>{
                console.log(err.message)
                this.spinner.hide()
            }
        })
    }


}
