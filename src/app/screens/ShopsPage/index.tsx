import { Container } from "@mui/system";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AllProducts } from "./allProducts";
import { ChosenProduct } from "./chosenProduct";
import "../../../css/shops.css";
import { PhoneProducts } from "./phoneProducts";
import { Laptops } from "./laptops";
import { Accessories } from "./accessories";

export const Shops = () => {
  return (
    <div className="shop_page" style={{ width: "100%", height: "auto" }}>
      <Routes>
        <Route path="/" element={<AllProducts />}></Route>
        <Route path="/:products_id" element={<ChosenProduct />} />
        <Route path="/phones" element={<PhoneProducts />} />
        <Route path="/laptops" element={<Laptops />} />
        <Route path="/accessories" element={<Accessories />} />
      </Routes>
    </div>
  );
};
