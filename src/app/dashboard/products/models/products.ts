// shared/interfaces/product.interface.ts

export interface Product {
  _id: string;
  name: string;
  slug: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  thumbnail: {
    secure_url: string;
    public_id: string;
  };
  images: {
    _id: string;
    secure_url: string;
    public_id: string;
  }[];
  category: {
    _id: string;
    name: string;
    slug: string;
    id?: string; // بعض الـ responses فيها id إضافي
  };
  description: string;
  cloudFolder: string;
  stock: number;
  price: number;
  discount: number;
  finalPrice: number;
  club: string;
  sizes: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  updatedBy?: string; // مش دايمًا موجود
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


export interface SingleProductResponse {
  data: Product;
  message: string;
  type: boolean;
  code: number;
  showToast?: boolean;
  time?: string;
}

export interface Create_DeleteProductResponse {
  data: Product;
  message: string;
  type: boolean;
  code: number;
  showToast: boolean;
  time: string;
}

export interface UpdateProductResponse {
  data: Product;       // المنتج بعد التحديث
  message: string;     // رسالة النجاح
  type: boolean;       // true لو العملية نجحت
  code: number;        // HTTP code
  showToast: boolean;  // هل تعرض toast
  time: string;        // وقت العملية
}
