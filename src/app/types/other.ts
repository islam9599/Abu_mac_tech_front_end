export interface ProductSearchObj {
  page: number;
  limit: number;
  order: string;
  shop_mb_id?: string;
  product_collection?: string;
  product_brand?: string;
}
export interface MemberLiken {
  like_group: string;
  like_status: number;
  like_ref_id: string;
}

export interface BrandSearchObj {
  page: number;
  limit: number;
  order: string;
  shop_mb_id?: string;
  product_collection?: string;
}

export interface CartItem {
  _id: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
}
