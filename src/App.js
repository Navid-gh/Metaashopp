import "./App.css";
import React, { useEffect, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import ScrollToTopbtn from "./Components/UI/ScrollToTop/ScrollToTop";
import Loader from "./helpers/loader/Loader";
import NotFound from "./Pages/NotFound";
import MainProducts from "./Pages/MainProducts";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "./redux/CartSlice";
import { logIn, logOut } from "./redux/user";
import axios from "axios";
import EventModal from "./Components/eventModal/EventModal";
const SignUp = lazy(() => import("./Pages/SignUp"));
const Products = lazy(() => import("./Pages/Products"));
const Product = lazy(() => import("./Pages/product"));
const SearchPage = lazy(() => import("./Pages/SearchPage"));
const Cart = lazy(() => import("./Pages/Cart"));
const Whishlist = lazy(() => import("./Pages/Whishlist"));
const User = lazy(() => import("./Pages/user"));
const EditInfo = lazy(() => import("./Pages/EditInfo"));
const Summary = lazy(() =>
  import("./Components/userPanel/SubComponents/Summary")
);
const UserOrders = lazy(() =>
  import("./Components/userPanel/SubComponents/UserOrders/UserOrders")
);
const UserComments = lazy(() =>
  import("./Components/userPanel/SubComponents/UserComments/UserComments")
);
const SuccessBuy = lazy(() => import("./Pages/SuccessBuy"));
const FailedBuy = lazy(() => import("./Pages/FailedBuy"));
const Admin = lazy(() => import("./Pages/Admin"));
const AllProducts = lazy(() => import("./Pages/AllProducts"));
const Contact = lazy(() => import("./Pages/Contact"));
const OrderPage = lazy(() => import("./Components/admin/OrderPage"));

function App() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  let { Auth } = useSelector((state) => state.user);
  useEffect(() => {
    document.body.style.margin = "0 2.5%";

    return () => {
      document.body.style.margin = "0";
    };
  }, []);
  useEffect(() => {
    document.body.style.margin = "0 2.5%";

    return () => {
      document.body.style.margin = "0";
    };
  }, []);
  useEffect(() => {
    let products = JSON.parse(localStorage.getItem("cartProducts"));
    if (products && products.length > 0) {
      let price = 0;
      let qty = products.length;
      products.map((item) => {
        price += item.theFinalPrice * item.quantity;
      });
      dispatch(updateProduct({ products, price, qty }));
    }
  }, []);
  if (
    document.cookie &&
    document?.cookie
      ?.split("; ")
      ?.find((row) => row?.startsWith("Token="))
      ?.split("=")[1]
  ) {
    let token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("Token="))
      .split("=")[1];
    if (!Auth) {
      dispatch(logIn(["", true]));
      axios
        .post("https://gajetmajet.iran.liara.run/auth/refreshToken", {
          refreshToken: token,
        })
        .then((res) => {
          dispatch(logIn([res.data.data.accessToken, res.data.data.bool]));
        })
        .catch((err) => {
          if (err.response.status === 401) {
            dispatch(logOut());
            document.cookie =
              "Token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
            window.location.replace("/SignUp");
          }
        });
    }
  } else {
    if (Auth) {
      dispatch(logOut());
    }
  }

  return (
    <>
      <Router>
        <ScrollToTop />
        {/* <EventModal /> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/SignUp"
            element={
              <React.Suspense fallback={<Loader />}>
                <SignUp />
              </React.Suspense>
            }
          />
          <Route
            path="/contact-us"
            element={
              <React.Suspense fallback={<Loader />}>
                <Contact />
              </React.Suspense>
            }
          />
          <Route
            path="/products"
            element={
              <React.Suspense fallback={<Loader />}>
                <Products />
              </React.Suspense>
            }
          />
          <Route
            path="/products/:cat"
            element={
              <React.Suspense fallback={<Loader />}>
                <MainProducts />
              </React.Suspense>
            }
          />
          <Route
            path="/products/product/:cat/:id/:something"
            element={
              <React.Suspense fallback={<Loader />}>
                <Product />
              </React.Suspense>
            }
          />
          <Route
            path="/search"
            element={
              <React.Suspense fallback={<Loader />}>
                <SearchPage />
              </React.Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <React.Suspense fallback={<Loader />}>
                <Cart />
              </React.Suspense>
            }
          />
          <Route
            path="/wishlist"
            element={
              <React.Suspense fallback={<Loader />}>
                <Whishlist />
              </React.Suspense>
            }
          />
          <Route
            path="/EditInfo"
            element={
              <React.Suspense fallback={<Loader />}>
                <EditInfo />
              </React.Suspense>
            }
          />
          <Route
            path="/Success"
            element={
              <React.Suspense fallback={<Loader />}>
                <SuccessBuy />
              </React.Suspense>
            }
          />
          <Route
            path="/Fail"
            element={
              <React.Suspense fallback={<Loader />}>
                <FailedBuy />
              </React.Suspense>
            }
          />
          <Route
            path="/AllProducts/:cat"
            element={
              <React.Suspense fallback={<Loader />}>
                <AllProducts />
              </React.Suspense>
            }
          />
          <Route
            path="/AllProducts/:cat/:discount"
            element={
              <React.Suspense fallback={<Loader />}>
                <AllProducts />
              </React.Suspense>
            }
          />
          <Route
            path="/user"
            element={
              <React.Suspense fallback={<Loader />}>
                <User />
              </React.Suspense>
            }
          >
            <Route
              index
              element={
                <React.Suspense fallback={<Loader />}>
                  <Summary />
                </React.Suspense>
              }
            />
            <Route
              path="orders"
              element={
                <React.Suspense fallback={<Loader />}>
                  <UserOrders />
                </React.Suspense>
              }
            />
            <Route
              path="wishlist"
              element={<Navigate to="/wishlist" replace />}
            />
            <Route
              path="comments"
              element={
                <React.Suspense fallback={<Loader />}>
                  <UserComments />
                </React.Suspense>
              }
            />
          </Route>
          <Route
            path="/admin"
            element={
              <React.Suspense fallback={<Loader />}>
                <Admin />
              </React.Suspense>
            }
          />
          <Route
            path="/admin/wait-products"
            element={
              <React.Suspense fallback={<Loader />}>
                <OrderPage />
              </React.Suspense>
            }
          />
          <Route
            path="*"
            element={
              <React.Suspense fallback={<Loader />}>
                <NotFound />
              </React.Suspense>
            }
          ></Route>
        </Routes>
        <ScrollToTopbtn />
        <Footer />
      </Router>
    </>
  );
}

export default React.memo(App);
