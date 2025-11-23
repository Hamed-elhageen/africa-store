import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';
import { CategoriesService } from '../../../shared/services/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { get } from 'http';
import { FavoritesService } from '../../../shared/services/favorites.service';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { Product } from '../../../shared/models/product-response';
import { Category } from '../../../shared/models/categories-response';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss'
})
export class CategoryProductsComponent implements OnInit {
    products:Product[] | null=null;
    categoryId!:string ;
    selectedCategory!:Category;
    favoritesIds:string[]=[]
    searchSub!: Subscription;
    searchWord!:string

    constructor(private route:ActivatedRoute , private productsService:ProductsService , private categoriesService:CategoriesService, private favoritesService:FavoritesService , private spinner:NgxSpinnerService){}



    ngOnInit(): void {
        this.route.paramMap.subscribe((params)=>{
            this.categoryId=params.get('catId') || ''
            this.getAllProducts();
                    this.getSingleCategories()
        })

        this.getFavorites();


        //handling search in navbar to reflect in category Products
        this.searchSub = this.productsService.search$.pipe(
            debounceTime(500),   // استنى نص ثانية قبل ما تعمل البحث
            distinctUntilChanged() // ما تعملش نفس البحث مرتين
        ).subscribe(term => {
            this.searchWord=term;
            this.getAllProducts()
        });
     //end handling search
    }




    getAllProducts(){
            this.spinner.show()
            this.productsService.getAllProducts({category:this.categoryId , k:this.searchWord,'[pagination][limit]':1000}).subscribe({
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

    getSingleCategories(){
        this.categoriesService.getSingleCategory(this.categoryId).subscribe({
            next:(result)=>{
                this.selectedCategory=result.data;
            },
            error:(err)=>{
                console.log(err.message)
            }
        })
    }



    getFavorites(){
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


    onSortChange(event:Event){
        const sortDir=(event.target  as HTMLSelectElement).value;
        this.spinner.show();
                this.productsService.getAllProducts({category:this.categoryId,'[sort][by]': 'price','[sort][dir]':sortDir}).subscribe({
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
