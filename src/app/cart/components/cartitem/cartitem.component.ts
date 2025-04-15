import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrl: './cartitem.component.scss'
})
export class CartitemComponent {
  @Input() productImage:string=""
  @Input() title:string=""
  @Input() price:string=""
  @Input() size:string=""
  @Input() quantity:string=""
  
}
