import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from '../../../auth/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    // for opeining the menue in mobile
    isMenuOpen = false;
    // for making position stiky after scrlling
    isScrolled=false;
    // default to 'home' , to add active to the link i click , because routerLinkActive work only with routerLink when routing to another component and another page
    currentSection: string = 'home';


    // functions for openign and closing the menue in mobile
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  closeMenu(): void {
    this.isMenuOpen = false;
  }


//   function to make the sticky header with another styles  when scrolling a part  of pixels
@HostListener('window:scroll', [])                           //function to lesten on scroll
    onWindowScroll() {
    this.isScrolled = window.scrollY > 88;
    // here i am telling him thai is scrolling will be true when it scroll 88 pixel and in the html , i will add condition , if is scrolled true , git it another background for examble
}


//   for going and scroll to each section when clicking on its link and make it active
scrollTo(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      this.currentSection = sectionId; // <<< this line is new
    }
  }









//   for authentication
isLogged: boolean = false;
constructor(private loginService: LoginService) {
  this.loginService.isUserLoggedSubject.subscribe({
    next: (status: boolean) => {
      this.isLogged = status;
    },
    error: (err) => {
      console.error('Error subscribing to login status:', err);
    }
  });
}



profileMenuOpen:boolean=false;
toggleProfileMenuOpen(){
    this.profileMenuOpen=!this.profileMenuOpen;
}



logout() {
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you want to logout?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, logout!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.loginService.logout();
      Swal.fire(
        'Logged out!',
        'You have been logged out.',
        'success'
      );
    }
  });
}


}
