import React, { useEffect, useRef, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Stack, Typography } from "@mui/material";
import PriceRangeSlider from "./priceSlider";

// Redux

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveAllProducts, retrieveProductsByPrice } from "./selector";
import { verifiedMemberdata } from "../../apiServices/verify";

import { ProductSearchObj } from "../../types/other";
import { setAllProducts, setProductsByPrice } from "./slice";
import { Product } from "../../types/product";
import ProductApiService from "../../apiServices/productApiService";

/** Redux Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setAllProducts: (data: Product[]) => dispatch(setAllProducts(data)),
  setProductsByBrand: (data: Product[]) => dispatch(setProductsByPrice(data)),
});
/** Redux Selector*/
const setAllProductsRetriever = createSelector(
  retrieveAllProducts,
  (allProducts) => ({
    allProducts,
  })
);
const setProductsByBrandRetriever = createSelector(
  retrieveProductsByPrice,
  (productsByBrand) => ({
    productsByBrand,
  })
);

export default function FilterShop(props: any) {
  /** Initialization */
  const { setProductsByBrand } = actionDispatch(useDispatch());
  const [hide, sethide] = useState<boolean>(true);

  const {
    searchAllPorducts,
    searchProductBybrandHandler,
    allProducts,
    searchSaleProducts,
  } = props;
  const [brandProductSearchObj, setBrandProductSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 8,
      order: "product_price",
      product_brand: "apple",
    });

  useEffect(() => {
    const productService = new ProductApiService();

    productService
      .getProductsByBrand(brandProductSearchObj)
      .then((data) => {
        setProductsByBrand(data);
      })
      .catch((err) => console.log(err));
  }, [brandProductSearchObj]);

  /** Handlers */
  // const searchProductBybrandHandler = (brand: string) => {
  //   brandProductSearchObj.product_brand = brand;
  //   setBrandProductSearchObj({ ...brandProductSearchObj });
  // };

  return (
    <Stack alignItems={"center"}>
      <FormControl
        style={{
          width: "100%",
          display: "flex",
          margin: "70px 0px",
        }}
      >
        <FormLabel
          sx={{ fontWeight: "bold", fontSize: "16px", mb: "20px" }}
          id="demo-radio-buttons-group-label"
          onClick={() => sethide(!hide)}
        >
          Filter By Brand
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="all"
          name="radio-buttons-group"
        >
          <Stack flexDirection={"row"} onClick={() => searchAllPorducts("all")}>
            <Radio value={"all"} />
            <h3>All</h3>
          </Stack>
          <Stack
            flexDirection={"row"}
            onClick={() => searchProductBybrandHandler("brand", "apple")}
          >
            <Radio value={"apple"} />
            <h3>Apple</h3>
          </Stack>
          <Stack
            flexDirection={"row"}
            onClick={() => searchProductBybrandHandler("brand", "samsung")}
          >
            <Radio value={"samsung"} />
            <h3>Samsung</h3>
          </Stack>
          <Stack
            flexDirection={"row"}
            onClick={() => searchProductBybrandHandler("brand", "hp")}
          >
            <Radio value={"hp"} />
            <h3>Hp</h3>
          </Stack>
          <Stack
            flexDirection={"row"}
            onClick={() => searchProductBybrandHandler("brand", "microsoft")}
          >
            <Radio value={"microsoft"} />
            <h3>Microsoft</h3>
          </Stack>
        </RadioGroup>
      </FormControl>

      <FormControl
        style={{
          display: "flex",
        }}
      >
        <FormLabel
          sx={{ fontWeight: "bold", fontSize: "16px", mb: "20px" }}
          id="demo-radio-buttons-group-label"
          onClick={() => sethide(!hide)}
        >
          Default Filtering
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="all"
          name="radio-buttons-group"
        >
          <Stack flexDirection={"row"} onClick={() => searchAllPorducts()}>
            <Radio value={"all"} />
            <h3>Best</h3>
          </Stack>
          <Stack
            flexDirection={"row"}
            onClick={() => searchSaleProducts("sale")}
          >
            <Radio value={"is_sale"} />
            <h3>Sale</h3>
          </Stack>
          <Stack
            flexDirection={"row"}
            onClick={() => searchAllPorducts("updatedAt")}
          >
            <Radio value={"updatedAt"} />
            <h3>New</h3>
          </Stack>
          <Stack
            flexDirection={"row"}
            onClick={() => searchAllPorducts("product_views")}
          >
            <Radio value={"product_views"} />
            <h3>Views</h3>
          </Stack>
          <Stack
            flexDirection={"row"}
            onClick={() => searchAllPorducts("product_likes")}
          >
            <Radio value={"product_likes"} />
            <h3>Likes</h3>
          </Stack>
          <Stack
            flexDirection={"row"}
            onClick={() => searchAllPorducts("product_price")}
          >
            <Radio value={"product_price"} />
            <h3>Price</h3>
          </Stack>
        </RadioGroup>
      </FormControl>

      <PriceRangeSlider
        searchAllPorducts={searchAllPorducts}
        allProducts={allProducts}
        searchMinPriceHandler={props.searchMinPriceHandler}
        searchMaxPriceHandler={props.searchMaxPriceHandler}
      />
    </Stack>
  );
}
