import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detaileditem',
  templateUrl: './detaileditem.component.html',
  styleUrl: './detaileditem.component.scss'
})
export class DetaileditemComponent implements OnInit{
    currentId:number=0
constructor(private acitvatedRoute:ActivatedRoute){

}
    ngOnInit(): void {
        this.acitvatedRoute.paramMap.subscribe((paramMap)=>{
            this.currentId=Number(paramMap.get('id'))
        })
    }
    // by this when changing the id in the url it will be changed in the currenId , because paramMap is returning observable and iam observing it , when the id changes , change it in the current id
}
