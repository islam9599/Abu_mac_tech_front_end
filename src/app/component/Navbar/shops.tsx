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
import { verifiedMemberdata } from "../../apiServices/verify";
import { Basket } from "./basket";
import { AuthUser } from "./authUser";

export const ShopsPage = (props: any) => {
  /** Initialization */
  const navigate = useNavigate();
  const { handleSignupOpen, handleLoginOpen } = props;

  /** Handlers */
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

              <Box width={"150px"}>
                <TypeAnimation
                  sequence={[100, "Abu", 100, "Abu_Mac_Tech", () => {}]}
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
              width={"60%"}
              height={"100%"}
              className="hover-line"
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mt={5}
            >
              <Box className="hover-line" sx={{ mr: 2 }}>
                <NavLink
                  className="nav-title"
                  style={{ textDecoration: "none" }}
                  to={"/"}
                >
                  <Typography color={"#fff"} variant="h5">
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
              {verifiedMemberdata ? (
                <Box className="hover-line" sx={{ mr: 2 }}>
                  <NavLink style={{ textDecoration: "none" }} to={"/orders"}>
                    <Typography
                      className="nav-title"
                      color={"#fff"}
                      variant="h5"
                    >
                      Orders
                    </Typography>
                  </NavLink>
                </Box>
              ) : null}
              <Box className="hover-line" sx={{ mr: 2 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/community"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    Community
                  </Typography>
                </NavLink>
              </Box>
              {verifiedMemberdata ? (
                <Box className="hover-line" sx={{ mr: 2 }}>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to={"/member-page"}
                  >
                    <Typography
                      className="nav-title"
                      color={"#fff"}
                      variant="h5"
                    >
                      My Page
                    </Typography>
                  </NavLink>
                </Box>
              ) : null}
              <Box className="hover-line" sx={{ mr: 2 }}>
                <NavLink style={{ textDecoration: "none" }} to={"/help"}>
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    FAQ
                  </Typography>
                </NavLink>
              </Box>
              {!verifiedMemberdata ? (
                <Box
                  className="hover-line"
                  sx={{ mr: 2 }}
                  onClick={handleSignupOpen}
                >
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    Signup
                  </Typography>
                </Box>
              ) : null}
              {!verifiedMemberdata ? (
                <Box
                  className="hover-line"
                  sx={{ mr: 2 }}
                  onClick={handleLoginOpen}
                >
                  <Typography className="nav-title" color={"#fff"} variant="h5">
                    Login
                  </Typography>
                </Box>
              ) : (
                <Stack
                  width={"40px"}
                  height={"auto"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <AuthUser handleLogoutRequest={props.handleLogoutRequest} />
                </Stack>
              )}
              <Basket
                cartItems={props.cartItems}
                onAdd={props.onAdd}
                onRemove={props.onRemove}
                onDelete={props.onDelete}
                onDeleteAll={props.onDeleteAll}
                setOrderRebuild={props.setOrderRebuild}
              />
              {verifiedMemberdata ? (
                <Box className="hover-line" sx={{ mr: 2 }}>
                  <Typography
                    onClick={props.handleLogoutRequest}
                    className="nav-title"
                    color={"#fff"}
                    variant="h5"
                  >
                    Logout
                  </Typography>
                </Box>
              ) : null}
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
};
