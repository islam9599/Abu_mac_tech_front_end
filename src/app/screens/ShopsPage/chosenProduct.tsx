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
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ImageGallery from "react-image-gallery";
import ReactImageMagnify from "react-image-magnify";

import {
  Cancel,
  Favorite,
  FavoriteBorder,
  Home,
  RemoveRedEye,
  Search,
} from "@mui/icons-material";
import Marginer from "../../component/marginer";

import assert from "assert";
import Card from "../../component/cards";
import ProductCard from "./productCards";
// Redux

import { useDispatch } from "react-redux";
import { Dispatch, original } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveChosenProduct, retrieveProductsByBrand } from "./selector";
import { verifiedMemberdata } from "../../apiServices/verify";

import { ProductSearchObj } from "../../types/other";
import { setAllProducts, setChosenProduct, setProductsByBrand } from "./slice";
import { Product } from "../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import { useEffect, useState } from "react";
import { serverApi } from "../../lib/config";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import { Definer } from "../../lib/Definer";

/** Redux Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});
/** Redux Selector*/
const setAllProductsRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);
const setProductsByBrandRetriever = createSelector(
  retrieveProductsByBrand,
  (productsByBrand) => ({
    productsByBrand,
  })
);

export const ChosenProduct = (props: any) => {
  /** Initialization */
  const { setChosenProduct } = actionDispatch(useDispatch());

  const { chosenProduct } = useSelector(setAllProductsRetriever);
  console.log("chosenProduct", chosenProduct);

  let { product_id } = useParams<{ product_id: string }>();
  console.log("product_id::::::::::", product_id);
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  const navigate = useNavigate();
  const changeToAllProductsHandler = () => {
    navigate("/products");
  };
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const images = [
    {
      original: `${serverApi}/${chosenProduct?.product_images[1]}`,
      thumbnail: `${serverApi}/${chosenProduct?.product_images[1]}`,
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
  const chosenProductRelatedProcess = async () => {
    try {
      const productService = new ProductApiService();
      const product: Product = await productService.getChosenProduct(
        product_id
      );
      setChosenProduct(product);
    } catch (err) {
      console.log("dishRelatedProcess: err", err);
    }
  };
  useEffect(() => {
    chosenProductRelatedProcess().then();
  }, [productRebuild]);

  /** Handlers */

  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(verifiedMemberdata, Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);

      setProductRebuild(new Date());

      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("err: targetLikeProduct", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="chosen_product">
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Stack>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            m={"50px"}
          >
            <form
              action=""
              style={{
                width: "530px",
                height: "45px",
                border: "1px solid #129cb8",
                borderRadius: "9px",
                display: "flex",
                alignItems: "center",
                background: "none",
                color: "#fff",
              }}
            >
              <input
                type="text"
                placeholder="Search product here"
                style={{
                  width: "100%",
                  height: "100%",
                  margin: "5px",
                  background: "none",
                  border: "none",
                  outline: "none",
                }}
              />
              <Box
                width={"auto"}
                height={"100%"}
                sx={{ bgcolor: "#129cb8", borderRadius: "0 9px 9px 0" }}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Search
                  sx={{
                    width: "100%",
                    height: "99%",
                    color: "#fff",
                    padding: "5px",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </form>
          </Stack>
          <Marginer direction="horizontal" width="1320" height="1" bg="#999" />
        </Stack>
        <Stack
          className="navigate_home_wrapper"
          flexDirection={"row"}
          alignItems={"center"}
        >
          <Home className="navigate_home navigate_home_icon" />
          <Typography className="navigate_home" variant="h6">
            Home
          </Typography>
          <Marginer width="1" height="15" bg="#000" direction="vertical" />
          <Typography className="navigate_home" variant="h6">
            Products
          </Typography>
          <Marginer width="1" height="15" bg="#000" direction="vertical" />
          <Typography variant="h6">Product</Typography>
          <Cancel
            sx={{ width: "10px", height: "10px" }}
            className="navigate_home navigate_home_icon"
            onClick={() => {
              navigate("/products");
            }}
          />
        </Stack>
        <Box className="product_container">
          <Stack mt={10} width={"39%"} height={"100%"}>
            {/* <ImageGallery items={images} /> */}

            {/* {chosenProduct?.product_images.map((image) => {
              return (
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: false,
                      width: 200,
                      height: 200,
                      src: `${serverApi}/${image}`,
                    },
                    largeImage: {
                      src: `${serverApi}/${image}`,
                      width: 400,
                      height: 400,
                    },
                  }}
                />
              );
            })} */}
            <Swiper
              loop={true}
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Thumbs]}
              className="mySwiper2"
            >
              {chosenProduct?.product_images.map((product_image: string) => {
                const image_path = `${serverApi}/${product_image}`;
                return (
                  <SwiperSlide>
                    <ReactImageMagnify
                      className="swiper_second_slider"
                      {...{
                        smallImage: {
                          alt: "",
                          isFluidWidth: false,
                          width: 500,
                          height: 500,
                          src: `${serverApi}/${product_image}`,
                        },
                        largeImage: {
                          src: `${serverApi}/${product_image}`,
                          width: 600,
                          height: 800,
                        },
                      }}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={2}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {chosenProduct?.product_images.map((product_image: string) => {
                const image_path = `${serverApi}/${product_image}`;
                return (
                  <SwiperSlide>
                    <img src={image_path} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>

          <Stack mt={10} className="chosen_product_info_container">
            <Box className="chosen_product_wrapper">
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <strong className="product_name">
                  {chosenProduct?.product_name}{" "}
                </strong>{" "}
                <Checkbox
                  // {...label}
                  id={chosenProduct?._id}
                  onClick={targetLikeProduct}
                  icon={
                    <FavoriteBorder
                      style={{
                        color: "#000",
                        width: "29px",
                        height: "29px",
                      }}
                    />
                  }
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
                    chosenProduct?.me_liked &&
                    chosenProduct.me_liked[0]?.my_favorite
                      ? true
                      : false
                  }
                />
              </Stack>

              <h2 className="product_brand">
                By {chosenProduct?.product_brand.toLocaleUpperCase()} Company
              </h2>
              <Box className="rating_box">
                <Rating
                  className="half_rating"
                  defaultValue={3.5}
                  precision={0.5}
                />
                <div className="evaluation_box">
                  <span>{chosenProduct?.product_views}</span>
                  <RemoveRedEye
                    style={{
                      width: "19px",
                      height: "19px",
                      marginLeft: "10px",
                    }}
                  />
                </div>
              </Box>
              <Stack flexDirection={"column"} margin={"10px 0px"}>
                <p className="product_desc_info">
                  {chosenProduct?.product_description
                    ? chosenProduct?.product_description
                    : "No description!!!"}
                  {chosenProduct?.product_memory} Memory
                </p>
                <p className="product_desc_info">
                  {/* {chosenProduct?.product_description
                ? chosenProduct?.product_description
                : "No description!!!"} */}
                  {chosenProduct?.product_storage
                    ? chosenProduct?.product_storage + "Gb SSD"
                    : "No storage information avalaible"}
                </p>
              </Stack>

              <Marginer
                direction="horizontal"
                height="1"
                width="100%"
                bg="#000"
              />
              <div className="dish_price_box">
                <span>Price</span>
                <span>${chosenProduct?.product_price}</span>
              </div>
              <div className="btn_box">
                <Button
                  variant="contained"
                  onClick={(e) => {
                    props.onAdd(chosenProduct);
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </Box>
          </Stack>
        </Box>

        <Stack
          height={"auto"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h2">Related Products</Typography>
          <Stack flexDirection={"row"} width={"100%"} justifyContent={"center"}>
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
