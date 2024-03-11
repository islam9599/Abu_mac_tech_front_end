import React, { useEffect, useState } from "react";
import "../../../css/header.css";
import { Box, Container, Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Search from "@mui/icons-material/Search";
import Marginer from "../marginer";
import { Favorite } from "@mui/icons-material";
import { TypeAnimation } from "react-type-animation";
import { verifiedMemberdata } from "../../apiServices/verify";
import { Basket } from "./basket";
import { sweetFailureProvider } from "../../lib/sweetAlert";
import { AuthUser } from "./authUser";
import { MobileNavbar } from "./mbileNavigation";

export const NavbarPage = (props: any) => {
  /** Initialization */
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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
    <div className="navbar_page">
      <div className="navbar_home">
        <Container>
          <Stack
            flexDirection={"row"}
            width={"100%"}
            height={"60px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box
              sx={{
                display: { xs: "none", sm: "none", md: "none", lg: "block" },
                width: { xs: "none", lg: "600px" },
              }}
            >
              <TypeAnimation
                className="nav_text_animation"
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
              />
            </Box>
            <Stack
              width={"70%"}
              sx={{
                display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
              }}
              flexDirection={"row"}
              justifyContent={"space-between"}
              mr={15}
            >
              <Box className="hover-line" sx={{ mr: 2 }}>
                <NavLink className="nav_link" to={"/"}>
                  <Typography className="nav-title" variant="h5">
                    Home
                  </Typography>
                </NavLink>
              </Box>
              <Box className="hover-line" sx={{ mr: 2 }}>
                <NavLink className="nav_link" to={"/products"}>
                  <Typography className="nav-title" variant="h5">
                    Shop
                  </Typography>
                </NavLink>
              </Box>
              {verifiedMemberdata ? (
                <Box className="hover-line" sx={{ mr: 2 }}>
                  <NavLink className="nav_link" to={"/orders"}>
                    <Typography className="nav-title" variant="h5">
                      Orders
                    </Typography>
                  </NavLink>
                </Box>
              ) : null}
              <Box className="hover-line" sx={{ mr: 2 }}>
                <NavLink className="nav_link" to={"/community"}>
                  <Typography className="nav-title" variant="h5">
                    Community
                  </Typography>
                </NavLink>
              </Box>
              {verifiedMemberdata ? (
                <Box className="hover-line" sx={{ mr: 2 }}>
                  <NavLink className="nav_link" to={"/member-page"}>
                    <Typography className="nav-title" variant="h5">
                      My Page
                    </Typography>
                  </NavLink>
                </Box>
              ) : null}
              <Box className="hover-line" sx={{ mr: 2 }}>
                <NavLink className="nav_link" to={"/help"}>
                  <Typography className="nav-title" variant="h5">
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
                  <Typography className="nav-title" variant="h5">
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
                  <Typography className="nav-title" variant="h5">
                    Login
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography className="nav-title" variant="h6">
                    Welcome back, {verifiedMemberdata?.mb_nick.toUpperCase()}!
                  </Typography>
                </Box>
              )}
              {verifiedMemberdata ? (
                <Box className="hover-line" sx={{ mr: 2 }}>
                  <Typography
                    onClick={props.handleLogoutRequest}
                    className="nav-title"
                    variant="h6"
                  >
                    Logout
                  </Typography>
                </Box>
              ) : null}
            </Stack>
            <Stack
              width={"100%"}
              height={"auto"}
              sx={{
                display: { xs: "flex", sx: "none", md: "none", lg: "none" },
              }}
            >
              <MobileNavbar />
            </Stack>
          </Stack>
        </Container>
      </div>
      <div className="nav_search_container">
        <Container>
          <Stack className={"nav_form_search_wrapper"}>
            <Stack className="nav_form_logo_wrapper" onClick={navigateHandler}>
              <img className="nav_form_img" src="/home/macshop.jpg"></img>
              <Typography className="nav_form_title">Abu_Mac_Tech</Typography>
            </Stack>
            <Stack flexDirection={"row"} alignItems={"center"}>
              <form
                className="nav_form_wrapper"
                onClick={changeToProductsHandler}
                action=""
              >
                <input
                  className="nav_form_input"
                  type="text"
                  placeholder="Search product here"
                />
                <Box className="nav_form_search">
                  <Search className="nav_form_search_icon" />
                </Box>
              </form>
            </Stack>
            <Stack className="nav_icons_wrapper">
              <AuthUser handleLogoutRequest={props.handleLogoutRequest} />
              <Favorite
                className="nav_favorite_icon"
                onClick={() => {
                  !verifiedMemberdata
                    ? sweetFailureProvider("Please login first, kindly!")
                    : navigate("/member-page");
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
          <Marginer direction="horizontal" width="1320" height="2" bg="#999" />
        </Container>
      </div>
    </div>
  );
};
