import { Component, EventEmitter, Input, Output } from '@angular/core';
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
    @Input() id:string=""
    @Input() productImage:string="";
    @Input() title:string="";
    @Input() discription="";
    @Input() price="";
    @Input() priceBeforediscount="";
    @Input() discount="";
    @Input() choosed!:boolean
    @Output() toggleFavorite = new EventEmitter<string>();

    constructor(private favoritesService:FavoritesService){}

    toggleFavoriteProduct(prdId:string){
        this.favoritesService.toggleAddition(prdId).subscribe({
            next:(result)=>{
                    this.choosed=!this.choosed;
                    this.toggleFavorite.emit(this.id);
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
