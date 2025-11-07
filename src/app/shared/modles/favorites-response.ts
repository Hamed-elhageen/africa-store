import { FavoriteProduct } from "./favorite";

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
