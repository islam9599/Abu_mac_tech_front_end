import React, { useEffect, useState } from "react";
import { Container, Stack, Box, Button, Typography } from "@mui/material";
import {
  Facebook,
  Instagram,
  Telegram,
  YouTube,
  Settings,
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
import { MySettings } from "./mySettings";
import Marginer from "../../component/marginer";
import { MemberPosts } from "./memberPost";
import { useNavigate } from "react-router-dom";
import { TuiEditor } from "../../component/tui_editor";
import CommunityApiService from "../../apiServices/communityApiService";
import MemberApiService from "../../apiServices/memberApiService";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  retrieveChosenMember,
  retrieveChosenMemberBoArticles,
  retrieveChosenSingleBoArticle,
} from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticle,
} from "./slice";
import { verifiedMemberdata } from "../../apiServices/verify";
import { Member } from "../../types/user";
import { BoArticle, SearchMemberArticleObj } from "../../types/boArticle";
import { sweetErrorHandling, sweetFailureProvider } from "../../lib/sweetAlert";
import { TViewer } from "../../component/tui_editor/TViewer";
import { serverApi } from "../../lib/config";

/** Redux Slice */

const actionDispatch = (dispatch: Dispatch) => ({
  setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) =>
    dispatch(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) =>
    dispatch(setChosenSingleBoArticle(data)),
});

/** Redux Selector*/
const chosenMemberRetriever = createSelector(
  retrieveChosenMember,
  (chosenMember) => ({
    chosenMember,
  })
);

const chosenMemberBoArticlesRetriever = createSelector(
  retrieveChosenMemberBoArticles,
  (chosenMemberBoArticles) => ({
    chosenMemberBoArticles,
  })
);

const chosenSingleBoArticleRetriever = createSelector(
  retrieveChosenSingleBoArticle,
  (chosenSingleBoArticle) => ({
    chosenSingleBoArticle,
  })
);
export function VisitMyPage(props: any) {
  /** Initializations */
  const [articleRebuild, setArticleRebuild] = useState<Date>(new Date());
  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
  } = actionDispatch(useDispatch());
  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenMemberBoArticles } = useSelector(
    chosenMemberBoArticlesRetriever
  );
  const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
  const navigate = useNavigate();
  const [value, setValue] = useState("1");

  const [followRebuild, setFollowRebuild] = useState<boolean>(false);
  const [memberAticleSearchObj, setMemberAticleSearchObj] =
    useState<SearchMemberArticleObj>({
      page: 1,
      limit: 2,
      mb_id: "none" || verifiedMemberdata?.mb_id,
    });
  useEffect(() => {
    if (!verifiedMemberdata) {
      sweetFailureProvider("Please login first!!!", true, true);
    }

    const communityService = new CommunityApiService();
    communityService
      .getMemberCommunityArticle(memberAticleSearchObj)
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err));

    const memberService = new MemberApiService();
    memberService
      .getChosenMember(verifiedMemberdata?._id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));
  }, [memberAticleSearchObj, articleRebuild, followRebuild]);
  /** Handlers */
  const navigateToHomeHandler = () => {
    navigate("/");
  };
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  const renderChosenArticlesHandeler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService();
      communityService
        .getChosenArticle(art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("5");
        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const handlePaginationChange = (event: any, value: number) => {
    memberAticleSearchObj.page = value;
    setMemberAticleSearchObj({ ...memberAticleSearchObj });
  };
  return (
    <div className="my_page">
      <Container
        // maxWidth="lg"
        style={{ marginTop: "40px", marginBottom: "50px" }}
      >
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
            Mypage
          </Typography>

          <Cancel
            sx={{ width: "10px", height: "10px" }}
            className="navigate_home navigate_home_icon"
            onClick={() => {
              navigate("/");
            }}
          />
        </Stack>
        <Stack mt={10} width={"100"} height={"750px"} flexDirection={"row"}>
          <TabContext value={value}>
            <Stack className="my_page_right">
              <Stack className="order_info_box">
                <a onClick={() => setValue("6")}>
                  <Settings />
                </a>
                <Box className="auth_user_img">
                  <div>
                    <img
                      src={
                        chosenMember?.mb_image
                          ? `${serverApi}/${chosenMember?.mb_image}`
                          : "/auth/author_default.jpeg"
                      }
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="auth_user_avatar"
                      src={
                        chosenMember?.mb_type === "RESTAURANT"
                          ? "/icons/restaurant_type.webp"
                          : "/icons/author_default.jpeg"
                      }
                      alt="mb_type"
                    />
                  </div>
                </Box>
                <Box className="auth_user_name">
                  <span>{chosenMember?.mb_nick}</span>
                  <span>
                    {chosenMember?.mb_type ? chosenMember?.mb_type : "User"}
                  </span>
                </Box>
                <Stack
                  flexDirection={"row"}
                  width={"130px"}
                  height={"20px"}
                  justifyContent={"space-between"}
                  marginTop={"10px"}
                >
                  <Facebook sx={{ color: "blue" }} />
                  <Instagram sx={{ color: "red" }} />
                  <YouTube sx={{ color: "red" }} />
                  <Telegram sx={{ color: "blue" }} />
                </Stack>
                <Box className="auth_follow">
                  <span>Followers: {chosenMember?.mb_follow_cnt}</span>
                  <span>Following: {chosenMember?.mb_subscriber_cnt}</span>
                </Box>
                <p>Assalomu Alaykum!</p>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={{ mt: "10px" }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Button onClick={() => setValue("4")} variant="contained">
                      Create Blog
                    </Button>
                  </TabList>
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
                          <span>My Blogs</span>
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
                  <Box className="menu_name">My Blogs</Box>
                  <Marginer width="350px" bg="#000" height="1" />

                  <Box className="menu_content">
                    <MemberPosts
                      chosenMemberBoArticles={chosenMemberBoArticles}
                      renderChosenArticlesHandeler={
                        renderChosenArticlesHandeler
                      }
                      setArticleRebuild={setArticleRebuild}
                      memberAticleSearchObj={memberAticleSearchObj}
                      setMemberAticleSearchObj={setMemberAticleSearchObj}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Box className="menu_name">Followers</Box>
                  <Marginer width="350px" bg="#000" height="1" />{" "}
                  <Box className="menu_content">
                    <MemberFollowers
                      actions_enabled={true}
                      mb_id={verifiedMemberdata?._id}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="3">
                  <Box className="menu_name">Followings</Box>
                  <Marginer width="750px" bg="#000" height="1" />
                  <Box className="menu_content">
                    <Marginer width="750px" bg="#000" height="1" />
                    <MemberFollowings
                      actions_enabled={true}
                      mb_id={verifiedMemberdata?._id}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="4">
                  <Box className="menu_name">Create Blog</Box>
                  <Marginer width="750px" bg="#000" height="1" />
                  <Box className="menu_content">
                    <TuiEditor />
                  </Box>
                </TabPanel>
                <TabPanel value="5">
                  <Box className="menu_name">Chosen Blog</Box>
                  <Marginer width="750px" bg="#000" height="1" />
                  <Box className="menu_content">
                    <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
                  </Box>
                </TabPanel>
                <TabPanel value="6">
                  <Box className="menu_name">Edit My Settings</Box>
                  <Marginer width="750px" bg="#000" height="1" />
                  <Box className="menu_content">
                    <MySettings chosenMember={chosenMember} />
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
