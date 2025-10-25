import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories.service';
import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.component.html',
  styleUrl: './mainhome.component.scss'
})
export class MainhomeComponent implements OnInit {
    categories!:any[];
     products!:any[]
constructor(private categoriesService:CategoriesService , private productsService:ProductsService){}
 ngOnInit(): void {
        this.categoriesService.getAllCategories().subscribe({
            next:(result)=>{
                this.categories=result.data;
            },
            error:(error)=>{
                console.log(error.message)
            }
        })






        this.productsService.getAllProducts({ '[pagination][limit]':8}).subscribe({
            next:(result)=>{
                this.products=result.data;
            },
            error:(err)=>{
                console.log(err.message)
            }
        })



    }
}
