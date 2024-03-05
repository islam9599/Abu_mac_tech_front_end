import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  BookmarkBorder,
  Favorite,
  FavoriteBorder,
  RemoveRedEye,
  ShoppingCartRounded,
} from "@mui/icons-material";
import { Checkbox, Rating, Stack } from "@mui/material";
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
} from "../../lib/sweetAlert";
import assert from "assert";
/** Redux Selector*/
const setAllProductsRetriever = createSelector(
  retrieveAllProducts,
  (allProducts) => ({
    allProducts,
  })
);

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
                  <Stack position={"relative"}>
                    <h2
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "30px",
                      }}
                    >
                      {product?.product_likes}
                    </h2>
                    <Checkbox
                      className={"productCard__cart"}
                      onClick={targetLikeProduct}
                      icon={
                        <FavoriteBorder
                          sx={{ width: "29px", height: "24px" }}
                        />
                      }
                      id={product._id}
                      checkedIcon={
                        <Favorite
                          style={{
                            width: "29px",
                            height: "24px",
                            color: "red",
                          }}
                        />
                      }
                      checked={
                        product?.me_liked && product?.me_liked[0]?.my_favorite
                          ? true
                          : false
                      }
                    />
                  </Stack>
                </Stack>
                <img
                  src={image_path}
                  alt="product-img"
                  className="productImage"
                ></img>
                <div className="productCard__content">
                  <h3 className="productName">{product?.product_name}</h3>

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
