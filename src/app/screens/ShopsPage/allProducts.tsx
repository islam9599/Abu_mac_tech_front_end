import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardOverflow,
  IconButton,
  AspectRatio,
  Link,
  CssVarsProvider,
} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Rating,
  Stack,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Call, Favorite, LocationOnRounded, Search } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import assert from "assert";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";
import ProductCard from "./productCards";

/** Redux Slice */

export function AllProducts() {
  /** Initialization */
  const navigate = useNavigate();

  /** Handlers */
  const chosenProductHandler = () => {
    navigate("/products/:product_id");
  };
  const changePhones = () => {
    navigate("/products/phones");
  };
  const changeLaptops = () => {
    navigate("/products/laptops");
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
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className={"fit_search_box"} justifyContent={"center"}>
            <Box className={"fit_box"}>
              <a>All Products</a>
              <a onClick={changeLaptops}>Laptop</a>
              <a onClick={changePhones}>Phones</a>
              <a>Etc</a>
            </Box>
          </Box>
          <Stack className={"all_products_box"}>
            <Stack
              flexDirection={"column"}
              width={"180px"}
              height={"600px"}
              sx={{ background: "rgb(215, 218, 221)", mt: 20, mr: 15 }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Stack>
                <FormControlLabel
                  label="Brands"
                  control={
                    <Checkbox
                      checked={checked[0] && checked[1]}
                      indeterminate={checked[0] !== checked[1]}
                      onChange={handleChange1}
                    />
                  }
                />

                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                  <FormControlLabel
                    label="Apple"
                    control={
                      <Checkbox checked={checked[0]} onChange={handleChange2} />
                    }
                  />
                  <FormControlLabel
                    label="Samsung"
                    control={
                      <Checkbox checked={checked[1]} onChange={handleChange3} />
                    }
                  />
                  <FormControlLabel
                    label="Asus"
                    control={
                      <Checkbox checked={checked[1]} onChange={handleChange3} />
                    }
                  />
                  <FormControlLabel
                    label="Etc"
                    control={
                      <Checkbox checked={checked[1]} onChange={handleChange3} />
                    }
                  />
                </Box>
              </Stack>
              <Stack sx={{ m: 5 }}>
                <FormControlLabel
                  label="Colors"
                  control={
                    <Checkbox
                      checked={checked[0] && checked[1]}
                      indeterminate={checked[0] !== checked[1]}
                      onChange={handleChange1}
                    />
                  }
                />
                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                  <FormControlLabel
                    label="Silver"
                    control={
                      <Checkbox checked={checked[0]} onChange={handleChange2} />
                    }
                  />
                  <FormControlLabel
                    label="Space Gray"
                    control={
                      <Checkbox checked={checked[1]} onChange={handleChange3} />
                    }
                  />
                  <FormControlLabel
                    label="Midnight"
                    control={
                      <Checkbox checked={checked[1]} onChange={handleChange3} />
                    }
                  />
                  <FormControlLabel
                    label="Etc"
                    control={
                      <Checkbox checked={checked[1]} onChange={handleChange3} />
                    }
                  />
                </Box>
                <Typography></Typography>
              </Stack>
            </Stack>
            <Stack
              width={"950px"}
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
