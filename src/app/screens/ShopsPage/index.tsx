import React from "react";
import "../../../css/shops.css";
import { Routes, Route } from "react-router-dom";
import { AllProducts } from "./allProducts";
import { ChosenProduct } from "./chosenProduct";
import { PhoneProducts } from "./phoneProducts";
import { Laptops } from "./laptops";
import { Accessories } from "./accessories";

export const Shops = (props: any) => {
  return (
    <div className="shop_page" style={{ width: "100%", height: "auto" }}>
      <Routes>
        <Route path="/" element={<AllProducts onAdd={props.onAdd} />}></Route>
        <Route
          path="/:product_id"
          element={<ChosenProduct onAdd={props.onAdd} />}
        />
        <Route path="/phones" element={<PhoneProducts />} />
        <Route path="/laptops" element={<Laptops />} />
        <Route path="/accessories" element={<Accessories />} />
      </Routes>
    </div>
  );
};
