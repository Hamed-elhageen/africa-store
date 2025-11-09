export interface RegisterResponse {
  data: RegisterData;
  message: string;
  type: boolean;
  code: number;
  showToast: boolean;
  time: string;
}

export interface RegisterData {
  succes: boolean; // لاحظ إن الكلمة في الـ response فيها خطأ إملائي، لو backend غلط، خليه زي ما هو بالضبط
  message: string;
}
