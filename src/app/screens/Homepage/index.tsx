import React, { useEffect, useState } from "react";
import { HotDeal } from "./hotDeal";
import { Container } from "@mui/material";
import { HomeVideo } from "./homeVideo";
import DiscountProducts from "./flashDeals";
import { Features } from "./features";
import { FollowInstagram } from "./follow";
import { TopShops } from "./categories";
import { BestSelling } from "./bestSelling";
import ShopApiService from "../../apiServices/shopApiService";

// Redux

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setTopBrands } from "./slice";
import { Shop } from "../../types/user";
import { MobileSwiper } from "./mobileSwiper";
import { PopularAdvertisements } from "./popularAdvertisements";
import { HomeTopSearch } from "./homeTopSearch";

/** Redux Slice */

const actionDispatch = (dispatch: Dispatch) => ({
  setTopBrands: (data: Shop[]) => dispatch(setTopBrands(data)),
});

export const Homepage = (props: any) => {
  /** Initialization */
  const { onAdd } = props;
  const { setTopBrands } = actionDispatch(useDispatch());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 450);

  useEffect(() => {
    const shopApiService = new ShopApiService();
    shopApiService
      .getBrands()
      .then((data) => {
        setTopBrands(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="home-page">
      <Container>
        <HomeTopSearch handleLogoutRequest={props.handleLogoutRequest} />
        {isMobile ? <MobileSwiper /> : <HotDeal />}

        <TopShops />
        <DiscountProducts onAdd={onAdd} />
      </Container>

      <div className="best_selling_container">
        <BestSelling />
      </div>
      <HomeVideo />
      <div>
        <Container>
          <Features />
          <FollowInstagram />
          <PopularAdvertisements />
        </Container>
      </div>
    </div>
  );
};
