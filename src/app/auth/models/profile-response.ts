export interface ProfileResponse {
    data: UserData;
    message: string;
    type: boolean;
    code: number;
    showToast: boolean;
    time: string;
}

export interface UpdateProfileResponse {
    data: UserData;
    message: string;
    type: boolean;
    code: number;
    showToast: boolean;
    time: string;
}

export interface UserData {
    _id: string;
    name: string;
    email: string;
    role: string;
    favorites: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    phone: string;
    avatar: {
        secure_url: string;
        public_id: string;
        _id: string;
    };
}


