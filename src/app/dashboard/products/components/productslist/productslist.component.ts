import { Component } from '@angular/core';
import { ProductsdashboardService } from '../../services/productsdashboard.service';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrl: './productslist.component.scss'
})
export class ProductslistComponent {
    products!:any[];
constructor(private productsService:ProductsdashboardService ){
    this.productsService.getAllProducts().subscribe({
        next:(comingProducts)=>{
            this.products=comingProducts.data;
        },
        error:(err)=>{
            console.log(err.message)
        }
    })
}
}
