
export interface CategoriesResponse {
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


export interface SingleCategoryResponse {
  data: Category;
  message: string;
  type: boolean;
  code: number;
  showToast: boolean;
  time: string;
}

export interface Category {
  _id: string;
  name: string;
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
  slug: string;
  __v: number;
  productsCount: number;
  id: string;
}

