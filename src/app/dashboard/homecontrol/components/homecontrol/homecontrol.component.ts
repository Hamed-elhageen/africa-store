import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HomecontrolService } from '../../services/homecontrol.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ProductsdashboardService } from '../../../products/services/productsdashboard.service';
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
  selector: 'app-homecontrol',
  templateUrl: './homecontrol.component.html',
  styleUrl: './homecontrol.component.scss'
})
export class HomecontrolComponent {
    homeControlForm=new FormGroup({
        title:new FormControl("",[Validators.required,Validators.maxLength(20)]),
        club:new FormControl("",[Validators.required,Validators.maxLength(20)]),
        description:new FormControl("",[Validators.required,Validators.maxLength(80)]),
        season:new FormControl(""),
        bannerImage:new FormControl("",[Validators.required]),
          choosenProduct: new FormControl('') // <-- هنا ضيفناه
    })


    constructor(private homeControleService:HomecontrolService , private spinner:NgxSpinnerService,private router : Router ,private productsService:ProductsdashboardService){

    }

    get title(){
        return this.homeControlForm.get("title")
    }
    get club(){
        return this.homeControlForm.get("club")
    }
    get description(){
        return this.homeControlForm.get("description")
    }
    get season(){
        return this.homeControlForm.get("season")
    }
    get bannerImage(){
        return this.homeControlForm.get("bannerImage")
    }
        get choosenProduct(){
        return this.homeControlForm.get("choosenProduct")
    }



    selectedFile:any;                                                                                                                                                  //this will be the file image you choose , and in the html i did if the user choosed and image , execute the fucntion called onFileChange()
    imagePreview: string | ArrayBuffer | null = null;                                                                                                //variable to save in it a copy of the image to show to the user

    onFileChange(event: any) {                                                                                                                            //this is an event that will occur when the admin changes the category image
  if (event.target.files && event.target.files.length > 0) {                                                                                 // here we are checking if the user choosed a file (image)
    this.selectedFile = event.target.files[0];                                                                                                      //here i put the file he choosed in the selected file variable

    const reader = new FileReader();                                                                                                               // FileReaer is a tool that can read the content of the files , here it will read the image and i will take it from him and put it in a variable
    reader.onload = () => {                                                                                                                             //when i finish reading :
      this.imagePreview = reader.result;                                                                                                         // i will put in the imagePreview variable
    };
    reader.readAsDataURL(this.selectedFile);                                                                                                // this is the code that tell fileReader to start reading the selected file and  and convert it to data url
    }
}









createFormData(){
    const formData = new FormData;
    formData.append('title',this.title?.value||"");
    formData.append('club',this.club?.value||"");
    formData.append('description',this.description?.value||"");
    formData.append('season',this.season?.value||"");
    formData.append('product',this.selectedProduct._id)

    if(this.selectedFile){
    formData.append('image',this.selectedFile)
    }
    return formData;
}











addBanner(){
    this.spinner.show();
    const formData = this.createFormData()
    this.homeControleService.createHomeBanner(formData).subscribe({
        next:(result)=>{
                this.spinner.hide();
                Toast.fire({
                    icon:"success",
                    title:result.message || "Home banner updated successfully"
                })
                this.router.navigateByUrl("home/mainhome")
        },
        error:(err)=>{
            this.spinner.hide()
            this.handleError(err)
        }
    })
}




    //this is the error function that you will put it inside the error function when you are trying to get data from the backend and pass to it the error coming
    handleError(err:any){
        //handling if there is no conection to the internet
        if(err.status===0){
            Toast.fire({
                title:"No internet connection. Please check your network.",
                icon:"error"
            })
            return;
        }

        //if there is and error returned in the data object in postman (its error in data in feilds)
        if(err?.error?.data){
            const errors=err?.error?.data;
            let messages:any[]=[];
            for(const key in errors){                                                                                                                                                                           //using for in to loop on keys in the errors       like name or image for examble
                if(errors.hasOwnProperty(key)){
                    messages.push(`${key}:${errors[key]}`)
                }
            }
            Toast.fire({
                title:messages.join(' | '),
                icon:"error"
            })
            return ;
        }

        //error in general
        Toast.fire({
            icon: 'error',
            title: err?.error?.message || 'Something went wrong. Please try again.',
        });
    }



    //**************************************************************************************************************************** */
    //for handling the product search input
    searchWord!:string;
    filteredProducts!:any[];
    selectedProduct!:any;

    onChangeSearchWord(event:any){
        this.searchWord=event.target.value;
        this.spinner.show();
    this.productsService.getAllProducts({ k :this.searchWord}).subscribe({
        next:(comingProducts)=>{
            this.filteredProducts=comingProducts.data;
            this.spinner.hide()
        },
        error:(err)=>{
            console.log(err.message)
            this.spinner.hide()
        }
    })
    }



    selectProduct(product:any){
        this.selectedProduct = product;
  this.filteredProducts = [];
  this.homeControlForm.get('choosenProduct')?.setValue(product.name); // <-- الاسم يظهر في الـ input
    }


}
