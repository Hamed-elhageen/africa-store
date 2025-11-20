import { Component,  EventEmitter,  Input, OnInit, Output } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartProduct } from '../../../shared/models/cart-response';
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
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrl: './cartitem.component.scss'
})
export class CartitemComponent implements OnInit {
  @Input() productId:string=""
  @Input() _id:string=""
  @Input() productImage:string=""
  @Input() title:string=""
  @Input() price:string=""
  @Input() size:string=""
  @Input() quantity:number=1;
  @Input() overAllPrice!:number;
  @Output() productDeleted = new EventEmitter<string> ;
    //this is an event (from eventEmitter)     and will be sent to the parent (using @Output) when it is emitted
    @Output() quantityUpdated = new EventEmitter<void>();
    // the same this event will be sent to the parent when this event emitted ( when the quantity is updated )


constructor(private cartService:CartService , private spinner:NgxSpinnerService){}
cartProducts:CartProduct[]=[]
    ngOnInit(): void {
        this.loadCartProducts();
    }

    loadCartProducts(){
        this.cartService.getCartProducts().subscribe({
            next:(result)=>{
                this.cartProducts!=result.data.products
            },
            error:(err)=>{
                console.log(err.message)
            }
        })
    }


    deleteProduct(prdId:string){
        Swal.fire({
        title: 'Are you sure?',
        text: 'This product will be deleted from your cart!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',      // لون زرار الحذف
        cancelButtonColor: '#1C6F37',    // لون زرار الإلغاء
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
        }).then((result)=>{

        if(result.isConfirmed){
            this.spinner.show();
            this.cartService.deleteProduct(prdId).subscribe({
                next:(result)=>{
                Swal.fire({
                    title: 'Deleted!',
                    text: result.message || 'Product has been deleted successfully.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
                this.cartProducts = this.cartProducts.filter(product => product._id !== prdId);                                          //updating the categories imediately after deleting a category
                this.productDeleted.emit(prdId)                                                                                                                  //now i emmitted the event , so it is sent to its parent that i deleted to delete it from him
                this.spinner.hide();
                },

                error:(err)=>{
                    this.spinner.show()
                    this.handleError(err)
                        this.spinner.hide();
                }
            })
        }
    })
    }



        icreaseProductQuantity(prdId:string){
            this.quantity+=1;
                this.updateCart(prdId)
        }
        decreaseProductQuantity(prdId:string){
            if(this.quantity>1){
                this.quantity-=1;
                this.updateCart(prdId)
            }
        }

    updateCart(prdId:string){
        this.cartService.updateProduct(this.productId,this._id,this.quantity).subscribe({
            next:(result)=>{
                this.quantityUpdated.emit();                                                              // here i emitted the event
                console.log(result.message)
                Toast.fire({
                    icon: 'success',
                    title: result.message || 'Quantity updated successfully!'
            });
            },
            error:(err)=>{
                console.log(err.message)
                this.handleError(err)
        }
    })
    }






    //this is the error function that you will put it inside the error function when you are trying to get data from the backend and pass to it the error coming
    handleError(err:any){
        //handling if there is no conection to the internet
        if(err.status===0){
            Toast.fire({
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
            Toast.fire({
                title:messages.join(' | '),
                icon:"error"
            })
            return ;
        }

        //error in general
        Toast.fire({
            icon: 'error',
            title: err?.error?.message || 'Something went wrong. Please try again.',
        });
    }
}
