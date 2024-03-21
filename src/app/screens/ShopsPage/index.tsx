import React from "react";
import "../../../css/shops.css";
import { Routes, Route } from "react-router-dom";
import { AllProducts } from "./allProducts";
import { ChosenProduct } from "./chosenProduct";

export const Shops = (props: any) => {
  return (
    <div className="shop_page" style={{ width: "100%", height: "auto" }}>
      <Routes>
        <Route path="/" element={<AllProducts onAdd={props.onAdd} />}></Route>
        <Route
          path="/:product_id"
          element={<ChosenProduct onAdd={props.onAdd} />}
        />
      </Routes>
    </div>
  );
};
