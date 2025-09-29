import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../home/services/products.service';

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



        this.choosedProduct =this.productsService.getAll().find((prd:any)=>{
            return prd.productId===this.currentId;
        })
    }

    // by this when changing the id in the url it will be changed in the currenId , because paramMap is returning observable and iam observing it , when the id changes , change it in the current id
}
