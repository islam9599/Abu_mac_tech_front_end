import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import "../../../css/footer.css";
import Marginer from "../marginer";
import {
  Call,
  Copyright,
  EmailRounded,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
export const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        background: "#129cb8",
      }}
    >
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Stack
          flexDirection={"row"}
          width={"100%"}
          height={"auto"}
          justifyContent={"space-between"}
        >
          <Stack flexDirection={"column"} m={"50px 40px"}>
            <Typography color={"Background"} variant="h4">
              Help
            </Typography>
            <Typography color={"InfoText"} mt={3} variant="h5">
              Delivery and returns
            </Typography>
            <Typography color={"InfoText"} mt={3} variant="h5">
              FAQ
            </Typography>
            <Typography color={"InfoText"} mt={3} variant="h5">
              Blog
            </Typography>
          </Stack>
          <Stack flexDirection={"column"} m={"50px 40px"}>
            <Typography color={"Background"} variant="h4">
              Shop
            </Typography>
            <Typography color={"InfoText"} mt={3} variant="h5">
              New Arrivals
            </Typography>
            <Typography color={"InfoText"} mt={3} variant="h5">
              Best Selling
            </Typography>
            <Typography color={"InfoText"} mt={3} variant="h5">
              Hot Sale
            </Typography>
            <Typography color={"InfoText"} mt={3} variant="h5">
              Brands
            </Typography>
          </Stack>
          <Stack flexDirection={"column"} m={"50px 40px"}>
            <Typography color={"Background"} variant="h4">
              Get in Touch
            </Typography>
            <Typography color={"InfoText"} mt={3} variant="h5">
              Call <Call /> (+99899123456789)
            </Typography>
            <Typography color={"InfoText"} mt={3} mb={5} variant="h5">
              Email <EmailRounded />: eislombek9599@gmail.com
            </Typography>
            <Marginer direction="vertical" width="100%" height="1" bg="#fff" />
            <Stack
              flexDirection={"row"}
              width={"150px"}
              height={"40px"}
              mt={3}
              justifyContent={"space-between"}
              sx={{ cursor: "pointer" }}
            >
              <a
                style={{ color: "none" }}
                href="https://www.facebook.com/islombek.ergashev.315"
              >
                <Facebook />
              </a>
              <a href="https://www.instagram.com/macshop_uz/">
                <Instagram />
              </a>
              <a href="https://github.com/islam9599">
                <GitHub />
              </a>
              <a href="https://twitter.com/Islombek9995">
                <Twitter />
              </a>
              <a href="https://www.linkedin.com/in/islombek-ergashev-6479681b7/">
                <LinkedIn />
              </a>
            </Stack>
          </Stack>
          <Stack flexDirection={"column"} m={"50px 40px"}>
            <Typography color={"Background"} variant="h4" mb={5}>
              Download our App
            </Typography>
            <Stack
              flexDirection={"row"}
              width={"100%"}
              height={"auto"}
              justifyContent={"space-between"}
            >
              <img
                style={{ marginRight: "20px" }}
                src="/footer/app-store.svg"
                alt=""
              />
              <img src="/footer/google-play.svg" alt="" />
            </Stack>
          </Stack>
        </Stack>
        <Marginer width="100%" direction="vertical" height="1" bg="#fff" />
        <Stack
          flexDirection={"row"}
          width={"100%"}
          height={"70px"}
          justifyContent={"space-between"}
        >
          <Stack flexDirection={"row"} m={3}>
            <Copyright />
            <Typography color={"InfoText"} ml={1} variant="h5">
              All rights reserved by Abu_Mac_Tech Group
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};
