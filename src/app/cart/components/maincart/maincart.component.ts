import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-maincart',
  templateUrl: './maincart.component.html',
  styleUrl: './maincart.component.scss'
})
export class MaincartComponent implements OnInit {
    constructor(private cartService:CartService , private spinner:NgxSpinnerService ){

    }
        cartProducts:any[]=[];
        theLength:any;
        total:any;
        //take care of something , is that the cart products that appeared in the ui is comming from here , so when you delete item you should filter them from here
        //so now , the responsibe for deleting should be the father component , and the delete button is in the child, so when the child delete an item it should tell the father , so that the father delete it from here      all that using a simple        @output and eventEmitter

    ngOnInit(): void {
    this.getCartProducts();
    }

    getCartProducts(){
this.spinner.show()
        this.cartService.getCartProducts().subscribe({
            next:(result)=>{
                this.cartProducts=result.data.products;
                this.total=result.data.total;
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

    //take care of something when you pass the id of the product in the cart you pass the id of the product when it was created not its id in the cart because it is different .
    removeFromCart(prdId:string){
    this.cartProducts = this.cartProducts.filter(p => p.productId !== prdId);
    // 🔁 بعد التصفية، احسب التوتال الجديد
  this.total = this.cartProducts.reduce((acc, item) => acc + (item.subtotal || 0), 0);

  // وكمان حدّث عدد العناصر
  this.theLength = this.cartProducts.length;
    }

}
