import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";

export function Spinner() {
  return (
    <Container>
      <Box className="spinner_wrapper">
        <Typography variant="h3">Loading...</Typography>
        <CircularProgress />
      </Box>
    </Container>
  );
}
