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
            padding={"11px 0px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box width={"600px"}>
              <TypeAnimation
                sequence={[
                  // Deletes 'One' and types 'Two'
                  100, // Waits 2s
                  "Bizni do'stlaringiz bilan baham ko'ring", // Types 'Three' without deleting 'Two'
                  200,
                  "Bizni do'stlaringiz bilan baham ko'ring va 20% gacha chegirmalarga ega bo'ling!",

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
            {/* <Typography
              variant="h6"
              sx={{ fontFamily: "Verdana" }}
              color={"#fff"}
              marginRight={7}
            >
              Bizni do'stlaringiz bilan baham ko'ring va 20% gacha chegirmalarga
              ega bo'ling!
            </Typography> */}

            <Box sx={{ mr: 2 }}>
              <NavLink style={{ textDecoration: "none" }} to={"/"}>
                <Typography className="nav-title" color={"#fff"} variant="h5">
                  Bosh Sahifa
                </Typography>
              </NavLink>
            </Box>
            <Box sx={{ mr: 2 }}>
              <NavLink style={{ textDecoration: "none" }} to={"/products"}>
                <Typography className="nav-title" color={"#fff"} variant="h5">
                  Do'konlar
                </Typography>
              </NavLink>
            </Box>
            <Box sx={{ mr: 2 }}>
              <NavLink style={{ textDecoration: "none" }} to={"/orders"}>
                <Typography className="nav-title" color={"#fff"} variant="h5">
                  Buyurtmalar
                </Typography>
              </NavLink>
            </Box>
            <Box sx={{ mr: 2 }}>
              <NavLink style={{ textDecoration: "none" }} to={"/community"}>
                <Typography className="nav-title" color={"#fff"} variant="h5">
                  Jamiyat
                </Typography>
              </NavLink>
            </Box>
            <Box sx={{ mr: 2 }}>
              <NavLink style={{ textDecoration: "none" }} to={"/member-page"}>
                <Typography className="nav-title" color={"#fff"} variant="h5">
                  Mening Sahifam
                </Typography>
              </NavLink>
            </Box>
            <Box sx={{ mr: 2 }}>
              <NavLink style={{ textDecoration: "none" }} to={"/help"}>
                <Typography className="nav-title" color={"#fff"} variant="h5">
                  Yordam
                </Typography>
              </NavLink>
            </Box>
          </Stack>
        </Container>
      </div>
      <div style={{ width: "100%", height: "120px", margin: "20px 0px" }}>
        <Container>
          <Stack
            sx={{ width: "1200px", height: "100px" }}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={3}
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
                {/* <select
                  style={{
                    width: "auto",
                    height: "99%",
                    border: "none",
                    background: "none",
                    margin: "10px",
                    outline: "none",
                  }}
                  name=""
                  id=""
                  
                >
                  <option value="all">All Categories</option>
                  <option value="laptops">Laptops</option>
                  <option value="phones">
                    <a>Cell-phones</a>
                  </option>
                  <option value="etc">Headsets</option>
                </select> */}
                {/* <Marginer
                  direction="vertical"
                  width="1"
                  height="30"
                  bg="#129cb8"
                /> */}
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
