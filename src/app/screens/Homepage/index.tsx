import React, { useEffect } from "react";
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
import { Chatbox } from "../../component/chatbox";

/** Redux Slice */

const actionDispatch = (dispatch: Dispatch) => ({
  setTopBrands: (data: Shop[]) => dispatch(setTopBrands(data)),
});

export const Homepage = () => {
  /** Initialization */

  const { setTopBrands } = actionDispatch(useDispatch());

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
        <HotDeal />
        <Categories />
        <FlashCard />
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
        </Container>
      </div>
    </div>
  );
};
