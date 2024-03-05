import React from "react";
import SlideCard from "./sliderCard";
import Categories from "./categories";
import { Stack } from "@mui/material";

export const SliderHome = () => {
  return (
    <Stack>
      <Categories />
      <SlideCard />
    </Stack>
  );
};
