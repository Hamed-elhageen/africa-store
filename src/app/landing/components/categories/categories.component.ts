import { Component } from '@angular/core';
import { Category } from '../../../shared/modles/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
public allcategories:Category[]=[
    {
        categoryName:"Football shirts",
        categoryid:"1",
        categoryimage:"/germany.png"
    },
    {
        categoryName:"Sports shirts",
        categoryid:"2",
        categoryimage:"/shirts.svg"
    },
    {
        categoryName:"Sports shoes",
        categoryid:"3",
        categoryimage:"/shoes.svg"
    },
    {
        categoryName:"Sports bags",
        categoryid:"4",
        categoryimage:"/bags.svg"
    },
    {
        categoryName:"Sports accessories",
        categoryid:"5",
        categoryimage:"/gloves.svg"
    },
    {
        categoryName:"Football shoes",
        categoryid:"6",
        categoryimage:"/stars.svg"
    },
] ;
}
