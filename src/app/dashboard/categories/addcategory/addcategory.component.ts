import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.scss'
})
export class AddcategoryComponent {
 categoryForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.categoryForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            description: [''],
            image: [null, Validators.required]
        });
    }

    onFileChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.categoryForm.patchValue({ image: file });
        }
    }

    submit() {
        if (this.categoryForm.valid) {
            console.log(this.categoryForm.value);
            // هنا بعدين هنبعت البيانات للباك اند
        } else {
            this.categoryForm.markAllAsTouched();
        }
    }
}
