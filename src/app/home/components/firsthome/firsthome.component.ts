import { Component, OnInit } from '@angular/core';
import { HomecontrolService } from '../../../dashboard/homecontrol/services/homecontrol.service';

@Component({
  selector: 'app-firsthome',
  templateUrl: './firsthome.component.html',
  styleUrl: './firsthome.component.scss'
})
export class FirsthomeComponent implements OnInit {
    bannerDetails!:any;
constructor(private homeControlService:HomecontrolService ){

}
    ngOnInit(): void {
        this.loadBannerDetails()
    }

    loadBannerDetails(){
        this.homeControlService.getHomeBanner().subscribe({
            next:(result)=>{
                this.bannerDetails=result.data;
            },
            error:(err)=>{
                console.log("error in getting banner details " + err)
            }
        })
    }

}
