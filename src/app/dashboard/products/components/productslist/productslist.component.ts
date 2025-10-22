import { Component, OnInit } from '@angular/core';
import { ProductsdashboardService } from '../../services/productsdashboard.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriesdashboardService } from '../../../categories/services/categoriesdashboard.service';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrl: './productslist.component.scss'
})
export class ProductslistComponent implements OnInit {
    products!:any[];
    categories!:any[]
constructor(private productsService:ProductsdashboardService,private categoriesService:CategoriesdashboardService , private spinner:NgxSpinnerService ){

}
    ngOnInit(): void {
        this.productsService.getAllProducts().subscribe({
        next:(comingProducts)=>{
            this.products=comingProducts.data;
        },
        error:(err)=>{
            console.log(err.message)
        }
    })

this.categoriesService.getAllCategories().subscribe({
    next:(result)=>{
        this.categories=result.data
    },
    error:(err)=>{
        console.log(err.message)
    }
})

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
