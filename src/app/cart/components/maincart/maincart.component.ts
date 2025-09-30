import { Component } from '@angular/core';

@Component({
  selector: 'app-maincart',
  templateUrl: './maincart.component.html',
  styleUrl: './maincart.component.scss'
})
export class MaincartComponent {
cartProducts: any[] = [
  {
    productImage: "/cr7-shoes.png",
    title: "Barcelona Bag",
    description: "Original cotton Barca bag",
    price: 350,
    priceBeforeDiscount: 420,
    size: "M",
    quantity: 1,
    get overAllPrice() {
      return this.price * this.quantity;
    }
  },
  {
    productImage: "/new-bag.png",
    title: "Barcelona Bag",
    description: "Original cotton Barca bag",
    price: 350,
    priceBeforeDiscount: 420,
    size: "M",
    quantity: 1,
    get overAllPrice() {
      return this.price * this.quantity;
    }
  },
  {
    productImage: "/sports-shoes.png",
    title: "Barcelona Bag",
    description: "Original cotton Barca bag",
    price: 350,
    priceBeforeDiscount: 420,
    size: "M",
    quantity: 1,
    get overAllPrice() {
      return this.price * this.quantity;
    }
  },
  {
    productImage: "/new-bag.png",
    title: "Barcelona Bag",
    description: "Original cotton Barca bag",
    price: 350,
    priceBeforeDiscount: 420,
    size: "M",
    quantity: 1,
    get overAllPrice() {
      return this.price * this.quantity;
    }
  },
  {
    productImage: "/sock.png",
    title: "Barcelona Bag",
    description: "Original cotton Barca bag",
    price: 350,
    priceBeforeDiscount: 420,
    size: "M",
    quantity: 1,
    get overAllPrice() {
      return this.price * this.quantity;
    }
  },
  {
    productImage: "/new-bag.png",
    title: "Barcelona Bag",
    description: "Original cotton Barca bag",
    price: 350,
    priceBeforeDiscount: 420,
    size: "M",
    quantity: 1,
    get overAllPrice() {
      return this.price * this.quantity;
    }
  },
  {
    productImage: "/tshirt.png",
    title: "Barcelona Bag",
    description: "Original cotton Barca bag",
    price: 350,
    priceBeforeDiscount: 420,
    size: "M",
    quantity: 1,
    get overAllPrice() {
      return this.price * this.quantity;
    }
  },
  {
    productImage: "/arsenal-shirt.svg",
    title: "Barcelona Bag",
    description: "Original cotton Barca bag",
    price: 350,
    priceBeforeDiscount: 420,
    size: "M",
    quantity: 1,
    get overAllPrice() {
      return this.price * this.quantity;
    }
  }
];


}
