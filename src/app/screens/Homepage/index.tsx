import React, { useEffect, useState } from "react";
import { HotDeal } from "./hotDeal";
import { Container } from "@mui/material";
import { Advertisements } from "./advertisement";
import FlashCard from "./flashDeals";
import { Features } from "./features";
import { FollowInstagram } from "./follow";
import { Categories } from "./categories";
import { BestSelling } from "./bestSelling";
import ShopApiService from "../../apiServices/shopApiService";

// Redux

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setTopBrands } from "./slice";
import { Shop } from "../../types/user";
import { MobileSwiper } from "./mobileSwiper";
import { PopularAdvertisements } from "./popularAdvertisements";

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
        {isMobile ? <MobileSwiper /> : <HotDeal />}

        <Categories />
        <FlashCard onAdd={onAdd} />
      </Container>

      <div
        style={{
          maxWidth: "100%",
          height: "auto",
          background: "#f1f1f2",
          marginTop: "30px",
          marginBottom: "30px",
          padding: "30px 0",
        }}
      >
        <BestSelling />
      </div>
      <Advertisements />
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
