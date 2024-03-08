import React, { useEffect, useState } from "react";
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
// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTargetboArticles } from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetboArticles } from "./slice";
import { BoArticle, SearchArticleObj } from "../../types/boArticle";
import CommunityApiService from "../../apiServices/communityApiService";

/** Redux Slice */

const actionDispatch = (dispatch: Dispatch) => ({
  setTargetboArticles: (data: BoArticle[]) =>
    dispatch(setTargetboArticles(data)),
});

/** Redux Selector*/
const targetboArticlesRetriever = createSelector(
  retrieveTargetboArticles,
  (targetboArticles) => ({
    targetboArticles,
  })
);

const targetBoArticles = [1, 2, 3, 4, 5];

export function CommunityPage() {
  /** Initializations */
  const { setTargetboArticles } = actionDispatch(useDispatch());
  const { targetboArticles } = useSelector(targetboArticlesRetriever);
  const [value, setValue] = useState("1");
  const [searchArticlesObj, setSearchArticleObj] = useState<SearchArticleObj>({
    bo_id: "all",
    page: 1,
    limit: 5,
  });
  const [articleRebiild, setArticleRebuild] = useState<Date>(new Date());

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticle(searchArticlesObj)
      .then((data) => setTargetboArticles(data))
      .catch((err) => console.log(err));
  }, [searchArticlesObj, articleRebiild]);

  /** Handlers */
  const handleChange = (event: any, newValue: string) => {
    searchArticlesObj.page = 1;
    switch (newValue) {
      case "1":
        searchArticlesObj.bo_id = "all";
        break;
      case "2":
        searchArticlesObj.bo_id = "celebrity";
        break;
      case "3":
        searchArticlesObj.bo_id = "evaluation";
        break;
    }
    setSearchArticleObj({ ...searchArticlesObj });
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    searchArticlesObj.page = value;
    setSearchArticleObj({ ...searchArticlesObj });
  };
  const navigate = useNavigate();
  const navigateToHomeHandler = () => {
    navigate("/");
  };
  return (
    <div className="community_page">
      <div
        style={{
          display: "flex",

          width: "100%",
          height: "auto",
        }}
      >
        <Container>
          <Stack className="community_page_wrapper">
            <Stack
              className="navigate_home_wrapper"
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Home className="navigate_home navigate_home_icon" />
              <Typography className="navigate_home" variant="h6">
                Homepage
              </Typography>
              <Marginer width="1" height="15" bg="#000" direction="vertical" />
              <Typography className="navigate_home" variant="h6">
                Community
              </Typography>

              <Cancel
                sx={{ width: "10px", height: "10px" }}
                className="navigate_home navigate_home_icon"
                onClick={() => {
                  navigate("/");
                }}
              />
            </Stack>
            <Stack className="tab_main_wrapper" justifyContent={"center"}>
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
                <Stack flexDirection={"row"} className="tabpanel_wrapper">
                  <Stack className="main_article">
                    <TabPanel value="1">
                      <TargetArticles
                        targetBoArticles={targetboArticles}
                        setArticleRebuild={setArticleRebuild}
                      />
                    </TabPanel>
                    <TabPanel value="2">
                      <TargetArticles
                        targetBoArticles={targetboArticles}
                        setArticleRebuild={setArticleRebuild}
                      />
                    </TabPanel>
                    <TabPanel value="3">
                      <TargetArticles
                        targetBoArticles={targetboArticles}
                        setArticleRebuild={setArticleRebuild}
                      />
                    </TabPanel>
                  </Stack>
                </Stack>
                {/* <Marginer width="863" height="1" bg="#007655" /> */}
                <Stack className="aricle_pagination" spacing={4}>
                  <Pagination
                    count={
                      searchArticlesObj.page >= 3
                        ? searchArticlesObj.page + 1
                        : 3
                    }
                    page={searchArticlesObj.page}
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
                    onChange={handlePaginationChange}
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
