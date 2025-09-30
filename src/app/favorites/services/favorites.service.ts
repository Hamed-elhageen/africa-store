import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() { }
    favoriteProducts:any=[{
  productId: 46,
  productImage: "/tshirt.png",
  title: "Goalkeeper Gloves",
  discription: "High quality gloves",
  price: "300 LE",
  priceBeforediscount: "370 LE",
  categoryId: 5,
  categoryName: "Sports Accessories",
  isFavorite: true,
  inCart: true,
},

// More T-shirts
{
  productId: 47,
  productImage: "/tshirt.png",
  title: "Egypt Team T-shirt",
  discription: "Official Egypt kit",
  price: "670 LE",
  priceBeforediscount: "750 LE",
  categoryId: 1,
  categoryName: "Sports T-shirts",
  isFavorite: true,
  inCart: false,
},
{
  productId: 48,
  productImage: "/tshirt.png",
  title: "Argentina T-shirt",
  discription: "Official Argentina kit",
  price: "680 LE",
  priceBeforediscount: "770 LE",
  categoryId: 1,
  categoryName: "Sports T-shirts",
  isFavorite: true,
  inCart: true,
},

// Allproducts (part 3: 49 → 68)

// Football T-shirts continued
{
  productId: 49,
  productImage: "/tshirt.png",
  title: "France T-shirt",
  discription: "Official France kit",
  price: "700 LE",
  priceBeforediscount: "780 LE",
  categoryId: 1,
  categoryName: "Sports T-shirts",
  isFavorite: true,
  inCart: false,
},
{
  productId: 50,
  productImage: "/tshirt.png",
  title: "Brazil T-shirt",
  discription: "Official Brazil kit",
  price: "710 LE",
  priceBeforediscount: "790 LE",
  categoryId: 1,
  categoryName: "Sports T-shirts",
  isFavorite: true,
  inCart: true,
},
{
  productId: 51,
  productImage: "/tshirt.png",
  title: "Germany T-shirt",
  discription: "Official Germany kit",
  price: "720 LE",
  priceBeforediscount: "800 LE",
  categoryId: 1,
  categoryName: "Sports T-shirts",
  isFavorite: true,
  inCart: false,
},
{
  productId: 52,
  productImage: "/tshirt.png",
  title: "Man United T-shirt",
  discription: "Official Man United kit",
  price: "740 LE",
  priceBeforediscount: "820 LE",
  categoryId: 1,
  categoryName: "Sports T-shirts",
  isFavorite: true,
  inCart: true,
},

// Football shoes extra
{
  productId: 53,
  productImage: "/tshirt.png",
  title: "Neymar shoes",
  discription: "Neymar official edition",
  price: "500 LE",
  priceBeforediscount: "580 LE",
  categoryId: 2,
  categoryName: "Football shoes",
  isFavorite: true,
  inCart: false,
},
{
  productId: 54,
  productImage: "/tshirt.png",
  title: "Neymar shoes",
  discription: "Neymar official edition",
  price: "500 LE",
  priceBeforediscount: "580 LE",
  categoryId: 2,
  categoryName: "Football shoes",
  isFavorite: true,
  inCart: true,
},
{
  productId: 55,
  productImage: "/tshirt.png",
  title: "Neymar shoes",
  discription: "Neymar official edition",
  price: "500 LE",
  priceBeforediscount: "580 LE",
  categoryId: 2,
  categoryName: "Football shoes",
  isFavorite: true,
  inCart: false,
},
]


    getAllFavorites(){
        return[...this.favoriteProducts]
    }

}
