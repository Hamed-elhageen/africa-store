import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import TypeIt from 'typeit';

@Component({
  selector: 'app-firsthome',
  templateUrl: './firsthome.component.html',
  styleUrl: './firsthome.component.scss'
})
export class FirsthomeComponent implements OnInit {
    bannerDetails!:any;
    imageUrl:any;
    description:any;
    title:any;
    club:any;
    season:any
constructor(private productsService:ProductsService ){

}
    ngOnInit(): void {
        this.loadBannerDetails()
    }

    loadBannerDetails(){
        this.productsService.getHomeBanner().subscribe({
            next:(result)=>{
                this.bannerDetails=result?.data[result?.data?.length-1];
                this.imageUrl=result?.data[result?.data?.length-1].image.secure_url;
                this.description=result?.data[result?.data?.length-1].description;
                this.title=result?.data[result?.data?.length-1].title;
                this.club=result?.data[result?.data?.length-1].club;
                this.season=result?.data[result?.data?.length-1].season

            },
            error:(err)=>{
                console.log("error in getting banner details " + err)
            }
        })
    }

}
