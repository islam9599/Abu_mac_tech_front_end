import React from "react";
import "../css/App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Homepage } from "./screens/Homepage";
import { ShopsPage } from "./component/Navbar/shops";
import { OrdersPage } from "./screens/OrdersPage";
import { CommunityPage } from "./screens/CommunityPage";
import { HelpPage } from "./screens/HelpPage";
import { NavbarPage } from "./component/Navbar";
import { OthersNavbarPage } from "./component/Navbar/others";
import { Footer } from "./component/footer";
import { MemberPage } from "./screens/MemberPage";

import { Shops } from "./screens/ShopsPage";
import { ChosenProduct } from "./screens/ShopsPage/chosenProduct";
import { PhoneProducts } from "./screens/ShopsPage/phoneProducts";
import { Accessories } from "./screens/ShopsPage/accessories";
import { VisitOtherPage } from "./screens/MemberPage/visitOtherPage";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname == "/" ? (
        <NavbarPage />
      ) : location.pathname.includes("/products") ? (
        <ShopsPage />
      ) : (
        <OthersNavbarPage />
      )}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Shops />}>
          <Route path=":product_id" element={<ChosenProduct />} />
          <Route path="phones" element={<PhoneProducts />} />
          <Route path="laptops" element={<PhoneProducts />} />
          <Route path="accessories" element={<Accessories />} />
        </Route>
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/member-page" element={<MemberPage />}>
          <Route path="other" element={<VisitOtherPage />} />
        </Route>
        <Route path="/help" element={<HelpPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
