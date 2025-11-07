import { Product } from './product';

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
