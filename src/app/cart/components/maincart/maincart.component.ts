import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-maincart',
  templateUrl: './maincart.component.html',
  styleUrl: './maincart.component.scss'
})
export class MaincartComponent implements OnInit {
    constructor(private cartService:CartService){

    }
        cartProducts!:any[];

    ngOnInit(): void {
        this.cartService.getCartProducts().subscribe({
            next:(result)=>{
                this.cartProducts=result.products;
            },
            error:(err)=>{
                console.log(err.message)
            }
        })
    }


}
