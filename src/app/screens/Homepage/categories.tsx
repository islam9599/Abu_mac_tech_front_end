import { Container, Stack } from "@mui/material";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export const Categories = () => {
  return (
    <div>
      <Container>
        <Stack alignItems={"center"} marginTop="50px">
          <h1>Top Brands</h1>
          <Swiper
            style={{ width: "70%", height: "auto", marginTop: "50px" }}
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation]}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            className="mySwiper"
          >
            {Array.from(Array(8).keys()).map((index) => {
              return (
                <SwiperSlide
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Stack flexDirection={"column"}>
                    <img
                      src="https://www.macworld.com/wp-content/uploads/2023/12/apple-mac-event-invites.jpg?quality=50&strip=all"
                      alt=""
                      style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "100px",
                        marginBottom: "15px",
                        objectFit: "cover",
                      }}
                    />
                    <span>Apple</span>
                  </Stack>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
      </Container>
    </div>
  );
};

export default function App() {
  return <></>;
}
