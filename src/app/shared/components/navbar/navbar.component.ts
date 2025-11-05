import { Component, HostListener, OnInit } from '@angular/core';
import { Category } from '../../modles/category';
import { LoginService } from '../../../auth/services/login.service';
import { ProfileService } from './../../../auth/services/profile.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { CategoriesService } from '../../services/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';

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
export class NavbarComponent implements OnInit  {
    isMenuOpen = false;
    isScrolled = false;
    profileMenuOpen:boolean=false;
    allcategories!:any[];
    cartProductsCount!:any[]
    cartCount:number=0;
    favoritesCount:number=0
    currentSection: string = 'home';
    isLogged: boolean = false;
    userImage:any;


    constructor(private authService: LoginService,private spinner:NgxSpinnerService , private profileService:ProfileService , private router :Router , private categoriesService:CategoriesService , private cartService:CartService , private favoritesService:FavoritesService ) {}

    ngOnInit(): void {
        this.checkLogging();
        this.getUserData();
        this.getCategories();

        //to get the number of products in the cart:
        this.cartService.getCartCount().subscribe(count => {
                this.cartCount = count;
            });
        this.cartService.getCartProducts().subscribe();


        this.favoritesService.getFavoritesCount().subscribe(favoritesCount=>{
            this.favoritesCount=favoritesCount
        })
        this.favoritesService.getFavorites().subscribe();
    }







  //   function to make the header sticky when scrolling a part  of pixels
    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isScrolled = window.scrollY > 115;
      // here i am telling him thai is scrolling will be true when it scroll 115 pixel and in the html , i will add condition , if is scrolled true , git it another background for examble
    }

//   for going and scroll to each section when clicking on its link and make it active
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



    toggleProfileMenuOpen(){
    this.profileMenuOpen=!this.profileMenuOpen;
}


    checkLogging(){
        this.authService.isUserLoggedSubject.subscribe({
            next: (status: boolean) => {
                this.isLogged = status;
            },
            error: (err) => {
                console.error('Error subscribing to login status:', err);
    }
    });
    }

    getUserData(){
        //for getting the image of the user to be put in the navbar
        this.spinner.show()
        this.profileService.showProfile().subscribe({
            next:(userData)=>{
                this.userImage=userData.data.avatar;
                this.spinner.hide()
            },
            error:(err)=>{
                console.log(err)
                this.spinner.hide()
            }
        })
    }

    getCategories(){
        this.spinner.show()
        this.categoriesService.getAllCategories().subscribe({
            next:(result)=>{
                this.allcategories=result.data;
                this.spinner.hide()
            },
            error:(error)=>{
                console.log(error.message)
                this.spinner.hide()
            }
});
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
                this.authService.logout();
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
