import React from "react";
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
import {
  ArrowRight,
  Favorite,
  PriceChange,
  RemoveRedEye,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const BestSelling = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <Stack m={"70px 0px"} justifyContent={"center"} alignItems={"center"}>
          <Typography m={3} color={"#000"} variant="h3" fontWeight={"bold"}>
            Best Selling Products
          </Typography>

          <Stack flexDirection={"row"}>
            {Array.from(Array(4).keys()).map((index) => {
              return (
                <Card
                  className="home_card"
                  key={index}
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
                    image="https://9to5mac.com/wp-content/uploads/sites/6/2020/11/apple-november-event.jpeg?quality=82&strip=all&w=1424"
                  />
                  <CardContent>
                    <Typography
                      variant="h5"
                      color={"InfoText"}
                      marginBottom={"10px"}
                      fontWeight={"bold"}
                    >
                      MacBook Pro 16 inch
                    </Typography>
                    <Typography
                      variant="h6"
                      color={"InfoText"}
                      marginBottom={"10px"}
                    >
                      M3 chip, 16/512gb
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
                          position: "absolute",
                          bottom: 10,
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        20% off
                      </h5>
                      <p
                        style={{
                          fontSize: "12px",
                          textDecoration: "line-through",
                        }}
                      >
                        $1999
                      </p>

                      <p style={{ fontSize: "12px" }}>$1700</p>
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
            width={"100%"}
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
