import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Container,
} from "@mui/material";
import { ArrowRight, Favorite, RemoveRedEye } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/product";
import ProductApiService from "../../apiServices/productApiService";

// Redux

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { Shop } from "../../types/user";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveBestProducts, retrieveSaleProducts } from "./selector";
import { verifiedMemberdata } from "../../apiServices/verify";
import { serverApi } from "../../lib/config";
import { ProductSearchObj } from "../../types/other";
import { setBestProducts } from "./slice";

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
  console.log("bestProducts::::::selector!!!", bestProducts);
  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 6,
      order: "product_price",
    });

  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => {
        setBestProducts(data);
      })
      .catch((err) => console.log(err));
  }, [targetProductSearchObj]);
  /** Handlers */
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <Stack alignItems={"center"}>
          <Stack
            width={"60%"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            m={5}
            sx={{
              width: "60%",
              height: "auto",

              borderRadius: "9px",
              cursor: "pointer",
            }}
          >
            <Typography m={3} color={"#000"} variant="h4" fontWeight={"bold"}>
              Best Selling Products
            </Typography>
            <Typography m={3} color={"#000"} variant="h4" fontWeight={"bold"}>
              Most Liked Products
            </Typography>
            <Typography m={3} color={"#000"} variant="h4" fontWeight={"bold"}>
              New Arrivals
            </Typography>
          </Stack>

          <Stack
            width={"100%"}
            flexDirection={"row"}
            flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {/*@ts-ignore */}
            {bestProducts.map((product: Product) => {
              const image_path = `${serverApi}/${product.product_images[0]}`;

              return (
                <Card
                  className="home_card"
                  key={product?._id}
                  onClick={() => {
                    navigate("/products/:product_id");
                  }}
                >
                  <CardMedia
                    className="card_image"
                    sx={{
                      paddingTop: "15px",
                      boxShadow: "revert-layer",
                    }}
                    component="img"
                    alt="green iguana"
                    height="250"
                    image={image_path}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h5"
                      color={"InfoText"}
                      marginBottom={"10px"}
                      fontWeight={"bold"}
                      sx={{
                        width: "90%",
                        height: "30px",
                      }}
                    >
                      {product.product_name}
                    </Typography>
                    <Typography
                      variant="h6"
                      color={"InfoText"}
                      marginBottom={"10px"}
                      style={{
                        width: "90%",
                        height: "60px",
                        overflow: "scroll",
                        fontSize: "12px",
                      }}
                    >
                      {product.product_description}
                    </Typography>
                    <Stack
                      width={"100%"}
                      justifyContent={"space-between"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      position={"relative"}
                    >
                      <h5
                        style={{
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {product?.product_discount}% off
                      </h5>

                      <p style={{ fontSize: "12px" }}>
                        ${product?.product_price}
                      </p>
                    </Stack>
                    <Stack
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <RemoveRedEye
                        className="icon-container"
                        style={{
                          width: "19px",
                          height: "19px",
                          cursor: "pointer",
                        }}
                      />
                      <Favorite
                        className="icon-container"
                        style={{
                          width: "19px",
                          height: "19px",
                          cursor: "pointer",
                        }}
                      />
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Stack
                      width={"100%"}
                      height={"auto"}
                      flexDirection={"row"}
                      alignContent={"baseline"}
                      justifyContent={"space-between"}
                    >
                      <Button size="small" variant="contained" color="primary">
                        Share
                      </Button>
                      <Button size="small" variant="contained" color="primary">
                        Learn More
                      </Button>
                    </Stack>
                  </CardActions>
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
