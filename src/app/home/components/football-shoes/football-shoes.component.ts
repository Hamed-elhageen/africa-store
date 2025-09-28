import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-football-shoes',
  templateUrl: './football-shoes.component.html',
  styleUrl: './football-shoes.component.scss'
})
export class FootballShoesComponent implements OnInit {
    products: any[] = [];
     categoryId =2;

    constructor(private productsService:ProductsService){

    }
    ngOnInit(): void {
    // ناخد الـ categoryId من السيرفس

    // وبعدين نجيب المنتجات بتاعت الكاتيجوري ده
    this.products = this.productsService.getCategoryProducts(this.categoryId).slice(0,8);
    }


}
