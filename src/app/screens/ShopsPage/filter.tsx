import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Stack } from "@mui/material";
import PriceRangeSlider from "./priceSlider";

export default function FilterShop(props: any) {
  /** Initialization */
  const { searchCollectionHandler, searchProductBybrandHandler } = props;
  return (
    <Stack>
      <FormControl
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <FormLabel
          sx={{ fontWeight: "bold", fontSize: "14px" }}
          id="demo-radio-buttons-group-label"
        >
          Filter by
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="All"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="All"
            control={<Radio />}
            label="Best-selling"
            onClick={() => searchCollectionHandler()}
          />
          <FormControlLabel
            value="is_onsale"
            control={<Radio />}
            label="On-sale"
            onClick={() => searchCollectionHandler("product_discount")}
          />
          <FormControlLabel
            value="updatedAt"
            control={<Radio />}
            label="New-arrivals"
            onClick={() => searchCollectionHandler("updatedAt")}
          />
          <FormControlLabel
            value="product_views"
            control={<Radio />}
            label="Most-viewed"
            onClick={() => searchCollectionHandler("product_views")}
          />
          <FormControlLabel
            value="product_likes"
            control={<Radio />}
            label="Most-liked"
            onClick={() => searchCollectionHandler("product_likes")}
          />
        </RadioGroup>
      </FormControl>
      <FormControl
        style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}
      >
        <FormLabel
          sx={{ fontWeight: "bold", fontSize: "14px" }}
          id="demo-radio-buttons-group-label"
        >
          Filter By Brand
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="All"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="apple"
            control={<Radio />}
            label="Apple"
            onClick={() => searchProductBybrandHandler("apple")}
          />

          <FormControlLabel
            value="samsung"
            control={<Radio />}
            label="Samsung"
            onClick={() => searchProductBybrandHandler("samsung")}
          />
          <FormControlLabel value="Hp" control={<Radio />} label="Hp" />
          <FormControlLabel
            value="Microsoft"
            control={<Radio />}
            label="Microsoft"
          />
          <FormControlLabel value="Etc" control={<Radio />} label="Etc" />
        </RadioGroup>
      </FormControl>
      <Stack sx={{ m: 5 }}>
        <PriceRangeSlider searchCollectionHandler={searchCollectionHandler} />
      </Stack>
    </Stack>
  );
}
