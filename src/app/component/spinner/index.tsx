import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

export function Spinner() {
  return (
    <Container>
      {" "}
      <Box
        sx={{
          display: "flex",
          maxWidth: "1320px",
          height: "600px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    </Container>
  );
}
