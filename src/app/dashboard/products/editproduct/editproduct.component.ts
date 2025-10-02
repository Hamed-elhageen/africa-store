import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.scss'
})
export class EditproductComponent {
productForm!: FormGroup;

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

    allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    selectedSizes: string[] = [];

    preview: any = { image1: null, image2: null, image3: null };

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.productForm = this.fb.group({
            name: ['Football T-shirt', Validators.required],
            categoryId: [2, Validators.required],
            teamId: [1, Validators.required],
            sizes: [['M', 'L']],
            image1: [null],
            image2: [null],
            image3: [null],
            priceBeforeDiscount: [100, [Validators.required, Validators.min(1)]],
            discount: [10, [Validators.min(0), Validators.max(100)]],
            priceAfterDiscount: [{ value: 90, disabled: true }]
        });

        this.selectedSizes = this.productForm.get('sizes')?.value || [];
        this.onPriceChange();
    }

    onSizeChange(event: any) {
        const size = event.target.value;
        if (event.target.checked) {
            this.selectedSizes.push(size);
        } else {
            this.selectedSizes = this.selectedSizes.filter(s => s !== size);
        }
        this.productForm.patchValue({ sizes: this.selectedSizes });
    }

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

    onFileChange(event: any, controlName: string) {
        const file = event.target.files[0];
        if (file) {
            this.productForm.patchValue({ [controlName]: file });
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.preview[controlName] = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    onUpdate() {
        if (this.productForm.valid) {
            console.log(this.productForm.value);
            alert('Product updated successfully!');
        }
    }
}
