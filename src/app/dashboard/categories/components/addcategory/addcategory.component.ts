import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesdashboardService } from '../../services/categoriesdashboard.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DashboardErrorHandlerService } from '../../../shared/services/dashboard-error-handler.service';
import { url } from 'inspector';
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    customClass: {
  popup: 'my-toast-style'
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
  });
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.scss'
})
export class AddcategoryComponent {
    selectedFile: File | null = null;
     imagePreview: string | null = null;                                                                                                  //variable to save in it a copy of the image to show to the user

    constructor(private categoriesService:CategoriesdashboardService,private dashboardErrorHandler:DashboardErrorHandlerService , private spinner:NgxSpinnerService, private router:Router){}
    categoryForm = new FormGroup({
        name: new FormControl("",[Validators.required, Validators.maxLength(20)]),
        image: new FormControl("",[Validators.required])
    })

    get name(){
        return this.categoryForm.get("name")
    }
    get image(){
        return this.categoryForm.get("image")
    }



                                                                                                                                                                                  //this will be the file image you choose , and in the html i did if the user choosed and image , execute the fucntion called onFileChange()
    onFileChange(event: Event) {                                                                                                                               //this is an event that will occur when the admin changes the category image
        const fileInput = event.target as HTMLInputElement
        if (fileInput.files && fileInput.files.length > 0) {                                                                                           // here we are checking if the user choosed a file (image)
            this.selectedFile = fileInput.files[0];                                                                                                       //here i get a url link to put in the src in the html to show the image
            this.imagePreview=URL.createObjectURL(this.selectedFile)
        }
    }
    createFromData(){
        const myFromData = new FormData;
        myFromData.append("name",this.name?.value || "")
        if(this.selectedFile){
            myFromData.append("image",this.selectedFile)
        }
        return myFromData;
    }


    addCategory(){
        if(this.categoryForm.valid){
            this.spinner.show();
            let formData = this.createFromData();
            this.categoriesService.addCategory(formData).subscribe({
                next:(result)=>{
                    Toast.fire({
                        icon: 'success',
                        title:`${result?.message}`
                    })
                    this.spinner.hide();
                    this.categoryForm.reset();
                    this.selectedFile = null;
                    this.router.navigateByUrl("/dashboard/categories")

                },
                error:(err)=>{
                    this.dashboardErrorHandler.handleError(err)
                    this.spinner.hide()
                }
            })
        }
    }

}
