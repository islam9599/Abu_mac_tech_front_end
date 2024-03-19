import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import "../../../css/header.css";
import Marginer from "../marginer";
import { TypeAnimation } from "react-type-animation";
import { verifiedMemberdata } from "../../apiServices/verify";
import { Basket } from "./basket";
import { AuthUser } from "./authUser";
import { ArrowUpward } from "@mui/icons-material";

export const OthersNavbarPage = (props: any) => {
  /** Initialization */
  const navigate = useNavigate();
  const { handleSignupOpen, handleLoginOpen } = props;
  const [scrollPosition, setScrollPosition] = useState(0);
  const isScrolled = scrollPosition >= 100;
  const isTopScroll = scrollPosition >= 300;
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /** Handlers */
  const navigateHandler = () => {
    navigate("/");
  };
  const topHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <div className="nav_other_wrapper">
        <Container>
          <Stack
            flexDirection={"row"}
            width={"100%"}
            height={"60px"}
            padding={"11px 0px"}
            alignItems={"center"}
            justifyContent={"space-between"}
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
              />

              <Box width={"150px"}>
                <TypeAnimation
                  sequence={[
                    // Deletes 'One' and types 'Two'
                    100, // Waits 2s
                    "Abu", // Types 'Three' without deleting 'Two'
                    100,
                    "Abu_Mac_Tech",

                    () => {},
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
              width={"60%"}
              height={"100%"}
              className="hover-line nav-others"
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mt={5}
            >
              <Box className="hover-line" sx={{ mr: 2 }}>
                <NavLink className="nav_link" to={"/"}>
                  <Typography className={"nav_other_nav_title"} variant="h5">
                    Home
                  </Typography>
                </NavLink>
              </Box>
              <Box className="hover-line" sx={{ mr: 2 }}>
                <NavLink className="nav_link" to={"/products"}>
                  <Typography className={"nav_other_nav_title"} variant="h5">
                    Shop
                  </Typography>
                </NavLink>
              </Box>
              {verifiedMemberdata ? (
                <Box className="hover-line" sx={{ mr: 2 }}>
                  <NavLink className="nav_link" to={"/orders"}>
                    <Typography className={"nav_other_nav_title"} variant="h5">
                      Orders
                    </Typography>
                  </NavLink>
                </Box>
              ) : null}
              <Box className="hover-line" sx={{ mr: 2 }}>
                <NavLink className="nav_link" to={"/community"}>
                  <Typography className={"nav_other_nav_title"} variant="h5">
                    Community
                  </Typography>
                </NavLink>
              </Box>
              {verifiedMemberdata ? (
                <Box className="hover-line" sx={{ mr: 2 }}>
                  <NavLink className="nav_link" to={"/member-page"}>
                    <Typography className={"nav_other_nav_title"} variant="h5">
                      My Page
                    </Typography>
                  </NavLink>
                </Box>
              ) : null}
              <Box className="hover-line" sx={{ mr: 2 }}>
                <NavLink className="nav_link" to={"/help"}>
                  <Typography className={"nav_other_nav_title"} variant="h5">
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
                  <Typography className={"nav_other_nav_title"} variant="h5">
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
                  <Typography className={"nav_other_nav_title"} variant="h5">
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
                    className={"nav_other_nav_title"}
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
      <Box sx={{ width: "100%", height: "300px" }}>
        <img
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
          src="/home/home-others.webp"
          alt=""
        />
        <Box sx={{ mt: 5 }}>
          <Marginer direction="horizontal" width="100%" height="2" bg="#999" />
        </Box>
      </Box>
      {isTopScroll && (
        <ArrowUpward
          sx={{ fill: "#ffffff ", width: "40px", height: "40px" }}
          className="up_icon"
          onClick={topHandler}
        />
      )}
    </div>
  );
};
