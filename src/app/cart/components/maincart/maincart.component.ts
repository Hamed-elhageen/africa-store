import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    customClass: { popup: 'my-toast-style' },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
});
@Component({
  selector: 'app-maincart',
  templateUrl: './maincart.component.html',
  styleUrl: './maincart.component.scss'
})
export class MaincartComponent implements OnInit {
    constructor(private cartService:CartService , private spinner:NgxSpinnerService , private router:Router ){

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
    this.cartProducts = this.cartProducts.filter(p => p._id !== prdId);
    // 🔁 بعد التصفية، احسب التوتال الجديد
  this.total = this.cartProducts.reduce((acc, item) => acc + (item.subtotal || 0), 0);

  // وكمان حدّث عدد العناصر
  this.theLength = this.cartProducts.length;
    }


//**************************************************************************************************************************************************** */
    //handle creating order :
    createOrderFrom=new FormGroup({
        name:new FormControl("",[Validators.required , Validators.maxLength(30) , Validators.minLength(10)]),
        phone:new FormControl("",[Validators.required , Validators.maxLength(11) , Validators.minLength(11)]),
        address:new FormControl("",[Validators.required , Validators.maxLength(40) , Validators.minLength(10)]),
        paymentMethod:new FormControl("",[Validators.required ]),
        promoCode:new FormControl("",[Validators.required ])
    })

    get name(){
        return this.createOrderFrom.get('name');
    }
        get phone(){
        return this.createOrderFrom.get('phone');
    }
        get address(){
        return this.createOrderFrom.get('address');
    }
        get paymentMethod(){
        return this.createOrderFrom.get('paymentMethod');
    }
    get promoCode(){
        return this.createOrderFrom.get('promoCode');
    }




    createOrder(){
        this.spinner.show();
        this.cartService.createOrder(this.name?.value!,this.phone?.value!, this.address?.value!, this.paymentMethod?.value!,this.promoCode?.value!).subscribe({
            next:(result)=>{
                    this.getCartProducts();
                        this.spinner.hide()
                        Swal.fire({
                        title: `${result?.message}`,
                        icon: 'success',
                        confirmButtonColor: '#1C6F37',
                        confirmButtonText: 'ok!',
                        })
                        if(this.paymentMethod?.value=="card"){
                            window.open(result.data, "_blank");
                        }
            },
            error:(err)=>{
                this.spinner.hide();
                this.handleError(err)
            }
        })
    }














    //this is the error function that you will put it inside the error function when you are trying to get data from the backend and pass to it the error coming
    handleError(err:any){
        //handling if there is no conection to the internet
        if(err.status===0){
            Swal.fire({
                title:"No internet connection. Please check your network.",
                icon:"error"
            })
            return;
        }

        //if there is and error returned in the data object in postman (its error in data in feilds)
        if(err?.error?.data){
            const errors=err?.error?.data;
            let messages:any[]=[];
            for(const key in errors){                                                                                                                                                                           //using for in to loop on keys in the errors       like name or image for examble
                if(errors.hasOwnProperty(key)){
                    messages.push(`${key}:${errors[key]}`)
                }
            }
            Swal.fire({
                title:messages.join(' /*****/ '),
                icon:"error"
            })
            return ;
        }

        //error in general
        Swal.fire({
            icon: 'error',
            title: err?.error?.message || 'Something went wrong. Please try again.',
        });
    }


















response!:any;
fetchedCode!:boolean
sendPromoCode(){
        console.log("Promo Code Entered:", this.promoCode);

    this.spinner.show();
    this.cartService.sendPromoCode(String(this.promoCode?.value!),Number(this.total)).subscribe({
        next:(result)=>{
            this.response=result?.data;
            this.fetchedCode=true
            this.spinner.hide()
            this.getCartProducts();
            Toast.fire({
                icon:"success",
                title:result?.message||"promo code worked successfully"
            })
        },
        error:(err)=>{
            this.handleError(err)
            this.spinner.hide()
        }
    })
}










}
