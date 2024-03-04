export interface ProductSearchObj {
  page: number;
  limit: number;
  order: string;
  restaurant_mb_id?: string;
  product_collection?: string;
}
