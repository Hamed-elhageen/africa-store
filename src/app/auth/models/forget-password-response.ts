export interface ForgetPasswordResponse {
  data: ForgetPasswordData;
  message: string;
  type: boolean;
  code: number;
  showToast: boolean;
  time: string;
}

export interface ForgetPasswordData {
  success: boolean;
  message: string;
  code: number;
  showToast: boolean;
}
