// shared/interfaces/category.interface.ts

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: {
    secure_url: string;
    public_id: string;
  };
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  cloudFolder: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  updatedBy?: string;
  productsCount: number;
  id?: string;
}

// Response interface for "get all categories"
export interface GetAllCategoriesResponse {
  data: Category[];
  message: string;
  type: boolean;
  code: number;
  showToast: boolean;
  pagination: {
    totalSize: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
  };
  time: string;
}
