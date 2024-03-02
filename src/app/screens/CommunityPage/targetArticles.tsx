import React from "react";
import { Box, Link, Stack } from "@mui/material";
import { Favorite, Person, RemoveRedEye } from "@mui/icons-material";

export function TargetArticles(props: any) {
  return (
    <Stack>
      <Stack className="bo_articles_container" flexDirection={"row"}>
        {props.targetBoArticles.map((artciles: any, index: string) => {
          return (
            <Link className="target_articles_container">
              <Stack
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box>
                  <img
                    className="user_img"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkt4Kj0wBAcuPzs8HxRYPR3xFqd03u3JuEXw&usqp=CAU"
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
                  <Box className="author_info">
                    <Person sx={{ color: "#000" }} />
                    <span>@nurse</span>
                  </Box>
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
          );
        })}
      </Stack>
    </Stack>
  );
}
