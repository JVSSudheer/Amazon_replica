export interface Product {
  id: string;
  title: string;
  categories: string[];
  brand: string;
  price: number;
  imageUrl: string;
  quantity: number;
  attributes: Map<string, string>;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}