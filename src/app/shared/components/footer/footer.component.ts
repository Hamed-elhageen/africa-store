import { Component, HostListener } from '@angular/core';
import { Category } from '../../modles/category';
import { CategoriesService } from '../../../home/services/categories.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
    showProducts = false;
    showBranches = false;
  isMobile = window.innerWidth < 768;                                                  //is mobile will be trun if the width of the screen you are opening is less than 768

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
    this.isMobile = event.target.innerWidth < 768;                            // here you are lestening on the window resize , if its size became less than 768 , so ismobile will be true
    }
    allcategories!:any[];
    constructor(private categoriresService:CategoriesService){
            this.allcategories= this.categoriresService.getAllCategories()
    }


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
    ] ;

}
