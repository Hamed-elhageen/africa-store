import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesdashboardService } from '../../../categories/services/categoriesdashboard.service';
import { ProductsdashboardService } from '../../services/productsdashboard.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
//all the explanations are in edit product
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
    //those are the images which will be sent with the request
    mainImage!:File | null;
    extraImages!:File[] | null
    //those are the images which will appear in the page when the admin chosses them : there src with be passed to the src of the img in html to appear
    mainImagePreview: string | null = null;
    extraImagesPreview: string[] = [];
    productForm!: FormGroup;
    catId: string = '';



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


    constructor( private categoriesService:CategoriesdashboardService ,
        private productsService:ProductsdashboardService ,
        private spinner:NgxSpinnerService,
        private router:Router ) {}

    ngOnInit(): void {
        //inside oninit , we handle everything we want it to be executed when the page is opened like  api calls (getting data from backend) + handling the form + getting the id from the url  and so on so it can be used in the html when the component is opened
        this.productForm=new FormGroup({
        name: new FormControl("",[Validators.required, Validators.maxLength(30),Validators.minLength(3)]),
        description: new FormControl("",[Validators.required, Validators.maxLength(300),Validators.minLength(10)]),
        club:new FormControl("",[Validators.required]),
        category:new FormControl("",[Validators.required]),
        mainProductImage:new FormControl("",[Validators.required]),
        extraProductImages:new FormControl([],[Validators.required]),
        sizes:new FormControl([],[Validators.required]),                              //take care that sizes is an array
        stock:new FormControl("",[Validators.required,Validators.min(0),Validators.max(100000)]),
        priceBeforeDiscount:new FormControl("",[Validators.required,Validators.min(1),Validators.max(1000000)]),
        discount:new FormControl("",[Validators.min(0),Validators.max(90)]),
        priceAfterDiscount:new FormControl("",[Validators.required]),
    })
        this.loadCategories();
    }
    loadCategories(){
        this.categoriesService.getAllCategories().subscribe({
            next:(comingCategories)=>{
                this.categories=comingCategories.data;
            },
            error:(err)=>{
                console.log(err.message)
            }
        })
    }


//holding each input field here
    get name(){
        return this.productForm.get("name")
    }
    get description(){
        return this.productForm.get("description")
    }
    get sizes(){
        return this.productForm.get("sizes")
    }
    get stock(){
        return this.productForm.get("stock")
    }
    get club(){
        return this.productForm.get("club")
    }
    get categoryId(){
        return this.productForm.get("category")
    }
    get mainProductImage(){
        return this.productForm.get("mainProductImage")
    }
    get extraProductImage(){
        return this.productForm.get("extraProductImage")
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








    //handling the images inputs fields :
    onMainImageChange(event:any){
        if(event.target.files&&event.target.files.length>0){
            this.mainImage=event.target.files[0];

            if(this.mainImage){
             this.mainImagePreview = URL.createObjectURL(this.mainImage); // ✅ إنشاء رابط معاينة               creating an string url will be put in the mainimagepreview variable and will be passed to the html to make the image appera in front of the admin when he chosses the image
        }
    }
    }


    onExtraImageChange(event:any){
        const files = event.target.files;
        if (files && files.length > 0) {
            this.extraImages = Array.from(files);
            this.extraImagesPreview = this.extraImages.map(file => URL.createObjectURL(file));                                                      //here returns and array of the string urls of the images choosen
        } else {
            this.extraImages = null;
            this.extraImagesPreview = [];
    }
    }



    //a function for handling sizes and put choosed sizes in array when you choose it and remove size from array when you remove the mark on size:
    onSizeChange(size: string, event: any) {
    let selected: string[] = Array.isArray(this.sizes?.value) ? this.sizes?.value : [];

    if (event.target.checked) {
        if (!selected.includes(size)) selected.push(size);
    } else {
        selected = selected.filter(s => s !== size);
    }

    // Force it to always be an array
    this.sizes?.setValue(selected.length > 0 ? selected : []);
    this.sizes?.markAsTouched(); // مهم عشان validation يشتغل
}




//for getting the category id the admin chossed to be passed to the url as params
onCategoryChange(event: any) {
    this.catId = event.target.value;
}
//each time you change the value of the category , its value is put in catId ,and put this event on the select field




//handling the final price :

updateFinalPrice() {
    const price = this.priceBeforeDiscount?.value || 0;
    const discount = this.discount?.value || 0;

    if (discount < 0 || discount > 90) {
        this.priceAfterDiscount?.setValue(''); // امسح القيمة
        return;
    }

    const finalPrice = price - (price * discount / 100);
    this.priceAfterDiscount?.setValue(finalPrice.toFixed(2));
}




    //creating the data that will be sent to the back end in the request
    createFromData(){
        const formData = new FormData;
        formData.append("name",this.name?.value||"")
        formData.append("description",this.description?.value||"")
        formData.append("stock",this.stock?.value||"")
        formData.append("price",this.priceBeforeDiscount?.value||"")
        formData.append("club",this.club?.value||"")
        formData.append("discount",this.discount?.value||"")

        const selectedSizes = this.sizes?.value
    ? Array.isArray(this.sizes.value)
        ? this.sizes.value
        : [this.sizes.value]  // لو واحدة، حولها لمصفوفة
    : [];

selectedSizes.forEach((size: string) => {
    formData.append('sizes[]', size);
});


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
        this.productsService.addProduct(formData,this.catId).subscribe({
            next:(result)=>{
                Toast.fire({
                    icon:"success",
                    title:`${result?.message}`
                })
                    this.spinner.hide();
                    this.productForm.reset();
                    this.mainImage=null;
                    this.extraImages=null;
                    this.sizes?.setValue([]);
                    this.router.navigateByUrl("/dashboard/products")
            },
            error:(err)=>{
                Toast.fire({
                    icon:"error",
                    title:`${err?.error?.message}`
                })
                    this.spinner.hide();
            }
        })
    }
}



}




