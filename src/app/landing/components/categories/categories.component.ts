import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories.service';
import { Category } from '../../../shared/models/categories-response';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
    allcategories!:Category[];
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
