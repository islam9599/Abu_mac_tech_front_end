import axios from "axios";
import assert from "assert";
import { serverApi } from "../lib/config";
import { Definer } from "../lib/Definer";
import { Product } from "../types/product";
import { ProductSearchObj } from "../types/other";
class ProductApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }
  async getSaleProducts(): Promise<Product[]> {
    try {
      const url = "/products/sale?page=1&limit=4",
        result = await axios.get(this.path + url, {
          withCredentials: true,
        });
      assert.ok(result, Definer.general_err1);
      console.log("state:", result.data.state);
      const saleProducts: Product[] = result.data.data;
      return saleProducts;
    } catch (err: any) {
      console.log(`error:: getSaleProducts ${err.message}`);
      throw err;
    }
  }
  async getTargetProducts(data: ProductSearchObj): Promise<Product[]> {
    try {
      const url = "/products",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result, Definer.general_err1);
      console.log("state:", result.data.state);
      const products: Product[] = result.data.data;
      return products;
    } catch (err: any) {
      console.log(`error:: getTargetProducts ${err.message}`);
      throw err;
    }
  }
}

export default ProductApiService;