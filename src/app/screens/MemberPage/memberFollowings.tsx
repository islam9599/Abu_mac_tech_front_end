import React, { useEffect, useState } from "react";
import { Person } from "@mui/icons-material";
import {
  Box,
  Button,
  Link,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { retrieveMemberFollowings } from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowings } from "./slice";
import { verifiedMemberdata } from "../../apiServices/verify";
import { FollowSearchObj, Following } from "../../types/follow";
import { useNavigate } from "react-router-dom";
import FollowApiService from "../../apiServices/followApiService";
import { Definer } from "../../lib/Definer";
import assert from "assert";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import { serverApi } from "../../lib/config";

/** Redux Slice */

const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowings: (data: Following[]) =>
    dispatch(setMemberFollowings(data)),
});

/** Redux Selector*/

const memberFollowingsRetriever = createSelector(
  retrieveMemberFollowings,
  (memberFollowings) => ({
    memberFollowings,
  })
);

const followings = [
  { mb_nick: "abdulloh" },
  { mb_nick: "abdulrahmon" },
  { mb_nick: "maryam" },
];

export function MemberFollowings(props: any) {
  /** Initializations */
  const { mb_id, setFollowRebuild, followRebuild } = props;
  const { setMemberFollowings } = actionDispatch(useDispatch());
  const { memberFollowings } = useSelector(memberFollowingsRetriever);
  const [followingSearchObj, setFollowingSearchObj] = useState<FollowSearchObj>(
    { page: 1, limit: 5, mb_id: mb_id }
  );
  const navigate = useNavigate();

  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowings(followingSearchObj)
      .then((data) => setMemberFollowings(data))
      .catch((err) => console.log(err));
  }, [followingSearchObj, followRebuild]);
  //setMemberFollowings

  /** Handlers */
  const handlePaginationChange = (event: any, value: number) => {
    followingSearchObj.page = value;
    setFollowingSearchObj({ ...followingSearchObj });
  };
  const unsubscribeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      assert.ok(verifiedMemberdata, Definer.auth_err1);
      const followService = new FollowApiService();
      await followService.unSubscribe(id);
      await sweetTopSmallSuccessAlert("unSubscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log("ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  const visitMemberHandler = (mb_id: string) => {
    navigate(`/member-page/other?mb_id=${mb_id}`);
    document.location.reload();
  };
  return (
    <div className="member_followers">
      <Stack justifyContent={"center"} alignItems={"center"}>
        {memberFollowings.map((following: Following) => {
          const img_path = following.follow_member_data?.mb_image
            ? `${serverApi}/${following.follow_member_data?.mb_image}`
            : "/icons/author_default.jpeg";
          return (
            <Link style={{ textDecoration: "none", cursor: "pointer" }}>
              <Stack className="member_followers_container">
                <Stack className="member_follower_info">
                  <Box className="follower_img">
                    <img
                      src={img_path}
                      alt=""
                      onClick={() => visitMemberHandler(following?.follow_id)}
                    />
                  </Box>
                  <Stack
                    className="member_follower_name"
                    justifyContent={"center"}
                  >
                    <span>
                      {following?.follow_member_data?.mb_type ?? "USER"}
                    </span>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => visitMemberHandler(following?.follow_id)}
                    >
                      {following?.follow_member_data?.mb_nick}
                    </p>
                  </Stack>

                  {props.actions_enabled && (
                    <Box className="follow_btn">
                      <Button
                        sx={{ background: "#E81010" }}
                        variant="contained"
                        onClick={(e) =>
                          unsubscribeHandler(e, following?.follow_id)
                        }
                      >
                        <Person sx={{ ml: "5px" }} />
                        Bekor Qilish
                      </Button>
                    </Box>
                  )}
                </Stack>
              </Stack>
            </Link>
          );
        })}
      </Stack>
      <Stack alignItems={"center"} justifyContent={"center"}>
        <Pagination
          count={followingSearchObj.page >= 3 ? followingSearchObj.page + 1 : 3}
          page={followingSearchObj.page}
          renderItem={(item) => (
            <PaginationItem
              components={{
                previous: ArrowBackIcon,
                next: ArrowForwardIcon,
              }}
              {...item}
              color="secondary"
              sx={{ mt: 5 }}
            />
          )}
          onChange={handlePaginationChange}
        />
      </Stack>
    </div>
  );
}
