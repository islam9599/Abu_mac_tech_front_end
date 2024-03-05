import axios from "axios";
import assert from "assert";
import { serverApi } from "../lib/config";
import { Shop } from "../types/user";
import { Definer } from "../lib/Definer";

class ShopApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }
  async getBrands(): Promise<Shop[]> {
    try {
      const url = "/shops?order=mb_top&page=1&limit=6",
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result, Definer.general_err1);
      console.log("state:", result.data.state);
      const topBrands: Shop[] = result.data.data;
      return topBrands;
    } catch (err: any) {
      console.log(`error:: getTopRestaurants ${err.message}`);
      throw err;
    }
  }
  async getChosenRestaurant(id: string): Promise<Shop[]> {
    try {
      const url = `/shops/${id}`,
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result, Definer.general_err1);

      console.log("state:", result.data.state);
      const shops: Shop[] = result.data.data;
      return shops;
    } catch (err: any) {
      console.log(`error:: getChosenRestaurant ${err.message}`);
      throw err;
    }
  }
}

export default ShopApiService;
