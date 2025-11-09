export interface LoginResponse {
  data: LoginData;
  message: string;
  type: boolean;
  code: number;
  showToast: boolean;
  time: string;
}

export interface LoginData {
  user: User;
  token: string;
  refresh_token: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  accoutAcctivated: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  favorites: string[];
}
