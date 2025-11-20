import { Component, OnInit } from '@angular/core';
import { ProductsdashboardService } from '../../services/productsdashboard.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriesdashboardService } from '../../../categories/services/categoriesdashboard.service';
import { Product } from '../../models/products';
import { Category } from '../../../categories/models/categories';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrl: './productslist.component.scss'
})
export class ProductslistComponent implements OnInit {
    products!:Product[];
    categories!:Category[]
    catId!:string
    searchWord!:string;
    searchTimeOut!:any

constructor(private productsService:ProductsdashboardService,private categoriesService:CategoriesdashboardService , private spinner:NgxSpinnerService )
    {

    }

    ngOnInit(): void {
        //to get all the products and all the categories in the selece field  when the page is opened
        this.spinner.show();
        this.loadAllProducts();
        this.loadAllCategories();
    }


    loadAllProducts(){
        this.productsService.getAllProducts().subscribe({
            next: (comingProducts) => {
                this.products = comingProducts.data;
                this.spinner.hide();
            },
            error: (err) => {
                console.log(err.message);
                this.spinner.hide();
            }
        });
    }

    loadAllCategories(){
        this.categoriesService.getAllCategories().subscribe({
            next:(result)=>{
                this.categories=result.data
            },
            error:(err)=>{
                console.log(err.message)
            }
        })
    }
    //here i didnt used reactive forms so i used event no valueChanges
    onCategoryChange(event: Event) {
    this.catId = (event.target as HTMLSelectElement).value;

    this.spinner.show();

    // لو اختار "All categories"
    if (!this.catId) {
        this.loadAllProducts();
        return;
    }

    // لو اختار category معيّن
    this.productsService.getAllProducts({ category: this.catId }).subscribe({
        next: (comingProducts) => {
            this.products = comingProducts.data;
            this.spinner.hide();
        },
        error: (err) => {
            console.log(err.message);
            this.spinner.hide();
        }
    });
}



    onSearch(event:Event){
        this.searchWord=(event.target as HTMLInputElement) .value;
        if (this.searchTimeOut) {
            clearTimeout(this.searchTimeOut);
        }
        this.searchTimeOut=setTimeout(()=>{
            this.spinner.show();
            this.productsService.getAllProducts({category:this.catId, k :this.searchWord}).subscribe({
                next:(comingProducts)=>{
                    this.products=comingProducts.data;
                    this.spinner.hide()
                },
                error:(err)=>{
                    console.log(err.message)
                    this.spinner.hide()
                }
            })
    },900)
    }



deleteProduct(id:string){
    Swal.fire({
        title: 'Are you sure?',
        text: 'This product will be permanently deleted!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#1C6F37',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
        }).then((result)=>{
            if(result.isConfirmed){
                this.spinner.show();
                this.productsService.deleteProduct(id).subscribe({
                    next:(comingData)=>{
                        Swal.fire({
                            title: 'Deleted!',
                            text: comingData.message || 'Product has been deleted successfully.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                            })
                            this.products=this.products.filter((prd)=>prd._id!=id)
                            this.spinner.hide();
                    },
                    error:(err)=>{
                        Swal.fire({
                                        title: 'failed!',
                                    text: err.message || 'failed to delete the product.',
                                    icon: 'error',
                                    timer: 2000,
                                    showConfirmButton: false
                                    })
                            this.spinner.hide();
                    }
                })

            }
        })
}
}
