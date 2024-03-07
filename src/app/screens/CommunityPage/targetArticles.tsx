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
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Stack>
      <Stack className="bo_articles_container" flexDirection={"row"}>
        {props.targetBoArticles.map((article: BoArticle) => {
          const art_image_url = article?.art_image
            ? `${serverApi}/${article.art_image}`
            : "/auth/gallery.png";
          const auth_image = article?.member_data?.mb_image
            ? `${serverApi}/${article?.member_data.mb_image}`
            : "/auth/author_default.jpeg";
          return (
            <Card sx={{ maxWidth: 345 }} className="target_articles_container">
              <CardHeader
                className="author_info "
                avatar={
                  <Avatar
                    src={auth_image}
                    // sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                  >
                    {art_image_url}
                  </Avatar>
                }
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
                <Typography variant="h5" color="text.secondary">
                  By {article?.member_data?.mb_nick}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  #{article?.bo_id}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
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
                  /*@ts-ignore */
                  id={article?._id}
                  onClick={handleExpandClick}
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
            // <Link className="target_articles_container" key={article._id}>
            //   <Stack
            //     flexDirection={"column"}
            //     justifyContent={"center"}
            //     alignItems={"center"}
            //   >
            //     <Box>
            //       <img className="user_img" src={art_image_url} alt="" />
            //     </Box>
            //     <Stack
            //       flexDirection={"column"}
            //       width={"90%"}
            //       height={"auto"}
            //       marginLeft={"15px"}
            //       marginTop={"15px"}
            //     >
            //       <Box className="author_info">
            //         <img
            //           src={auth_image}
            //           style={{ width: "29px", height: "29px" }}
            //           alt=""
            //         />
            //         <span>{article?.member_data?.mb_nick}</span>
            //       </Box>
            //       <Box className="article_desc">
            //         <span>#{article?.bo_id}</span>
            //       </Box>
            //       <Box className="article_desc">
            //         <span>{article?.art_subject}</span>
            //       </Box>
            //       <Stack className="article_date">
            //         <p>{moment(article.createdAt).format("YY-MM-DD HH:mm")}</p>
            //         <CheckBox
            //           onClick={targetLikeHandler}
            //           icon={<FavoriteBorder style={{ color: "#000" }} />}
            //           id={article?._id}
            //           checkedIcon={<Favorite style={{ color: "red" }} />}
            //           // onClick={}
            //           checked={
            //             article?.me_liked && article?.me_liked[0]?.my_favorite
            //               ? true
            //               : false
            //           }
            //         />

            //         <p>{article?.art_likes}</p>
            //         <RemoveRedEye />
            //         <p>{article?.art_views}</p>
            //       </Stack>
            //     </Stack>
            //   </Stack>
            // </Link>
          );
        })}
      </Stack>
    </Stack>
  );
}
