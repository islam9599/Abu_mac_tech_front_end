import React from "react";
import { HotDeal } from "./hotDeal";
import { Container, Stack } from "@mui/material";
import { NewArrivals } from "./newArrivals";
import { Advertisements } from "./advertisement";
import FlashCard from "./flashDeals";
import { Features } from "./features";
import { FollowInstagram } from "./follow";
import { Categories } from "./categories";
import { BestSelling } from "./bestSelling";

export const Homepage = () => {
  return (
    <div className="home-page">
      <Container>
        <HotDeal />
        <Categories />
        <FlashCard />
      </Container>

      <div
        style={{
          width: "100%",
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
