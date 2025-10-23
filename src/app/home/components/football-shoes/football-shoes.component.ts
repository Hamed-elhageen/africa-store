import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';

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
    }


}
