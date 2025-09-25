import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  customClass: { popup: 'my-toast-style' },
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: false,
});

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  changeDetails!: FormGroup;
  userData: any = {};
  selectedAvatar!: File;
  avatarPreview: string | null = null;

  editField = { name: false, email: false, phone: false };

  constructor(
    private profileservice: ProfileService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.changeDetails = new FormGroup({
      name: new FormControl('', [Validators.pattern(/^.{1,30}$/)]),
      email: new FormControl('', [Validators.email]),
      phone: new FormControl('', [Validators.pattern(/^\d{1,15}$/)]),
      avatar: new FormControl('')
    });
  }

  get name() { return this.changeDetails.get('name'); }
  get email() { return this.changeDetails.get('email'); }
  get phone() { return this.changeDetails.get('phone'); }
  get avatar() { return this.changeDetails.get('avatar'); }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.profileservice.showProfile().subscribe({
      next: (response) => {
        this.userData = response.data;
      },
      error: (err) => {
        console.log('error fetching user data');
        throwError(() => err);
      },
    });
  }

  toggleEdit(field: 'name' | 'email' | 'phone') {
    this.editField[field] = !this.editField[field];
  }

  changeUserDetails() {
    if (this.changeDetails.valid) {
      this.spinner.show();
      const formData = this.createFormData();
      this.profileservice.changeUserDetails(formData).subscribe({
        next: (response) => {
          this.spinner.hide();
          Toast.fire({ icon: 'success', title: `${response.message}` });
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.spinner.hide();
          throwError(() => err);
          Toast.fire({ icon: 'error', title: 'عذرا , لم يتم التحديث' });
        },
      });
    }
  }

  createFormData() {
    const formData = new FormData();
    if (this.name?.value) formData.append('name', this.name.value);
    if (this.email?.value) formData.append('email', this.email.value);
    if (this.phone?.value) formData.append('phone', this.phone.value);
    if (this.selectedAvatar) formData.append('avatar', this.selectedAvatar);
    return formData;
  }






  //for handling the image and to appear in the circle when choose it
  // صورة الـ Preview
  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedAvatar = event.target.files[0];
      this.changeDetails.patchValue({ avatar: this.selectedAvatar });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarPreview = e.target.result;
      };
      reader.readAsDataURL(this.selectedAvatar);
    }
  }
}
