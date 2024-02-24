import React, { useEffect, useRef, useState } from "react";

import { Box, Container, Stack, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Cancel, Home } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import assert from "assert";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";
import ProductCard from "./productCards";
import Marginer from "../../component/marginer";
import FilterShop from "./filter";
import PriceRangeSlider from "./priceSlider";

/** Redux Slice */

export function Accessories() {
  /** Initialization */
  const navigate = useNavigate();

  /** Handlers */
  const changeAllProductsHandler = () => {
    navigate("/products");
  };
  const changePhones = () => {
    navigate("/products/phones");
  };
  const changeToLaptopsHandler = () => {
    navigate("/products/laptops");
  };

  return (
    <div className="all_products">
      <Container>
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
            Accessories
          </Typography>
          <Cancel
            className="navigate_home"
            onClick={() => {
              navigate("/");
            }}
          />
        </Stack>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className={"fit_search_box"} justifyContent={"center"}>
            <Box className={"fit_box"}>
              <a onClick={changeAllProductsHandler}>All Products</a>
              <a onClick={changeToLaptopsHandler}>Laptop</a>
              <a onClick={changePhones}>Phones</a>
              <a>Etc</a>
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
              <FilterShop
                filterTitle={["Color", "Brands"]}
                filterItem={[
                  {
                    color: ["All", "Silver", "Gold", "Gray", "Titanium", "Etc"],
                  },
                  {
                    brand: [
                      "All",
                      "Apple",
                      "Samsung",
                      "Hp",
                      "Microsoft",
                      "Etc",
                    ],
                  },
                ]}
              />
              <Stack sx={{ m: 5 }}>
                <PriceRangeSlider />
              </Stack>
            </Stack>
            <Stack
              width={"70%"}
              height={"auto"}
              flexDirection={"row"}
              sx={{ flexWrap: "wrap" }}
            >
              <ProductCard />
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
