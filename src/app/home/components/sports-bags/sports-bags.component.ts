import { Component, OnInit } from '@angular/core';
import { title } from 'node:process';
import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-sports-bags',
  templateUrl: './sports-bags.component.html',
  styleUrl: './sports-bags.component.scss'
})
export class SportsBagsComponent implements OnInit {
     products: any[] = [];
     categoryId =6;

         constructor(private productsService:ProductsService){

         }
         ngOnInit(): void {
         }

}
