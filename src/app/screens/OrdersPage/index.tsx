import React, { useState } from "react";
import "../../../css/orders.css";
import { Box, Container, Stack, Tabs, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { PausedOrders } from "./pausedOrders";
import { ProceedOrders } from "./proccessOrders";
import { FinishedOrders } from "./finishedOrders";

import LocationOn from "@mui/icons-material/LocationOn";
import Marginer from "../../component/marginer";
import { Cancel, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { verifiedMemberdata } from "../../apiServices/verify";

export function OrdersPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  const navigateToHomeHandler = () => {
    navigate("/");
  };
  return (
    <div className="order_page">
      <Container className="order_page_container" maxWidth="lg">
        <Stack className="order_left">
          <Stack flexDirection={"row"} alignItems={"center"} mr={70} mb={5}>
            <Home
              className="navigate_home"
              sx={{ width: "29px", height: "29px" }}
            />
            <Typography
              className="navigate_home"
              sx={{ margin: "15px" }}
              variant="h4"
            >
              Home
            </Typography>
            <Marginer width="1" height="20" bg="#000" direction="vertical" />

            <Typography
              className="navigate_home"
              sx={{ margin: "15px" }}
              variant="h4"
            >
              Order Page
            </Typography>
            <Cancel
              className="navigate_home"
              style={{ cursor: "pointer" }}
              onClick={navigateToHomeHandler}
            />
          </Stack>
          <TabContext value={value}>
            <Box className="order_nav_frame">
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  bgcolor: "silver",
                  width: 800,
                  margin: 5,
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="lab API tabs example"
                >
                  <Tab
                    sx={{ fontWeight: "bold", fontSize: "13px" }}
                    label="Orders"
                    value="1"
                  />
                  <Tab
                    sx={{ fontWeight: "bold", fontSize: "13px" }}
                    label="In Proccess"
                    value="2"
                  />
                  <Tab
                    sx={{ fontWeight: "bold", fontSize: "13px" }}
                    label="Finished"
                    value="3"
                  />
                </Tabs>
              </Box>
            </Box>
            <Stack className="order_main_content">
              <PausedOrders />
              <ProceedOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className="order_right">
          <Box className="order_info_box">
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <div className="order_user_img">
                <img
                  src="/home/auth.svg"
                  className="autor_user_avatar"
                  alt=""
                  style={{
                    width: "117px",
                    height: "112px",
                    marginBottom: "15px",
                  }}
                />
                <div className="mini_user">
                  <img src="/icons/mini-user.svg" alt="" />
                </div>
                <span>
                  {verifiedMemberdata?.mb_nick
                    ? verifiedMemberdata?.mb_nick
                    : "Not auth user!"}
                </span>
                User
              </div>
              <Marginer
                direction="horizontal"
                width="333"
                height="2"
                bg="#A1A1A1;"
              />
            </Box>
            <Box className="order_user_location">
              <LocationOn />
              <p>Toshkent Mirobod Salom Kuyluk</p>
            </Box>
          </Box>

          <Box className="order_user_payment">
            <form className="payment_process" action="">
              <Box>
                <input
                  className="card_num"
                  type="text"
                  placeholder="Card number : 5243 4090 2002 7495"
                />
              </Box>
              <Box className="card_date">
                <input type="number" placeholder="07 / 24" />
                <input type="text" placeholder="CVV : 010" />
              </Box>

              <input
                className="card_num"
                type="text"
                placeholder="Card number : 5243 4090 2002 7495"
              />
            </form>
            <Box className="payment_cards">
              <img src="/icons/w-union.svg" alt="" />
              <img src="/icons/m-card.svg" alt="" />
              <img src="/icons/Paypal.svg" alt="" />
              <img src="/icons/w-union.svg" alt="" />
            </Box>
          </Box>
        </Stack>
      </Container>
      ;
    </div>
  );
}
