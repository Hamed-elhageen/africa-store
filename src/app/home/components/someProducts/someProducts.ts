import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { CategoriesService } from '../../../shared/services/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from '../../../shared/models/product-response';

@Component({
  selector: 'app-someProducts',
  templateUrl: './someProducts.html',
  styleUrl: './someProducts.scss'
})
export class FootballShoesComponent implements OnInit {
    products!: Product[]
    categories!:Product[]
    @Input() categoryName?:string;
    @Input() categoryId?:string

    constructor(private productsService:ProductsService,private categoriesService:CategoriesService, private spinner:NgxSpinnerService){

    }
    ngOnInit(): void {
        this.spinner.show();
        this.productsService.getAllProducts({category:this.categoryId,  '[pagination][limit]':8}).subscribe({
            next:(result)=>{
                this.products=result.data;
                this.spinner.hide()
            },
            error:(error)=>{
                console.log(error.message)
                this.spinner.hide()
            }
        })
    }


}
