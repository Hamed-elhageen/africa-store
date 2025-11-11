export interface LoginResponse {
    data: {
        user: User;
        token: string;
        refresh_token: string;
    };
    message: string;
    type: boolean;
    code: number;
    showToast: boolean;
    time: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    accoutAcctivated: boolean;
    role: string;
    favorites: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    avatar: {
    secure_url: string;
    public_id: string;
    _id: string;
    };
}
