import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HomecontrolService } from '../../services/homecontrol.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ProductsdashboardService } from '../../../products/services/productsdashboard.service';
import { DashboardErrorHandlerService } from '../../../shared/services/dashboard-error-handler.service';
import { Product } from '../../../products/models/products';
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
    selectedFile!:File;                                                                                                                                                  //this will be the file image you choose , and in the html i did if the user choosed and image , execute the fucntion called onFileChange()
    imagePreview: string | null = null;                                                                                                //variable to save in it a copy of the image to show to the user
     //for handling the product search input
    searchWord!:string;
    filteredProducts!:Product[];
    selectedProduct!:Product;

    homeControlForm=new FormGroup({
        title:new FormControl("",[Validators.required,Validators.maxLength(20)]),
        club:new FormControl("",[Validators.required,Validators.maxLength(20)]),
        description:new FormControl("",[Validators.required,Validators.maxLength(80)]),
        season:new FormControl(""),
        bannerImage:new FormControl("",[Validators.required]),
          choosenProduct: new FormControl('') // <-- هنا ضيفناه
    })


    constructor(private homeControleService:HomecontrolService ,  private dashbaordErrorHandler:DashboardErrorHandlerService,private spinner:NgxSpinnerService,private router : Router ,private productsService:ProductsdashboardService){

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



    onFileChange(event: Event) {                                                                                                                            //this is an event that will occur when the admin changes the category image
    const fileInput = event.target as HTMLInputElement
        if (fileInput.files && fileInput.files.length > 0) {                                                                                 // here we are checking if the user choosed a file (image)
              this.selectedFile = fileInput.files[0];                                                                                                      //here i put the file he choosed in the selected file variable
            this.imagePreview=URL.createObjectURL(this.selectedFile)
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
            this.dashbaordErrorHandler.handleError(err)
        }
    })
}

    // handling the search on product in adding banner
    onChangeSearchWord(event:Event){
        this.searchWord=(event.target as HTMLInputElement).value;
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
