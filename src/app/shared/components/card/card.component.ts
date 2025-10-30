import { Component, Input } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    customClass: {
  popup: 'my-toast-style'
    },
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: false,
  });
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
    constructor(private favoritesService:FavoritesService){}
  @Input() id:string=""
  @Input() productImage:string="";
  @Input() title:string="";
  @Input() discription="";
  @Input() price="";
  @Input() priceBeforediscount="";
  @Input() discount="";


  choosed:boolean=false;



  toggleFavoriteProduct(prdId:string){
                    this.choosed=!this.choosed;
        this.favoritesService.toggleAddition(prdId).subscribe({
            next:(result)=>{
                Toast.fire({
                    title:`   ${result.message}` || "updated successfully",
                    icon:"success"
                })
            },
            error:(err)=>{
                Toast.fire({
                    title:"Failed !!!",
                    icon:"error"
                })
            }

        })
    }

}
