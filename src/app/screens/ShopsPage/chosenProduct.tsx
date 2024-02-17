import { useParams } from "react-router-dom";
import { Box, Button, Checkbox, Container, Rating, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import Marginer from "../../component/marginer";

// import CheckBox from "@mui/material/CheckBox";
import assert from "assert";
import Card from "../../component/cards";
export const ChosenProduct = () => {
  const { product_id } = useParams();

  return (
    <div className="chosen_product">
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Box className="product_container">
          <Stack className="product_container chosen_product_slider">
            <Swiper
              className="product_swiper"
              loop={true}
              spaceBetween={10}
              navigation={true}
              modules={[FreeMode, Navigation, Thumbs]}
            >
              {Array.from(Array(8).keys()).map((ele) => {
                const image_path =
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzHfGhqIg84ZwMgx8m6j2iVUKh5DbK07rmKQ&usqp=CAU";
                return (
                  <SwiperSlide
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <img
                      src={image_path}
                      style={{ width: "100%", height: "100%" }}
                      alt=""
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Swiper
              loop={true}
              spaceBetween={20}
              freeMode={true}
              slidesPerView={5}
              watchSlidesProgress={true}
              centeredSlides={false}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper chosen_productswiper_second"
            >
              {Array.from(Array(8).keys()).map((ele) => {
                const image_path =
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn5BcpucsqMM007G4Cz1nSnrz_oEeMC12Dbw&usqp=CAU";
                return (
                  <SwiperSlide className="swiper_second_slider">
                    <img src={image_path} alt="" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>

          <Stack className="chosen_product_info_container">
            <Box className="chosen_product_wrapper">
              <strong className="dish_txt">Macbook Pro </strong>
              <span className="resto_name">Apple Company</span>
              <Box className="rating_box">
                <Rating
                  className="half_rating"
                  defaultValue={3.5}
                  precision={0.5}
                />
                <div className="evaluation_box">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "20px",
                    }}
                  >
                    <Checkbox
                      // {...label}
                      // id={chosenProduct?._id}
                      // onClick={targetLikeProduct}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite style={{ color: "red" }} />}
                      checked={
                        true
                        // chosenProduct?.me_liked &&
                        // chosenProduct.me_liked[0]?.my_favorite
                        //   ? true
                        //   : false
                      }
                    />
                    <span>9 ta</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <RemoveRedEye style={{ marginRight: "10px" }} />
                    <span>15 ta</span>
                  </div>
                </div>
              </Box>
              <p className="dish_desc_info">
                {/* {chosenProduct?.product_description
                ? chosenProduct?.product_description
                : "No description!!!"} */}
                Juda ajoyib design
              </p>
              <Marginer
                direction="horizontal"
                height="1"
                width="100%"
                bg="#000"
              />
              <div className="dish_price_box">
                <span>Narxi</span>
                <span>$1399</span>
              </div>
              <div className="btn_box">
                <Button
                  variant="contained"
                  // onClick={(e) => {
                  //   props.onAdd(chosenProduct);
                  // }}
                >
                  Savatga qo’shish
                </Button>
              </div>
            </Box>
          </Stack>
        </Box>

        <Stack flexDirection={"row"}>
          <Card />
          <Card />
        </Stack>
      </Container>
    </div>
  );
};
