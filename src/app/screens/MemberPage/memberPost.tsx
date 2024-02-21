import { Favorite, RemoveRedEye } from "@mui/icons-material";
import { Box, Link, Stack, Typography } from "@mui/material";
import React from "react";

export function MemberPosts(props: any) {
  return (
    <Stack width={"700px"}>
      <Stack
        style={{
          overflow: "scroll",
          width: "100%",
          height: "600px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginLeft: "50px",
        }}
      >
        {Array.from(Array(2).keys()).map(() => {
          return (
            <Stack className="my_article_wrapper">
              <Link className="target_articles_container">
                <Stack flexDirection={"column"}>
                  <Box>
                    <img
                      className="user_img"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMSTU6ahTqAaZ-xvdFtzfMejKCmwKq7B2wKA&usqp=CAU"
                      alt=""
                    />
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
                      <img src="/icons/author_default.svg" alt="" />
                      <Typography color={"#000"} fontWeight={"bold"}>
                        @nurse
                      </Typography>
                    </Stack>
                    <Box className="article_desc">
                      <span>Kebuli Rice with tomatoes s...</span>
                    </Box>
                    <Stack className="article_date">
                      <p>23-11-23 19:46</p>
                      <Favorite />
                      <p>1</p>
                      <RemoveRedEye />
                      <p>2</p>
                    </Stack>
                  </Stack>
                </Stack>
              </Link>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
