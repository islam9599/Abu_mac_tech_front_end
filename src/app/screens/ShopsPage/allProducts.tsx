import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Cancel, Home, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ProductCard from "./productCards";
import Marginer from "../../component/marginer";
import FilterShop from "./filter";

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

export function AllProducts() {
  /** Initialization */
  const { setAllProducts, setProductsByBrand } = actionDispatch(useDispatch());

  // console.log("productsByBrand::", productsByBrand);
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  const navigate = useNavigate();
  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 8,
      order: "product_point",
      product_brand: "apple",
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
  const searchAllPorducts = (order: string) => {
    targetProductSearchObj.order = order;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  const searchProductBybrandHandler = (order: string, brand: string) => {
    targetProductSearchObj.order = order;
    targetProductSearchObj.product_brand = brand;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  const searchByCollection = (order: string, collection: string) => {
    targetProductSearchObj.order = order;
    targetProductSearchObj.product_collection = collection;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };

  const handlePaginationChange = (event: any, value: number) => {
    targetProductSearchObj.page = value;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };

  return (
    <div className="all_products">
      <Container>
        <Container>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            m={"50px"}
          >
            <form
              action=""
              style={{
                width: "530px",
                height: "45px",
                border: "1px solid #129cb8",
                borderRadius: "9px",
                display: "flex",
                alignItems: "center",
                background: "none",
                color: "#fff",
              }}
            >
              <input
                type="text"
                placeholder="Search product here"
                style={{
                  width: "100%",
                  height: "100%",
                  margin: "5px",
                  background: "none",
                  border: "none",
                  outline: "none",
                }}
              />
              <Box
                width={"auto"}
                height={"100%"}
                sx={{ bgcolor: "#129cb8", borderRadius: "0 9px 9px 0" }}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Search
                  sx={{
                    width: "100%",
                    height: "99%",
                    color: "#fff",
                    padding: "5px",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </form>
          </Stack>
          <Marginer direction="horizontal" width="100%" height="1" bg="#999" />
        </Container>
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
              <a onClick={() => searchAllPorducts("all")}>All Products</a>
              <a onClick={() => searchByCollection("collection", "laptop")}>
                Laptop
              </a>
              <a onClick={() => searchByCollection("collection", "phone")}>
                Phones
              </a>
              <a
                onClick={() => searchByCollection("collection", "accessories")}
              >
                Etc
              </a>
            </Box>
          </Box>
          <Stack className={"all_products_box"}>
            <Stack
              flexDirection={"column"}
              width={"14%"}
              height={"900px"}
              sx={{
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <FilterShop
                searchAllPorducts={searchAllPorducts}
                searchBrandHandler={searchByCollection}
                searchByCollection={searchByCollection}
                searchProductBybrandHandler={searchProductBybrandHandler}
              />
            </Stack>
            <Stack
              width={"85%"}
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
                  count={
                    targetProductSearchObj.page >= 3
                      ? targetProductSearchObj.page + 1
                      : 3
                  }
                  page={targetProductSearchObj.page}
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
                  onChange={handlePaginationChange}
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
