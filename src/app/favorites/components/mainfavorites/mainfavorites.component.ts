import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-mainfavorites',
  templateUrl: './mainfavorites.component.html',
  styleUrl: './mainfavorites.component.scss'
})
export class MainfavoritesComponent implements OnInit{
        favoriteProducts:any;
    constructor(private favoritesService:FavoritesService){

    }
    ngOnInit(): void {
        this.favoriteProducts=this.favoritesService.getAllFavorites();
    }
    }


