import React, { useEffect, useState } from "react";
import Slider, {
  SliderThumb,
  SliderValueLabelProps,
} from "@mui/material/Slider";
import { makeStyles, styled } from "@mui/styles";
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
const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#3a8589",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 25,
    width: 25,
    border: "1px solid currentColor",
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
}));

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <img
        src="/home/macshop.jpg"
        style={{ width: "25px", height: "25px", borderRadius: "19px" }}
        alt=""
      />
    </SliderThumb>
  );
}

const PriceRangeSlider = (props: any) => {
  /** Initialization */
  const { searchMinPriceHandler, searchMaxPriceHandler } = props;
  const { setProductsByPrice } = actionDispatch(useDispatch());
  const [priceRange, setPriceRange] = useState([0, 1500]);

  // const min_price = priceRange[0];
  // const max_price = priceRange[1];
  const [maxPrice, setMaxPrice] = useState(1000);

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

      <AirbnbSlider
        slots={{ thumb: AirbnbThumbComponent }}
        getAriaLabel={(index) =>
          index === 0 ? "Minimum price" : "Maximum price"
        }
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
