
export interface FavoritesResponse {
  data: FavoriteProduct[];
  message: string;
  type: boolean;
  code: number;
  showToast: boolean;
  time: string;
}
export interface ToggleFavoriteResponse {
  data: []; // دايمًا فاضية
  message: string;
  type: boolean;
  code: number;
  showToast: boolean;
  time: string;
}
export interface FavoriteProduct {
  _id: string;
  name: string;
  slug: string;
  createdBy: string;
  category: string;
  description: string;
  cloudFolder: string;
  stock: number;
  price: number;
  discount: number;
  finalPrice: number;
  choosed:boolean;
  club: string;
  sizes: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  updatedBy?: string; // ممكن تكون مش دايمًا موجودة
  thumbnail: {
    secure_url: string;
    public_id: string;
  };
  images: {
    secure_url: string;
    public_id: string;
    _id: string;
  }[];
}
