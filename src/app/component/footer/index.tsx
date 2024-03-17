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
import { useNavigate } from "react-router-dom";
import { verifiedMemberdata } from "../../apiServices/verify";
import { sweetFailureProvider } from "../../lib/sweetAlert";
export const Footer = () => {
  /** Initializations */
  const navigate = useNavigate();
  /** Handlers */

  return (
    <div className="footer_main_wrapper">
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Stack
          flexDirection={"row"}
          width={"100%"}
          height={"auto"}
          justifyContent={"space-between"}
        >
          <Stack
            flexDirection={"column"}
            m={"50px 40px"}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "flex",
                lg: "flex",
              },
              cursor: "pointer",
            }}
          >
            <h1
              className="footer_category_title"
              onClick={() => navigate("/help")}
            >
              Help
            </h1>
            <Typography
              onClick={() => navigate("/products")}
              color={"InfoText"}
              mt={3}
              variant="h5"
            >
              Delivery and returns
            </Typography>
            <Typography
              onClick={() => {
                !verifiedMemberdata
                  ? sweetFailureProvider("Please login first, kindly!")
                  : navigate("/member-page");
              }}
              color={"InfoText"}
              mt={3}
              variant="h5"
            >
              My Page
            </Typography>
            <Typography
              onClick={() => navigate("/community")}
              color={"InfoText"}
              mt={3}
              variant="h5"
            >
              Blog
            </Typography>
          </Stack>
          <Stack
            flexDirection={"column"}
            m={"50px 40px"}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "flex",
              },
              cursor: "pointer",
            }}
            onClick={() => navigate("/products")}
          >
            <h1
              className="footer_category_title"
              onClick={() => navigate("/help")}
            >
              Shop
            </h1>
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
            <h1
              className="footer_category_title"
              onClick={() => navigate("/help")}
            >
              Get In Touch
            </h1>
            <Typography color={"InfoText"} mt={3} variant="h5">
              Call <Call /> (+99899123456789)
            </Typography>
            <Typography color={"InfoText"} mt={3} mb={5} variant="h5">
              Email <EmailRounded />: eislombek9599@gmail.com
            </Typography>
            <Marginer direction="vertical" width="100%" height="1" bg="#fff" />
            <Stack
              flexDirection={"row"}
              width={"300px"}
              height={"auto"}
              mt={3}
              justifyContent={"space-between"}
              sx={{ cursor: "pointer" }}
            >
              <a
                className="footer_icon_link"
                href="https://www.facebook.com/islombek.ergashev.315"
              >
                <Facebook
                  className="footer_icon"
                  sx={{ width: "29px", height: "29px" }}
                />
              </a>
              <a
                className="footer_icon_link"
                href="https://www.instagram.com/macshop_uz/"
              >
                <Instagram
                  className="footer_icon"
                  sx={{ width: "29px", height: "29px" }}
                />
              </a>
              <a
                className="footer_icon_link"
                href="https://github.com/islam9599"
              >
                <GitHub
                  className="footer_icon"
                  sx={{ width: "29px", height: "29px" }}
                />
              </a>
              <a
                className="footer_icon_link"
                href="https://twitter.com/Islombek9995"
              >
                <Twitter
                  className="footer_icon"
                  sx={{ width: "29px", height: "29px" }}
                />
              </a>
              <a
                className="footer_icon_link"
                href="https://www.linkedin.com/in/islombek-ergashev-6479681b7/"
              >
                <LinkedIn
                  className="footer_icon"
                  sx={{ width: "29px", height: "29px" }}
                />
              </a>
            </Stack>
          </Stack>
          <Stack
            flexDirection={"column"}
            m={"50px 40px"}
            sx={{
              display: {
                xs: "none",
                sm: "flex",
                md: "flex",
                lg: "flex",
              },
              cursor: "pointer",
            }}
          >
            <h1
              className="footer_category_title"
              onClick={() => navigate("/help")}
            >
              Download our App
            </h1>
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
