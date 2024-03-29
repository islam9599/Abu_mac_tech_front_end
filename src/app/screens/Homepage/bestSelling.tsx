import React, { useEffect, useState } from "react";
import {
  Stack,
  Card,
  CardMedia,
  CardContent,
  Container,
  Checkbox,
  Box,
} from "@mui/material";
import { ArrowRight, Favorite, RemoveRedEye } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import { verifiedMemberdata } from "../../apiServices/verify";
import { serverApi } from "../../lib/config";
import { ProductSearchObj } from "../../types/other";
import { setBestProducts } from "./slice";

// Redux

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveBestProducts } from "./selector";

/** Redux Slice */

const actionDispatch = (dispatch: Dispatch) => ({
  setBestProducts: (data: Product[]) => dispatch(setBestProducts(data)),
});

/** Redux Selector*/
const setBestProductsRetriever = createSelector(
  retrieveBestProducts,
  (bestProducts) => ({
    bestProducts,
  })
);

export const BestSelling = () => {
  /** Initialization */

  const { setBestProducts } = actionDispatch(useDispatch());
  const { bestProducts } = useSelector(setBestProductsRetriever);
  // console.log("bestProducts::::::selector!!!", bestProducts);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 6,
      order: "product_price",
      searchText: "",
      min_price: 0,
      max_price: 5000,
    });
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => {
        setBestProducts(data);
      })
      .catch((err) => console.log(err));
  }, [targetProductSearchObj, productRebuild]);
  /** Handlers */
  const searchCollectionHandler = (order: string) => {
    targetProductSearchObj.order = order;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  const navigate = useNavigate();
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
      <Container>
        <Stack alignItems={"center"}>
          <Stack className="best_selling_wrapper" m={5}>
            <h2
              className="best_selling_category"
              onClick={() => searchCollectionHandler("product_discount")}
            >
              Best Selling
            </h2>
            <h2
              className="best_selling_category"
              onClick={() => searchCollectionHandler("product_likes")}
            >
              Most Liked
            </h2>
            <h2
              className="best_selling_category"
              onClick={() => searchCollectionHandler("createdAt")}
            >
              New Arrivals
            </h2>
          </Stack>

          <Stack className="best_product_container">
            {/*@ts-ignore */}
            {bestProducts.map((product: Product) => {
              const image_path = `${serverApi}/${product.product_images[0]}`;

              return (
                <Card
                  className="home_card"
                  key={product?._id}
                  onClick={() => {
                    navigate(`/products/${product?._id}`);
                  }}
                >
                  <Box
                    className="product_discount_wrapper"
                    style={
                      !product?.product_discount
                        ? { display: "none", textDecoration: "none" }
                        : {
                            background: "#129cb8",

                            borderRadius: "0 9px 9px 0px",
                          }
                    }
                  >
                    <h2>{product?.product_discount}% off</h2>
                  </Box>
                  <CardMedia
                    onMouseEnter={() => handleMouseEnter(product?._id)}
                    onMouseLeave={handleMouseLeave}
                    className="card_image"
                    component="img"
                    alt="green iguana"
                    id={product?._id}
                    src={
                      hoveredProductId === product?._id &&
                      product?.product_images.length > 1
                        ? `${serverApi}/${product.product_images[1]}`
                        : `${serverApi}/${product.product_images[0]}`
                    }
                  />
                  <CardContent>
                    <h2 className="product_name">{product.product_name}</h2>
                    <Stack className="product_price_wrapper">
                      <h2 className="product_left">
                        {product?.product_left_cnt} left
                      </h2>

                      {/* <h2 className="product_price">
                        ${product?.product_price}
                      </h2> */}
                      <Stack
                        maxWidth={"100%"}
                        justifyContent={"space-between"}
                        flexDirection={"row"}
                      >
                        <span
                          className="product_price"
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
                        </span>
                        <span className="product_price">
                          $
                          {product?.product_discount
                            ? Math.round(
                                product?.product_price -
                                  product?.product_price /
                                    product?.product_discount
                              )
                            : product?.product_price}
                        </span>
                      </Stack>
                    </Stack>
                    <Stack
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <Stack
                        width={"40px"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <RemoveRedEye className="icon_container" />
                        <h2 className="product_count">
                          {product?.product_views}
                        </h2>
                      </Stack>
                      <Stack flexDirection={"row"} alignItems={"center"}>
                        <Checkbox
                          onClick={targetLikeProduct}
                          icon={<Favorite className="icon_container" />}
                          id={product._id}
                          checkedIcon={
                            <Favorite
                              className="icon_container"
                              sx={{ color: "red" }}
                            />
                          }
                          checked={
                            product?.me_liked &&
                            product?.me_liked[0]?.my_favorite
                              ? true
                              : false
                          }
                        />
                        <h2 className="product_count">
                          {product?.product_likes}
                        </h2>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"end"}
            width={"85%"}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/products");
            }}
          >
            <ArrowRight />
            <h3>See More</h3>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};
