import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../home/services/categories.service';
import { ProductsService } from '../../../home/services/products.service';

@Component({
  selector: 'app-categorieslist',
  templateUrl: './categorieslist.component.html',
  styleUrl: './categorieslist.component.scss'
})
export class CategorieslistComponent implements OnInit {
    categories!:any[];
    productsCountInCategory!:any;

constructor(private categoriesService:CategoriesService , private productsService: ProductsService){
}
    ngOnInit(): void {
        this.categories=this.categoriesService.getAllCategories();
this.productsCountInCategory=this.categories.map(cat=>({
    ...cat,
    productsCount:this.productsService.getCategoryProductsCount(cat.categoryid)
}))
    }

}
