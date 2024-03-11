import { Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Marginer from "../../component/marginer";
import { Instagram } from "@mui/icons-material";

export const FollowInstagram = () => {
  return (
    <div>
      <Container
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "none",
            lg: "flex",
          },
          width: "100%",
          height: "140px",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "100px 0",
        }}
      >
        <Stack flexDirection={"column"}>
          <h2>Follow us on Instagram</h2>

          <a
            href="https://www.instagram.com/macshop_uz/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              color: "#000",
              marginTop: "20px",
              cursor: "pointer",
            }}
          >
            <Instagram
              sx={{
                color: "red",
                marginRight: "5px",
                width: "29px",
                height: "29px",
                cursor: "pointer",
              }}
            />
            <h3>Follow on Instagram</h3>
          </a>
        </Stack>

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA9FKWa3buP9P1ZhdV4BS53yNjYKDAQkUHEQ&usqp=CAU"
          style={{ maxHeight: "150px" }}
          alt=""
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE9nD-J0DVxpbBOU1YCdKRkD4IbCaNEwGVqA&usqp=CAU"
          style={{ maxHeight: "150px" }}
          alt=""
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqQT_h6OgYvE49n1LJ_JR-_ZaIJoFMqNheoQ&usqp=CAU"
          style={{ maxHeight: "150px" }}
          alt=""
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiHCo8MFPGUS4ZxRoDe4cAPdWAz5M0QevzGg&usqp=CAU"
          style={{ maxHeight: "150px" }}
          alt=""
        />
      </Container>
    </div>
  );
};
