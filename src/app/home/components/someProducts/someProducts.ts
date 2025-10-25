import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { CategoriesService } from '../../../shared/services/categories.service';

@Component({
  selector: 'app-someProducts',
  templateUrl: './someProducts.html',
  styleUrl: './someProducts.scss'
})
export class FootballShoesComponent implements OnInit {
    products!: any[]
    categories!:any[]
     @Input() categoryName?:string;
     @Input() categoryId?:string

    constructor(private productsService:ProductsService,private categoriesService:CategoriesService){

    }
    ngOnInit(): void {
        this.productsService.getAllProducts({category:this.categoryId,  '[pagination][limit]':8}).subscribe({
            next:(result)=>{
                this.products=result.data;
            },
            error:(error)=>{
                console.log(error.message)
            }
        })
    }


}
