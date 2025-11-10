
export interface CartResponse {
  data: {
    _id: string;
    user: string | { _id: string; name: string; email: string }; // 👈 هنا الذكاء
    products: {
      _id: string;
      productId: string;
      name?: string; // 👈 بعض responses مش بيرجعها
      thumbnail?: string;
      quantity: number;
      price: number;
      subtotal?: number;
    }[];
    total?: number; // 👈 مش كل responses فيها total
    itemsCount?: number;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };
  message: string;
  type: boolean;
  code: number;
  showToast: boolean;
  time: string;
}
export interface UpdateCartResponse {
  data: {
    data: null;
    message: string;
  };
  message: string;
  type: boolean;
  code: number;
  showToast: boolean;
  time: string;
}
export interface CartProduct {
  _id: string;
  productId: string;
  name: string;
  thumbnail: string;
  quantity: number;
  price: number;
  subtotal: number;
}
