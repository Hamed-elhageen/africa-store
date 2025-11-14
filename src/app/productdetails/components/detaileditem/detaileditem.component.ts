import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../../shared/services/cart.service';
import Swal from 'sweetalert2';
import { FavoritesService } from '../../../shared/services/favorites.service';

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
export class DetaileditemComponent implements OnInit {
  currentId!: string | null;
  choosenProduct: any;
  currentImage!: string;
  isFavorite: boolean = false; // 👈 لتتبع حالة المفضلة
  selectedSize!:string;

  constructor(
    private acitvatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private spinner: NgxSpinnerService,
    private cartService: CartService,
    private router: Router,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.acitvatedRoute.paramMap.subscribe((params) => {
      this.currentId = params.get('prdId');

      if (this.currentId) {
        this.spinner.show();

        // أولاً: هنجلب المنتج
        this.productsService.getSingleProduct(this.currentId!).subscribe({
          next: (result) => {
            this.choosenProduct = result.data;
            this.currentImage = this.choosenProduct.thumbnail.secure_url;

            // بعد جلب المنتج، نتحقق هل هو من المفضلات
            this.favoritesService.getFavorites().subscribe({
              next: (res) => {
                const favIds = res.data.map((p: any) => p._id);
                this.isFavorite = favIds.includes(this.choosenProduct._id);
                this.choosenProduct.choosed = this.isFavorite;
              },
              error: (err) => console.log(err)
            });

            this.spinner.hide();
          },
          error: (err) => {
            console.log(err.message);
            this.spinner.hide();
          }
        });
      } else {
        console.log("No item found with that ID");
      }
    });
  }

  changeMainImage(url: string) {
    this.currentImage = url;
  }

  addToCart(prdId: string) {
    this.spinner.show();
    this.cartService.addToCart(prdId,this.selectedSize).subscribe({
      next: (result) => {
        Toast.fire({
          title: "Product added to cart successfully",
          icon: "success"
        });
        this.spinner.hide();
        this.router.navigateByUrl("/cart/maincart");
      },
      error: (err) => {

        this.spinner.hide();
        this.handleError(err)
      }
    });
  }

  toggleFavoriteProduct(prdId: any) {
    this.favoritesService.toggleAddition(prdId).subscribe({
      next: (result) => {
        // بدّل الحالة محليًا عشان الأيقونة تتغير فورًا
        this.isFavorite = !this.isFavorite;
        this.choosenProduct.choosed = this.isFavorite;

        Toast.fire({
          icon: "success",
          title: result.message || "Updated successfully"
        });
      },
      error: (err) => {
        this.handleError(err)
      }
    });
  }


  chooseSize(size:string){
    this.selectedSize=size;
    console.log("Chosen size:", this.selectedSize);
  }


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

}
