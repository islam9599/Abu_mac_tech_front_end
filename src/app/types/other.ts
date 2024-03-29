export interface ProductSearchObj {
  page: number;
  limit: number;
  order: string;
  shop_mb_id?: string;
  product_collection?: string;
  product_brand?: string;
  searchText?: string;
  min_price?: number;
  max_price?: number;
}
export interface ProductSearchPriceObj {
  min_price: number;
  max_price: number;
}

export interface OrderSearchObj {
  page: number;
  limit: number;
  status: string;
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
  discount: number;
}

export interface ChatMessage {
  msg: string;
  mb_id: string;
  mb_nick: string;
  mb_image: string;
}

export interface ChatGreetMsg {
  text: string;
}
export interface ChatInfoMsg {
  total: number;
}
