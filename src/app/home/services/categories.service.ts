import { Injectable } from '@angular/core';
import { Category } from '../../shared/modles/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
public allCategories:Category[]=
    [
        {
            categoryName:"Football shirts",
            categoryid:1,
            categoryimage:"/germany.png"
        },
        {
            categoryName:"Sports shirts",
            categoryid:3,
            categoryimage:"/shirts.svg"
        },
        {
            categoryName:"Sports shoes",
            categoryid:2,
            categoryimage:"/shoes.svg"
        },
        {
            categoryName:"Sports bags",
            categoryid:6,
            categoryimage:"/bags.svg"
        },
        {
            categoryName:"Sports accessories",
            categoryid:5,
            categoryimage:"/gloves.svg"
        },
        {
            categoryName:"Football shoes",
            categoryid:4,
            categoryimage:"/stars.svg"
        },
    ] ;

    getAllCategories(){
        return this.allCategories;
    }
    constructor() { }
}
