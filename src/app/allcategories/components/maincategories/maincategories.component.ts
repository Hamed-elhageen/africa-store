import { Component, HostListener, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories.service';
import { ProductsService } from '../../../shared/services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FavoritesService } from '../../../shared/services/favorites.service';
import { Category } from '../../../shared/models/categories-response';
import { Product } from '../../../shared/models/product-response';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
    selector: 'app-maincategories',
    templateUrl: './maincategories.component.html',
    styleUrl: './maincategories.component.scss'
})
export class MaincategoriesComponent implements OnInit {
    categories!:Category[];
    products:Product[]=[];
    showCategories:boolean=true;
    selectedCategory = '';
    selectedTeam='';
    showclubs:boolean=true;
    showprice:boolean=true;
    showAllTeams:boolean=false;
    favoritesIds:string[]=[]
    searchSub!: Subscription;
    minPrice!: number;
    maxPrice: number = 5000;
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


    constructor(private categoriesService:CategoriesService , private productsService : ProductsService,private favoritesService:FavoritesService , private spinner:NgxSpinnerService){}
    ngOnInit(): void {
        this.spinner.show();
        this.loadCategories();
        this.loadFavorites();
        this.initSearchListener()
    }


initSearchListener() {
    this.searchSub = this.productsService.search$.pipe(
        debounceTime(500),
        distinctUntilChanged()
    )
    .subscribe(term => {
        const params: any = { '[pagination][limit]': 1000 };

      // search term
    if (term) params.k = term;

      // filters
    if (this.selectedCategory) params.category = this.selectedCategory;
    if (this.selectedTeam) params.club = this.selectedTeam;
    if (this.minPrice !== undefined && this.minPrice !== null)
        params['[price][min]'] = this.minPrice;

    if (this.maxPrice !== undefined && this.maxPrice !== null)
        params['[price][max]'] = this.maxPrice;

      // check no filters at all
    const hasFilters =
        term ||
        this.selectedCategory ||
        this.selectedTeam ||
        this.minPrice ||
        this.maxPrice;

    if (!hasFilters) {
        this.getAllProducts();
        return;
    }

      // fetch products with filters
    this.spinner.show();
    this.productsService.getAllProducts(params).subscribe({
        next: (result) => {
            this.products = result.data.map((prd: any) => ({
            ...prd,
            choosed: this.favoritesIds.includes(prd._id)
        }));

        this.spinner.hide();
          // scroll to top
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 200);
        },
        error: (err) => {
        console.error(err.message);
        this.spinner.hide();
        }
    });
    });
}




    loadCategories(){
        this.categoriesService.getAllCategories().subscribe({
            next:(result)=>{
                this.categories=result.data;
                this.spinner.hide()
            },
            error:(err)=>{
                console.log(err.message);
                this.spinner.hide()
            }
        })
    }


    loadFavorites(){
        this.favoritesService.getFavorites().subscribe({
        next:(result)=>{
            this.favoritesIds=result?.data?.map((prd:any)=> prd._id)
            this.getAllProducts();
        },
        error:(err)=>{
            console.log("error in favorites in allcategoires component" +err)
        }
    })
    }
    getAllProducts(){
this.productsService.getAllProducts({'[pagination][limit]':1000}).subscribe({

            next:(result)=>{
                this.spinner.show()
 this.products=result?.data?.map((prd:any)=>({
                    ...prd ,
                    choosed:this.favoritesIds.includes(prd._id)
                }));                this.spinner.hide()
            },
            error:(err)=>{
                console.log(err.message);
                                this.spinner.hide()
            }
        })
    }




    //for handling design
    toggleshowing():void{
        this.showCategories=!this.showCategories;
    }
    toggleshowingclubs():void{
        this.showclubs=!this.showclubs;
    }
    toggleshowingprice():void{
        this.showprice=!this.showprice;
    }
    toggleShowingTeams():void{
        this.showAllTeams=!this.showAllTeams;
    }

    onCategoryChange(event:Event){
        this.selectedCategory=(event.target as HTMLInputElement).value;
        //make a new fetch after you choose the category to get the products of the choosen category
        //here if the user selected all products which its value if "" , iam saying if there is no category id , get all products without any filteration
        if(!this.selectedCategory){
            this.productsService.getAllProducts({'[pagination][limit]':1000 , club:this.selectedTeam  }).subscribe({
                next:(result)=>{
                    this.products=result.data
                },
                error:(err)=>{
                    console.log(err.message)
                }
            })
        }
        //here do the filteration with category id
        this.productsService.getAllProducts({'[pagination][limit]':1000 ,     category:this.selectedCategory , club:this.selectedTeam ,  '[price][max]':this.maxPrice,'[price][min]':this.minPrice}).subscribe({
            next:(result)=>{
                this.products=result.data
            },
            error:(err)=>{
                console.log(err.message)
            }
        })
    }



    onTeamChange(event:Event){
        this.selectedTeam=(event.target as HTMLInputElement).value;
        this.spinner.show();
        //to hadle if the user choosed all products without choosing any category , wont pass category
        if(!this.selectedCategory){
            this.productsService.getAllProducts({'[pagination][limit]':1000 , club:this.selectedTeam }).subscribe({
            next:(result)=>{
                this.products=result.data
                this.spinner.hide()
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
            });
            },
            error:(err)=>{
                console.log(err.message)
                this.spinner.hide()
            }
        })
        }

        //if the user choosed a category.
        this.productsService.getAllProducts({'[pagination][limit]':1000 ,     category:this.selectedCategory , club:this.selectedTeam ,  '[price][max]':this.maxPrice,'[price][min]':this.minPrice}).subscribe({
            next:(result)=>{
                this.products=result.data
                this.spinner.hide()
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
            });
            },
            error:(err)=>{
                console.log(err.message)
                this.spinner.hide()
            }
        })
    }


