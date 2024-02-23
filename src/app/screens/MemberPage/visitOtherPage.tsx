import React, { useState } from "react";
import { Container, Stack, Box, Button, Typography } from "@mui/material";
import {
  Facebook,
  Instagram,
  Telegram,
  YouTube,
  Edit,
  Group,
  Person,
  Home,
  Cancel,
} from "@mui/icons-material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { MemberFollowers } from "./memberFollowers";

import { MemberFollowings } from "./memberFollowings";
import { MemberPosts } from "./memberPost";
import { MySettings } from "./mySettings";
import Marginer from "../../component/marginer";
import { useNavigate } from "react-router-dom";

export function VisitOtherPage(props: any) {
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  const navigateToHomeHandler = () => {
    navigate("/");
  };
  return (
    <div className="my_page">
      <Container
        // maxWidth="lg"
        style={{ marginTop: "50px", marginBottom: "50px" }}
      >
        <Stack flexDirection={"row"} alignItems={"center"} mr={100} mb={5}>
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
            Other Member Page
          </Typography>
          <Cancel
            className="navigate_home"
            style={{ cursor: "pointer" }}
            onClick={navigateToHomeHandler}
          />
        </Stack>
        <Stack width={"100"} height={"750px"} flexDirection={"row"}>
          <TabContext value={value}>
            <Stack className="my_page_right">
              <Stack className="order_info_box">
                <Box className="auth_user_img">
                  <div>
                    <img src="/icons/author_default.jpeg" alt="" />
                  </div>
                  <div>
                    <img
                      className="auth_user_avatar"
                      src="/icons/author_default.jpeg"
                      alt=""
                    />
                  </div>
                </Box>
                <Box className="auth_user_name">
                  <span>Ilhomjonov Abdulloh</span>
                  <span>Foydalanuvchi</span>
                </Box>
                <Stack
                  flexDirection={"row"}
                  width={"130px"}
                  height={"20px"}
                  justifyContent={"space-between"}
                  marginTop={"10px"}
                >
                  <Facebook />
                  <Instagram />
                  <YouTube />
                  <Telegram />
                </Stack>
                <Box className="auth_follow">
                  <span>Followers: 2</span>
                  <span>Following: 3</span>
                </Box>
                <p>Assalomu Alaykum!</p>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={{ mt: "10px" }}
                >
                  {/* <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  > */}
                  <Button variant="contained" color="secondary">
                    Bekor Qilish
                  </Button>
                  {/* </TabList> */}
                </Box>
              </Stack>

              <Stack className="my_page_menu">
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"1"}
                    TabIndicatorProps={{
                      style: { transition: "none" },
                    }}
                    component={(e) => {
                      return (
                        <div
                          className={`menu_box ${value}`}
                          onClick={() => setValue("1")}
                        >
                          <Edit className="menu_box_edit" />
                          <span>Maqolalari</span>
                        </div>
                      );
                    }}
                  />
                </TabList>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"1"}
                    component={(e) => {
                      return (
                        <div
                          className={`menu_box ${value}`}
                          onClick={() => setValue("2")}
                        >
                          <Group className="menu_box_edit" />
                          <span>Followers</span>
                        </div>
                      );
                    }}
                  />
                </TabList>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"1"}
                    component={(e) => {
                      return (
                        <div
                          className={`menu_box ${value}`}
                          onClick={() => setValue("3")}
                        >
                          <Person />
                          <span>Followings</span>
                        </div>
                      );
                    }}
                  />
                </TabList>
              </Stack>
            </Stack>
            <Stack className="my_page_left">
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value="1">
                  <Box className="menu_name"> Maqolalari</Box>
                  <Marginer width="750px" bg="#000" height="1" />

                  <Box className="menu_content">
                    <MemberPosts />
                    <Pagination
                      style={{ marginTop: "50px" }}
                      count={3}
                      page={1}
                      renderItem={(item) => (
                        <PaginationItem
                          components={{
                            previous: ArrowBackIcon,
                            next: ArrowForwardIcon,
                          }}
                          {...item}
                          color="secondary"
                        />
                      )}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Box className="menu_name">Followers</Box>
                  <Marginer width="750px" bg="#000" height="1" />
                  <Box className="menu_content">
                    <MemberFollowers actions_enabled={false} />
                    <Pagination
                      style={{ marginTop: "50px" }}
                      count={3}
                      page={1}
                      renderItem={(item) => (
                        <PaginationItem
                          components={{
                            previous: ArrowBackIcon,
                            next: ArrowForwardIcon,
                          }}
                          {...item}
                          color="secondary"
                        />
                      )}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="3">
                  <Box className="menu_name">Followings</Box>
                  <Marginer width="750px" bg="#000" height="1" />
                  <Box className="menu_content">
                    <MemberFollowings actions_enabled={false} />
                    <Pagination
                      style={{ marginTop: "50px" }}
                      count={3}
                      page={1}
                      renderItem={(item) => (
                        <PaginationItem
                          components={{
                            previous: ArrowBackIcon,
                            next: ArrowForwardIcon,
                          }}
                          {...item}
                          color="secondary"
                        />
                      )}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value="4">
                  <Box className="menu_name">Tanlangan Maqola</Box>
                  <Marginer width="750px" bg="#000" height="1" />
                  <Box className="menu_content">
                    {/* <MemberFollowers /> */}
                  </Box>
                </TabPanel>
              </Box>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
