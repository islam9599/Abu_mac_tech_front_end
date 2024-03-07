import React, { useEffect } from "react";
import "../../../css/header.css";
import { Box, Container, Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Search from "@mui/icons-material/Search";
import Marginer from "../marginer";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import { FaUser } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { verifiedMemberdata } from "../../apiServices/verify";
import { Basket } from "./basket";
import { sweetFailureProvider } from "../../lib/sweetAlert";
import { AuthUser } from "./authUser";

export const NavbarPage = (props: any) => {
  /** Initialization */
  const navigate = useNavigate();
  const { handleSignupOpen, handleLoginOpen } = props;
  useEffect(() => {}, []);

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
          position: "sticky",
          top: 0,
          zIndex: 9999,
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

                  () => {},
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
              width={"70%"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              mr={15}
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
                <Box>
                  <Typography className="nav-title" color={"#fff"} variant="h6">
                    Welcome back, {verifiedMemberdata?.mb_nick}!
                  </Typography>
                </Box>
              )}
              {verifiedMemberdata ? (
                <Box className="hover-line" sx={{ mr: 2 }}>
                  <Typography
                    onClick={props.handleLogoutRequest}
                    className="nav-title"
                    color={"#fff"}
                    variant="h6"
                  >
                    Logout
                  </Typography>
                </Box>
              ) : null}
            </Stack>
          </Stack>
        </Container>
      </div>
      <div
        style={{
          width: "100%",
          height: "120px",
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
              <AuthUser handleLogoutRequest={props.handleLogoutRequest} />

              <Favorite
                onClick={() => {
                  !verifiedMemberdata
                    ? sweetFailureProvider("Please login first, kindly!")
                    : navigate("/member-page");
                }}
                className="nav-icon"
                sx={{
                  width: "25px",
                  height: "25px",
                  cursor: "pointer",
                  opacity: "0.7",
                }}
              />
              <Basket
                cartItems={props.cartItems}
                onAdd={props.onAdd}
                onRemove={props.onRemove}
                onDelete={props.onDelete}
                onDeleteAll={props.onDeleteAll}
                setOrderRebuild={props.setOrderRebuild}
              />
            </Stack>
          </Stack>
          <Marginer direction="horizontal" width="100%" height="2" bg="#999" />
        </Container>
      </div>
    </div>
  );
};
