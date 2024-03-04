import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Cancel, Home } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import assert from "assert";
import { useNavigate } from "react-router-dom";
import ProductCard from "./productCards";
import Marginer from "../../component/marginer";
import { Range } from "react-range";
import FilterShop from "./filter";
import PriceRangeSlider from "./priceSlider";

// Redux

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveAllProducts } from "./selector";
import { verifiedMemberdata } from "../../apiServices/verify";

import { ProductSearchObj } from "../../types/other";
import { setAllProducts } from "./slice";
import { Product } from "../../types/product";
import ProductApiService from "../../apiServices/productApiService";

/** Redux Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setAllProducts: (data: Product[]) => dispatch(setAllProducts(data)),
});
/** Redux Selector*/
const setAllProductsRetriever = createSelector(
  retrieveAllProducts,
  (allProducts) => ({
    allProducts,
  })
);

export function AllProducts() {
  /** Initialization */
  const { setAllProducts } = actionDispatch(useDispatch());
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  const [state, setState] = useState({ values: [40] });
  const navigate = useNavigate();
  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 8,
      order: "product_point",
    });
  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  }, [targetProductSearchObj, productRebuild]);

  /** Handlers */
  const searchCollectionHandler = (order: string) => {
    targetProductSearchObj.order = order;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  const changePhones = () => {
    navigate("/products/phones");
  };
  const changeLaptops = () => {
    navigate("/products/laptops");
  };

  return (
    <div className="all_products">
      <Container>
        <Stack flexDirection={"column"}>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <Home
              className="navigate_home"
              sx={{ width: "29px", height: "29px" }}
            />
            <Typography
              className="navigate_home"
              sx={{ margin: "15px" }}
              variant="h4"
            >
              Home
            </Typography>
            <Marginer width="1" height="20" bg="#000" direction="vertical" />

            <Typography
              className="navigate_home"
              sx={{ margin: "15px" }}
              variant="h4"
            >
              All Products
            </Typography>
            <Cancel
              className="navigate_home"
              onClick={() => {
                navigate("/");
              }}
            />
          </Stack>
          <Box className={"fit_search_box"} justifyContent={"center"}>
            <Box className={"fit_box"}>
              <a>All Products</a>
              <a onClick={changeLaptops}>Laptop</a>
              <a onClick={changePhones}>Phones</a>
              <a
                onClick={() => {
                  navigate("/products/phones");
                }}
              >
                Etc
              </a>
            </Box>
          </Box>
          <Stack className={"all_products_box"}>
            <Stack
              flexDirection={"column"}
              marginLeft={5}
              width={"20%"}
              height={"900px"}
              sx={{
                m: "10rem 5rem",

                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <FilterShop searchCollectionHandler={searchCollectionHandler} />
            </Stack>
            <Stack
              width={"65%"}
              height={"auto"}
              flexDirection={"row"}
              sx={{ flexWrap: "wrap" }}
            >
              <ProductCard setProductRebuild={setProductRebuild} />
              <Stack className="bottom_box">
                <img
                  className="line_img_left"
                  src={"/icons/line_group.svg"}
                  alt=""
                />
                <Pagination
                  //   count={targetSearchObj.page >= 3 ? targetSearchObj.page + 1 : 3}
                  //   page={targetSearchObj.page}
                  renderItem={(item) => (
                    <PaginationItem
                      components={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                      color="secondary"
                    />
                  )}
                  //   onChange={handlePaginationChange}
                />

                <img
                  className="line_img_right"
                  style={{ color: "#129cb8" }}
                  src={"/icons/line_group.svg"}
                  alt=""
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
