import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
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
import ProductCard from "./productCards";
// Redux

import { useDispatch } from "react-redux";
import { Dispatch, original } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  retrieveAllProducts,
  retrieveChosenProduct,
  retrieveProductReviews,
  retrieveProductsByPrice,
} from "./selector";
import { verifiedMemberdata } from "../../apiServices/verify";

import { setAllProducts, setChosenProduct, setProductReviews } from "./slice";
import { Product } from "../../types/product";
import ProductApiService from "../../apiServices/productApiService";

import { serverApi } from "../../lib/config";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import { Definer } from "../../lib/Definer";
import {
  CreateReviewData,
  ReviewSearchObj,
  Reviews,
} from "../../types/reviewProduct";
import ReviewProductApiService from "../../apiServices/reviewProduct";
import moment from "moment";
import { ProductSearchObj } from "../../types/other";

/** Redux Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setProductReviews: (data: Reviews[]) => dispatch(setProductReviews(data)),
});
/** Redux Selector*/
const setChosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);
const setAllProductsRetriever = createSelector(
  retrieveAllProducts,
  (allProducts) => ({
    allProducts,
  })
);
const setProductReviewsRetriever = createSelector(
  retrieveProductReviews,
  (productReviews) => ({
    productReviews,
  })
);

export const ChosenProduct = (props: any) => {
  /** Initialization */
  const { setChosenProduct, setProductReviews } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(setChosenProductRetriever);
  const { productReviews } = useSelector(setProductReviewsRetriever);
  const { allProducts } = useSelector(setAllProductsRetriever);
  let { product_id } = useParams<{ product_id: string }>();
  console.log("product_id::::::::::", product_id);
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 8,
      order: "product_point",
      product_brand: "apple",
      searchText: "",
    });
  const [reviewObj, setReviewObj] = useState<ReviewSearchObj>({
    page: 1,
    limit: 3,
    review_ref_id: product_id,
  });
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  let product_comments: string = "",
    product_ratings: number = 0;
  const textInput: any = useRef(null);
  const chosenProductRelatedProcess = async () => {
    try {
      const productService = new ProductApiService();
      const product: Product = await productService.getChosenProduct(
        product_id
      );
      setChosenProduct(product);
    } catch (err) {
      console.log("chosenProductRelatedProcess: err", err);
    }
  };
  useEffect(() => {}, []);

  useEffect(() => {
    const reviewService = new ReviewProductApiService();
    reviewService
      .getChosenProductReviews({
        page: 1,
        limit: 3,
        review_ref_id: product_id,
      })
      .then((data) => setProductReviews(data))
      .catch((err) => console.log(err));
    chosenProductRelatedProcess().then();
  }, [productRebuild, product_id]);
  /** Handlers */
  const searchByText = (text: string) => {
    targetProductSearchObj.searchText = text;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  const handleProductRatings = (e: any) => {
    product_ratings = e.target.value;
    // console.log("product_ratings", product_ratings);
  };
  const handleProductComments = (e: any) => {
    product_comments = e.target.value;
    // console.log("product_comments", product_comments);
  };

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
  const getKeyHandler = (e: any) => {
    try {
      if (e.key == "Enter") {
        handleReviewRequest();
      }
    } catch (err) {
      console.log("getKeyHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  const handleReviewRequest = async () => {
    try {
      const is_fullfilled = product_comments !== "" && product_ratings !== 0;
      assert.ok(is_fullfilled, Definer.input_err1);
      if (!product_ratings || !product_comments) {
        throw new Error("Please fill in all inputs!");
      }
      textInput.current.value = "";

      const review_data: CreateReviewData = {
        review_ref_id: product_id,
        product_ratings: product_ratings,
        product_comments: product_comments,
      };

      const reviewApiService = new ReviewProductApiService();
      await reviewApiService.createReview(review_data);

      setProductRebuild(new Date());
      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div className="chosen_product">
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Stack alignItems={"center"} m={5}>
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
          <Stack mt={10} width={"49%"} height={"100%"}>
            <Swiper
              loop={true}
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Thumbs]}
              className="mySwiper2"
            >
              {chosenProduct?.product_images.map(
                (product_image: string, index) => {
                  const image_path = `${serverApi}/${product_image}`;
                  return (
                    <SwiperSlide key={index} className="swiper_second_slider">
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            isFluidWidth: false,
                            width: 500,
                            height: 500,
                            src: `${serverApi}/${product_image}`,
                          },
                          largeImage: {
                            src: `${serverApi}/${product_image}`,
                            width: 1200,
                            height: 1200,
                          },
                        }}
                      />
                    </SwiperSlide>
                  );
                }
              )}
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
                  <SwiperSlide className="my">
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
                  readOnly
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
          mt={15}
        >
          <Typography variant="h2">Related Products</Typography>
          <Stack
            width={"100%"}
            height={"auto"}
            flexDirection={"row"}
            sx={{ flexWrap: "wrap" }}
          >
            <ProductCard
              setProductRebuild={setProductRebuild}
              onAdd={props.onAdd}
            />
          </Stack>
          <Typography m={"40px 0px"} variant="h3">
            Reviews about this product
          </Typography>
          {productReviews.map((review: Reviews) => {
            const image_path = review?.member_data?.mb_image
              ? `${serverApi}/${review?.member_data?.mb_image}`
              : "/home/auth.svg";

            console.log("image_path::::", image_path);
            return (
              <Stack
                width={"80%"}
                height={"150px"}
                // sx={{ background: "silver" }}
                // m={"40px 0px"}
              >
                <Stack flexDirection={"row"} m={"30px"} alignItems={"center"}>
                  <img
                    src={image_path}
                    style={{
                      width: "29px",
                      height: "29px",
                      borderRadius: "19px",
                    }}
                    alt=""
                  />
                  <Typography width={"150px"} m={"0px 10px"} variant="h5">
                    {review?.member_data.mb_nick}
                  </Typography>
                  <div className="productRating">
                    <Rating value={review?.product_rating} readOnly />
                  </div>
                  <Typography m={"0px 20px"} variant="h6">
                    {moment(review?.createdAt).format("YY-MM-DD HH:mm")}
                  </Typography>
                </Stack>
                <Stack
                  width={"100%"}
                  maxHeight={"100px"}
                  sx={{ background: "#f1f1f2", borderRadius: "9px" }}
                  mb={5}
                >
                  <h2 style={{ margin: "10px 30px" }}>
                    {review?.product_comment}
                  </h2>
                </Stack>
                <Marginer width="100%" height="0.1" bg="#000" />
              </Stack>
            );
          })}

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
                onChange={handleProductRatings}
                className="half_rating"
                defaultValue={0}
                precision={0.5}
              />
            </Stack>
            <textarea
              ref={textInput}
              onChange={handleProductComments}
              onKeyDown={getKeyHandler}
              name=""
              style={{ width: "800px", height: "100px", borderRadius: "9px" }}
            ></textarea>
            <Stack
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                sx={{ width: "15%", height: "30px", margin: "40px 0px" }}
                variant="contained"
                onClick={handleReviewRequest}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
          <Stack m={5} alignItems={"center"}>
            <Typography variant="h2">Shop Address</Typography>
            <iframe
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Equipment%20bazaar%20%E2%80%9CMalika%E2%80%9D,%2087QC+FPV,%20Little%20Ring%20Road,%20Tashkent,%20Toshkent%20Shahri,%20Uzbekistan+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              width="1320"
              height="500"
              style={{ marginTop: "60px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};
