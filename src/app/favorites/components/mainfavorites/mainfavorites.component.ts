import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../../shared/services/favorites.service';
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
  selector: 'app-mainfavorites',
  templateUrl: './mainfavorites.component.html',
  styleUrl: './mainfavorites.component.scss'
})
export class MainfavoritesComponent implements OnInit{
        favoriteProducts:any;
        favoriteIds:any;
    constructor(private favoritesService:FavoritesService){}
    ngOnInit(): void {
        this.loadFavorites();
    }
    loadFavorites(){
this.favoritesService.getFavorites().subscribe({
            next:(result)=>{
                this.favoriteProducts=result?.data?.map((prd:any)=>({
                    ...prd,
                    choosed:true
                }));

            },
            error:(err)=>{
                console.log(err.message)
            }
        });
    }






    toggleFavorite(prdId: string) {
  // لا نستدعي الـ backend هنا تاني
  this.favoriteProducts = this.favoriteProducts.filter((prd: any) => prd._id !== prdId);
}


trackById(index: number, item: any) {
    return item._id;
}


    }


