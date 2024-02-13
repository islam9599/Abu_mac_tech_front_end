import { Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Marginer from "../../component/marginer";

export const Features = () => {
  return (
    <div>
      <Container
        sx={{
          width: "100%",
          height: "140px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "40px 0",
        }}
      >
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <img
            src="/home/ic-delivery.svg"
            style={{ width: "48px", height: "48px", marginBottom: "24px" }}
            alt=""
          />
          <Typography color={"InfoText"} fontWeight={"bold"}>
            Fast Worldwide Shipping
          </Typography>
          <Typography mt={"10px"}>Get free shipping over $250</Typography>
        </Stack>
        <Marginer direction="horizontal" width="1" height="126" bg="gray" />
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <img
            src="/home/ic-call-center.svg"
            style={{ width: "48px", height: "48px", marginBottom: "24px" }}
            alt=""
          />
          <Typography color={"InfoText"} fontWeight={"bold"}>
            Fast Worldwide Shipping
          </Typography>
          <Typography mt={"10px"}>Get free shipping over $250</Typography>
        </Stack>
        <Marginer direction="horizontal" width="1" height="126" bg="gray" />

        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <img
            src="/home/ic-shield.svg"
            style={{ width: "48px", height: "48px", marginBottom: "24px" }}
            alt=""
          />
          <Typography color={"InfoText"} fontWeight={"bold"}>
            Fast Worldwide Shipping
          </Typography>
          <Typography mt={"10px"}>Get free shipping over $250</Typography>
        </Stack>
        <Marginer direction="horizontal" width="1" height="126" bg="gray" />

        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <img
            src="/home/ic-credit-card.svg"
            style={{ width: "48px", height: "48px", marginBottom: "24px" }}
            alt=""
          />
          <Typography color={"InfoText"} fontWeight={"bold"}>
            Fast Worldwide Shipping
          </Typography>
          <Typography mt={"10px"}>Get free shipping over $250</Typography>
        </Stack>
      </Container>
    </div>
  );
};
