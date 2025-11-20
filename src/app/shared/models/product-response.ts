
export interface SingleProductResponse {
  data: Product;
  message: string;
  type: boolean;
  code: number;
  showToast?: boolean;
  time?: string;
}

export interface AllProductsResponse {
  data: Product[];
  message: string;
  type: boolean;
  code: number;
  showToast?: boolean;
  time?: string;
  pagination: {
    totalSize: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
  };
}
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

export interface HomeBanner {
    _id: string;
    title: string;
    product: string;
    club: string;
    description: string;
    season: string;
    image: {
        secure_url: string;
        public_id: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface HomeBannerResponse {
    data: HomeBanner[];
    message: string;
    type: boolean;
    code: number;
    showToast: boolean;
    pagination:  {
    totalSize: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
};
    time: string;
}
