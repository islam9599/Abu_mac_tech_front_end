import React from "react";
import { Box, Container, Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import "../../../css/header.css";
import Search from "@mui/icons-material/Search";
import Marginer from "../marginer";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import { FaUser } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

export const OthersNavbarPage = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "400px",
          backgroundImage: "url(/home/home-others.webp)",
          backgroundSize: "cover",

          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <Stack
            flexDirection={"row"}
            width={"100%"}
            height={"60px"}
            padding={"11px 0px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack
              mt={5}
              mr={10}
              alignItems={"center"}
              flexDirection={"row"}
              sx={{ cursor: "pointer" }}
              onClick={navigateHandler}
            >
              <img
                src="/home/macshop.jpg"
                style={{
                  width: "69px",
                  height: "69px",
                  marginRight: "10px",
                  borderRadius: "10px",
                }}
              ></img>
              {/* <Typography
                style={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                Abu_Mac_Tech
              </Typography> */}
              <Box width={"150px"}>
                <TypeAnimation
                  sequence={[
                    // Deletes 'One' and types 'Two'
                    100, // Waits 2s
                    "Abu", // Types 'Three' without deleting 'Two'
                    100,
                    "Abu_Mac_Tech",

                    () => {
                      console.log("Sequence completed");
                    },
                  ]}
                  wrapper="p"
                  cursor={true}
                  repeat={Infinity}
                  style={{
                    fontSize: "25px",
                    display: "inline-block",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                />
              </Box>
            </Stack>
            <Stack
              width={"40%"}
              className="hover-line nav-others"
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              m={"0 10rem"}
            >
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/"}>
                  <Typography
                    className="nav-other-title"
                    color={"#000"}
                    variant="h5"
                  >
                    Home
                  </Typography>
                </NavLink>
              </Box>
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/products"}>
                  <Typography
                    className="nav-other-title"
                    color={"#000"}
                    variant="h5"
                  >
                    Shop
                  </Typography>
                </NavLink>
              </Box>
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/orders"}>
                  <Typography
                    className="nav-other-title"
                    color={"#000"}
                    variant="h5"
                  >
                    Orders
                  </Typography>
                </NavLink>
              </Box>
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/community"}>
                  <Typography
                    className="nav-other-title"
                    color={"#000"}
                    variant="h5"
                  >
                    Community
                  </Typography>
                </NavLink>
              </Box>
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/member-page"}>
                  <Typography
                    className="nav-other-title"
                    color={"#000"}
                    variant="h5"
                  >
                    My Page
                  </Typography>
                </NavLink>
              </Box>
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/help"}>
                  <Typography
                    className="nav-other-title"
                    color={"#000"}
                    variant="h5"
                  >
                    FAQ
                  </Typography>
                </NavLink>
              </Box>
            </Stack>

            <Stack
              width={"150px"}
              height={"auto"}
              mt={5}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <FaUser
                onClick={() => {
                  navigate("/member-page");
                }}
                className="nav-icon"
                style={{
                  width: "19px",
                  height: "19px",
                  cursor: "pointer",
                  opacity: "0.7",
                }}
              />
              <Favorite
                className="nav-icon"
                sx={{
                  width: "19px",
                  height: "19px",
                  cursor: "pointer",
                  opacity: "0.7",
                }}
              />
              <ShoppingCart
                className="nav-icon"
                sx={{
                  width: "19px",
                  height: "19px",
                  cursor: "pointer",
                  opacity: "0.7",
                }}
              />
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
};
