import { Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Marginer from "../../component/marginer";
import { Instagram } from "@mui/icons-material";

export const FollowInstagram = () => {
  return (
    <div>
      <Container
        sx={{
          width: "100%",
          height: "140px",
          display: "flex",
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
              }}
            />
            <h3>Follow on Instagram</h3>
          </a>
        </Stack>
        <img
          src="https://i.guim.co.uk/img/media/18badfc0b64b09f917fd14bbe47d73fd92feeb27/189_335_5080_3048/master/5080.jpg?width=620&dpr=2&s=none"
          style={{ height: "150px" }}
          alt=""
        />
        <img
          src="https://i.guim.co.uk/img/media/18badfc0b64b09f917fd14bbe47d73fd92feeb27/189_335_5080_3048/master/5080.jpg?width=620&dpr=2&s=none"
          style={{ height: "150px" }}
          alt=""
        />
        <img
          src="https://i.guim.co.uk/img/media/18badfc0b64b09f917fd14bbe47d73fd92feeb27/189_335_5080_3048/master/5080.jpg?width=620&dpr=2&s=none"
          style={{ height: "150px" }}
          alt=""
        />
        <img
          src="https://i.guim.co.uk/img/media/18badfc0b64b09f917fd14bbe47d73fd92feeb27/189_335_5080_3048/master/5080.jpg?width=620&dpr=2&s=none"
          style={{ height: "150px" }}
          alt=""
        />
      </Container>
    </div>
  );
};
