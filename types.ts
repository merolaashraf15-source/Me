export interface Order {
  id: string;
  customerName: string;
  phone: string;
  medicine: string;
  createdAt: string;
}

export interface OrderFormData {
  customerName: string;
  phone: string;
  medicine: string;
}
