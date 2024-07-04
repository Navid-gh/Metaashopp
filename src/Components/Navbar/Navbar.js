import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";
import "./Navbar.css";
import {
  IoPersonOutline,
  IoCartOutline,
  IoHeartOutline,
  IoExitOutline,
} from "react-icons/io5";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Loader from "../../helpers/loader/Loader";
import { logOut } from "../../redux/user";

function Navbar2() {
  const [menuicon, setmenuicon] = useState(false);
  const [buttonstate, setbuttonstate] = useState(true);
  const [navbar, setnavbar] = useState(false);
  const [searchResult, setSerachResult] = useState([]);
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const totalqty = useSelector((state) => state.Cart.qty);
  let { Auth, token } = useSelector((state) => state.user);
  const toFarsiNumber = useCallback((n) => {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
  }, []);
  const menuiconhandler = () => {
    setmenuicon(!menuicon);
  };
  const closembilemenu = () => {
    setmenuicon(false);
  };
  useEffect(() => {
    const handlebutton = () => {
      if (window.innerWidth <= 1100) {
        if (buttonstate) {
          setbuttonstate(false);
        }
      } else {
        if (!buttonstate) {
          setbuttonstate(true);
        }
      }
    };
    handlebutton();
    window.addEventListener("resize", handlebutton);
    return () => {
      window.removeEventListener("resize", handlebutton);
    };
  }, [buttonstate]);
  useEffect(() => {
    const handlenavbar = () => {
      if (window.pageYOffset >= 65) {
        if (!navbar) {
          setnavbar(true);
        }
      }
      if (window.pageYOffset === 0) {
        if (navbar) {
          setnavbar(false);
        }
      }
    };
    handlenavbar();
    window.addEventListener("scroll", handlenavbar);
    return () => {
      window.removeEventListener("scroll", handlenavbar);
    };
  }, [navbar]);
  // useEffect(() => {
  //   setSerachResult(searchdata.filter((item) => item.text.toUpperCase().includes(query.toUpperCase())));
  // },[query])
  // const goToSearch = () => {
  //    Navigate({
  //     pathname:'/search',
  //     search:`?q${query}`
  //    })
  //    setQuery('');
  // }
  // const searchHandler = (e) => {
  //   setQuery(e.target.value);
  //   if (query.length >= 2) {
  //     axios.get('http://localhost:3000/jsons/test.json')
  //       .then(res => {
  //         setSerachResult(res.data)
  //         setReady(true)
  //       })
  //       .catch(err => console.log(err));
  //   }
  // }
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://gajetmajet.iran.liara.run/product/fiveProduct?search=${query}`
      );
      setSerachResult(res.data.data.products);
      setReady(true);
    };
    if (query.length > 2) fetchData();
  }, [query]);
  useEffect(() => {
    if (query.length < 3) {
      setReady(false);
    }
  }, [query]);
  useEffect(() => {
    setSerachResult((prev) => prev);
  }, [searchResult]);
  const cartHadnler = () => {
    Navigate("/cart");
  };
  const whishhandler = () => {
    Navigate("/wishlist");
  };
  const SignOut = () => {
    dispatch(logOut());
    document.cookie = "Token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
    Navigate("/");
  };
  if (buttonstate) {
    return (
      <>
        {/* <div className="nav-phones-container"></div> */}
        <div
          className="navbar"
          style={{
            opacity: navbar ? "1" : "0",
            transform: navbar ? "scaleY(1)" : "scaleY(0)",
            position: "fixed",
            top: "0",
            right: "0",
            left: "0",
            backgroundColor: "white",
            zIndex: 1999,
            width: "100%",
            overflow: "hidden",
            padding: "0 2.5%",
            transition: navbar ? "all 0.3s" : null,
            transformOrigin: "top",
            borderBottom: "unset",
          }}
        >
          <div className="navbar-container">
            <div className="nav-logo-container">
              {/* <AiOutlineShopping color='#333333' size='50px' /> */}
              <Link to="/">
                <img src="/logo512.png" alt="logo" className="nav-logo" />
              </Link>
            </div>
            <div className="nav-search-input">
              <input
                type="text"
                placeholder="جستجوی محصول مورد نظر..."
                className="nav-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span
                className={`clear-search ${
                  query.length > 0 ? "fade-in" : "fade-out"
                }`}
              >
                <AiOutlineClose
                  size="16px"
                  color="red"
                  onClick={() => setQuery("")}
                />
              </span>
            </div>
            <div className="nav-icons-container">
              <IoHeartOutline
                color="#333333"
                size="24px"
                onClick={whishhandler}
              />
              <IoCartOutline
                color="#333333"
                size="24px"
                onClick={cartHadnler}
              />
              {totalqty === 0 ? null : (
                <span className="icons-card-qty">
                  {toFarsiNumber(totalqty)}
                </span>
              )}
              <IoPersonOutline
                color="#333333"
                size="24px"
                onClick={() => Navigate("/user")}
              />
            </div>
          </div>
        </div>
        <div className="navbar">
          <div className="navbar-container">
            <div className="nav-logo-container">
              {/* <AiOutlineShopping color='#333333' size='50px' /> */}
              <Link to="/">
                <img
                  // src="/images/logo_white.jpg"
                  src="/logo512.png"
                  alt="logo"
                  className="nav-logo"
                />
              </Link>
            </div>
            <div className="nav-search-input">
              <input
                type="text"
                placeholder="جستجوی محصول مورد نظر..."
                className="nav-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span
                className={`clear-search ${
                  query.length > 0 ? "fade-in" : "fade-out"
                }`}
              >
                <AiOutlineClose
                  size="16px"
                  color="red"
                  onClick={() => setQuery("")}
                />
              </span>
            </div>
            <div className="nav-icons-container">
              <IoHeartOutline
                color="#333333"
                size="24px"
                onClick={whishhandler}
              />
              <IoCartOutline
                color="#333333"
                size="24px"
                onClick={cartHadnler}
              />
              {totalqty === 0 ? null : (
                <span className="icons-card-qty">
                  {toFarsiNumber(totalqty)}
                </span>
              )}
              <IoPersonOutline
                color="#333333"
                size="24px"
                onClick={() => Navigate("/user")}
              />
            </div>
          </div>
          <div className="navbar-container2">
            <ul className="nav-links">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  صفحه اصلی
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  محصولات
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products/digitwatch" className="nav-link">
                  ساعت هوشمند
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products/handsfree" className="nav-link">
                  هندزفری
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products/speaker" className="nav-link">
                  اسپیکر
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products/console" className="nav-link">
                  کنسول بازی
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products/mobile-glass" className="nav-link">
                  گلس گوشی
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products/mobile-cover" className="nav-link">
                  قاب و کاور گوشی
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products/glass" className="nav-link">
                  لوازم ساعت
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products/handsfree-cover" className="nav-link">
                  کاور هندزفری
                </Link>
              </li>
              <li
                className="nav-item"
                style={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}
              >
                <Link to="/contact-us" className="nav-link">
                  تماس با ما
                </Link>
              </li>
            </ul>
            <div className="signup-btn-container">
              {Auth ? (
                <span className="nav-log-out" onClick={SignOut}>
                  <IoExitOutline size="18px" /> خروج
                </span>
              ) : (
                <Button buttonstyle="btn--signup" to="/SignUp">
                  ثبت نام | ورود
                </Button>
              )}
            </div>
          </div>
        </div>
        {ready ? (
          searchResult?.length > 0 && query.length >= 3 ? (
            <div
              className="nav-searh-results-wrapper"
              style={{ display: `${query.length > 0 ? "block" : "none"}` }}
            >
              <ul className="nav-searh-results-container">
                {searchResult?.map((item, idx) => {
                  if (idx > 4) return;
                  let forurl;
                  forurl = item.text.replaceAll(" ", "-");
                  forurl = forurl.replaceAll("/", "-");
                  return (
                    <Link
                      to={`/products/product/${item.category}/${item._id}/${forurl}`}
                      key={idx}
                      onClick={() => setQuery("")}
                    >
                      <li className="nav-searh-result-container">
                        <figure className="nav-search-image-container">
                          <img
                            src={`https://gajetmajet.iran.liara.run/${item.images[0]}`}
                            className="nav-search-image"
                          />
                        </figure>
                        <div className="nav-search-result-texts">
                          <span>{item.title}</span>
                          <span>
                            {item.count > 0
                              ? `${item.theFinalPrice} تومان`
                              : "موجود نمی باشد"}
                          </span>
                        </div>
                      </li>
                    </Link>
                  );
                })}
              </ul>
              <Link to="/search" state={{ query }}>
                <button
                  className="nav-all-result-button"
                  onClick={() => setQuery("")}
                >
                  مشاهده همه نتایج
                </button>
              </Link>
            </div>
          ) : query.length >= 3 ? (
            <div
              className="no-result-container"
              style={{ display: `${query.length ? "flex" : "none"}` }}
            >
              <span className="no-result-text">هیچ محصولی یافت نشد</span>
            </div>
          ) : null
        ) : query.length >= 3 ? (
          <div
            className="no-result-container"
            style={{ display: `${query.length ? "flex" : "none"}` }}
          >
            <Loader />
          </div>
        ) : null}
      </>
    );
  }
  return (
    <>
      <div
        className="navbar"
        style={{
          position: "sticky",
          top: "0",
          borderRadius: "0",
          width: "100%",
          backgroundColor: "white",
          zIndex: 1999,
        }}
      >
        <div className="navbar-container-mobile">
          <div className="menu-icon" onClick={menuiconhandler}>
            {menuicon ? (
              <AiOutlineClose size="25px" />
            ) : (
              <AiOutlineMenu size="25px" />
            )}
          </div>
          <div className="nav-search-input">
            <input
              type="text"
              placeholder="جستجوی محصول مورد نظر..."
              className="nav-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span
              className={`clear-search ${
                query.length > 0 ? "fade-in" : "fade-out"
              }`}
            >
              <AiOutlineClose
                size="16px"
                color="red"
                onClick={() => setQuery("")}
              />
            </span>
          </div>
          <div className="nav-icons-container">
            <IoHeartOutline
              color="#333333"
              size="24px"
              onClick={whishhandler}
            />
            <IoCartOutline color="#333333" size="24px" onClick={cartHadnler} />
            {totalqty === 0 ? null : (
              <span className="icons-card-qty">{toFarsiNumber(totalqty)}</span>
            )}
            <IoPersonOutline
              color="#333333"
              size="24px"
              onClick={() => Navigate("/user")}
            />
          </div>
        </div>
      </div>
      <div className={`menu-sider ${menuicon ? "fade-in" : "fade-out"}`}>
        <ul className="nav-mobile-links">
          <li className="nav-mobile-item">
            <Link to="/" className="nav-mobile-link">
              صفحه اصلی
            </Link>
          </li>
          <li className="nav-mobile-item">
            <Link
              to="/products"
              className="nav-mobile-link"
              onClick={closembilemenu}
            >
              محصولات
            </Link>
          </li>
          <li className="nav-mobile-item">
            <Link
              to="/products/digitwatch"
              className="nav-mobile-link"
              onClick={closembilemenu}
            >
              ساعت هوشمند
            </Link>
          </li>
          <li className="nav-mobile-item">
            <Link
              to="/products/handsfree"
              className="nav-mobile-link"
              onClick={closembilemenu}
            >
              هندزفری
            </Link>
          </li>
          <li className="nav-mobile-item">
            <Link
              to="/products/speaker"
              className="nav-mobile-link"
              onClick={closembilemenu}
            >
              اسپیکر
            </Link>
          </li>
          <li className="nav-mobile-item">
            <Link
              to="/products/console"
              className="nav-mobile-link"
              onClick={closembilemenu}
            >
              کنسول بازی
            </Link>
          </li>
          <li className="nav-mobile-item">
            <Link
              to="/products/mobile-glass"
              className="nav-mobile-link"
              onClick={closembilemenu}
            >
              گلس گوشی
            </Link>
          </li>
          <li className="nav-mobile-item">
            <Link
              to="/products/mobile-cover"
              className="nav-mobile-link"
              onClick={closembilemenu}
            >
              قاب و کاور گوشی
            </Link>
          </li>
          <li className="nav-mobile-item">
            <Link
              to="/products/glass"
              className="nav-mobile-link"
              onClick={closembilemenu}
            >
              لوازم ساعت
            </Link>
          </li>
          <li className="nav-mobile-item">
            <Link
              to="/products/handsfree-cover"
              className="nav-mobile-link"
              onClick={closembilemenu}
            >
              کاور هندزفری
            </Link>
          </li>
          {Auth ? (
            <li
              className="nav-mobile-item sign-mob"
              style={{ marginRight: "5%", fontSize: "12px" }}
              onClick={SignOut}
            >
              <IoExitOutline size="16px" /> خروج
            </li>
          ) : (
            <li className="nav-mobile-item sign-mob">
              <Link
                to="/SignUp"
                className="nav-mobile-link"
                onClick={closembilemenu}
              >
                ثبت نام | ورود
              </Link>
            </li>
          )}
          <li className="nav-mobile-item ">
            <Link
              to="/contact-us"
              className="nav-mobile-link"
              onClick={closembilemenu}
            >
              تماس با ما
            </Link>
          </li>
        </ul>
      </div>
      <div
        style={
          menuicon
            ? {
                position: "fixed",
                right: "0",
                left: "0",
                top: "65px",
                bottom: "0",
                backgroundColor: "rgba(0,0,0,0.3)",
                zIndex: "800",
              }
            : null
        }
        onClick={closembilemenu}
      />
      {ready ? (
        searchResult?.length > 0 && query.length >= 3 ? (
          <div
            className="nav-searh-results-wrapper"
            style={{ display: `${query.length > 0 ? "block" : "none"}` }}
          >
            <ul className="nav-searh-results-container">
              {searchResult?.map((item, idx) => {
                if (idx > 4) return;
                let forurl;
                forurl = item.text.replaceAll(" ", "-");
                forurl = forurl.replaceAll("/", "-");
                return (
                  <Link
                    to={`/products/product/${item.category}/${item._id}/${forurl}`}
                    key={idx}
                    onClick={() => setQuery("")}
                  >
                    <li className="nav-searh-result-container">
                      <figure className="nav-search-image-container">
                        <img
                          src={`https://gajetmajet.iran.liara.run/${item.images[0]}`}
                          className="nav-search-image"
                        />
                      </figure>
                      <div className="nav-search-result-texts">
                        <span>{item.title}</span>
                        <span>
                          {item.count > 0
                            ? `${item.theFinalPrice} تومان`
                            : "موجود نمی باشد"}
                        </span>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
            <Link to="/search" state={{ query }}>
              <button
                className="nav-all-result-button"
                onClick={() => setQuery("")}
              >
                مشاهده همه نتایج
              </button>
            </Link>
          </div>
        ) : query.length >= 3 ? (
          <div
            className="no-result-container"
            style={{ display: `${query.length ? "flex" : "none"}` }}
          >
            <span className="no-result-text">هیچ محصولی یافت نشد</span>
          </div>
        ) : null
      ) : query.length >= 3 ? (
        <div
          className="no-result-container"
          style={{ display: `${query.length ? "flex" : "none"}` }}
        >
          <Loader />
        </div>
      ) : null}
    </>
  );
}

export default React.memo(Navbar2);
