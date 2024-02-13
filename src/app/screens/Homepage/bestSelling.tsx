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
import { Favorite, RemoveRedEye } from "@mui/icons-material";

export const BestSelling = () => {
  return (
    <div>
      <Container>
        <Stack mt={10} justifyContent={"center"} alignItems={"center"}>
          <Typography color={"#000"} variant="h3" fontWeight={"bold"}>
            Best Selling Products
          </Typography>
          <Stack flexDirection={"row"}>
            {Array.from(Array(4).keys()).map((index) => {
              return (
                <Card key={index} sx={{ maxWidth: 300, m: 3 }}>
                  <CardMedia
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
        </Stack>
      </Container>
    </div>
  );
};
