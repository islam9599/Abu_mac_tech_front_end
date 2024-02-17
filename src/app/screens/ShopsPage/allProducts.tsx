import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardOverflow,
  IconButton,
  AspectRatio,
  Link,
  CssVarsProvider,
} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { Box, Button, Container, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Call, Favorite, LocationOnRounded, Search } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import assert from "assert";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";

/** Redux Slice */

export function AllProducts() {
  /** Initialization */
  const navigate = useNavigate();

  /** Handlers */
  const chosenProductHandler = () => {
    navigate("/products/:product_id");
  };
  const changePhones = () => {
    navigate("/products/phones");
  };
  return (
    <div className="all_products">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className={"fit_search_box"} justifyContent={"center"}>
            <Box className={"fit_box"}>
              <a>All Products</a>
              <a>Laptop</a>
              <a onClick={changePhones}>Phones</a>
              <a>Etc</a>
            </Box>

            {/* <Box className={"search_big_box"}>
              <form className={"search_form"} action="">
                <input
                  type={"search"}
                  className={"search_input"}
                  name={"resSearch"}
                  placeholder="qidiruv"
                />
                <Button
                  className="button_search"
                  variant="contained"
                  endIcon={<Search />}
                >
                  Izlash
                </Button>
              </form>
            </Box> */}
          </Box>
          <Stack className={"all_res_box"}>
            <CssVarsProvider>
              {Array.from(Array(8).keys()).map((ele) => {
                return (
                  <Card
                    onClick={chosenProductHandler}
                    variant="outlined"
                    sx={{
                      minHeight: 410,
                      minWidth: 290,
                      mx: "17px",
                      my: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio={"1"}>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqilVXETBtWCtYzO7wMmjnOgC740ngulIaGQ&usqp=CAU"
                          alt=""
                        />
                      </AspectRatio>

                      <IconButton
                        aria-label="Like minimal phtography"
                        size="md"
                        variant="solid"
                        color="neutral"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        sx={{
                          position: "absolute",
                          zIndex: 2,
                          borderRadius: "50%",
                          right: "1rem",
                          bottom: 0,
                          transform: "translateY(50%)",
                          color: "rgba(0,0,0,.4)",
                        }}
                      >
                        <Favorite
                        //   style={{
                        //     fill:
                        //       ele?.me_liked && ele?.me_liked[0]?.my_favorite
                        //         ? "red"
                        //         : "white",
                        //   }}
                        />
                      </IconButton>
                    </CardOverflow>
                    <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                      Apple
                    </Typography>
                    <span
                      style={{
                        width: "200px",
                        marginTop: 0.5,
                        marginBottom: 2,
                      }}
                    >
                      <Link
                        href=""
                        startDecorator={<LocationOnRounded />}
                        textColor={"rgba(56, 55, 55, 0.90);"}
                      >
                        Salom kuyluk A uy
                      </Link>
                    </span>
                    <Typography textColor="neutral.300">
                      <Link
                        href=""
                        startDecorator={<Call />}
                        textColor={"rgba(56, 55, 55, 0.90);"}
                      >
                        01023088288
                      </Link>
                    </Typography>
                    <CardOverflow
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1.5,
                        py: 1.5,
                        px: "var(--Card-padding)",
                        borderTop: "1px solid",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "md",
                          color: "rgba(56, 55, 55, 0.90);",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {/* {ele.mb_views} */} 200
                        <VisibilityIcon
                          sx={{ fontSize: 20, marginLeft: "5px" }}
                        />
                      </Typography>
                      <Box sx={{ width: 2, bgcolor: "divider" }}></Box>
                      <Typography
                        sx={{
                          fontSize: "md",
                          color: "rgba(56, 55, 55, 0.90);",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {/* <div
                          ref={(element) => (refs.current[ele._id] = element)}
                        >
                          {ele.mb_likes}
                        </div> */}
                        <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                      </Typography>
                    </CardOverflow>
                  </Card>
                );
              })}
            </CssVarsProvider>
          </Stack>

          <Stack className="bottom_box">
            <img
              className="line_img_left"
              src={"/icons/line_group.svg"}
              alt=""
            />
            <Pagination
              //   count={targetSearchObj.page >= 3 ? targetSearchObj.page + 1 : 3}
              //   page={targetSearchObj.page}
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
              //   onChange={handlePaginationChange}
            />

            <img
              className="line_img_right"
              src={"/icons/line_group.svg"}
              alt=""
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
