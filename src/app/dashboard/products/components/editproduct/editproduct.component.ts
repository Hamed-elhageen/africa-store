import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CategoriesdashboardService } from '../../../categories/services/categoriesdashboard.service';
import { ProductsdashboardService } from '../../services/productsdashboard.service';
import { Category } from '../../../categories/models/categories';
import { DashboardErrorHandlerService } from '../../../shared/services/dashboard-error-handler.service';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    customClass: { popup: 'my-toast-style' },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
});
@Component({
    selector: 'app-editproduct',
    templateUrl: './editproduct.component.html',
    styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {
    productForm!: FormGroup;                                            //declaring the edit form
    categories: Category[] = [];                                                   // array to put the categories in to be as values in the select field to choose the product category
    productId!: string;                                                       //the product id that i will get  from the url , of the product that i will update
    mainImage: File | null = null;                                     // the image that will be sent in the request will be put here
    extraImages: File[] = [];                                            //array of images which will be sent with the request
    mainImagePreview: string | null = null;                 // string varaible to put the link of the choosen image in to appear to the user when choosing an image
    extraImagesPreview: string[] = [];                         // array of the links of the images that the user will chosse to make them appear to see them
    catId: string = '';                                                   // variable to put the categorid of the category that the user choosed to the product to be sent to the backend

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

    allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

    //inside the constructor , you make the dependency injection and some initializations if found
    constructor(
    private categoriesService: CategoriesdashboardService,
    private productsService: ProductsdashboardService,
    private dashboardErrorHandler:DashboardErrorHandlerService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
) {}

ngOnInit(): void {
    //getting the id of the product we want to update from the url
    this.route.paramMap.subscribe((params)=>{
        this.productId=params.get("prdId")||'';
    })
    //handling the form
    this.productForm = new FormGroup({
        name: new FormControl('', [ Validators.maxLength(30), Validators.minLength(3)]),
        description: new FormControl('', [ Validators.maxLength(300), Validators.minLength(10)]),
        club: new FormControl(''),
        category: new FormControl(''),
        mainProductImage: new FormControl(''),
        extraProductImages: new FormControl([]),
        sizes: new FormControl([]),
        stock: new FormControl('', [Validators.min(0), Validators.max(100000)]),
        priceBeforeDiscount: new FormControl('', [ Validators.min(1), Validators.max(1000000)]),
        discount: new FormControl('', [Validators.min(0), Validators.max(90)]),
        priceAfterDiscount: new FormControl(''),
    });
//those were put here to get the categories and the product data when the component is opened , and there implementation is under and out of onInit
    this.loadCategories();
    this.loadProductData();
    }


    // ✅ Getters : to pickup all the fields to facilitate
    get name() { return this.productForm.get('name'); }
    get description() { return this.productForm.get('description'); }
    get club() { return this.productForm.get('club'); }
    get category() { return this.productForm.get('category'); }
    get sizes() { return this.productForm.get('sizes'); }
    get stock() { return this.productForm.get('stock'); }
    get mainProductImage() { return this.productForm.get('mainProductImage'); }
    get extraProductImage() { return this.productForm.get('extraProductImages'); }
    get priceBeforeDiscount() { return this.productForm.get('priceBeforeDiscount'); }
    get discount() { return this.productForm.get('discount'); }
    get priceAfterDiscount() { return this.productForm.get('priceAfterDiscount'); }

    loadCategories() {
    this.categoriesService.getAllCategories().subscribe({
        next: (res) => (this.categories = res.data),
        error: (err) => console.log(err),
    });
    }

    loadProductData() {
    this.spinner.show();
    this.productsService.gitSingleProduct(this.productId).subscribe({
        next: (res) => {
        const p = res.data;
        //here putting the data of this product in the input fields
        this.productForm.patchValue({
            name: p.name,
            description: p.description,
            club: p.club,
            category: p.category?._id,
            sizes: p.sizes || [],
            stock: p.stock,
            priceBeforeDiscount: p.price,
            discount: p.discount || 0,
            priceAfterDiscount: p.finalPrice || p.price,
        });
        this.catId = p.category?._id || '';                                                                                                                            //now the category id is put in this variable and will be used later
        this.mainImagePreview = p.thumbnail?.secure_url;                                                                                            //here i put the link of the produt main image in this variable to show the product image to the user
        this.extraImagesPreview = Array.isArray(p.images)? p.images.map((img: any) => img.secure_url): [];             // here the array of the links of the products images to be shown to the admin before changing them
        this.spinner.hide();
    },
    error: (err) => {
        console.log(err.message);
        this.spinner.hide();
    },
    });
}
                                                                                                                                                                                              //uptill now we wroked on the product previous state and got it and put it in the fields and picked the fields and so on ,
                                                                                                                                                                                             //now its time to handle when these data is changed and sent to the server  ,specially the fields which isnt normal like select  , checkbox , file field      fields with which you use with it events and functions to handle its values
                                                                                                                                                                                             //to handle the image and take the value of this field we must use a function to handle that and put it to be executed when the image is changed
    onMainImageChange(event: Event) {
        let mainImageInput = event.target as HTMLInputElement
        if (mainImageInput.files && mainImageInput.files.length > 0) {
            this.mainImage = mainImageInput.files[0];                                                                                                                   //here i put the image in this varible  and after that will be sent to the server as file
            if(this.mainImage){
            this.mainImagePreview = URL.createObjectURL(this.mainImage);                                                                            // here i created an url of this image as string and put in this variable and by this i will show the user the image when it is choosed
    }
    }
}

//this to handle the extra product images
    onExtraImageChange(event: Event) {
        const extraImagesInput = event.target as HTMLInputElement;
        if (extraImagesInput?.files && extraImagesInput.files.length > 0) {
            this.extraImages = Array.from(extraImagesInput.files);
            this.extraImagesPreview = this.extraImages.map((file) => URL.createObjectURL(file));                                   //by this i put the links of the images and the array and will be shown to the user
        } else {
        this.extraImages = [];
        this.extraImagesPreview = [];
    }
}


                                                                                                                                                                              //also a function to handle the size checkbox , i told you that fields like checkbox and files and select need a function to handle it whe the value is changed
    onSizeChange(size: string, event: Event) {
        let sizesInput = event.target as HTMLInputElement
        const selected = this.sizes?.value || [];                                                                                                            // first , the value of this array is the choosed values of the check box
        if (sizesInput.checked) {
        selected.push(size);                                                                                                                                        // after that if you choosed another size , add it to the array
        } else {
                                                                                                                                                                             //remove it from the selected array
        const index = selected.indexOf(size);
        if (index !== -1) selected.splice(index, 1);
    }
    this.sizes?.setValue(selected);                                                                                                                       //the value of the sizes will be the final  selected array  after addition and remove
}

    updateFinalPrice() {                                                                                                                                   // this is the function to put the final price automatically
    const price = this.priceBeforeDiscount?.value || 0;
    const discount = this.discount?.value || 0;
    if (discount < 0 || discount > 90) {
        this.priceAfterDiscount?.setValue('');
        return;
    }
    const finalPrice = price - (price * discount) / 100;
    this.priceAfterDiscount?.setValue(finalPrice.toFixed(2));
    }




    createFormData() {                                                                                                                                                          //now its time to handle the function of create the form data that will be sent to the server
    const formData = new FormData();
    formData.append('name', this.name?.value || '');
    formData.append('description', this.description?.value || '');
    formData.append('stock', this.stock?.value || '');
    formData.append('price', this.priceBeforeDiscount?.value || '');
    formData.append('club', this.club?.value || '');
    formData.append('discount', this.discount?.value || '0');

    //now its time to add the values of the select field or checkbox or files or any thing that is changed
    formData.append('category', this.category?.value);

    const selectedSizes = this.sizes?.value || [];
    selectedSizes.forEach((size: string) => formData.append('sizes[]', size));

    if (this.mainImage) formData.append('thumbnail', this.mainImage);

    if (this.extraImages.length > 0){
        this.extraImages.forEach((img) => formData.append('images', img));
        }
    return formData;
    }
//by this you created the formData of all the fields the user enters , now lets go to send it



    updateProduct() {
        if (this.productForm.invalid) return;
        this.spinner.show();
        const formData = this.createFormData();

        this.productsService.updateProduct( formData,this.productId).subscribe({
            next: (res) => {
                Toast.fire({ icon: 'success', title: `${res.message}` });
                this.spinner.hide();
                this.router.navigateByUrl('/dashboard/products');
        },
        error: (err) => {
        this.dashboardErrorHandler.handleError(err)
        this.spinner.hide();
        },
    });
}

}
