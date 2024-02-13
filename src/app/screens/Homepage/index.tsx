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
import { TypeAnimation } from "react-type-animation";

export const Homepage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container>
        {/* <TypeAnimation
          sequence={[
            "Bizdan 10%", // Types 'One'
            100, // Waits 1s
            "Bizdan 10% chegirma sizning ", // Deletes 'One' and types 'Two'
            200, // Waits 2s
            "Bizdan 10% chegirma sizning birinchi buyurtmangizda!", // Types 'Three' without deleting 'Two'
            () => {
              console.log("Sequence completed");
            },
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          style={{ fontSize: "2em", display: "inline-block" }}
        /> */}
        <HotDeal />
        <Categories />
        <BestSelling />
        <FlashCard />
      </Container>

      <div
        style={{
          width: "100%",
          height: "auto",
          background: "#D7DADD",
          marginTop: "30px",
          marginBottom: "30px",
          padding: "30px 0",
        }}
      >
        <NewArrivals />
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
