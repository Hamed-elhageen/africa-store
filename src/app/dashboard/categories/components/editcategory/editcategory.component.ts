import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesdashboardService } from '../../services/categoriesdashboard.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardErrorHandlerService } from '../../../shared/services/dashboard-error-handler.service';
import { Category } from '../../models/categories';
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
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrl: './editcategory.component.scss'
})
export class EditcategoryComponent implements OnInit {
    selectedFile:File | null =null;
    imagePreview: string | null = null;
    catId!:string;
    selectedCategory!:Category;
    editCategoryForm = new FormGroup({
    name: new FormControl("",[Validators.required, Validators.maxLength(20)]),
    image:new FormControl("",[Validators.required])
})

constructor(private categoriesService:CategoriesdashboardService,private dashboardErrorHandler:DashboardErrorHandlerService, private route:ActivatedRoute , private spinner:NgxSpinnerService,private router:Router){}

ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
    this.catId=params.get("catId") || ""
    })
    this.getSingleCategory()
    }


get name(){
    return this.editCategoryForm.get("name")
}
get image(){
    return this.editCategoryForm.get("image");
}


//the function to handle the image change appearance
onFileChange(event: Event) {                                                                                                             //this is an event that will occur when the admin changes the category image
    const fileInput = event.target as HTMLInputElement
    if (fileInput.files && fileInput.files.length > 0) {                                                               // here we are checking if the user choosed a file (image)
    this.selectedFile = fileInput.files[0];                                                                                     //here i put the file he choosed in the selected file variable
    this.imagePreview=URL.createObjectURL(this.selectedFile)
}
}


//gettin the category you clicked on its edit and its id sent in url, we will pass this id to the getsingle category function to upload the values of the it in the input fields
getSingleCategory(){
    this.categoriesService.getSingleCategory(this.catId).subscribe({
        next:(result)=>{
            this.selectedCategory=result.data;
            this.editCategoryForm.patchValue({
        name: this.selectedCategory?.name,
        image: this.selectedCategory.image?.secure_url || ''
    });
        },
        error:(error)=>{
            console.log(error?.message)
        }
    })
}

createFormData(){
    const formData = new FormData;
    formData.append('name',this.name?.value||"");
        if(this.selectedFile){
            formData.append('image',this.selectedFile)
        }
    return formData;
}




editCategory(){
this.spinner.show();
    let formData = this.createFormData()
    this.categoriesService.updateCategory(this.catId,formData).subscribe({
        next:(result)=>{
        Toast.fire({
            icon:"success",
            title:`${result.message}`
        })
        this.spinner.hide()
        this.editCategoryForm.reset();
        this.router.navigateByUrl("/dashboard/categories")
        },
        error:(error)=>{
        this.dashboardErrorHandler.handleError(error)
        this.spinner.hide();
        }
    })
}
}
