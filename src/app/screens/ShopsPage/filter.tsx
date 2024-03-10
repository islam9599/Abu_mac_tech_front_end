import React, { useEffect, useRef, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Stack } from "@mui/material";
import PriceRangeSlider from "./priceSlider";

// Redux

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveAllProducts, retrieveProductsByBrand } from "./selector";
import { verifiedMemberdata } from "../../apiServices/verify";

import { ProductSearchObj } from "../../types/other";
import { setAllProducts, setProductsByBrand } from "./slice";
import { Product } from "../../types/product";
import ProductApiService from "../../apiServices/productApiService";

/** Redux Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setAllProducts: (data: Product[]) => dispatch(setAllProducts(data)),
  setProductsByBrand: (data: Product[]) => dispatch(setProductsByBrand(data)),
});
/** Redux Selector*/
const setAllProductsRetriever = createSelector(
  retrieveAllProducts,
  (allProducts) => ({
    allProducts,
  })
);
const setProductsByBrandRetriever = createSelector(
  retrieveProductsByBrand,
  (productsByBrand) => ({
    productsByBrand,
  })
);

export default function FilterShop(props: any) {
  /** Initialization */
  const { setProductsByBrand } = actionDispatch(useDispatch());
  const [hide, sethide] = useState<boolean>(true);

  const { searchAllPorducts, searchProductBybrandHandler } = props;
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
          display: "flex",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <FormLabel
          sx={{ fontWeight: "bold", fontSize: "14px" }}
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
          <FormControlLabel
            value="all"
            control={<Radio />}
            label="All"
            onClick={() => searchAllPorducts("all")}
          />
          <FormControlLabel
            value="apple"
            control={<Radio />}
            label="Apple"
            onClick={() => searchProductBybrandHandler("brand", "apple")}
          />

          <FormControlLabel
            value="samsung"
            control={<Radio />}
            label="Samsung"
            onClick={() => searchProductBybrandHandler("brand", "samsung")}
          />
          <FormControlLabel value="Hp" control={<Radio />} label="Hp" />
          <FormControlLabel
            value="Microsoft"
            control={<Radio />}
            label="Microsoft"
          />
          <FormControlLabel value="Etc" control={<Radio />} label="Etc" />
        </RadioGroup>
      </FormControl>

      <FormControl
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <FormLabel
          sx={{ fontWeight: "bold", fontSize: "14px" }}
          id="demo-radio-buttons-group-label"
        >
          Filter by
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="All"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="All"
            control={<Radio />}
            label="Best-selling"
            onClick={() => searchAllPorducts()}
          />
          <FormControlLabel
            value="is_onsale"
            control={<Radio />}
            label="On-sale"
            onClick={() => searchAllPorducts("product_discount")}
          />
          <FormControlLabel
            value="updatedAt"
            control={<Radio />}
            label="New-arrivals"
            onClick={() => searchAllPorducts("updatedAt")}
          />
          <FormControlLabel
            value="product_views"
            control={<Radio />}
            label="Most-viewed"
            onClick={() => searchAllPorducts("product_views")}
          />
          <FormControlLabel
            value="product_likes"
            control={<Radio />}
            label="Most-liked"
            onClick={() => searchAllPorducts("product_likes")}
          />
        </RadioGroup>
      </FormControl>

      <Stack sx={{ m: 5 }}>
        <PriceRangeSlider
          searchAllPorducts={searchAllPorducts}
          allProducts={props.allProducts}
        />
      </Stack>
    </Stack>
  );
}
