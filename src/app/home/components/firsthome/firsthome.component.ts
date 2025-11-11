import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-firsthome',
  templateUrl: './firsthome.component.html',
  styleUrl: './firsthome.component.scss'
})
export class FirsthomeComponent implements OnInit {
    bannerDetails!:any;
    imageUrl:any;
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
                console.log(this.bannerDetails)
            },
            error:(err)=>{
                console.log("error in getting banner details " + err)
            }
        })
    }

}
