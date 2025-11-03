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
    this.cartService.addToCart(prdId).subscribe({
      next: (result) => {
        Toast.fire({
          title: "Product added to cart successfully",
          icon: "success"
        });
        this.spinner.hide();
        this.router.navigateByUrl("/cart/maincart");
      },
      error: (err) => {
        Toast.fire({
          title: "Failed to add to cart",
          icon: "error"
        });
        this.spinner.hide();
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
        Toast.fire({
          title: err.message || "Failed to update favorites",
          icon: "error"
        });
      }
    });
  }
}
