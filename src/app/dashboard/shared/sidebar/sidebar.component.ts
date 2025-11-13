import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { BaseOptions } from 'vm';
import { LoginService } from '../../../auth/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

    constructor(private loginService:LoginService , private router:Router){
        
    }
@Input() isSidebarOpen:boolean=false



@Output() close = new EventEmitter<void>();

    onClose() {
        this.close.emit();
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
