import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Stack } from "@mui/material";

export default function FilterShop(props: any) {
  const { filterTitle, filterItem } = props;
  return (
    <Stack>
      <FormControl
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <FormLabel
          sx={{ fontWeight: "bold", fontSize: "14px" }}
          id="demo-radio-buttons-group-label"
        >
          Filter by {filterTitle[0]}
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="All"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="All"
            control={<Radio />}
            label={filterItem[0].color[0]}
          />
          <FormControlLabel
            value="Silver"
            control={<Radio />}
            label={filterItem[0].color[1]}
          />
          <FormControlLabel
            value="Gold"
            control={<Radio />}
            label={filterItem[0].color[2]}
          />
          <FormControlLabel
            value="Gray"
            control={<Radio />}
            label={filterItem[0].color[3]}
          />
          <FormControlLabel
            value="Titanium"
            control={<Radio />}
            label={filterItem[0].color[4]}
          />
          <FormControlLabel
            value="Etc"
            control={<Radio />}
            label={filterItem[0].color[5]}
          />
          {/* <FormControlLabel
            value="16 inch"
            control={<Radio />}
            label="16 inch"
          /> */}
        </RadioGroup>
      </FormControl>
      <FormControl
        style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}
      >
        <FormLabel
          sx={{ fontWeight: "bold", fontSize: "14px" }}
          id="demo-radio-buttons-group-label"
        >
          Filter by {filterTitle[1]}
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="All"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="All"
            control={<Radio />}
            label={filterItem[1].brand[0]}
          />
          <FormControlLabel
            value="Apple"
            control={<Radio />}
            label={filterItem[1].brand[1]}
          />
          <FormControlLabel
            value="Samsung"
            control={<Radio />}
            label={filterItem[1].brand[2]}
          />
          <FormControlLabel
            value="Hp"
            control={<Radio />}
            label={filterItem[1].brand[3]}
          />
          <FormControlLabel
            value="Microsoft"
            control={<Radio />}
            label={filterItem[1].brand[4]}
          />
          <FormControlLabel
            value="Etc"
            control={<Radio />}
            label={filterItem[1].brand[5]}
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}
