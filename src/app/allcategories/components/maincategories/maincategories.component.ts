import { Component, HostListener, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories.service';
import { ProductsService } from '../../../shared/services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import cluster from 'cluster';
import { FavoritesService } from '../../../shared/services/favorites.service';
import { Category } from '../../../shared/modles/category';
import { Product } from '../../../shared/modles/product';

@Component({
  selector: 'app-maincategories',
  templateUrl: './maincategories.component.html',
  styleUrl: './maincategories.component.scss'
})
export class MaincategoriesComponent implements OnInit {
    categories!:any[];
    products:any[]=[];
    showCategories:boolean=true;
    selectedCategory = '';
    selectedTeam='';
    showclubs:boolean=true;
    showprice:boolean=true;
    showAllTeams:boolean=false;
    favoritesIds:string[]=[]

    constructor(private categoriesService:CategoriesService , private productsService : ProductsService,private favoritesService:FavoritesService , private spinner:NgxSpinnerService){}
    ngOnInit(): void {
        this.spinner.show();
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





        this.favoritesService.getFavorites().subscribe({
        next:(result)=>{
            this.favoritesIds=result?.data?.map((prd:any)=> prd._id)
            this.getAllProducts();
        },
        error:(err)=>{

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
    /////////////////////////////////************************************************************************** */

    onCategoryChange(event:any){
        this.selectedCategory=event.target.value;
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
        this.productsService.getAllProducts({'[pagination][limit]':1000 ,     category:this.selectedCategory , club:this.selectedTeam}).subscribe({
            next:(result)=>{
                this.products=result.data
            },
            error:(err)=>{
                console.log(err.message)
            }
        })
    }



    onTeamChange(event:any){
        this.selectedTeam=event.target.value;
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
        this.productsService.getAllProducts({'[pagination][limit]':1000 ,     category:this.selectedCategory , club:this.selectedTeam}).subscribe({
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







minPrice!: number;
maxPrice: number = 5000;
onMinPriceChange(event:any){
this.minPrice=event.target.value;
if(!this.selectedCategory){
            this.spinner.show()
            this.productsService.getAllProducts({'[pagination][limit]':1000 , club:this.selectedTeam , '[price][min]':this.minPrice  }).subscribe({
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
        this.productsService.getAllProducts({'[pagination][limit]':1000 ,     category:this.selectedCategory , club:this.selectedTeam ,  '[price][max]':this.maxPrice}).subscribe({
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
  // 1) الحالة الابتدائية في الـ component
  this.selectedCategory = '';
  this.selectedTeam = '';
  this.minPrice = 0;
  this.maxPrice = 5000; // لو بتحب ترجّعها للـ default
  this.showAllTeams = false; // لو كنت مختار "see more" قبل كده

  // 2) تظبيط DOM (الراديوز والـ inputs)
  // رجّع راديو "All products" متعلم
  const allCatRadio = document.getElementById('allCategoires') as HTMLInputElement | null;
  if (allCatRadio) allCatRadio.checked = true;

  // افحص كل راديوهات الفئات وغّيّرها لو احتاج
  const categoryRadios = document.querySelectorAll('input[name="category"]') as NodeListOf<HTMLInputElement>;
  categoryRadios.forEach(r => {
    if (r.id !== 'allCategoires') r.checked = false;
  });

  // افصل كل راديوهات النوادي (teams)
  const teamRadios = document.querySelectorAll('input[name="team"]') as NodeListOf<HTMLInputElement>;
  teamRadios.forEach(r => r.checked = false);

  // فرغ كل الـ number inputs (From / To)
  const numberInputs = document.querySelectorAll('input[type="number"]') as NodeListOf<HTMLInputElement>;
  numberInputs.forEach(i => i.value = '');

  // 3) جيب كل المنتجات (بدون أي فلتر) وحدث الواجهة
  this.spinner.show();
  this.productsService.getAllProducts({ '[pagination][limit]': 1000 }).subscribe({
    next: (result) => {
      this.products = result.data || [];
      // لو بتحسب طول لعرضه:
      // this.theLength = this.products.length;
      this.spinner.hide();
      // سكرول لطيف للأعلى بعد تأخير صغير
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
