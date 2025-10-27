import { Component, Input } from '@angular/core';
import { FavoritesService } from '../../../favorites/services/favorites.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
    constructor(private favoriteService:FavoritesService){}
  @Input() id?:string
  @Input() productImage:string="";
  @Input() title:string="";
  @Input() discription="";
  @Input() price="";
  @Input() priceBeforediscount="";
  @Input() discount="";


  choosed:boolean=false;
  toggleFavIcon(){
    this.choosed=!this.choosed;
  }


   addToFavorites(prdId:number){
    this.favoriteService.favoriteProducts.push()
    }
}
