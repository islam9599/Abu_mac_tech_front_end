import axios from "axios";
import assert from "assert";

import { serverApi } from "../lib/config";
import { Definer } from "../lib/Definer";
import {
  CreateReviewData,
  Reviews,
  ReviewSearchObj,
} from "../types/reviewProduct";

class ReviewProductApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getChosenProductReviews(
    data: ReviewSearchObj
  ): Promise<Reviews[]> {
    try {
      let url = `/product/reviews?page=${data.page}&limit=${data.limit}&review_ref_id=${data.review_ref_id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const reviews: Reviews[] = result.data.data;
      return reviews;
    } catch (err: any) {
      console.log(`error:: getChosenProductReviews ${err.message}`);
      throw err;
    }
  }
  public async createReview(data: CreateReviewData): Promise<Reviews> {
    try {
      const result = await axios.post(this.path + "/review/product", data, {
        withCredentials: true,
      });
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);

      const new_review: Reviews = result.data.data;
      return new_review;
    } catch (err: any) {
      console.log(`error:: createReview ${err.message}`);
      throw err;
    }
  }
}

export default ReviewProductApiService;
