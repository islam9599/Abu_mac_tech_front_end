import React, { useEffect, useState } from "react";
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
import {
  Box,
  Checkbox,
  Container,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import "../../../css/home.css";
import { Product } from "../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";

// Redux

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setSaleProducts } from "./slice";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveSaleProducts } from "./selector";
import { verifiedMemberdata } from "../../apiServices/verify";
import { serverApi } from "../../lib/config";
import { useNavigate } from "react-router-dom";

/** Redux Slice */

const actionDispatch = (dispatch: Dispatch) => ({
  setSaleProducts: (data: Product[]) => dispatch(setSaleProducts(data)),
});

/** Redux Selector*/
const saleProductsRetriever = createSelector(
  retrieveSaleProducts,
  (saleProducts) => ({
    saleProducts,
  })
);

const DiscountProducts = (props: any) => {
  /** Initialization */

  const { setSaleProducts } = actionDispatch(useDispatch());
  const { saleProducts } = useSelector(saleProductsRetriever);
  console.log("saleProducts::::::selector!!!", saleProducts);
  const [count, setCount] = useState(0);
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  const navigate = useNavigate();
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  useEffect(() => {
    const shopApiService = new ProductApiService();
    shopApiService
      .getSaleProducts()
      .then((data) => {
        setSaleProducts(data);
      })
      .catch((err) => console.log(err));
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
  const handleMouseEnter = (product_id: string) => {
    setHoveredProductId(product_id);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  return (
    <div>
      <Stack
        maxWidth={"100%"}
        height={"auto"}
        flexWrap={"wrap"}
        alignItems={"center"}
        mt={"100px"}
        justifyContent={"center"}
      >
        <Typography variant="h2" fontWeight={"bold"}>
          Hot Sale
        </Typography>
        <Stack
          maxWidth={"100%"}
          flexWrap={"wrap"}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {saleProducts.map((product: Product) => {
            const image_path = `${serverApi}/${product.product_images[0]}`;

            return (
              <div
                key={product._id}
                className="productList"
                onClick={() => {
                  navigate(`/products/${product?._id}`);
                }}
              >
                <div className="productCard">
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
                    className="icon-container"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <ShoppingCartRounded
                      className={"productCard__cart"}
                      sx={{
                        width: { xs: "12px", lg: "29px" },
                        height: { xs: "12px", lg: "24px" },
                      }}
                      onClick={(e) => {
                        props.onAdd(product);
                        e.stopPropagation();
                      }}
                    />
                    <BookmarkBorder
                      className="productCard__wishlist"
                      sx={{
                        display: { xs: "none", lg: "flex" },
                        width: { xs: "12px", lg: "29px" },
                        height: { xs: "12px", lg: "24px" },
                      }}
                    />
                    <Checkbox
                      sx={{ display: { xs: "none", lg: "flex" } }}
                      className={"productCard__cart"}
                      onClick={targetLikeProduct}
                      icon={
                        <FavoriteBorder
                          sx={{
                            width: { xs: "10px", lg: "29px" },
                            height: { xs: "8px", lg: "24px" },
                          }}
                        />
                      }
                      id={product._id}
                      checkedIcon={
                        <Favorite
                          sx={{
                            width: { xs: "10px", lg: "29px" },
                            height: { xs: "8px", lg: "24px" },
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
                    <Favorite
                      sx={{
                        display: { sx: "flex", lg: "none" },
                        width: "12px",
                        height: "12px",
                      }}
                    />
                  </Stack>
                  <img
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
                    <h3 className="productName">{product.product_name}</h3>
                    <Stack
                      width={"100%"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <h2
                        className="product_discount"
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
                      <h2 className="product_discount">
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

                    <div className="displayStack__1">
                      <Stack flexDirection={"row"} alignItems={"center"}>
                        <RemoveRedEye
                          sx={{
                            width: "16px",
                            height: "16px",
                          }}
                          className="icon_container"
                        />
                        <h2
                          className="product_count"
                          style={{ marginLeft: "5px" }}
                        >
                          {product?.product_views}
                        </h2>
                      </Stack>
                      <div className="productSales">
                        <p>{product.product_left_cnt} units left</p>
                      </div>
                    </div>
                    <Stack
                      className="displayStack__2"
                      sx={{
                        display: { xs: "none", lg: "flex" },
                        flexDirection: "row",
                      }}
                    >
                      <div className="productRating">
                        <Rating
                          sx={{ width: "70%" }}
                          className="half_rating"
                          defaultValue={4.5}
                          precision={0.5}
                          readOnly
                        />{" "}
                      </div>
                      <p className="productSales">
                        {product?.product_likes} likes
                      </p>
                    </Stack>
                  </div>
                </div>
              </div>
            );
          })}
        </Stack>
      </Stack>
    </div>
  );
};

export default DiscountProducts;
