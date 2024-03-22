import React, { useEffect, useState } from "react";
import "../css/App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import { VisitOtherPage } from "./screens/MemberPage/visitOtherPage";
import AuthentificationModal from "./auth";
import MemberApiService from "./apiServices/memberApiService";
import { sweetFailureProvider, sweetTopSuccessAlert } from "./lib/sweetAlert";
import { Definer } from "./lib/Definer";
import { CartItem } from "./types/other";
import { Product } from "./types/product";
import { Chatbox } from "./component/chatbox";
import { Spinner } from "./component/spinner";

function App() {
  /** Initializations */
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const cartJson: any = localStorage.getItem("cart_data");
  const current_cart: CartItem[] = JSON.parse(cartJson) ?? [];
  const [cartItems, setCartItems] = useState<CartItem[]>(current_cart);
  const [orderRebuild, setOrderRebuild] = useState<Date>(new Date());
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

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
      sweetTopSuccessAlert("Successfully logout!", 500);
      navigate("/");
    } catch (err: any) {
      console.log(err);
      sweetFailureProvider(Definer.general_err1);
    }
  };
  const onAdd = (product: Product) => {
    const exist = cartItems.find((item: CartItem) => item._id === product._id);
    if (exist) {
      const cart_updated = cartItems.map((item: CartItem) =>
        item._id === product._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const new_item: CartItem = {
        _id: product._id,
        quantity: 1,
        name: product.product_name,
        price: product.product_price,
        image: product.product_images[0],
        discount: product.product_discount,
      };
      const cart_updated = [...cartItems, { ...new_item }];
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  console.log("onAdd:::", onAdd);

  const onRemove = (item: CartItem) => {
    const item_data: any = cartItems.find(
      (ele: CartItem) => ele._id === item._id
    );
    if (item_data.quantity === 1) {
      const cart_updated = cartItems.filter(
        (ele: CartItem) => ele._id !== item._id
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const cart_updated = cartItems.map((ele: CartItem) =>
        ele._id === item._id
          ? { ...item_data, quantity: item_data.quantity - 1 }
          : ele
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  const onDelete = (item: CartItem) => {
    const cart_updated = cartItems.filter(
      (ele: CartItem) => ele._id !== item._id
    );
    setCartItems(cart_updated);
    localStorage.setItem("cart_data", JSON.stringify(cart_updated));
  };
  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cart_data");
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
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
        />
      ) : location.pathname.includes("/products") ? (
        <ShopsPage
          handleSignupOpen={handleSignupOpen}
          handleLoginOpen={handleLoginOpen}
          anchorEl={anchorEl}
          open={open}
          handleLogoutRequest={handleLogoutRequest}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
        />
      ) : (
        <OthersNavbarPage
          handleSignupOpen={handleSignupOpen}
          handleLoginOpen={handleLoginOpen}
          anchorEl={anchorEl}
          open={open}
          handleLogoutRequest={handleLogoutRequest}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
        />
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                handleLogoutRequest={handleLogoutRequest}
                onAdd={onAdd}
              />
            }
          />
          <Route path="/products" element={<Shops onAdd={onAdd} />}>
            <Route path=":product_id" element={<ChosenProduct />} />
          </Route>
          <Route
            path="/orders"
            element={
              <OrdersPage
                orderRebuild={orderRebuild}
                setOrderRebuild={setOrderRebuild}
              />
            }
          />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/member-page" element={<MemberPage />}>
            <Route path="other" element={<VisitOtherPage />} />
          </Route>
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      )}

      <Chatbox />
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
