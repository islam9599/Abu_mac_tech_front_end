import React, { useEffect, useRef, useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Call,
  Cancel,
  Favorite,
  Home,
  LocationOnRounded,
  Search,
} from "@mui/icons-material";
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

export function Laptops() {
  /** Initialization */
  const navigate = useNavigate();

  /** Handlers */
  const changeAllProductsHandler = () => {
    navigate("/products");
  };
  const changePhones = () => {
    navigate("/products/phones");
  };
  const changeToAccessories = () => {
    navigate("/products/accessories");
  };
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };
  const navigateToHomeHandler = () => {
    navigate("/");
  };
  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="13 inch"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="14 inch"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
      <FormControlLabel
        label="15 inch"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
      <FormControlLabel
        label="16 inch"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );
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
            Laptops
          </Typography>
          <Cancel className="navigate_home" onClick={navigateToHomeHandler} />
        </Stack>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className={"fit_search_box"} justifyContent={"center"}>
            <Box className={"fit_box"}>
              <a onClick={changeAllProductsHandler}>All Products</a>
              <a>Laptop</a>
              <a onClick={changePhones}>Phones</a>
              <a onClick={changeToAccessories}>Etc</a>
            </Box>
          </Box>
          <Stack className={"all_products_box"}>
            <Stack
              flexDirection={"column"}
              width={"230px"}
              height={"900px"}
              sx={{
                mt: 20,
                mr: 15,
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <FilterShop
                filterTitle={["Display", "Memory"]}
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
