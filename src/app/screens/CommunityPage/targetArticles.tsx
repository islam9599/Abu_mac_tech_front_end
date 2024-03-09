import React, { useRef } from "react";
import { Stack } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import CheckBox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { BoArticle } from "../../types/boArticle";
import { serverApi } from "../../lib/config";
import moment from "moment";
import { Definer } from "../../lib/Definer";
import assert from "assert";
import MemberApiService from "../../apiServices/memberApiService";
import { verifiedMemberdata } from "../../apiServices/verify";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import { useNavigate } from "react-router-dom";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function TargetArticles(props: any) {
  /** Initialization */
  const [expanded, setExpanded] = React.useState(false);
  const { targetBoArticles } = props;
  const refs: any = useRef([]);
  const navigate = useNavigate();
  const setArticleRebuild = props.setArticleRebuild;
  /** Handlers */
  const targetLikeHandler = async (e: any) => {
    try {
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
  const handleExpandClick = (id: string) => {};
  return (
    <Stack>
      <Stack className="bo_articles_container" flexDirection={"row"}>
        {targetBoArticles.map((article: BoArticle) => {
          const art_image_url = article?.art_image
            ? `${serverApi}/${article.art_image}`
            : "/auth/gallery.png";
          const auth_image = article?.member_data?.mb_image
            ? `${serverApi}/${article?.member_data.mb_image}`
            : "/auth/author_default.jpeg";
          return (
            <Card
              onClick={() =>
                navigate(
                  `/member-page/other?mb_id=${article?.mb_id}&art_id=${article?._id}`
                )
              }
              sx={{ maxWidth: 345 }}
              className="target_articles_container"
            >
              <CardHeader
                className="author_info"
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={article?.art_subject}
                subheader={moment(article.createdAt).format("YY-MM-DD HH:mm")}
              />
              <CardMedia
                component="img"
                height="194"
                image={art_image_url}
                alt="Paella dish"
              />
              <CardContent>
                <Stack flexDirection={"row"} alignItems={"center"} mb={3}>
                  <img
                    src={auth_image}
                    alt=""
                    style={{
                      width: "39px",
                      height: "39px",
                      objectFit: "cover",
                      borderRadius: "19px",
                      marginRight: "15px",
                    }}
                  />
                  <Typography variant="h5" color="text.secondary">
                    By @{article?.member_data?.mb_nick}
                  </Typography>
                </Stack>

                <Typography variant="h6" color="text.secondary">
                  #{article?.bo_id}
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <IconButton aria-label="add to favorites">
                  <CheckBox
                    onClick={targetLikeHandler}
                    icon={<FavoriteBorder style={{ color: "#000" }} />}
                    id={article?._id}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    // onClick={}
                    checked={
                      article?.me_liked && article?.me_liked[0]?.my_favorite
                        ? true
                        : false
                    }
                  />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <ExpandMore
                  expand={expanded}
                  id={article?._id}
                  onClick={() => handleExpandClick(article?._id)}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="h6" color="text.secondary" paragraph>
                    {article?.art_content}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          );
        })}
      </Stack>
    </Stack>
  );
}
