import React, { useEffect, useState } from "react";
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
import CommunityApiService from "../../apiServices/communityApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import FollowApiService from "../../apiServices/followApiService";
import MemberApiService from "../../apiServices/memberApiService";
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

export function VisitOtherPage(props: any) {
  /** Initializations */
  const { chosen_mb_id, chosen_art_id } = props;
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
  const [value, setValue] = useState("1");
  const navigate = useNavigate();
  const [memberAticleSearchObj, setMemberAticleSearchObj] =
    useState<SearchMemberArticleObj>({
      page: 1,
      limit: 3,
      mb_id: chosen_mb_id || verifiedMemberdata?.mb_id,
    });
  const [articleRebuild, setArticleRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState<boolean>(false);

  useEffect(() => {
    if (chosen_mb_id === verifiedMemberdata?._id) {
      navigate("/member-page");
    }

    const memberService = new MemberApiService();

    memberService
      .getChosenMember(memberAticleSearchObj.mb_id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));
  }, [verifiedMemberdata, chosen_mb_id, followRebuild]);

  useEffect(() => {
    if (chosen_mb_id === verifiedMemberdata?._id) {
      navigate("/member-page");
    }
    const communityService = new CommunityApiService();
    if (chosen_art_id) {
      communityService
        .getChosenArticle(chosen_art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("4");
        })
        .catch((err) => console.log(err));
    }
    communityService
      .getMemberCommunityArticle(memberAticleSearchObj)
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err));
  }, [memberAticleSearchObj, chosen_mb_id, articleRebuild]);

  /** Handlers */

  const handlePaginationChange = (event: any, value: number) => {
    memberAticleSearchObj.page = value;
    setMemberAticleSearchObj({ ...memberAticleSearchObj });
  };
  const renderChosenArticlesHandeler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService();
      communityService
        .getChosenArticle(art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("4");
        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const subscribeHandler = async (e: any) => {
    try {
      assert.ok(verifiedMemberdata, Definer.auth_err1);
      const followService = new FollowApiService();
      await followService.subscribe(e.target.value);
      await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log("ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const unsubscribeHandler = async (e: any) => {
    try {
      e.stopPropagation();
      assert.ok(verifiedMemberdata, Definer.auth_err1);
      const followService = new FollowApiService();
      await followService.unSubscribe(e.target.value);
      await sweetTopSmallSuccessAlert("unSubscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log("ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

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
            Others-page
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
                <Box className="auth_user_img">
                  <div>
                    <img
                      src={
                        chosenMember?.mb_image
                          ? `${serverApi}/${chosenMember?.mb_image}`
                          : "/auth/author_default.jpeg"
                      }
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
                    />
                  </div>
                </Box>
                <Box className="auth_user_name">
                  <span>{chosenMember?.mb_nick}</span>
                  <span>{chosenMember?.mb_type}</span>
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
                  <span>Followers: {chosenMember?.mb_subscriber_cnt}</span>
                  <span>Following: {chosenMember?.mb_follow_cnt}</span>
                </Box>
                <p>
                  {chosenMember?.mb_description
                    ? chosenMember.mb_description
                    : "No info exist!"}
                </p>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={{ mt: "10px" }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    {chosenMember?.me_followed &&
                    chosenMember?.me_followed[0]?.my_following ? (
                      <Tab
                        style={{ flexDirection: "column" }}
                        value={"4"}
                        component={(e) => (
                          <Button
                            variant="contained"
                            color="secondary"
                            value={chosenMember?._id}
                            onClick={unsubscribeHandler}
                          >
                            Cancel
                          </Button>
                        )}
                      />
                    ) : (
                      <Tab
                        style={{ flexDirection: "column" }}
                        value={"4"}
                        component={(e) => (
                          <Button
                            value={chosenMember?._id}
                            variant="contained"
                            color="secondary"
                            onClick={subscribeHandler}
                          >
                            Follow
                          </Button>
                        )}
                      />
                    )}
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
                          <span>Blogs</span>
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
                  <Box className="menu_name">Blogs</Box>
                  <Marginer width="750px" bg="#000" height="1" />

                  <Box className="menu_content">
                    <MemberPosts
                      chosenMemberBoArticles={chosenMemberBoArticles}
                      setArticleRebuild={setArticleRebuild}
                      renderChosenArticlesHandeler={
                        renderChosenArticlesHandeler
                      }
                      memberAticleSearchObj={memberAticleSearchObj}
                      setMemberAticleSearchObj={setMemberAticleSearchObj}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Box className="menu_name">Followers</Box>
                  <Marginer width="750px" bg="#000" height="1" />
                  <Box className="menu_content">
                    <MemberFollowers
                      actions_enabled={false}
                      mb_id={chosen_mb_id}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="3">
                  <Box className="menu_name">Followings</Box>
                  <Marginer width="750px" bg="#000" height="1" />
                  <Box className="menu_content">
                    <MemberFollowings
                      actions_enabled={false}
                      mb_id={chosen_mb_id}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value="4">
                  <Box className="menu_name">Chosen Blog</Box>
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
