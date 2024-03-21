import React, { useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { TabPanel } from "@mui/lab";
import Marginer from "../../component/marginer";
/** Redux */
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { useSelector } from "react-redux";

import { Product } from "../../types/product";
import { Order } from "../../types/order";
import { serverApi } from "../../lib/config";

/** Redux Selector*/
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({
    finishedOrders,
  })
);

const pausedOrders = [[1, 2, 3]];
export function FinishedOrders(props: any) {
  /** Initialization */
  const { finishedOrders } = useSelector(finishedOrdersRetriever);
  return (
    <div>
      <TabPanel value={"3"}>
        {finishedOrders?.map((order: Order) => {
          return (
            <Box className="order_main_box">
              <Box className="order_box_scroll">
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  const img_path = `${serverApi}/${product?.product_images[0]}`;
                  return (
                    <Stack>
                      <Box className="order_name_price">
                        <img
                          src={img_path}
                          style={{
                            width: "50px",
                            height: "47px",
                            borderRadius: "49px",
                            marginLeft: "40px",
                            marginRight: "20px",
                          }}
                          alt=""
                        />
                        <p className="title_dish">{product.product_name}</p>
                        <Box className="price_box">
                          <p>
                            $
                            {product?.product_discount > 0
                              ? Math.round(
                                  product?.product_price -
                                    product?.product_price /
                                      product?.product_discount
                                )
                              : product?.product_price}
                          </p>
                          <img src="/icons/close.svg" alt="" />
                          <p>{item.item_quantity}</p>
                          <img src="/icons/equal.svg" alt="" />
                          <p style={{ marginLeft: "15px" }}>
                            $
                            {(product?.product_discount > 0
                              ? Math.round(
                                  product?.product_price -
                                    product?.product_price /
                                      product?.product_discount
                                )
                              : product?.product_price) * item.item_quantity}
                          </p>
                        </Box>
                      </Box>
                      <Marginer width="100%" height="0.5" bg="#000" />
                    </Stack>
                  );
                })}
              </Box>

              <Stack
                className="total_price_box black_solid"
                style={{ background: "rgba(217, 217, 217, 0.5)" }}
              >
                <Box className="box_total">
                  <p>Product Price</p>
                  <p>
                    $
                    {Math.round(order.order_total_amount) -
                      order.order_delivery_cost}
                  </p>
                  <img src="/icons/plus.svg" alt="" />
                  <p>Delivery Cost</p>
                  <p>${order.order_delivery_cost}</p>
                  <p style={{ color: "red", fontWeight: "bold" }}>Total</p>
                  <img src="/icons/equal.svg" alt="" />
                  <p>${order.order_total_amount}</p>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </TabPanel>
    </div>
  );
}
