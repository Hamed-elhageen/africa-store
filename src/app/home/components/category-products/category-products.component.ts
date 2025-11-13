import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';
import { CategoriesService } from '../../../shared/services/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { get } from 'http';
import { FavoritesService } from '../../../shared/services/favorites.service';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss'
})
export class CategoryProductsComponent implements OnInit {
    products:any[]=[];
    categoryId!:string ;
    selectedCategory!:any;
    constructor(private route:ActivatedRoute , private productsService:ProductsService , private categoriesService:CategoriesService, private favoritesService:FavoritesService , private spinner:NgxSpinnerService){}
    favoritesIds:string[]=[]
    searchSub!: Subscription;
    searchWord!:string



    ngOnInit(): void {
        this.route.paramMap.subscribe((params)=>{
            this.categoryId=params.get('catId') || ''
            this.getAllProducts();
        })
        //handling search
        this.searchSub = this.productsService.search$
  .pipe(
    debounceTime(500),   // استنى نص ثانية قبل ما تعمل البحث
    distinctUntilChanged() // ما تعملش نفس البحث مرتين
  )
  .subscribe(term => {
    this.searchWord=term;
    this.getAllProducts()
  });

  //end handling search

        this.getAllCategories();


    this.favoritesService.getFavorites().subscribe({
        next:(result)=>{
            this.favoritesIds=result?.data?.map((prd:any)=> prd._id)
            this.getAllProducts();
        },
        error:(err)=>{
            console.log(err.message)
        }
    })


    }




    getAllProducts(){
            this.spinner.show()

            this.productsService.getAllProducts({category:this.categoryId , k:this.searchWord}).subscribe({
            next:(result)=>{

                this.products=result?.data?.map((prd:any)=>({
                    ...prd ,
                    choosed:this.favoritesIds.includes(prd._id)                                                                                                   //here we add a new property to the products and will be trun if the product was in favorites , and by that that product will have the colorful green love
                }));
                this.spinner.hide()
            },
            error:(err)=>{
                console.log(err)
                this.spinner.hide()
            }
        })
    }

    getAllCategories(){
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
                this.productsService.getAllProducts({category:this.categoryId,'[sort][by]': 'price','[sort][dir]':this.sortDir}).subscribe({
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
