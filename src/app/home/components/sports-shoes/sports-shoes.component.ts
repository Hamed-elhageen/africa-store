import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-sports-shoes',
  templateUrl: './sports-shoes.component.html',
  styleUrl: './sports-shoes.component.scss'
})
export class SportsShoesComponent  implements OnInit{
      products: any[] = [];
     categoryId =4;

          constructor(private productsService:ProductsService){

          }
          ngOnInit(): void {
          // ناخد الـ categoryId من السيرفس

          // وبعدين نجيب المنتجات بتاعت الكاتيجوري ده
          this.products = this.productsService.getCategoryProducts(this.categoryId).slice(0,8);
          }

}
