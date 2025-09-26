import { Component, HostListener, OnInit } from '@angular/core';
import { Category } from '../../modles/category';
import { LoginService } from '../../../auth/services/login.service';
import { ProfileService } from './../../../auth/services/profile.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
selector: 'app-navbar',
templateUrl: './navbar.component.html',
styleUrl: './navbar.component.scss',
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
export class NavbarComponent  {
    isMenuOpen = false;
    isScrolled = false;

  //   function to make the header sticky when scrolling a part  of pixels
    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isScrolled = window.scrollY > 115;
      // here i am telling him thai is scrolling will be true when it scroll 115 pixel and in the html , i will add condition , if is scrolled true , git it another background for examble
    }

    //   for going and scroll to each section when clicking on its link and make it active
        currentSection: string = 'home';

scrollTo(sectionId: string) {
  const section = document.getElementById(sectionId);
  if (section) {
    const yOffset = -120; // هنا بتحط ارتفاع الـ navbar بالـ px (عدله حسب حالتك)
    const y = section.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });

    this.currentSection = sectionId;
  }
}



    //functions to handle opening and closing menue
    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }
    closeMenu(): void {
        this.isMenuOpen = false;
    }

//categoreis which will come from back end , we put it here for test , only , after that we will fetch it here and put it in its variable also or object
    public allcategories:Category[]=[
        {
            categoryName:"Football shirts",
            categoryid:"1",
            categoryimage:"/germany.png"
        },
        {
            categoryName:"Sports shirts",
            categoryid:"2",
            categoryimage:"/shirts.svg"
        },
        {
            categoryName:"Sports shoes",
            categoryid:"3",
            categoryimage:"/shoes.svg"
        },
        {
            categoryName:"Sports bags",
            categoryid:"4",
            categoryimage:"/bags.svg"
        },
        {
            categoryName:"Sports accessories",
            categoryid:"5",
            categoryimage:"/gloves.svg"
        },
        {
            categoryName:"Football shoes",
            categoryid:"6",
            categoryimage:"/stars.svg"
        },
    ] ;


  //for authentication
    isLogged: boolean = false;
    userImage:any;
constructor(private authService: LoginService , private profileService:ProfileService , private router :Router , private loginService:LoginService) {
      //for checking if you are logged or no
    this.authService.isUserLoggedSubject.subscribe({
    next: (status: boolean) => {
        this.isLogged = status;
    },
    error: (err) => {
        console.error('Error subscribing to login status:', err);
    }
    });

        //for getting the image of the user to be put in the navbar
    this.profileService.showProfile().subscribe({
        next:(userData)=>{
            this.userImage=userData.data.avatar;
        },
        error:(err)=>{
            console.error(err)
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









   profileMenuOpen:boolean=false;
toggleProfileMenuOpen(){
    this.profileMenuOpen=!this.profileMenuOpen;
}
}