//changing price
onMinPriceChange(event:any){
    this.minPrice=event.target.value;
    if(!this.selectedCategory){
            this.spinner.show()
            this.productsService.getAllProducts({'[pagination][limit]':1000 , club:this.selectedTeam , '[price][min]':this.minPrice , '[price][max]':this.maxPrice  }).subscribe({
                next:(result)=>{
                    this.products=result.data
                    this.spinner.hide()
                setTimeout(()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                });
                },500)
            },
            error:(err)=>{
                console.log(err.message)
                this.spinner.hide()
            }
        })
        }

        //if the user choosed a category.
        this.spinner.show()
        this.productsService.getAllProducts({'[pagination][limit]':1000 ,     category:this.selectedCategory , club:this.selectedTeam , '[price][min]':this.minPrice}).subscribe({
            next:(result)=>{
                this.products=result.data
                this.spinner.hide()
                setTimeout(()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                });
                },500)
            },
            error:(err)=>{
                console.log(err.message)
                this.spinner.hide()
            }
        })

}



    onMaxPriceChange(event:any){
        this.maxPrice=event.target.value;
        if(!this.selectedCategory){
            this.spinner.show()
            this.productsService.getAllProducts({'[pagination][limit]':1000 , club:this.selectedTeam , '[price][min]':this.minPrice , '[price][max]':this.maxPrice  }).subscribe({
            next:(result)=>{
            setTimeout(()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                });
                },500)
                this.products=result.data
                this.spinner.hide()
            },
            error:(err)=>{
                console.log(err.message)
                this.spinner.hide()
            }
        })
        }

        //if the user choosed a category.
        this.spinner.show()
        this.productsService.getAllProducts({'[pagination][limit]':1000 ,     category:this.selectedCategory , club:this.selectedTeam ,  '[price][max]':this.maxPrice,'[price][min]':this.minPrice}).subscribe({
            next:(result)=>{
                setTimeout(()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                });
                },500)
                this.products=result.data
                this.spinner.hide()
            },
            error:(err)=>{
                console.log(err.message)
                this.spinner.hide()
            }
        })

}




resetFilters() {
    this.selectedCategory = '';
    this.selectedTeam = '';
    this.minPrice = 0;
    this.maxPrice = 5000;
    this.showAllTeams = false;

    const allCatRadio = document.getElementById('allCategoires') as HTMLInputElement | null;
    if (allCatRadio) allCatRadio.checked = true;

    const categoryRadios = document.querySelectorAll('input[name="category"]') as NodeListOf<HTMLInputElement>;
    categoryRadios.forEach(r => {
    if (r.id !== 'allCategoires') r.checked = false;
    });

    const teamRadios = document.querySelectorAll('input[name="team"]') as NodeListOf<HTMLInputElement>;
    teamRadios.forEach(r => r.checked = false);

    const numberInputs = document.querySelectorAll('input[type="number"]') as NodeListOf<HTMLInputElement>;
    numberInputs.forEach(i => i.value = '');

    this.spinner.show();
    this.productsService.getAllProducts({ '[pagination][limit]': 1000 }).subscribe({
    next: (result) => {
        this.products = result.data || [];
        this.spinner.hide();
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 200);
    },
    error: (err) => {
        console.error('resetFilters error:', err);
        this.spinner.hide();
    }
    });
}


}
