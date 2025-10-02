import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent {
productForm!: FormGroup;

    // Sample categories & teams (you can load from API later)
    categories = [
        { id: 1, name: 'Shoes' },
        { id: 2, name: 'T-Shirts' },
        { id: 3, name: 'Accessories' }
    ];

    teams = [
        { id: 1, name: 'Real Madrid' },
        { id: 2, name: 'Barcelona' },
        { id: 3, name: 'Liverpool' }
    ];

    // Sizes
    allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    selectedSizes: string[] = [];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.productForm = this.fb.group({
            name: ['', Validators.required],
            categoryId: ['', Validators.required],
            teamId: ['', Validators.required],
            sizes: [[]],
            image1: [null],
            image2: [null],
            image3: [null],
            priceBeforeDiscount: [0, [Validators.required, Validators.min(1)]],
            discount: [0, [Validators.min(0), Validators.max(100)]],
            priceAfterDiscount: [{ value: 0, disabled: true }]
        });

        this.onPriceChange();
    }

    // Sizes change
    onSizeChange(event: any) {
        const size = event.target.value;
        if (event.target.checked) {
            this.selectedSizes.push(size);
        } else {
            this.selectedSizes = this.selectedSizes.filter(s => s !== size);
        }
        this.productForm.patchValue({ sizes: this.selectedSizes });
    }

    // Auto update price after discount
    onPriceChange() {
        this.productForm.get('priceBeforeDiscount')?.valueChanges.subscribe(() => {
            this.updateFinalPrice();
        });
        this.productForm.get('discount')?.valueChanges.subscribe(() => {
            this.updateFinalPrice();
        });
    }

    updateFinalPrice() {
        const priceBefore = this.productForm.get('priceBeforeDiscount')?.value || 0;
        const discount = this.productForm.get('discount')?.value || 0;
        const finalPrice = priceBefore - (priceBefore * discount) / 100;
        this.productForm.patchValue({ priceAfterDiscount: finalPrice }, { emitEvent: false });
    }

    // Handle file uploads
    onFileChange(event: any, controlName: string) {
        const file = event.target.files[0];
        if (file) {
            this.productForm.patchValue({ [controlName]: file });
        }
    }

    onSubmit() {
        if (this.productForm.valid) {
            console.log(this.productForm.value);
            alert('Product added successfully!');
        }
    }
}
