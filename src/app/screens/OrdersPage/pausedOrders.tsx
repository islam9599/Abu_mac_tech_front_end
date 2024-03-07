import { Box, Button, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import { TabPanel } from "@mui/lab";
import Marginer from "../../component/marginer";
/** Redux */
import { createSelector } from "reselect";
import {
  retrieveFinishedOrders,
  retrievePausedOrders,
  retrieveProcessOrders,
} from "./selector";
import { useSelector } from "react-redux";
import { Order } from "../../types/order";
import { Product } from "../../types/product";

import OrderApiService from "../../apiServices/orderApiService";
import { verifiedMemberdata } from "../../apiServices/verify";
import { sweetErrorHandling, sweetFailureProvider } from "../../lib/sweetAlert";
import { serverApi } from "../../lib/config";
import { useNavigate } from "react-router-dom";

/** Redux Selector*/
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);

export function PausedOrders(props: any) {
  /** Initialization */
  const { pausedOrders } = useSelector(pausedOrdersRetriever);
  const navigate = useNavigate();
  /** Handlers */
  const deleteOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "DELETED" };
      if (!verifiedMemberdata) {
        sweetFailureProvider("Please login first!", true);
      }
      let confirmation = window.confirm(
        "Buyurtmani bekor qilishni xohlaysizmi?"
      );
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("deleteOrderHandler, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };
  const processOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "PROCESS" };
      if (!verifiedMemberdata) {
        sweetFailureProvider("Please login first!", true);
      }
      let confirmation = window.confirm("Buyurtmaga tolov qilasizmi?");
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
        props.setValue("2");
      }
    } catch (err) {
      console.log("processOrderHandler, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div>
      <Stack style={{ marginTop: "30px" }}>
        <Marginer direction="horizontal" width="877" height="1" bg="#fff" />
      </Stack>
      <TabPanel value={"1"}>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box className="order_main_box">
              <Box className="order_box_scroll">
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  const img_path = `${serverApi}/${product?.product_images[0]}`;

                  return (
                    <Stack key={item._id}>
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
                        <p className="title_dish">{product?.product_name}</p>
                        <Box className="price_box">
                          <p>${item.item_price}</p>
                          <img src="/icons/close.svg" alt="" />
                          <p>{item.item_quantity}</p>
                          <img src="/icons/equal.svg" alt="" />
                          <p style={{ marginLeft: "15px" }}>
                            {" "}
                            ${item.item_price * item.item_quantity}
                          </p>
                        </Box>
                      </Box>
                      <Marginer width="100%" height="0.5" bg="#000" />
                    </Stack>
                  );
                })}
              </Box>

              <Box className="total_price_box black_solid">
                <Box className="box_total">
                  <p>Product Price</p>
                  <p>$60</p>
                  <img src="/icons/plus.svg" alt="" />
                  <p>Delivery Cost</p>
                  <p>$15</p>
                  <p>Total</p>
                  <img src="/icons/equal.svg" alt="" />
                  <p>$75</p>
                </Box>
                <Box className="total_price_btn">
                  <Button
                    variant="contained"
                    color="secondary"
                    value={order._id}
                    onClick={deleteOrderHandler}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    value={order._id}
                    onClick={processOrderHandler}
                  >
                    Pay
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}
      </TabPanel>
    </div>
  );
}
