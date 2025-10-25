import { Component, HostListener, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories.service';
import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-maincategories',
  templateUrl: './maincategories.component.html',
  styleUrl: './maincategories.component.scss'
})
export class MaincategoriesComponent implements OnInit {
    categories!:any[];
    products!:any[];
    showCategories:boolean=true;
    selectedCategory = '';
    showclubs:boolean=true;
    constructor(private categoriesService:CategoriesService , private productsService : ProductsService){}
    ngOnInit(): void {
        this.categoriesService.getAllCategories().subscribe({
            next:(result)=>{
                this.categories=result.data
            },
            error:(err)=>{
                console.log(err.message)
            }
        })


        this.productsService.getAllProducts({'[pagination][limit]':1000}).subscribe({
            next:(result)=>{
                this.products=result.data
            },
            error:(err)=>{
                console.log(err.message)
            }
        })
    }

    toggleshowing():void{
        this.showCategories=!this.showCategories;
    }
    toggleshowingclubs():void{
        this.showclubs=!this.showclubs;
    }

    onCategoryChange(event:any){
        this.selectedCategory=event.target.value;
        //make a new fetch after you choose the category to get the product of the choosen category

        //here if the user selected all products which its value if "" , iam saying if there is no category id , get all products without any filteration
        if(!this.selectedCategory){
            this.productsService.getAllProducts({'[pagination][limit]':1000 }).subscribe({
            next:(result)=>{
                this.products=result.data
            },
            error:(err)=>{
                console.log(err.message)
            }
        })
        }
        //here do the filteration with category id
        this.productsService.getAllProducts({'[pagination][limit]':1000 ,     category:this.selectedCategory}).subscribe({
            next:(result)=>{
                this.products=result.data
            },
            error:(err)=>{
                console.log(err.message)
            }
        })
    }





showprice:boolean=true;
minPrice: number = 120;
maxPrice: number = 820;



toggleshowingprice():void{
  this.showprice=!this.showprice;
}








maxRange: number = 1000;
activeDrag: 'min' | 'max' | null = null;

@HostListener('document:mousemove', ['$event'])
onMouseMove(event: MouseEvent) {
  if (!this.activeDrag) return;

  const slider = document.querySelector('.relative') as HTMLElement;
  const rect = slider.getBoundingClientRect();
  const percentage = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
  const newValue = Math.round(percentage * this.maxRange);

  if (this.activeDrag === 'min') {
    this.minPrice = Math.min(newValue, this.maxPrice);
  } else {
    this.maxPrice = Math.max(newValue, this.minPrice);
  }
}

@HostListener('document:mouseup')
onMouseUp() {
  this.activeDrag = null;
}

startDrag(event: MouseEvent, type: 'min' | 'max') {
  event.preventDefault();
  this.activeDrag = type;
}

validateRange() {
  this.minPrice = Math.max(0, Math.min(this.maxPrice, this.minPrice));
  this.maxPrice = Math.min(this.maxRange, Math.max(this.minPrice, this.maxPrice));
}

resetFilters() {
  this.minPrice = 120;
  this.maxPrice = 820;
}




  teams = [
    { id: 1, name: 'Real Madrid',logo:"madrid.webp" },
    { id: 2, name: 'Barcelona',logo:"barca.webp" },
        { id: 7, name: 'Al ahly',logo:" alahly.webp" },
    { id: 8, name: 'Zamalek',logo:" zamalek.webp" },
    { id: 3, name: 'Liverpool',logo:" liverpool.webp" },
    { id: 4, name: 'Arsenal',logo:" arsenal.webp" },
    { id: 5, name: 'Chelsea',logo:" chelsea.webp" },
    { id: 6, name: 'Man city',logo:"city.webp" },
    { id: 9, name: 'Inter miami',logo:" miami.webp" },
    { id: 10, name: 'Al nasr',logo:" alnasr.webp" },
    { id: 11, name: 'Another',logo:" another.webp" },
    ];

}
