import { Category } from "./category";

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

