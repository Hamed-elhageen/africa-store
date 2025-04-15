import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-maincategories',
  templateUrl: './maincategories.component.html',
  styleUrl: './maincategories.component.scss'
})
export class MaincategoriesComponent {
  selectedCategory = 'all';
showThings:boolean=true;
showclubs:boolean=true;
showprice:boolean=true;
minPrice: number = 120;
maxPrice: number = 820;

toggleshowing():void{
  this.showThings=!this.showThings;
}
toggleshowingclubs():void{
  this.showclubs=!this.showclubs;
}
toggleshowingprice():void{
  this.showprice=!this.showprice;
}








maxRange: number = 1000;
activeDrag: 'min' | 'max' | null = null;

@HostListener('document:mousemove', ['$event'])
onMouseMove(event: MouseEvent) {
  if (!this.activeDrag) return;

  const slider = document.querySelector('.relative') as HTMLElement;
  const rect = slider.getBoundingClientRect();
  const percentage = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
  const newValue = Math.round(percentage * this.maxRange);

  if (this.activeDrag === 'min') {
    this.minPrice = Math.min(newValue, this.maxPrice);
  } else {
    this.maxPrice = Math.max(newValue, this.minPrice);
  }
}

@HostListener('document:mouseup')
onMouseUp() {
  this.activeDrag = null;
}

startDrag(event: MouseEvent, type: 'min' | 'max') {
  event.preventDefault();
  this.activeDrag = type;
}

validateRange() {
  this.minPrice = Math.max(0, Math.min(this.maxPrice, this.minPrice));
  this.maxPrice = Math.min(this.maxRange, Math.max(this.minPrice, this.maxPrice));
}

resetFilters() {
  this.minPrice = 120;
  this.maxPrice = 820;
}




  categories = [
    { id: 'all', name: 'All Categories', count: 300 },
    { id: 'tshirts', name: 'T-Shirts', count: 50 },
    { id: 'football', name: 'Football Shoes', count: 50 },
    { id: 'sports-shoes', name: 'Sports Shoes', count: 50 },
    { id: 'sports-tshirt', name: 'Sports T-Shirt', count: 50 },
    { id: 'accessories', name: 'Sports Accessories', count: 50 },
    { id: 'bags', name: 'Sports Bags', count: 50 }
  ];
  clubs:any[]=[{clubId:1 , clubName:"barcelona" , clubLogo:"/Barca.svg"},
    {clubId:1 , clubName:"Real madrid" , clubLogo:"/madrid.svg"},
    {clubId:1 , clubName:"Arsenal" , clubLogo:"/Arsenal.svg"},
    {clubId:1 , clubName:"Al ahly" , clubLogo:"/Barca.svg"},
    {clubId:1 , clubName:"Zamalek" , clubLogo:"/Barca.svg"},
  ]
  products:any=[
    {
      productImage:"/new bag.png",
      title:"bracelona bag",
      discription:"original cotton braca bag",
      price:"350 LE",
      priceBeforediscount:"420 LE"
    },
    {
      productImage:"/new bag.png",
      title:"bracelona bag",
      discription:"original cotton braca bag",
      price:"350 LE",
      priceBeforediscount:"420 LE"
    },
    {
      productImage:"/new bag.png",
      title:"bracelona bag",
      discription:"original cotton braca bag",
      price:"350 LE",
      priceBeforediscount:"420 LE"
    },
    {
      productImage:"/new bag.png",
      title:"bracelona bag",
      discription:"original cotton braca bag",
      price:"350 LE",
      priceBeforediscount:"420 LE"
    },
    {
      productImage:"/new bag.png",
      title:"bracelona bag",
      discription:"original cotton braca bag",
      price:"350 LE",
      priceBeforediscount:"420 LE"
    },
    {
      productImage:"/new bag.png",
      title:"bracelona bag",
      discription:"original cotton braca bag",
      price:"350 LE",
      priceBeforediscount:"420 LE"
    },
    {
      productImage:"/new bag.png",
      title:"bracelona bag",
      discription:"original cotton braca bag",
      price:"350 LE",
      priceBeforediscount:"420 LE"
    },
    {
      productImage:"/new bag.png",
      title:"bracelona bag",
      discription:"original cotton braca bag",
      price:"350 LE",
      priceBeforediscount:"420 LE"
    },
  ]
}
