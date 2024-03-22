import { Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Marginer from "../../component/marginer";

export const Features = () => {
  /** Initialization */
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  return (
    <div>
      <Container className="shipping_info_wrapper">
        <Stack className="shipping_info_category">
          <img
            className="shipping_info_img"
            src="/home/ic-delivery.svg"
            alt=""
          />
          <p className="shippin_info_title">Fast Worldwide Shipping</p>
          <p className="shippin_info_desc">Get free shipping over $250</p>
        </Stack>
        {isMobile ? (
          <Marginer direction="vertical" width="300" height="1" bg="gray" />
        ) : (
          <Marginer direction="horizontal" width="1" height="126" bg="gray" />
        )}

        <Stack className="shipping_info_category">
          <img
            src="/home/ic-call-center.svg"
            className="shipping_info_img"
            alt=""
          />
          <p className="shippin_info_title">24/7 Customer Support</p>
          <p className="shippin_info_desc">Friendly 24/7 customer support</p>
        </Stack>
        {isMobile ? (
          <Marginer direction="vertical" width="300" height="1" bg="gray" />
        ) : (
          <Marginer direction="horizontal" width="1" height="126" bg="gray" />
        )}

        <Stack className="shipping_info_category">
          <img src="/home/ic-shield.svg" className="shipping_info_img" alt="" />
          <p className="shippin_info_title">Money Back Guarantee</p>
          <p className="shippin_info_desc">We return money within 30 days</p>
        </Stack>
        {isMobile ? (
          <Marginer direction="vertical" width="300" height="1" bg="gray" />
        ) : (
          <Marginer direction="horizontal" width="1" height="126" bg="gray" />
        )}

        <Stack className="shipping_info_category">
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
