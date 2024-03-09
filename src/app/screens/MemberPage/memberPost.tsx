import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Link,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import assert from "assert";
import React from "react";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../lib/Definer";
import { verifiedMemberdata } from "../../apiServices/verify";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import { BoArticle } from "../../types/boArticle";
import { serverApi } from "../../lib/config";
import moment from "moment";

export function MemberPosts(props: any) {
  /** Initialization */
  const {
    setArticleRebuild,
    renderChosenArticlesHandeler,
    memberAticleSearchObj,
    chosenMemberBoArticles,
    setMemberAticleSearchObj,
  } = props;
  /** Handlers */
  const targetLikeHandler = async (e: any) => {
    try {
      e.stopPropagation();
      assert.ok(verifiedMemberdata, Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "community",
        });
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("success", 700, false);
      setArticleRebuild(new Date());
    } catch (err: any) {
      console.log("err: targetLikeHandler", err);
      sweetErrorHandling(err).then();
    }
  };
  const handlePaginationChange = (event: any, value: number) => {
    memberAticleSearchObj.page = value;
    setMemberAticleSearchObj({ ...memberAticleSearchObj });
  };
  return (
    <Stack width={"700px"}>
      <Stack
        style={{
          overflow: "hidden",
          width: "100%",
          maxHeight: "600px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginLeft: "50px",
        }}
      >
        {chosenMemberBoArticles.map((article: BoArticle) => {
          const image_path = article.art_image
            ? `${serverApi}/${article?.art_image}`
            : "/auth/gallery.png";
          return (
            <Stack className="my_article_wrapper" key={article?._id}>
              <Link
                className="target_articles_container"
                onClick={() => renderChosenArticlesHandeler(article?._id)}
              >
                <Stack flexDirection={"column"}>
                  <Box>
                    <img className="user_img" src={image_path} alt="" />
                  </Box>
                  <Stack
                    flexDirection={"column"}
                    width={"90%"}
                    height={"auto"}
                    marginLeft={"15px"}
                    marginTop={"15px"}
                  >
                    <Stack
                      className="author_info"
                      flexDirection={"row"}
                      alignItems={"center"}
                    >
                      <img
                        src={
                          article.member_data?.mb_image
                            ? `${serverApi}/${article.member_data?.mb_image}`
                            : "/icons/author_default.jpeg"
                        }
                        alt="member_image"
                      />
                      <Typography color={"#000"} fontWeight={"bold"}>
                        {article.member_data?.mb_nick}
                      </Typography>
                    </Stack>
                    <Box className="article_desc">
                      <span>{article?.art_subject}</span>
                    </Box>
                    <Stack className="article_date">
                      <Stack flexDirection={"row"}>
                        <p>
                          {moment(article.createdAt).format("YY-MM-DD HH:mm")}
                        </p>
                        <Checkbox
                          onClick={targetLikeHandler}
                          icon={<FavoriteBorder style={{ color: "#000" }} />}
                          id={article?._id}
                          checkedIcon={<Favorite style={{ color: "red" }} />}
                          checked={
                            article?.me_liked &&
                            article?.me_liked[0]?.my_favorite
                              ? true
                              : false
                          }
                        />
                        <p>{article?.art_likes}</p>
                      </Stack>
                      <Stack></Stack>

                      <RemoveRedEye />
                      <p>{article?.art_views}</p>
                    </Stack>
                  </Stack>
                </Stack>
              </Link>
            </Stack>
          );
        })}
      </Stack>
      <Stack alignItems={"center"} justifyContent={"center"}>
        <Pagination
          count={
            memberAticleSearchObj.page >= 2 ? memberAticleSearchObj.page + 1 : 2
          }
          page={memberAticleSearchObj.page}
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
    </Stack>
  );
}
