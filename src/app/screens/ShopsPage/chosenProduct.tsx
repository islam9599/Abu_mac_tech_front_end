import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ImageGallery from "react-image-gallery";
import {
  Favorite,
  FavoriteBorder,
  Home,
  RemoveRedEye,
} from "@mui/icons-material";
import Marginer from "../../component/marginer";

// import CheckBox from "@mui/material/CheckBox";
import assert from "assert";
import Card from "../../component/cards";
import ProductCard from "./productCards";
export const ChosenProduct = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const changeToAllProductsHandler = () => {
    navigate("/products");
  };
  const images = [
    {
      original:
        "https://cdn.arstechnica.net/wp-content/uploads/2023/11/IMG_1415.jpeg",
      thumbnail:
        "https://cdn.arstechnica.net/wp-content/uploads/2023/11/IMG_1415.jpeg",
    },
    {
      original:
        "https://static1.xdaimages.com/wordpress/wp-content/uploads/wm/2023/10/space-black-macbook-pro-5.jpg",
      thumbnail:
        "https://static1.xdaimages.com/wordpress/wp-content/uploads/wm/2023/10/space-black-macbook-pro-5.jpg",
    },
    {
      original: "https://static.independent.co.uk/2023/11/06/13/Macbook-1.png",
      thumbnail: "https://static.independent.co.uk/2023/11/06/13/Macbook-1.png",
    },
  ];

  return (
    <div className="chosen_product">
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <Home sx={{ width: "29px", height: "29px" }} />
          <Typography sx={{ margin: "15px" }} variant="h4">
            Home
          </Typography>
          <Marginer width="1" height="20" bg="#000" direction="vertical" />
          <Typography sx={{ margin: "15px" }} variant="h4">
            Products
          </Typography>
          <Marginer width="1" height="20" bg="#000" direction="vertical" />
          <Typography sx={{ margin: "15px" }} variant="h4">
            Product
            <a
              href=""
              onClick={changeToAllProductsHandler}
              style={{
                textDecoration: "none",
                cursor: "pointer",
                marginLeft: "5px",
              }}
            >
              x
            </a>
          </Typography>
        </Stack>
        <Box className="product_container">
          <Stack>
            <ImageGallery items={images} />
          </Stack>

          <Stack className="chosen_product_info_container">
            <Box className="chosen_product_wrapper">
              <Stack flexDirection={"row"}>
                <strong className="product_name">Macbook Pro </strong>{" "}
                <Checkbox
                  // {...label}
                  // id={chosenProduct?._id}
                  // onClick={targetLikeProduct}
                  icon={<FavoriteBorder />}
                  checkedIcon={
                    <Favorite
                      style={{
                        color: "red",
                        width: "29px",
                        height: "29px",
                      }}
                    />
                  }
                  checked={
                    true
                    // chosenProduct?.me_liked &&
                    // chosenProduct.me_liked[0]?.my_favorite
                    //   ? true
                    //   : false
                  }
                />
              </Stack>

              <h2 className="product_brand">By Apple Company</h2>
              <Box className="rating_box">
                <Rating
                  className="half_rating"
                  defaultValue={3.5}
                  precision={0.5}
                />
                <div className="evaluation_box">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <RemoveRedEye style={{ marginRight: "10px" }} />
                    <span>15 ta</span>
                  </div>
                </div>
              </Box>
              <Stack flexDirection={"column"} margin={"10px 0px"}>
                <p className="product_desc_info">
                  {/* {chosenProduct?.product_description
                ? chosenProduct?.product_description
                : "No description!!!"} */}
                  M3 pro
                </p>
                <p className="product_desc_info">
                  {/* {chosenProduct?.product_description
                ? chosenProduct?.product_description
                : "No description!!!"} */}
                  16 gb Memory
                </p>
                <p className="product_desc_info">
                  {/* {chosenProduct?.product_description
                ? chosenProduct?.product_description
                : "No description!!!"} */}
                  512 gb SSD
                </p>
              </Stack>

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

        <Stack
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h2">Related Products</Typography>
          <Stack flexDirection={"row"} width={"90%"} justifyContent={"center"}>
            <ProductCard />
          </Stack>
          <Typography m={"40px 0px"} variant="h3">
            Reviews about this product
          </Typography>
          <Stack
            width={"80%"}
            height={"auto"}
            // sx={{ background: "silver" }}
            // m={"40px 0px"}
          >
            <Stack flexDirection={"row"} m={"30px"} alignItems={"center"}>
              <img
                src="/home/auth.svg"
                style={{ width: "29px", height: "29px" }}
                alt=""
              />
              <Typography m={"0px 10px"} variant="h5">
                Auth Name
              </Typography>
              <Rating
                className="half_rating"
                defaultValue={3.5}
                precision={0.5}
              />
              <Typography m={"0px 20px"} variant="h6">
                20 days ago
              </Typography>
            </Stack>
            <Marginer width="100%" height="1" bg="#000" />
          </Stack>
          <Stack flexDirection={"column"} m={"40px 0px"}>
            <Stack
              flexDirection={"row"}
              width={"100%"}
              height={"auto"}
              alignItems={"center"}
            >
              <Typography mr={"15px"} variant="h4">
                Leave your review
              </Typography>
              <Rating
                className="half_rating"
                defaultValue={3.5}
                precision={0.5}
              />
            </Stack>
            <textarea
              name=""
              style={{ width: "800px", height: "100px" }}
            ></textarea>
            <Stack
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                sx={{ width: "15%", height: "30px", margin: "40px 0px" }}
                variant="contained"
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};
