import { Container } from "@mui/system";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AllProducts } from "./allProducts";
import { ChosenProduct } from "./chosenProduct";
import "../../../css/shops.css";
import { PhoneProducts } from "./phoneProducts";

export const Shops = () => {
  return (
    <div className="shop_page" style={{ width: "100%", height: "auto" }}>
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/:products_id" element={<ChosenProduct />} />
        <Route path="/phones" element={<PhoneProducts />} />
      </Routes>
    </div>
  );
};
