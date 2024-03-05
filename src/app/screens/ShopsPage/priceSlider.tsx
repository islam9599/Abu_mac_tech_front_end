import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/material";

const useStyles = makeStyles({
  root: {
    color: "#52af77",
    height: 10,
  },
  thumb: {
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
  const { searchCollectionHandler } = props;
  const classes = useStyles();
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const handleChange = (event: any, newValue: any) => {
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
        step={50}
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
