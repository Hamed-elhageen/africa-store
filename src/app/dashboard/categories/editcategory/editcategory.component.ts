import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrl: './editcategory.component.scss'
})
export class EditcategoryComponent {
editCategoryForm!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // هنا بتحط البيانات اللي جايالك من الـ API
    const categoryData = {
      name: 'Shoes',
      description: 'All kinds of sports shoes',
      image: 'https://via.placeholder.com/150' // الصورة القديمة
    };

    this.previewUrl = categoryData.image;

    this.editCategoryForm = this.fb.group({
      name: [categoryData.name, [Validators.required, Validators.minLength(2)]],
      description: [categoryData.description],
      image: [null] // مش شرط المستخدم يغير الصورة
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.editCategoryForm.patchValue({ image: file });

      // عرض الصورة المختارة
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submit() {
    if (this.editCategoryForm.valid) {
      console.log(this.editCategoryForm.value);
      // هنا تبعت التعديلات للباك اند
    } else {
      this.editCategoryForm.markAllAsTouched();
    }
  }
}
