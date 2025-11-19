import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { BaseOptions } from 'vm';
import { Router } from '@angular/router';
import { LoginService } from '../../../../auth/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
@Input() isSidebarOpen:boolean=false
    constructor(private loginService:LoginService , private router:Router){}

//first , isSidebarOpen will come from out , and based on its value the sidebar will be opened or closed.
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
