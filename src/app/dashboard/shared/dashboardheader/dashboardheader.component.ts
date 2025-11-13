import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../../../auth/services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from '../../../auth/services/profile.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboardheader',
  templateUrl: './dashboardheader.component.html',
  styleUrl: './dashboardheader.component.scss',
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }), // تبدأ تحت وبـ opacity 0
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })) // تطلع لفوق وتبان
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' })) // ترجع لتحت وتختفي
      ])
    ])
  ]

})
export class DashboardheaderComponent  implements OnInit{
    constructor(private loginService:LoginService , private spinner:NgxSpinnerService , private profileService:ProfileService , private router:Router){}
    ngOnInit(): void {
        this.getUserData();
    }
@Output() toggleSidebar = new EventEmitter<void>();
userImageSrc!:string;

    onToggleSidebar() {
        this.toggleSidebar.emit();
    }

    //************************************************************************************************************************************ */
    profileMenuOpen:boolean=false;
    toggleProfileMenuOpen(){
        this.profileMenuOpen=!this.profileMenuOpen
    }





    getUserData(){
            this.spinner.show()
            return this.profileService.showProfile().subscribe({
                next:(response)=>{
                    this.userImageSrc=response.data.avatar.secure_url;
                    this.spinner.hide()
                },
                error:(err)=>{
                    console.log("error now ",err)
                    this.spinner.hide()
                }
            })
        }



    logout() {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to logout?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#1C6F37',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
        if (result.isConfirmed) {
            this.loginService.logout();
            Swal.fire(
                'Logged out!',
                'You have been logged out.',
                'success'
            );
            this.router.navigateByUrl('/authentication/login');                                                                                           // and now navigate him to the login page again
        }
        });
    }
}
