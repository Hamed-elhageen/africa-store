import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';

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
          }

}
