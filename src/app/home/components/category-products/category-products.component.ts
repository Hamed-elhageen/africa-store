import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss'
})
export class CategoryProductsComponent implements OnInit {
    products:any[]=[];
    categoryId!:number;
    categoryName!:string;
    constructor(private route:ActivatedRoute , private productsService:ProductsService){

    }
    ngOnInit(): void {
        this.route.paramMap.subscribe((params)=>{
            this.categoryId=Number(params.get('categoryid'))
            this.products=this.productsService.getCategoryProducts(this.categoryId)                           //here we got the products of the category which id is in the url
                this.categoryName=this.products[0]?.categoryName;
        })

    }

}
