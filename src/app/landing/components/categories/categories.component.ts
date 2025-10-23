import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/modles/category';
import { CategoriesService } from '../../../shared/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
    allcategories!:any[];
    constructor(private categoriesService:CategoriesService){}
    ngOnInit(): void {
        this.categoriesService.getAllCategories().subscribe({
            next:(result)=>{
                this.allcategories=result.data;
            },
            error:(error)=>{
                console.log(error.message)
            }
        });
    }

}
