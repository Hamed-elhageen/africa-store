import { Component, HostListener } from '@angular/core';
import { Category } from '../../modles/category';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  showProducts = false;
  showBranches = false;
  isMobile = window.innerWidth < 768; // Adjust breakpoint as needed

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 768; // Adjust breakpoint as needed
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

  branches: string[] = [
    // First Column
    'Downtown',
    'Nasr City',
    'Alf-maskan',
    'Maadi',
    'Shaubra El-Kheima',
    '6th of October',
    'Haram',
    'Helwen',
    'Fayoum',
    'Banha',

    // Second Column (Tanta)
    'Tanta',
    'Kafr El-Shakh "Dessouk"',
    'Beni Suef',
    'Beheira "Damanhour"',
    'Beheiro "Tay El-Baroud"',
    'El-Mahalla',
    'Zagazig',
    'Mansoura "Bus Station"',
    'Mansoura "University District"',
    'Alexandria "Agamy"',

    // Third Column (Mansoura)
    'Mansoura',
    'Damietta',
    'Minya',
    'Minya "Mallawi"',
    'Qanater El-Khairiya',
    'Menoufia "Shibin El-Kom"'
  ];

}
