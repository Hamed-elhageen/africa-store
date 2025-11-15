export interface LoginResponse {
    data: {
        user: {
            _id: string;
            name: string;
            email: string;
            password: string;
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
            phone: string;
        };
        token: string;
        refresh_token: string;
    };
    message: string;
    type: boolean;
    code: number;
    showToast: boolean;
    time: string;
}
