import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesdashboardService } from '../../services/categoriesdashboard.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
    selectedFile:any;
    imagePreview: string | ArrayBuffer | null = null;                         //variable to handle the image change appearnace
    catId:any;

constructor(private categoriesService:CategoriesdashboardService, private route:ActivatedRoute , private spinner:NgxSpinnerService,private router:Router){}


editCategoryForm = new FormGroup({
    name: new FormControl("",[Validators.required, Validators.maxLength(20)]),
    image:new FormControl("",[Validators.required])
})

get name(){
    return this.editCategoryForm.get("name")
}
get image(){
    return this.editCategoryForm.get("image");
}


//the function to handle the image change appearance
onFileChange(event: any) {                                                                                                             //this is an event that will occur when the admin changes the category image
  if (event.target.files && event.target.files.length > 0) {                                                               // here we are checking if the user choosed a file (image)
    this.selectedFile = event.target.files[0];                                                                                     //here i put the file he choosed in the selected file variable

    const reader = new FileReader();                                                                                               // FileReaer is a tool that can read the content of the files , here it will read the image and i will take it from him and put it in a variable
    reader.onload = () => {                                                                                                             //when i finish reading :
      this.imagePreview = reader.result;                                                                                         // i will put in the imagePreview variable
    };
    reader.readAsDataURL(this.selectedFile);                                                                                    // this is the code that tell fileReader to start reading the selected file and  and convert it to data url
  }
}


createFormData(){
    const formData = new FormData;
    formData.append('name',this.name?.value||"");
    if(this.selectedFile){
    formData.append('image',this.selectedFile)
    }
    return formData;
}

 ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
    this.catId=params.get("catId")
    })
    this.getSingleCategory()
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
Toast.fire({
            icon:"error",
            title:`${error.error.message}`
        })
        this.spinner.hide();
        }
    })
}




selectedCategory:any={}
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


}
