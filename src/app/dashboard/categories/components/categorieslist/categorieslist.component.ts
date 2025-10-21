import { Component, OnInit } from '@angular/core';
import { CategoriesdashboardService } from '../../services/categoriesdashboard.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categorieslist',
  templateUrl: './categorieslist.component.html',
  styleUrl: './categorieslist.component.scss'
})
export class CategorieslistComponent implements OnInit {
    allcategories!:any[];

constructor(private categoriesService:CategoriesdashboardService , private spinner:NgxSpinnerService){
}
    ngOnInit(): void {
// getting services
this.categoriesService.getAllCategories().subscribe({
    next:(result)=>{
        this.allcategories=result.data;
    },
    error:(error)=>{
        console.log(error.message)
    }
});
    }





    // delete service :
    deleteService(catId:string){
    Swal.fire({
    title: 'Are you sure?',
    text: 'This category and all its products will be permanently deleted!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',      // لون زرار الحذف
    cancelButtonColor: '#1C6F37',    // لون زرار الإلغاء
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result)=>{


    if(result.isConfirmed){
        this.spinner.show();
        this.categoriesService.deleteCategory(catId).subscribe({
            next:(result)=>{
            Swal.fire({
                title: 'Deleted!',
            text: result.message || 'Category has been deleted successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
            })
                      this.allcategories = this.allcategories.filter(category => category._id !== catId);                             //updating the categories imediately after deleting a category
            this.spinner.hide();
            },

            error:(err)=>{
                this.spinner.show()
                Swal.fire({
                title: 'Error!',
            text: err.message || 'Something went wrong while deleting.',
            icon: 'error'
                })
                  this.spinner.hide();
            }
        })
    }
  })
    }







}
