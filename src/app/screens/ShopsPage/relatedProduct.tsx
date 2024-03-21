import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  BookmarkBorder,
  Favorite,
  FavoriteBorder,
  RemoveRedEye,
  ShoppingCartRounded,
  Star,
} from "@mui/icons-material";
import { Box, Checkbox, Rating, Stack } from "@mui/material";
import "../../../css/home.css";
import { useNavigate } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveAllProducts, retrieveProductsByPrice } from "./selector";
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
const setProductsByPriceRetriever = createSelector(
  retrieveProductsByPrice,
  (productByPrice) => ({
    productByPrice,
  })
);

const RelatedProducts = (props: any) => {
  /** Initialization */

  const { allProducts } = useSelector(setAllProductsRetriever);
  const { productByPrice } = useSelector(setProductsByPriceRetriever);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
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
  const handleMouseEnter = (product_id: string) => {
    setHoveredProductId(product_id);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
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
        {props.relatedProducts.slice(0, 8)?.map((product: Product) => {
          return (
            <Stack
              className="productList"
              onClick={() => {
                navigate(`/products/${product?._id}`);
              }}
              m={1}
              key={product?._id}
            >
              <div
                className="productCard"
                style={{
                  width: "280px",
                  height: "auto",
                  flex: "1 0 10rem",
                  margin: "20px",
                }}
              >
                <Box
                  className="product_discount_wrapper"
                  style={
                    !product?.product_discount
                      ? { display: "none", textDecoration: "none" }
                      : {
                          background: "#129cb8",
                          zIndex: "9999",
                          borderRadius: "0 9px 9px 0px",
                        }
                  }
                >
                  <h2>{product?.product_discount}% off</h2>
                </Box>
                <Stack
                  flexDirection={"row"}
                  alignContent={"center"}
                  className="icon-container"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <ShoppingCartRounded
                    onClick={(e) => {
                      props.onAdd(product);
                      e.stopPropagation();
                    }}
                    className={"productCard__cart"}
                    sx={{ width: "29px", height: "24px" }}
                  />

                  <Stack position={"relative"}>
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
                  id={product?._id}
                  onMouseEnter={() => handleMouseEnter(product?._id)}
                  onMouseLeave={handleMouseLeave}
                  src={
                    hoveredProductId === product?._id &&
                    product?.product_images.length > 1
                      ? `${serverApi}/${product.product_images[1]}`
                      : `${serverApi}/${product.product_images[0]}`
                  }
                  alt="product-img"
                  className="productImage"
                ></img>
                <div className="productCard__content">
                  <h3 className="productName">{product?.product_name}</h3>

                  <div className="displayStack__1">
                    <Stack flexDirection={"row"}>
                      <h2
                        className="productPrice"
                        style={
                          !product?.product_discount
                            ? { display: "none", textDecoration: "none" }
                            : {
                                textDecoration: "line-through",
                                color: "red",
                                marginRight: "10px",
                              }
                        }
                      >
                        ${product?.product_price}
                      </h2>
                      <h2 className="productPrice">
                        $
                        {product?.product_discount
                          ? Math.round(
                              product?.product_price -
                                product?.product_price /
                                  product?.product_discount
                            )
                          : product?.product_price}
                      </h2>
                    </Stack>

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
                      <Star sx={{ color: "gold" }} />
                      <Star sx={{ color: "gold" }} />
                      <Star sx={{ color: "gold" }} />
                      <Star sx={{ color: "gold" }} />
                      <Star />
                    </div>
                    <div className="productTime">
                      {product?.product_likes} likes
                    </div>
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

export default RelatedProducts;
