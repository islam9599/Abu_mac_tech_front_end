import React from "react";
import "../css/App.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
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

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname == "/" ? (
        <NavbarPage />
      ) : location.pathname.includes("/shops") ? (
        <ShopsPage />
      ) : (
        <OthersNavbarPage />
      )}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/member-page" element={<MemberPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
