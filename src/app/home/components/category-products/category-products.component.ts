import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';
import { CategoriesService } from '../../../shared/services/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss'
})
export class CategoryProductsComponent implements OnInit {
    products:any[]=[];
    categoryId!:string ;
    selectedCategory!:any;
    constructor(private route:ActivatedRoute , private productsService:ProductsService , private categoriesService:CategoriesService , private spinner:NgxSpinnerService){}
    ngOnInit(): void {
        this.route.paramMap.subscribe((params)=>{
            this.categoryId=params.get('catId') || ''

            this.productsService.getAllProducts(this.categoryId,"price","-1").subscribe({
            next:(result)=>{
                this.products=result.data;
            },
            error:(err)=>{
                console.log(err)
            }
        })
        })






    this.categoriesService.getSingleCategory(this.categoryId).subscribe({
        next:(result)=>{
            this.selectedCategory=result.data;
        },
        error:(err)=>{
            console.log(err.message)
        }
    })



    }






sortDir!:any;
    onSortChange(event:any){
        this.sortDir=event.target.value;
        this.spinner.show();
                this.productsService.getAllProducts(this.categoryId,"price",this.sortDir).subscribe({
            next:(result)=>{
                this.products=result.data;
            },
            error:(err)=>{
                console.log(err)
            }
        })
        this.spinner.hide();

    }

}
