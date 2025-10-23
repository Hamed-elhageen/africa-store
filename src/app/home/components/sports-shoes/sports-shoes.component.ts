import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';

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
          }

}
