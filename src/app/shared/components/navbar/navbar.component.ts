import { Component, HostListener } from '@angular/core';
import { Category } from '../../modles/category';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen = false;
  isScrolled = false;

  //   function to make the header sticky when scrolling a part  of pixels
  @HostListener('window:scroll', [])
    onWindowScroll() {
      this.isScrolled = window.scrollY > 0;
      // here i am telling him thai is scrolling will be true when it scroll 88 pixel and in the html , i will add condition , if is scrolled true , git it another background for examble
    }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  closeMenu(): void {
    this.isMenuOpen = false;
  }


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
}
