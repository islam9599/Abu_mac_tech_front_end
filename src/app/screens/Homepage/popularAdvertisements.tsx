import { Stack, Typography } from "@mui/material";
import React from "react";
import { Carousel } from "react-responsive-3d-carousel";

export const PopularAdvertisements = () => {
  return (
    <Stack mb={10} alignItems={"center"}>
      <Typography mb={5} fontWeight={"bold"} variant="h3">
        Advertisements
      </Typography>
      <Carousel showArrows={false}>
        <img
          src="https://petapixel.com/assets/uploads/2023/11/Apple-MacBook-Pro-with-M3-Max-Its-Crazy-How-Weve-Come-So-Far-So-Fast.jpg"
          alt="example-image-1"
        />
        {/* <img
          src="https://cdsassets.apple.com/live/7WUAS350/images/applecare/applecare-products-homepod-apple-tv-4k-macbook-pro-14in-ipad-pro-11in-iphone-14-pro-iphone-14-pro-max-apple-watch.png"
          alt="example-image-2"
        /> */}
        <img
          src="https://i.ytimg.com/vi/3hPoEmlBQdY/hqdefault.jpg"
          alt="example-image-2"
        />
        <img
          src="https://images.unictool.com/unictoolen/assets/article/lockeraser_article/iPhone-15-pro-Max-Release-Date.jpg"
          alt="example-image-2"
        />
        <img
          src="https://images.macrumors.com/article-new/2020/12/airpods-max-reaons-3.jpg"
          alt="example-image-2"
        />
      </Carousel>
    </Stack>
  );
};
