import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../../css/home.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import required modules
import { Container, Stack } from "@mui/system";
import { Box } from "@mui/material";
import { Favorite, RemoveRedEye } from "@mui/icons-material";

export const NewArrivals = () => {
  return (
    <Container>
      <Stack>
        <Typography color={"#000"} variant="h3">
          New Arrivals
        </Typography>
        <Stack flexDirection={"row"}>
          {Array.from(Array(4).keys()).map((index) => {
            return (
              <Card key={index} sx={{ maxWidth: 300, m: 3 }}>
                <CardMedia
                  sx={{
                    paddingTop: "35px",
                    boxShadow: "revert-layer",
                  }}
                  component="img"
                  alt="green iguana"
                  height="300"
                  image="https://9to5mac.com/wp-content/uploads/sites/6/2020/11/apple-november-event.jpeg?quality=82&strip=all&w=1424"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    color={"InfoText"}
                    marginBottom={"10px"}
                  >
                    MacBook Pro 16 inch
                  </Typography>
                  <Stack flexDirection={"row"} justifyContent={"space-between"}>
                    <RemoveRedEye />
                    <Favorite />
                  </Stack>
                </CardContent>
                <CardActions>
                  <Stack
                    width={"100%"}
                    height={"auto"}
                    flexDirection={"row"}
                    alignContent={"baseline"}
                    justifyContent={"space-between"}
                  >
                    <Button size="small" variant="contained" color="primary">
                      Share
                    </Button>
                    <Button size="small" variant="contained" color="primary">
                      Learn More
                    </Button>
                  </Stack>
                </CardActions>
              </Card>
            );
          })}
        </Stack>
      </Stack>
    </Container>
  );
};
