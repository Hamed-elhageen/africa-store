import { Component } from '@angular/core';
import { title } from 'node:process';

@Component({
  selector: 'app-sports-bags',
  templateUrl: './sports-bags.component.html',
  styleUrl: './sports-bags.component.scss'
})
export class SportsBagsComponent {
    products: any[] = [
        {
          id: 1,
          productImage: "/new bag.png",
          title: "bracelona bag",
          discription: "original cotton braca bag",
          price: "350 LE",
          priceBeforediscount: "420 LE"
        },
        {
          id: 2,
          productImage: "/new bag.png",
          title: "bracelona bag",
          discription: "original cotton braca bag",
          price: "350 LE",
          priceBeforediscount: "420 LE"
        },
        {
          id: 3,
          productImage: "/new bag.png",
          title: "bracelona bag",
          discription: "original cotton braca bag",
          price: "350 LE",
          priceBeforediscount: "420 LE"
        },
        {
          id: 4,
          productImage: "/new bag.png",
          title: "bracelona bag",
          discription: "original cotton braca bag",
          price: "350 LE",
          priceBeforediscount: "420 LE"
        },
        {
          id: 5,
          productImage: "/new bag.png",
          title: "bracelona bag",
          discription: "original cotton braca bag",
          price: "350 LE",
          priceBeforediscount: "420 LE"
        },
        {
          id: 6,
          productImage: "/new bag.png",
          title: "bracelona bag",
          discription: "original cotton braca bag",
          price: "350 LE",
          priceBeforediscount: "420 LE"
        },
        {
          id: 7,
          productImage: "/new bag.png",
          title: "bracelona bag",
          discription: "original cotton braca bag",
          price: "350 LE",
          priceBeforediscount: "420 LE"
        },
        {
          id: 8,
          productImage: "/new bag.png",
          title: "bracelona bag",
          discription: "original cotton braca bag",
          price: "350 LE",
          priceBeforediscount: "420 LE"
        },
      ];

}
