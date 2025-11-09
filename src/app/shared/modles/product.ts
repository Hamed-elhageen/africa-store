export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  finalPrice: number;
  stock: number;
  choosed:any;
  club: string;
  sizes: string[];
  createdAt: string;
  updatedAt: string;
  thumbnail: {
    secure_url: string;
    public_id: string;
  };
  images: {
    secure_url: string;
    public_id: string;
    _id: string;
  }[];
  category: {
    _id: string;
    name: string;
    slug: string;
    id: string;
  };
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  updatedBy?: string;
  __v?: number;
}
