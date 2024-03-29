import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import { ShoppingCart } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { CartItem } from "../../types/other";
import { serverApi } from "../../lib/config";
import assert from "assert";
import { verifiedMemberdata } from "../../apiServices/verify";
import { Definer } from "../../lib/Definer";
import OrderApiService from "../../apiServices/orderApiService";
import { useNavigate } from "react-router-dom";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import { FaTrash } from "react-icons/fa";

export function Basket(props: any) {
  /** Initialization */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  // const itemsPrice = cartItems.reduce(
  //   (a: any, c: CartItem) => a + c.price * c.quantity,
  //   0
  // );
  const itemsPrice = cartItems.reduce(
    (a: any, c: CartItem) =>
      a + ((c.price * (100 - c.discount)) / 100 / 10) * 10 * c.quantity,
    0
  );

  const shippingPrice = itemsPrice > 300 ? 0 : 8;
  const totalPrice = Math.round(itemsPrice) + shippingPrice;
  const navigate = useNavigate();

  /** Handlers */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const processOrderHandler = async () => {
    try {
      assert.ok(verifiedMemberdata, Definer.auth_err1);
      const order = new OrderApiService();
      await order.createOrder(cartItems);

      onDeleteAll();
      handleClose();
      props.setOrderRebuild(new Date());
      navigate("/orders");
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Box className="hover-line">
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={cartItems.length} color="secondary">
          <ShoppingCart
            className="nav-icon"
            sx={{
              width: "25px",
              height: "25px",
              cursor: "pointer",
              opacity: "1",
              color: "#000",
            }}
          />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: "450px",
            height: "400px",
            borderRadius: "19px",
            overflow: "visible",
            filter: "drop-shadow(0px, 2px, 8px, rgba(0, 0, 0, 0.32))",
            mt: 1.5,
            "& .MuiAvatar": {
              width: 32,
              height: 32,
              mt: 0.5,
              mr: 1,
            },
            "&: before": {
              content: '""',
              display: "block",
              position: "absolute",
              transition: "1s ease",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translate (-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className="basket_frame">
          <Box className="all_check_box">
            {false ? <div>Cart is empty</div> : <div>My Cart Products</div>}
          </Box>
          <Box className="orders_main_wrapper">
            {cartItems?.map((item: CartItem) => {
              const image_path = `${serverApi}/${item.image}`;
              return (
                <Box className="basket_info_box">
                  <img
                    src={image_path}
                    alt="product_image"
                    className="product_image"
                  />
                  <span className="product_name">{item.name}</span>
                  <p className="product_price">
                    $
                    {item.discount > 0
                      ? Math.round(item.price - item.price / item.discount)
                      : item.price}
                    * {item.quantity}
                  </p>

                  <div className="col-2">
                    <button onClick={() => onRemove(item)} className="remove">
                      -
                    </button>
                    <button onClick={() => onAdd(item)} className="remove">
                      +
                    </button>
                  </div>
                  <FaTrash className="cancel" onClick={() => onDelete(item)} />
                </Box>
              );
            })}
          </Box>
          {cartItems.length > 0 ? (
            <Box className="to_order_box">
              <span className="price_text">
                Total: ${totalPrice} (${Math.round(itemsPrice)} +
                {shippingPrice > 0 ? `$${shippingPrice}` : 0})
              </span>
              <Button
                onClick={processOrderHandler}
                startIcon={<ShoppingCart />}
                variant="contained"
              >
                Make an order
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
