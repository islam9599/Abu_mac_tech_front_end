import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  BookmarkBorder,
  Favorite,
  FavoriteBorder,
  ShoppingCartRounded,
  Star,
} from "@mui/icons-material";
import { Checkbox, Container, Rating, Stack, Typography } from "@mui/material";
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

const FlashCard = (props: any) => {
  /** Initialization */
  const { setSaleProducts } = actionDispatch(useDispatch());
  const { saleProducts } = useSelector(saleProductsRetriever);
  console.log("saleProducts::::::selector!!!", saleProducts);
  const [count, setCount] = useState(0);
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  const navigate = useNavigate();

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

  return (
    <div>
      <Container>
        <Stack
          maxWidth={"100%"}
          height={"auto"}
          flexWrap={"wrap"}
          alignItems={"center"}
          mt={"50px"}
          justifyContent={"center"}
        >
          <Typography variant="h3" fontWeight={"bold"}>
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
                    <Stack
                      flexDirection={"row"}
                      className="icon-container"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <ShoppingCartRounded
                        className={"productCard__cart"}
                        sx={{ width: "29px", height: "24px" }}
                        onClick={(e) => {
                          props.onAdd(product);
                          e.stopPropagation();
                        }}
                      />
                      <BookmarkBorder
                        className={"productCard__wishlist"}
                        sx={{ width: "29px", height: "24px" }}
                      />
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
                            sx={{ width: "29px", height: "24px", color: "red" }}
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
                      <h3 className="productName">{product.product_name}</h3>
                      <Stack
                        width={"100%"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <h3 style={{ color: "red" }}>
                          {product?.product_discount}% off
                        </h3>
                        <h2 style={{ textDecoration: "line-through" }}>
                          {product?.product_price}
                        </h2>
                      </Stack>

                      <div className="displayStack__1">
                        <div className="productPrice">
                          $
                          {product.product_price -
                            product.product_price / product.product_discount}
                        </div>
                        <div className="productSales">
                          {product.product_left_cnt} units left
                        </div>
                      </div>
                      <div className="displayStack__2">
                        <div className="productRating">
                          <Star sx={{ color: "gold" }} />
                          <Star sx={{ color: "gold" }} />
                          <Star sx={{ color: "gold" }} />
                          <Star sx={{ color: "gold" }} />
                          <Star />
                        </div>
                        <div className="productTime">29 days left</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default FlashCard;
