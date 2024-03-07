import { Box, Button, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import { TabPanel } from "@mui/lab";
import Marginer from "../../component/marginer";
import moment from "moment";
import { Product } from "../../types/product";
import { Order } from "../../types/order";
import { sweetErrorHandling, sweetFailureProvider } from "../../lib/sweetAlert";
import { serverApi } from "../../lib/config";
import OrderApiService from "../../apiServices/orderApiService";
import { verifiedMemberdata } from "../../apiServices/verify";
/** Redux */
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrieveProcessOrders } from "./selector";

/** Redux Selector*/
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);

export function ProceedOrders(props: any) {
  /** Initialization */
  const { processOrders } = useSelector(processOrdersRetriever);

  /** Handlers */
  const finishOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "FINISHED" };
      if (!verifiedMemberdata) {
        sweetFailureProvider("Please login first!", true);
      }
      let confirmation = window.confirm(
        "Buyurtmaga buyurtamani olganingizni tasdiqlaysizmi?"
      );
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
        props.setValue("3");
      }
    } catch (err) {
      console.log("finishOrderHandler, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div>
      <TabPanel value={"2"}>
        {processOrders?.map((order: Order) => {
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
                          <p>${item.item_price}</p>
                          <img src="/icons/close.svg" alt="" />
                          <p>{item.item_quantity}</p>
                          <img src="/icons/equal.svg" alt="" />
                          <p style={{ marginLeft: "15px" }}>
                            ${item.item_price * item.item_quantity}
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
                  <p>${order.order_total_amount - order.order_delivery_cost}</p>
                  <img src="/icons/plus.svg" alt="" />
                  <p>Delivery Cost</p>
                  <p>${order.order_delivery_cost}</p>
                  <p>Total</p>
                  <img src="/icons/equal.svg" alt="" />
                  <p>${order.order_total_amount}</p>
                </Box>
                <Box className="total_price_btn">
                  <p>{moment(order.createdAt).format("YY-MM-DD HH:mm")}</p>
                  <Button
                    color="secondary"
                    variant="contained"
                    value={order._id}
                    onClick={finishOrderHandler}
                  >
                    Submit
                  </Button>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </TabPanel>
    </div>
  );
}
