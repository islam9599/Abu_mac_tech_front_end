import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ArrowBack,
  ArrowForward,
  Bookmark,
  BookmarkBorder,
  Favorite,
  FavoriteBorder,
  RemoveRedEye,
  ShoppingCart,
  ShoppingCartRounded,
} from "@mui/icons-material";
import { Checkbox, Container, Rating, Stack } from "@mui/material";
import "../../../css/home.css";
import { useNavigate } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveAllProducts } from "./selector";
import { useSelector } from "react-redux";
import { Product } from "../../types/product";
import { serverApi } from "../../lib/config";
import { verifiedMemberdata } from "../../apiServices/verify";
import { Definer } from "../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
  sweetTopSuccessAlert,
} from "../../lib/sweetAlert";
import assert from "assert";
/** Redux Selector*/
const setAllProductsRetriever = createSelector(
  retrieveAllProducts,
  (allProducts) => ({
    allProducts,
  })
);

const productData: any = [
  {
    id: 1,
    name: "Macbook Pro 16 inch M3 Pro",
    image:
      "https://cdn0.vox-cdn.com/hermano/verge/product/image/10207/236896_MacBook_Pro_16_M3_AKrales_0641.jpg",
    productType: "openBackHeadphones",
    price: 2999,
    rating: 5,
    timeLeft: 27,
    totalSales: 7479,
  },
  {
    id: 2,
    name: "DROP + SENNHEISER PC38X GAMING HEADSET",
    image:
      "https://www.apple.com/newsroom/images/2023/10/apple-unveils-new-macbook-pro-featuring-m3-chips/article/Apple-MacBook-Pro-2up-231030_Full-Bleed-Image.jpg.large.jpg",
    productType: "openBackHeadphones",
    price: 169,
    rating: 5,
    timeLeft: 24,
    totalSales: 6898,
  },
  {
    id: 3,
    name: "MASSDROP X SENNHEISER HD 58X JUBILEE HEADPHONES",
    image:
      "https://photos5.appleinsider.com/gallery/57189-116491-16-inch-MacBook-Pro-Space-Black-xl.jpg",
    productType: "openBackHeadphones",
    price: 170,
    rating: 4,
    timeLeft: 21,
    totalSales: 6347,
  },
  {
    id: 3,
    name: "MASSDROP X SENNHEISER HD 58X JUBILEE HEADPHONES",
    image:
      "https://static1.xdaimages.com/wordpress/wp-content/uploads/wm/2023/10/space-black-macbook-pro-5.jpg",
    productType: "openBackHeadphones",
    price: 170,
    rating: 4,
    timeLeft: 21,
    totalSales: 6347,
  },
];

const ProductCard = (props: any) => {
  /** Initialization */
  const { allProducts } = useSelector(setAllProductsRetriever);
  console.log("allProducts:::::", allProducts);
  const navigate = useNavigate();

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

      props.setProductRebuild(new Date());

      await sweetTopSmallSuccessAlert("success", 700);
    } catch (err: any) {
      console.log("err: targetLikeProduct", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Stack
      width={"100%"}
      height={"auto"}
      alignItems={"center"}
      mt={"50px"}
      justifyContent={"center"}
    >
      {/* <Typography variant="h3" fontWeight={"bold"}>
            Hot Sale
          </Typography> */}
      <Stack
        width={"100%"}
        height={"auto"}
        flexDirection={"row"}
        sx={{ flexWrap: "wrap" }}
      >
        {allProducts.map((product: Product) => {
          const image_path = `${serverApi}/${product.product_images[0]}`;

          return (
            <Stack
              className="productList"
              onClick={() => {
                navigate(`/products/${product?._id}`);
              }}
            >
              <div
                key={product?._id}
                className="productCard"
                style={{
                  width: "250px",
                  height: "auto",
                  flex: "1 0 10rem",
                }}
              >
                <Stack
                  flexDirection={"row"}
                  alignContent={"center"}
                  className="icon-container"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <ShoppingCartRounded
                    className={"productCard__cart"}
                    sx={{ width: "29px", height: "24px" }}
                  />
                  <BookmarkBorder
                    className={"productCard__wishlist"}
                    sx={{ width: "29px", height: "24px", bottom: "25px" }}
                  />
                  <Checkbox
                    className={"productCard__cart"}
                    onClick={targetLikeProduct}
                    icon={
                      <FavoriteBorder sx={{ width: "29px", height: "24px" }} />
                    }
                    id={product._id}
                    checkedIcon={
                      <Favorite
                        style={{ width: "29px", height: "24px", color: "red" }}
                      />
                    }
                    checked={
                      product?.me_liked && product?.me_liked[0]?.my_favorite
                        ? true
                        : false
                    }
                  />
                </Stack>
                <img
                  src={image_path}
                  alt="product-img"
                  className="productImage"
                ></img>
                <div className="productCard__content">
                  <h3 className="productName">{product?.product_name}</h3>
                  <Stack
                    width={"100%"}
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <h2 style={{ color: "red" }}>
                      {product?.product_discount}%
                    </h2>
                    <h2>{product?.product_price}</h2>
                  </Stack>
                  <div className="displayStack__1">
                    <div className="productPrice">
                      ${product?.product_price}
                    </div>
                    <Stack
                      width={"30px"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <h2>{product?.product_views}</h2>

                      <RemoveRedEye
                        className="icon-container"
                        style={{
                          width: "19px",
                          height: "19px",
                          cursor: "pointer",
                        }}
                      />
                    </Stack>
                  </div>
                  <div className="displayStack__2">
                    <div className="productRating">
                      <Rating
                        className="half_rating"
                        defaultValue={3.5}
                        precision={0.5}
                      />
                    </div>
                    <div className="productTime">29 days left</div>
                  </div>
                </div>
              </div>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default ProductCard;
