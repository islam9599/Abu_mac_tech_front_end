import { Member } from "./user";

export interface Reviews {
  mb_id: string;
  review_ref_id: string;
  product_rating: number;
  product_comment: string;
  member_data: Member;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewSearchObj {
  page: number;
  limit: number;
  review_ref_id: string | undefined;
}

export interface CreateReviewData {
  review_ref_id: string | undefined;
  product_ratings: number;
  product_comments: string;
}
