import React from "react";
import { Box, Container, Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import "../../../css/header.css";
import Search from "@mui/icons-material/Search";
import Marginer from "../marginer";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import { FaUser } from "react-icons/fa";

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
          height: "100px",
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
            <Stack flexDirection={"row"} alignItems={"center"} mr={10}>
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    Bosh Sahifa
                  </Typography>
                </NavLink>
              </Box>
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/products"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    Do'konlar
                  </Typography>
                </NavLink>
              </Box>
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/orders"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    Buyurtmalar
                  </Typography>
                </NavLink>
              </Box>
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/community"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    Jamiyat
                  </Typography>
                </NavLink>
              </Box>
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/member-page"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    Mening Sahifam
                  </Typography>
                </NavLink>
              </Box>
              <Box sx={{ mr: 2, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/help"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    Yordam
                  </Typography>
                </NavLink>
              </Box>
            </Stack>

            <Stack
              width={"100px"}
              height={"auto"}
              mt={5}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <FaUser
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
