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
    @Input() price!:number;
    @Input() priceBeforediscount!:number;
    @Input() discount!:number;
    @Input() choosed!:boolean
    //this is and event will be sent to the parent when it is emitted
    @Output() toggleFavorite = new EventEmitter<string>();

    constructor(private favoritesService:FavoritesService){}

    toggleFavoriteProduct(prdId:string){
        this.favoritesService.toggleAddition(prdId).subscribe({
            next:(result)=>{
                    this.choosed=!this.choosed;
                    //here i emitted it , so the parent will see that and remove or add the product to the favorite products
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
