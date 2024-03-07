import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import { Cancel, ShoppingCart } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";

export function Basket(props: any) {
  /** Initialization */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** Handlers */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const processOrderHandler = () => {};
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
        <Badge badgeContent={1} color="secondary">
          <ShoppingCart
            className="nav-icon"
            sx={{
              width: "25px",
              height: "25px",
              cursor: "pointer",
              opacity: "1",
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
            {[0].map(() => {
              const image_path =
                "data:image/jpeg;base64,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";
              return (
                <Box className="basket_info_box">
                  {/* <div className="cancel_btn">
                    <Cancel color="primary" />
                  </div> */}
                  <img
                    src={image_path}
                    alt="product_image"
                    className="product_image"
                  />
                  <span className="product_name">Burger</span>
                  <p className="product_price">$10 * 2</p>

                  <div className="col-2">
                    <button className="remove">-</button>
                    <button className="remove">+</button>
                  </div>
                  <Cancel className="remove" />
                </Box>
              );
            })}
          </Box>
          {true ? (
            <Box className="to_order_box">
              <span className="price_text">Jami: $22 (20+2)</span>
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
