import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-sports-tshirts',
  templateUrl: './sports-tshirts.component.html',
  styleUrl: './sports-tshirts.component.scss'
})
export class SportsTshirtsComponent implements OnInit {
    products: any[] = [];
    categoryId =3;

        constructor(private productsService:ProductsService){

        }
        ngOnInit(): void {
        // ناخد الـ categoryId من السيرفس

        // وبعدين نجيب المنتجات بتاعت الكاتيجوري ده
        this.products = this.productsService.getCategoryProducts(this.categoryId).slice(0,8);
        }
}
