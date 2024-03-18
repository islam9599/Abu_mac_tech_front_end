import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import Marginer from "../../component/marginer";

export const Features = () => {
  return (
    <div>
      <Container className="shipping_info_wrapper">
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <img
            className="shipping_info_img"
            src="/home/ic-delivery.svg"
            alt=""
          />
          <p className="shippin_info_title">Fast Worldwide Shipping</p>
          <p className="shippin_info_desc">Get free shipping over $250</p>
        </Stack>
        <Marginer direction="horizontal" width="1" height="126" bg="gray" />
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <img
            src="/home/ic-call-center.svg"
            className="shipping_info_img"
            alt=""
          />
          <p className="shippin_info_title">24/7 Customer Support</p>
          <p className="shippin_info_desc">Friendly 24/7 customer support</p>
        </Stack>
        <Marginer direction="horizontal" width="1" height="126" bg="gray" />

        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <img src="/home/ic-shield.svg" className="shipping_info_img" alt="" />
          <p className="shippin_info_title">Money Back Guarantee</p>
          <p className="shippin_info_desc">We return money within 30 days</p>
        </Stack>
        <Marginer direction="horizontal" width="1" height="126" bg="gray" />

        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <img
            src="/home/ic-credit-card.svg"
            className="shipping_info_img"
            alt=""
          />
          <p className="shippin_info_title">Secure Online Payment</p>
          <p className="shippin_info_desc">Accept all major credit cards</p>
        </Stack>
      </Container>
    </div>
  );
};
