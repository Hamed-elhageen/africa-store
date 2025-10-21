import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesdashboardService } from '../../../categories/services/categoriesdashboard.service';
import { ProductsdashboardService } from '../../services/productsdashboard.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
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
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent implements OnInit{
    categories:any[]=[]
    teams = [
        { id: 1, name: 'Real Madrid' },
        { id: 2, name: 'Barcelona' },
        { id: 3, name: 'Liverpool' },
        { id: 4, name: 'Arsenal' },
        { id: 5, name: 'Chelsea' },
        { id: 6, name: 'Man city' },
        { id: 7, name: 'Al ahly' },
        { id: 8, name: 'Zamalek' },
        { id: 9, name: 'Inter miami' },
        { id: 10, name: 'Al nasr' },
        { id: 11, name: 'Another' },
    ];
    allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL','XXXL'];
    //those are the images which will be sent to the server
    mainImage!:File | null;
    extraImages!:File[] | null
    //those are the images which will appear in the page when the admin chosses them : there src with be passed to the src of the img in html
    mainImagePreview: string | null = null;
    extraImagesPreview: string[] = [];




    constructor( private categoriesService:CategoriesdashboardService , private productsService:ProductsdashboardService , private spinner:NgxSpinnerService, private router:Router ) {
        //getting the cateogires to be as values in the select field when adding product
        this.categoriesService.getAllCategories().subscribe({
            next:(comingCategories)=>{
                this.categories=comingCategories.data;
            },
            error:(err)=>{
                console.log(err.message)
            }
        })
    }
    productForm!: FormGroup;
    ngOnInit(): void {
        //inside oninit , we handle the variables and so on so it can be used in the html when the component is opened
        this.productForm=new FormGroup({
        name: new FormControl("",[Validators.required, Validators.maxLength(20)]),
        categoryId: new FormControl("",[Validators.required]),
        teamId:new FormControl("",[Validators.required]),
        size:new FormControl("",[Validators.required]),
        priceBeforeDiscount:new FormControl("",[Validators.required]),
        discount:new FormControl("",[Validators.required]),
        priceAfterDiscount:new FormControl("",[Validators.required]),
    })
    }


    //handling the images inputs fields :
    onMainImageChange(event:any){
        if(event.target.files&&event.target.files.length>0){
            this.mainImage=event.target.files[0];

            if(this.mainImage){
             this.mainImagePreview = URL.createObjectURL(this.mainImage); // ✅ إنشاء رابط معاينة
        }
    }
    }


    onExtraImageChange(event:any){
        const files = event.target.files;
        if (files && files.length > 0) {
            this.extraImages = Array.from(files);
            this.extraImagesPreview = this.extraImages.map(file => URL.createObjectURL(file));
        } else {
            this.extraImages = null;
            this.extraImagesPreview = [];
    }
    }












    get name(){
        return this.productForm.get("name")
    }
    get categoryId(){
        return this.productForm.get("categoryId")
    }
    get size(){
        return this.productForm.get("size")
    }

    get priceBeforeDiscount(){
        return this.productForm.get("priceBeforeDiscount")
    }
    get discount(){
        return this.productForm.get("discount")
    }
    get priceAfterDiscount(){
        return this.productForm.get("priceAfterDiscount")
    }


    //creating the data that will be sent to the back end in the request
    createFromData(){
        const formData = new FormData;
        formData.append("name",this.name?.value||"")
        formData.append("categoryId",this.categoryId?.value||"")
        formData.append("size",this.size?.value||"")
        formData.append("price",this.priceBeforeDiscount?.value||"")
        formData.append("discount",this.discount?.value||"")
        formData.append("finalPrice",this.name?.value||"");

        if(this.mainImage){
            formData.append("thumbnail",this.mainImage)
        }

        if(this.extraImages&&this.extraImages.length>0){
            this.extraImages.forEach((image)=>{
                formData.append("images",image)
            })
        }
        return formData;
    }










    addProduct(){
        if(this.productForm.valid){
            this.spinner.show();
        const formData=this.createFromData();
        this.productsService.addProduct(formData).subscribe({
            next:(result)=>{
                Toast.fire({
                    icon:"success",
                    title:`${result?.message}`
                })
                    this.spinner.hide();
                    this.productForm.reset();
                    this.mainImage=null;
                    this.extraImages=null;
                    this.router.navigateByUrl("/dashboard/categories")
            },
            error:(err)=>{
                Toast.fire({
                    icon:"error",
                    title:`${err?.message}`
                })
                    this.spinner.hide();
            }
        })
    }
}













}




