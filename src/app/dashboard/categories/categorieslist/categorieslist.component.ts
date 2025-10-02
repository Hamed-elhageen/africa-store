import { Component } from '@angular/core';

@Component({
  selector: 'app-categorieslist',
  templateUrl: './categorieslist.component.html',
  styleUrl: './categorieslist.component.scss'
})
export class CategorieslistComponent {
categories = [
        {
            id: 1,
            name: 'Shoes',
            image: 'germany.png',
            productsCount: 120
        },
        {
            id: 2,
            name: 'T-Shirts',
            image: 'germany.png',
            productsCount: 85
        },
        {
            id: 3,
            name: 'Accessories',
            image: 'germany.png',
            productsCount: 45
        },
        {
            id: 4,
            name: 'Jackets',
            image: 'germany.png',
            productsCount: 30
        }
    ];
}
