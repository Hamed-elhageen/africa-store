export interface Coupon {
    _id: string;
    code: string;
    type: string;
    value: number;
    isActive: boolean;
    usageCount: number;
    maxUsage: number;
    createdAt: string;
    updatedAt: string;
    expiryDate?: string;
    __v: number;
}

export interface GetAllCouponsResponse {
    data: Coupon[];
    message: string;
    type: boolean;
    code: number;
    showToast: boolean;
    time: string;
}

export interface CreateCouponResponse {
    data: Coupon;
    message: string;
    type: boolean;
    code: number;
    showToast: boolean;
    time: string;
}
export interface DeleteCouponResponse {
    data: any[]; // array فاضية عادة
    message: string;
    type: boolean;
    code: number;
    showToast: boolean;
    time: string;
}
