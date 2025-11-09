export interface VerifyRegisterResponse {
  data: {
    success: boolean;
    message: string;
    code: number;
    showToast: boolean;
  };
  message: string;
  type: boolean;
  code: number;
  showToast: boolean;
  time: string;
}
