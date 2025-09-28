import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-sports-accessories',
  templateUrl: './sports-accessories.component.html',
  styleUrl: './sports-accessories.component.scss'
})
export class SportsAccessoriesComponent implements OnInit {
      products: any[] = [];
     categoryId =5;
          constructor(private productsService:ProductsService){

          }
          ngOnInit(): void {
          // ناخد الـ categoryId من السيرفس

          // وبعدين نجيب المنتجات بتاعت الكاتيجوري ده
          this.products = this.productsService.getCategoryProducts(this.categoryId).slice(0,8);
          }

}
