import React, { useRef } from "react";
import { Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";

// Redux
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopBrands } from "./selector";
import { useNavigate } from "react-router-dom";
import { serverApi } from "../../lib/config";
/** Redux Selector*/
const topBrandsRetriever = createSelector(retrieveTopBrands, (topBrands) => ({
  topBrands,
}));

export const Categories = () => {
  /** Initialization */
  const { topBrands } = useSelector(topBrandsRetriever);
  console.log("topBrands::::::", topBrands);
  const refs: any = useRef([]);
  const navigate = useNavigate();

  /** Handlers */

  const chosenRestaurantHandler = (id: string) => {
    navigate(`/products/${id}`);
  };

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
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation]}
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
            {topBrands.map((brand) => {
              const image_path = `${serverApi}/${brand.mb_image}`;
              return (
                <SwiperSlide
                  key={brand?._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/products")}
                >
                  <Stack
                    flexDirection={"column"}
                    sx={{
                      background: "#ADD8E6",
                      borderRadius: "19px",
                      boxShadow:
                        "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
                    }}
                  >
                    <img
                      src={image_path}
                      alt=""
                      style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "100px",
                        marginBottom: "15px",
                        objectFit: "cover",
                      }}
                    />
                    <span>{brand?.mb_nick}</span>
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
