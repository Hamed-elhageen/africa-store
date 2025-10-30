import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { stringify } from 'querystring';
import { CartService } from '../../../shared/services/cart.service';
import Swal from 'sweetalert2';
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
  selector: 'app-detaileditem',
  templateUrl: './detaileditem.component.html',
  styleUrl: './detaileditem.component.scss'
})
export class DetaileditemComponent implements OnInit{
    currentId!:string|null;
    choosenProduct:any;
    currentImage!:string;
constructor(private acitvatedRoute:ActivatedRoute, private productsService : ProductsService , private spinner:NgxSpinnerService , private cartService:CartService , private router:Router){}
    ngOnInit(): void {
        this.acitvatedRoute.paramMap.subscribe((params)=>{
            this.currentId=params.get('prdId');

            if(this.currentId){
                this.spinner.show()
            this.productsService.getSingleProduct(this.currentId!).subscribe({
            next:(result)=>{
                this.choosenProduct=result.data;
                this.currentImage=this.choosenProduct.thumbnail.secure_url;
                this.spinner.hide()
            },
            error:(err)=>{
                    console.log(err.message)
                    this.spinner.hide()
            }
        })
            }
            else{
                console.log("not item found with that id ")
            }

        })









    }

    changeMainImage(url:string){
        this.currentImage=url;
    }



    addToCart(prdId:string){
        this.spinner.show()
            this.cartService.addToCart(prdId).subscribe({
                next:(result)=>{
                    Toast.fire({
                        title:"Product added to cart successfully",
                        icon:"success"
                    })
                    this.spinner.hide()
                    this.router.navigateByUrl("/cart/maincart")
                },
                error:(err)=>{
                    Toast.fire({
                        title:"Failed to add to cart",
                        icon:"error"
                    })
                                        this.spinner.hide()
                }
            })
        }
}
