import { Component, HostListener } from '@angular/core';
import { LoginService } from '../../../auth/services/login.service';

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

    currentSection: string = 'home'; // default to 'home' , to add active to the link i click , because routerLinkActive work only with routerLink when routing to another component and another page



    // functions for openign and closing the menue in mobile
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  closeMenu(): void {
    this.isMenuOpen = false;
  }


//   function to make the header sticky when scrolling a part  of pixels
@HostListener('window:scroll', [])
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

constructor(private authService: LoginService) {
  this.authService.isUserLoggedSubject.subscribe({
    next: (status: boolean) => {
      this.isLogged = status;
    },
    error: (err) => {
      console.error('Error subscribing to login status:', err);
    }
  });
}
}
