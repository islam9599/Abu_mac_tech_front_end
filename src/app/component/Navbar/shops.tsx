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

export const ShopsPage = () => {
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
          height: "100px",
          background: "#129cb8",
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: "999",
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
              className="hover-line"
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              ml={"10"}
            >
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    Home
                  </Typography>
                </NavLink>
              </Box>
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/products"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    Shop
                  </Typography>
                </NavLink>
              </Box>
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/orders"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    Orders
                  </Typography>
                </NavLink>
              </Box>
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/community"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    Community
                  </Typography>
                </NavLink>
              </Box>
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/member-page"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    My Page
                  </Typography>
                </NavLink>
              </Box>
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/help"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
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
      <div style={{ width: "100%", height: "110px" }}>
        <Container>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            m={"50px"}
          >
            <form
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
          <Marginer direction="horizontal" width="100%" height="1" bg="#999" />
        </Container>
      </div>
    </div>
  );
};
