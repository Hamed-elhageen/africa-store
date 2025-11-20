// shared/interfaces/order.interface.ts

export interface Order {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
        avatar: {
            secure_url: string;
            public_id: string;
            _id: string;
        };
        phone: string;
    };
    cart: string;
    products: {
        productId: string;
        name: string;
        price: number;
        quantity: number;
        image: string;
        subtotal: number;
        discount: number;
        _id: string;
    }[];
    username: string;
    phone: string;
    address: string;
    orderStatus: string;
    price: number;
    paymentMethod: string;
    paid: boolean;
    coupon: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface GetAllOrdersResponse {
    data: {
        data: Order[];
        pagination: {
            totalSize: number;
            totalPages: number;
            pageNumber: number;
            pageSize: number;
        };
    };
    message: string;
    type: boolean;
    code: number;
    showToast: boolean;
    time: string;
}

export interface UpdateOrderStatusResponse {
    data: Order;
    message: string;
    type: boolean;
    code: number;
    showToast: boolean;
    time: string;
}

export interface GetSingleOrderResponse {
    data: Order;
    message: string;
    type: boolean;
    code: number;
    showToast: boolean;
    time: string;
}
export interface DeleteOrderResponse {
    data: any[];
    message: string;
    type: boolean;
    code: number;
    showToast: boolean;
    time: string;
}
