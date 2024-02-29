import React, { useRef, useState } from "react";
import "../../../css/header.css";
import { Box, Container, Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Search from "@mui/icons-material/Search";
import Marginer from "../marginer";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import { FaUser } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

export const NavbarPage = () => {
  /** Initialization */
  const navigate = useNavigate();

  /** Handlers */
  const changeToProductsHandler = () => {
    navigate("/products");
  };
  const navigateHandler = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        position: "sticky",
        top: 0,
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "60px",
          background: "#129cb8",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <Stack
            flexDirection={"row"}
            width={"100%"}
            height={"60px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box width={"600px"}>
              <TypeAnimation
                sequence={[
                  // Deletes 'One' and types 'Two'
                  100, // Waits 2s
                  "Share us with your relatives", // Types 'Three' without deleting 'Two'
                  200,
                  "Share us with your relatives && friends and get up to 20% off!",

                  () => {
                    console.log("Sequence completed");
                  },
                ]}
                wrapper="p"
                cursor={true}
                repeat={Infinity}
                style={{
                  fontSize: "15px",
                  display: "inline-block",
                  color: "#f4f4f4",
                }}
              />
            </Box>
            <Stack
              width={"40%"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              mr={15}
            >
              <Box className="hover-line" sx={{ mr: 2 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    Home
                  </Typography>
                </NavLink>
              </Box>
              <Box className="hover-line" sx={{ mr: 2 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/products"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    Shop
                  </Typography>
                </NavLink>
              </Box>
              <Box className="hover-line" sx={{ mr: 2 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/orders"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    Orders
                  </Typography>
                </NavLink>
              </Box>
              <Box className="hover-line" sx={{ mr: 2 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/community"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    Community
                  </Typography>
                </NavLink>
              </Box>
              <Box className="hover-line" sx={{ mr: 2 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/member-page"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    My Page
                  </Typography>
                </NavLink>
              </Box>
              <Box className="hover-line" sx={{ mr: 2 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/help"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    FAQ
                  </Typography>
                </NavLink>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </div>
      <div
        style={{
          width: "100%",
          height: "120px",
          position: "sticky",
          zIndex: 9999,
          background: "#fff",
        }}
      >
        <Container>
          <Stack
            sx={{ width: "1200px", height: "100px" }}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack
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
                  margin: "0px 20px",
                  borderRadius: "10px",
                }}
              ></img>
              <Typography
                style={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                Abu_Mac_Tech
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} alignItems={"center"}>
              <form
                onClick={changeToProductsHandler}
                action=""
                style={{
                  width: "530px",
                  height: "45px",
                  border: "1px solid #129cb8",
                  borderRadius: "9px",
                  display: "flex",
                  alignItems: "center",
                  background: "none",
                  color: "#fff",
                }}
              >
                <input
                  type="text"
                  placeholder="Search product here"
                  style={{
                    width: "100%",
                    height: "100%",
                    margin: "5px",
                    background: "none",
                    border: "none",
                    outline: "none",
                  }}
                />
                <Box
                  width={"auto"}
                  height={"100%"}
                  sx={{ bgcolor: "#129cb8", borderRadius: "0 9px 9px 0" }}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Search
                    sx={{
                      width: "100%",
                      height: "99%",
                      color: "#fff",
                      padding: "5px",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              </form>
            </Stack>
            <Stack
              sx={{ width: "150px", height: "60px" }}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <FaUser
                onClick={() => {
                  navigate("/member-page");
                }}
                className="nav-icon"
                style={{
                  width: "29px",
                  height: "29px",
                  cursor: "pointer",
                  opacity: "0.7",
                }}
              />
              <Favorite
                className="nav-icon"
                sx={{
                  width: "29px",
                  height: "29px",
                  cursor: "pointer",
                  opacity: "0.7",
                }}
              />
              <ShoppingCart
                className="nav-icon"
                sx={{
                  width: "29px",
                  height: "29px",
                  cursor: "pointer",
                  opacity: "0.7",
                }}
              />
            </Stack>
          </Stack>
          <Marginer direction="horizontal" width="100%" height="1" bg="#999" />
        </Container>
      </div>
    </div>
  );
};
