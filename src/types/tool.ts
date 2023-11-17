export interface ToolType {
  id: any;
  title: string;
  brand: string;
  price: number;
  discount: number;
  description: string;
  images: string;
  quantity?: number;
  orderdetails?: [];
  category?: string;
}
