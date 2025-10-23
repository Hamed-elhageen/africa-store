import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-detaileditem',
  templateUrl: './detaileditem.component.html',
  styleUrl: './detaileditem.component.scss'
})
export class DetaileditemComponent implements OnInit{
    currentId:number=0;
    choosedProduct:any;
constructor(private acitvatedRoute:ActivatedRoute, private productsService : ProductsService){

}
    ngOnInit(): void {
        this.acitvatedRoute.paramMap.subscribe((paramMap)=>{
            this.currentId=Number(paramMap.get('id'))
        })



    }

}
