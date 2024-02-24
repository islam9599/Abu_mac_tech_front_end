import React, { useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import "../../../css/community.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TargetArticles } from "./targetArticles";
import Marginer from "../../component/marginer";
import { Cancel, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const targetBoArticles = [1, 2, 3, 4, 5];

export function CommunityPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  const navigateToHomeHandler = () => {
    navigate("/");
  };
  return (
    <div className="community_page">
      <div
        style={{
          display: "flex",
          // flexDirection: "row",
          // alignItems: "center",
          // justifyContent: "space-between",
          width: "100%",
          height: "auto",
        }}
      >
        <Container>
          <Stack className="community_page_wrapper">
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
                Community Page
              </Typography>
              <Cancel
                className="navigate_home"
                style={{ cursor: "pointer" }}
                onClick={navigateToHomeHandler}
              />
            </Stack>
            <Stack className="tab_main_wrapper">
              <TabContext value={value}>
                <Box className="order_nav_frame">
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="basic tabs example"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        maxWidth: "100%",
                      }}
                      variant="fullWidth"
                    >
                      <Tab
                        sx={{ fontWeight: "bold", fontSize: "13px" }}
                        label="All Blogs"
                        value="1"
                      />
                      <Tab
                        sx={{ fontWeight: "bold", fontSize: "13px" }}
                        label="Featured Blogs"
                        value="2"
                      />
                      <Tab
                        sx={{ fontWeight: "bold", fontSize: "13px" }}
                        label="Feedbacks to website"
                        value="3"
                      />
                    </TabList>
                  </Box>
                </Box>
                <Stack
                  flexDirection={"row"}
                  className="tabpanel_wrapper"
                  // style={{ width: "100%", height: "980px", marginTop: "15px" }}
                >
                  {/* <Marginer
                    width="863"
                    height="1"
                    bg="rgba(228, 228, 228, 0.83)"
                  /> */}
                  <Stack className="main_article">
                    <TabPanel value="1">
                      <TargetArticles targetBoArticles={[1, 2, 3, 4, 5, 6]} />
                    </TabPanel>
                    <TabPanel value="2">
                      <TargetArticles targetBoArticles={[1, 2, 3, 4, 5]} />
                    </TabPanel>
                    <TabPanel value="3">
                      <TargetArticles targetBoArticles={[1, 2]} />
                    </TabPanel>
                    <TabPanel value="4">
                      <TargetArticles targetBoArticles={[1, 2]} />
                    </TabPanel>
                  </Stack>
                </Stack>
                {/* <Marginer width="863" height="1" bg="#007655" /> */}
                <Stack className="aricle_pagination" spacing={4}>
                  <Pagination
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
                </Stack>
              </TabContext>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
