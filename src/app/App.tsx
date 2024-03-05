import React, { useState } from "react";
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
import AuthentificationModal from "./auth";
import MemberApiService from "./apiServices/memberApiService";
import {
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "./lib/sweetAlert";
import { Definer } from "./lib/Definer";

function App() {
  /** Initializations */

  const location = useLocation();
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** Handlers */
  const handleSignupOpen = () => {
    setSignupOpen(true);
  };
  const handleSignupClose = () => {
    setSignupOpen(false);
  };
  const handleLoginOpen = () => {
    setLoginOpen(true);
  };
  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleLogoutRequest = async () => {
    try {
      const member = new MemberApiService();
      await member.logoutRequest();
      await sweetTopSmallSuccessAlert("success", 700, true);
    } catch (err: any) {
      console.log(err);
      sweetFailureProvider(Definer.general_err1);
    }
  };

  return (
    <>
      {location.pathname === "/" ? (
        <NavbarPage
          handleSignupOpen={handleSignupOpen}
          handleLoginOpen={handleLoginOpen}
          anchorEl={anchorEl}
          open={open}
          handleLogoutRequest={handleLogoutRequest}
        />
      ) : location.pathname.includes("/products") ? (
        <ShopsPage
          handleSignupOpen={handleSignupOpen}
          handleLoginOpen={handleLoginOpen}
          anchorEl={anchorEl}
          open={open}
          handleLogoutRequest={handleLogoutRequest}
        />
      ) : (
        <OthersNavbarPage
          handleSignupOpen={handleSignupOpen}
          handleLoginOpen={handleLoginOpen}
          anchorEl={anchorEl}
          open={open}
          handleLogoutRequest={handleLogoutRequest}
        />
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
      <AuthentificationModal
        loginOpen={loginOpen}
        handleLoginOpen={handleLoginOpen}
        handleLoginClose={handleLoginClose}
        signupOpen={signupOpen}
        handleSignupOpen={handleSignupOpen}
        handleSignupClose={handleSignupClose}
      />
    </>
  );
}

export default App;
