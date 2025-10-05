import { Component } from '@angular/core';
import { ProductsService } from '../../../home/services/products.service';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrl: './productslist.component.scss'
})
export class ProductslistComponent {
    products!:any[];
constructor(private productsService : ProductsService){
    this.products=this.productsService.getAll();
}
}
