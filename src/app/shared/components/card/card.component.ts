import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() id?:number
  @Input() productImage:string="";
  @Input() title:string="";
  @Input() discription="";
  @Input() price="";
  @Input() priceBeforediscount="";
}
