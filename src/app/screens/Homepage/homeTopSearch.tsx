import React from "react";
import { Favorite, Notifications, Search } from "@mui/icons-material";
import { Alert, Box, Container, Stack, Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import { AuthUser } from "../../component/Navbar/authUser";
import { verifiedMemberdata } from "../../apiServices/verify";
import { sweetFailureProvider } from "../../lib/sweetAlert";
import Marginer from "../../component/marginer";
import { useNavigate } from "react-router-dom";

export const HomeTopSearch = (props: any) => {
  /** Initialization */

  const navigate = useNavigate();
  return (
    <div className="top_search_container">
      <Stack className={"top_form_search_wrapper"}>
        <Stack className="top_form_logo_wrapper">
          <img className="top_form_img" src="/home/macshop.jpg"></img>
          <Typography className="top_form_title">Abu_Mac_Tech</Typography>
        </Stack>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <form
            className="top_form_wrapper"
            onClick={() => navigate("/products")}
            action=""
          >
            <input
              className="top_form_input"
              type="text"
              placeholder="Search product here"
            />
            <Box className="top_form_search">
              <Search className="top_form_search_icon" />
            </Box>
          </form>
        </Stack>
        <Stack className="top_icons_wrapper">
          <AuthUser handleLogoutRequest={props.handleLogoutRequest} />
          <Favorite
            className="top_favorite_icon"
            onClick={() => {
              !verifiedMemberdata
                ? sweetFailureProvider("Please login first, kindly!")
                : navigate("/member-page");
            }}
          />

          <Badge badgeContent={0} color="primary">
            <Notifications
              className="top_favorite_icon"
              onClick={() => {
                !verifiedMemberdata
                  ? sweetFailureProvider("Please login first, kindly!")
                  : navigate("/member-page");
              }}
            />
          </Badge>
        </Stack>
      </Stack>
      <Marginer direction="horizontal" width="1320" height="2" bg="#999" />
    </div>
  );
};
