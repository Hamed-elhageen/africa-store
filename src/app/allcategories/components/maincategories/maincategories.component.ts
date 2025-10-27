import { Component, HostListener, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories.service';
import { ProductsService } from '../../../shared/services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import cluster from 'cluster';

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

    constructor(private categoriesService:CategoriesService , private productsService : ProductsService , private spinner:NgxSpinnerService){}
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

        this.productsService.getAllProducts({'[pagination][limit]':1000}).subscribe({

            next:(result)=>{
                this.spinner.show()
                this.products=result.data
                this.spinner.hide()
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

















categorySelectForReset!:string;
clubSelectForReset!:string;
minPriceSelectForReset!:number;
maxPriceSelectForReset!:number;



resetFilters() {
    this.spinner.show()
    const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    (radio as HTMLInputElement).checked = false;
  });

  // 2️⃣ رجّع كل number inputs فاضية أو لصفر
  const numbers = document.querySelectorAll('input[type="number"]');
  numbers.forEach(input => {
    (input as HTMLInputElement).value = '';
  });

    this.productsService.getAllProducts().subscribe({
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
    this.spinner.hide()
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
