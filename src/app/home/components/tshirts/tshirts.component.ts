import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-tshirts',
  templateUrl: './tshirts.component.html',
  styleUrl: './tshirts.component.scss'
})
export class TshirtsComponent implements OnInit {
    products: any[] = [];
        categoryId =1;

        constructor(private productsService:ProductsService){

        }
        ngOnInit(): void {
        // ناخد الـ categoryId من السيرفس

        // وبعدين نجيب المنتجات بتاعت الكاتيجوري ده
        this.products = this.productsService.getCategoryProducts(this.categoryId).slice(0,8);
        }

}
