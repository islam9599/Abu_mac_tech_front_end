import React, { useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { TabPanel } from "@mui/lab";
import Marginer from "../../component/marginer";

const pausedOrders = [[1, 2, 3]];
export function FinishedOrders() {
  return (
    <div>
      <TabPanel value={"3"}>
        {pausedOrders?.map((order) => {
          const img_path = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsZFIY4ateUIKs0TkdkztSDa8rYMdUJqL0Yg&usqp=CAU`;
          return (
            <Box className="order_main_box">
              <Box className="order_box_scroll">
                {order.map((item) => {
                  return (
                    <Stack>
                      {" "}
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
                        <p className="title_dish">Apple Watch 5</p>
                        <Box className="price_box">
                          <p>$399</p>
                          <img src="/icons/close.svg" alt="" />
                          <p>2</p>
                          <img src="/icons/equal.svg" alt="" />
                          <p style={{ marginLeft: "15px" }}>$20</p>
                        </Box>
                      </Box>
                      <Marginer width="100%" height="0.5" bg="#000" />
                    </Stack>
                  );
                })}
              </Box>

              <Stack
                className="total_price_box black_solid"
                style={{ background: "#FF3434" }}
              >
                <Box className="box_total">
                  <p>Mahsulot narxi</p>
                  <p>$60</p>
                  <img src="/icons/plus.svg" alt="" />
                  <p>yetkazish xizmati</p>
                  <p>$15</p>
                  <p>Jami narx</p>
                  <img src="/icons/equal.svg" alt="" />
                  <p>$75</p>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </TabPanel>
    </div>
  );
}
