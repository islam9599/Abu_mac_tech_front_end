import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/material";
import { Product } from "../../types/product";
import ProductApiService from "../../apiServices/productApiService";
// Redux

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProductsByPrice } from "./selector";
import { setProductsByPrice } from "./slice";
/** Redux Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setProductsByPrice: (data: Product[]) => dispatch(setProductsByPrice(data)),
});

const setProductsByBrandRetriever = createSelector(
  retrieveProductsByPrice,
  (productsByPrice) => ({
    productsByPrice,
  })
);

const useStyles = makeStyles({
  root: {
    color: "#52af77",
    height: 10,
  },
  thumb: {
    width: "19px",
    height: "19px",
    backgroundImage:
      "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJR_jwHT-9Lz9dqCmGDcW10lIwxSgplIPmYQ&usqp=CAU)",
    backgroundSize: "cover",
    "&:hover, &$active": {
      boxShadow: "0px 0px 0px 8px rgba(82, 175, 119, 0.16)",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
});

const PriceRangeSlider = (props: any) => {
  /** Initialization */
  const { searchMinPriceHandler, searchMaxPriceHandler } = props;
  const { setProductsByPrice } = actionDispatch(useDispatch());
  const [priceRange, setPriceRange] = useState([0, 1500]);

  // const min_price = priceRange[0];
  // const max_price = priceRange[1];
  const [maxPrice, setMaxPrice] = useState(1000);

  const classes = useStyles();

  // useEffect(() => {
  //   const productService = new ProductApiService();

  //   productService
  //     .getProductsByPriceRange({ min_price: min_price, max_price: max_price })
  //     .then((data) => {
  //       setProductsByPrice(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [min_price, max_price]);

  const handleChange = (event: any, newValue: any) => {
    searchMinPriceHandler(priceRange[0]);
    searchMaxPriceHandler(priceRange[1]);
    setPriceRange(newValue);
  };

  return (
    <Stack width={"100%"}>
      <h2>Shop by price</h2>
      <Slider
        classes={{
          root: classes.root,
          thumb: classes.thumb,
          active: classes.active,
          valueLabel: classes.valueLabel,
          track: classes.track,
          rail: classes.rail,
        }}
        value={priceRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={5000}
        step={100}
      />
      <Stack
        flexDirection={"row"}
        width={"100%"}
        justifyContent={"space-between"}
      >
        <h3>${priceRange[0]}</h3>
        <h3>${priceRange[1]}</h3>
      </Stack>
      <Stack></Stack>
    </Stack>
  );
};

export default PriceRangeSlider;
