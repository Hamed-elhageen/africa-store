import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
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
    categories:any[]=[]                                   //will come from the backend
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
    //those are the images which will be sent with the request
    mainImage!:File | null;
    extraImages!:File[] | null
    //those are the images which will appear in the page when the admin chosses them : there src with be passed to the src of the img in html to appear
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
        name: new FormControl("",[Validators.required, Validators.maxLength(30),Validators.minLength(3)]),
        description: new FormControl("",[Validators.required, Validators.maxLength(120),Validators.minLength(10)]),
        club:new FormControl("",[Validators.required]),
        categoryId:new FormControl("",[Validators.required]),
        mainProductImage:new FormControl("",[Validators.required]),
        extraProductImages:new FormControl([],[Validators.required]),
        sizes:new FormControl([],[Validators.required]),                              //take care that sizes is an array
        stock:new FormControl("",[Validators.required,Validators.min(0),Validators.max(100000)]),
        priceBeforeDiscount:new FormControl("",[Validators.required,Validators.min(0),Validators.max(1000000)]),
        discount:new FormControl("",[Validators.min(0),Validators.max(90)]),
        priceAfterDiscount:new FormControl("",[Validators.required]),
    })
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
        return this.productForm.get("categoryId")
    }
    //those to handle validations only of the images not to send them
     get mainProductImage(){
        return this.productForm.get("mainProductImage")
    }
     get extraProductImage(){
        return this.productForm.get("extraProductImage")
    }
    //*********************************** */

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
        formData.append("description",this.description?.value||"")
        // formData.append("categoryId",this.categoryId?.value||"")
        formData.append("stock",this.stock?.value||"")
        formData.append("price",this.priceBeforeDiscount?.value||"")
        // formData.append("discount",this.discount?.value||"")
        // formData.append("finalPrice",this.priceAfterDiscount?.value||"");

//         const selectedSizes = this.productForm.get('sizes')?.value || [];
//         selectedSizes.forEach((s: string) => {
//         formData.append('sizes', s);
// });

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




    //a function for handling sizes and put choosed sizes in array when you choose it and remove size from array when you remove the mark on size:
    onSizeChange(size: string, event: any) {
  const selectedSizes = this.sizes?.value || [];
  if (event.target.checked) {
    // ✅ لو المستخدم اختار المقاس ده، نضيفه في المصفوفة
    selectedSizes.push(size);
  } else {
    // ❌ لو شال العلامة، نحذفه
    const index = selectedSizes.indexOf(size);
    if (index > -1) {
      selectedSizes.splice(index, 1);
    }
  }

  // نحدّث القيمة في الـ form control
  this.sizes?.setValue(selectedSizes);
}






//for getting the category id the admin chossed to be passed to the url as params
catId: string = '';
onCategoryChange(event: any) {
  this.catId = event.target.value;
}
//each time you change the value of the category , its value is put in catId ,and put this event on the select






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
                    this.productForm.get('sizes')?.setValue([]);
                    this.router.navigateByUrl("/dashboard/products")
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






//handling the final price :

updateFinalPrice() {
  const price = this.priceBeforeDiscount?.value || 0;
  const discount = this.discount?.value || 0;

   if (discount < 0 || discount > 90) {
    this.priceAfterDiscount?.setValue(''); // امسح القيمة
    return;
  }

  const finalPrice = price - (price * discount / 100);

  // ✅ نحدث القيمة جوه الـ FormControl نفسه
  this.priceAfterDiscount?.setValue(finalPrice.toFixed(2));
}






}




