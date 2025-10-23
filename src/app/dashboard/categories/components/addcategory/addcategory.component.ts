import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesdashboardService } from '../../services/categoriesdashboard.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
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
    constructor(private categoriesService:CategoriesdashboardService , private spinner:NgxSpinnerService, private router:Router){}
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
            Toast.fire({
                        icon: 'error',
                        title:`${err?.error?.message}`
                    })
                    this.spinner.hide()
                }
            })
        }
    }













    selectedFile:any;
   //this will be the file image you choose , and in the html i did if the user choosed and image , execute the fucntion called onFileChange()
    imagePreview: string | ArrayBuffer | null = null;                         //variable to save in it a copy of the image to show to the user


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
}
