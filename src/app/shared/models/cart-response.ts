
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
  _id: string;           // ID داخل الكارت
  productId: string;     // ID المنتج الأصلي
  name: string;          // اسم المنتج
  thumbnail: string;     // رابط الصورة المصغرة
  quantity: number;      // الكمية
  price: number;         // سعر الوحدة
  productSize: string;   // الحجم المختار
  subtotal: number;      // السعر الكلي (quantity * price)
}



export interface OrderProduct {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    subtotal: number;
    discount: number;
    _id: string;
}

export interface CreateOrderResponse {
    data: {
        session: string;
        order: {
            user: string;
            cart: string;
            products: OrderProduct[];
            username: string;
            phone: string;
            address: string;
            orderStatus: string;
            price: number;
            paymentMethod: string;
            paid: boolean;
            coupon: string;
            _id: string;
            createdAt: string;
            updatedAt: string;
            __v: number;
        };
    };
    message: string;
    type: boolean;
    code: number;
    showToast: boolean;
    time: string;
}

export interface SendPromoCodeResponse {
    data: {
        code: string;
        type: "percentage" | "fixed"; // لو في أنواع تانية قولّي
        value: number;
        discount: number;
        finalTotal: number;
    };
    message: string;
    type: boolean;
    code: number;
    showToast: boolean;
    time: string;
}
