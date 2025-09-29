import { Component } from '@angular/core';
import { Category } from '../../../shared/modles/category';
import { CategoriesService } from '../../../home/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
 allcategories:Category[]=[]
    constructor(private categoriesService:CategoriesService){
        this.allcategories=this.categoriesService.getAllCategories();
    }
}
