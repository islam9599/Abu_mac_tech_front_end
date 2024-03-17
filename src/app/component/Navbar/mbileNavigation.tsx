import React, { useState } from "react";
import { Menu } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

export const MobileNavbar = (props: any) => {
  /** Initializations */
  const [hide, setHide] = useState<boolean>(true);
  const navigate = useNavigate();

  /** Handlers */
  return (
    <Box
      className="navbar_page"
      sx={{
        display: { xs: "flex", sx: "none", md: "none", lg: "none" },
        width: "100%",
        maxHeight: "auto",
        mt: "10px",
      }}
    >
      <Stack className="mobile_nav">
        <Stack className="mobile_nav_wrapper">
          <Stack
            alignItems={"center"}
            flexDirection={"row"}
            onClick={() => navigate("/")}
          >
            <img
              src="/home/macshop.jpg"
              style={{
                width: "49px",
                height: "49px",
                marginRight: "10px",
                borderRadius: "10px",
              }}
            />

            <Box width={"100px"}>
              <TypeAnimation
                sequence={[100, "Abu", 100, "Abu_Mac_Tech", () => {}]}
                wrapper="p"
                cursor={true}
                repeat={Infinity}
                style={{
                  fontSize: "18px",
                  display: "inline-block",
                  color: "#000",
                  fontWeight: "bold",
                }}
              />
            </Box>
          </Stack>

          <Menu
            className="mobile_nav_menu_icon"
            onClick={() => setHide(!hide)}
          />
          <Stack
            position={"absolute"}
            top={80}
            right={0}
            width={"100%"}
            height={"auto"}
            alignItems={"center"}
            sx={{
              display: hide ? "none" : "flex",
              background: "#129cb8",
              transition: "1s ease-in",
            }}
          >
            <h2 className="mobile_nav_title" onClick={() => navigate("/")}>
              Home
            </h2>
            <h2
              onClick={() => navigate("/products")}
              className="mobile_nav_title"
            >
              Shops
            </h2>
            <h2
              className="mobile_nav_title"
              onClick={() => navigate("/products")}
            >
              Commnity
            </h2>
            <h2
              className="mobile_nav_title"
              onClick={() => navigate("/products")}
            >
              FAQ
            </h2>
            <h2
              className="mobile_nav_title"
              onClick={() => navigate("/products")}
            >
              Login
            </h2>
            <h2
              className="mobile_nav_title"
              onClick={() => navigate("/products")}
            >
              Signup
            </h2>
            <FaArrowUp
              className="nav_mobile_arrow_up"
              onClick={() => {
                setHide(!hide);
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
