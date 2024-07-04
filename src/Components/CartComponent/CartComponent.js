import React, { useEffect, useState, useCallback, useRef } from "react";
import "./CartComponent.css";
import "../SignUp/SignUpForm.css";
import { useSelector, useDispatch } from "react-redux";
import { json, Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { addQty, decQty, removeProduct } from "../../redux/CartSlice";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../helpers/loader/Loader";
import axios from "axios";

function CartComponent() {
  const [cartProducts, setCartProducts] = useState([]);
  const [ready, setReady] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAdress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [submit, setSubmit] = useState(false);
  const [states, setStates] = useState([]);
  const [state, setState] = useState({});
  const [stateReady, setStateReady] = useState(false);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});
  const [postPrice, setPostPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const { products, qty, total } = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const divRef = useRef();
  let { Auth, token } = useSelector((state) => state.user);
  const postPriceStr = postPrice.toString();
  const Navigate = useNavigate();
  const toFarsiNumber = useCallback((n) => {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    n = n.toString().replace(/\d/g, (x) => farsiDigits[x]);
    if (n.length === 4) {
      n = n.split("");
      n.splice(1, 0, ",");
      n = n.join("");
    } else if (n.length === 5) {
      n = n.split("");
      n.splice(2, 0, ",");
      n = n.join("");
    } else if (n.length === 6) {
      n = n.split("");
      n.splice(3, 0, ",");
      n = n.join("");
    } else if (n.length === 7) {
      n = n.split("");
      n.splice(1, 0, ",");
      n.splice(5, 0, ",");
      n = n.join("");
    } else if (n.length === 8) {
      n = n.split("");
      n.splice(2, 0, ",");
      n.splice(6, 0, ",");
      n = n.join("");
    } else if (n.length === 9) {
      n = n.split("");
      n.splice(3, 0, ",");
      n.splice(7, 0, ",");
      n = n.join("");
    }
    return n;
  }, []);
  useEffect(() => {
    setCartProducts(products);
  }, [products]);
  console.log(products);
  const addqty = (id, color, price) => {
    let idx = products.findIndex(
      (item) => item._id === id && item.color === color
    );
    dispatch(addQty({ idx: idx, price: price }));
  };
  const decqty = (id, color, price) => {
    let idx = products.findIndex(
      (item) => item._id === id && item.color === color
    );
    if (products[idx].quantity === 1) {
      dispatch(removeProduct({ id: id, color: color, price: price, qty: 1 }));
      toast.success("محصول با موفقیت حذف گردید", {
        style: {
          fontSize: "14px",
        },
      });
    } else {
      dispatch(decQty({ idx: idx, price: price }));
    }
  };
  const deleteProduct = (id, color, price, qunt) => {
    dispatch(removeProduct({ id: id, color: color, price: price, qty: qunt }));
    toast.success("محصول با موفقیت حذف گردید", {
      style: {
        fontSize: "14px",
      },
    });
  };
  const buyHandler = () => {
    if (Auth && token !== "") {
      setSubmit(true);
      axios
        .get("https://gajetmajet.iran.liara.run/user/getInformationUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setFirstName(res.data.data.result[0].first_name);
          setLastName(res.data.data.result[0].last_name);
          setPhoneNumber(res.data.data.result[0].phone);
          setReady(true);
          window.scrollTo(0, divRef.current.offsetTop);
        })
        .catch((err) =>
          toast.error("خطا در برقراری ارتباط", {
            style: {
              fontSize: "14px",
            },
          })
        );
      axios
        .post("https://gajetmajet.iran.liara.run/payment/maliat", {
          maliat: products.map((item) => item._id),
        })
        .then((res) => {
          console.log(res);
          setTax(res.data.result);
        })
        .catch((err) =>
          toast.error("خطا در برقراری ارتباط", {
            style: {
              fontSize: "14px",
            },
          })
        );
      axios
        .get("https://postex.ir/api/state/getState", {
          headers: {
            token:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJDdXN0b21lcklkIjo0MTEyMzk4MSwiZXhwIjoxODMxNTI4ODM5fQ.Uojat8MAqz08tpks6UZ2mG_sAv-2S4hJnx7YrsMOipo",
          },
        })
        .then((res) => setStates(res.data))
        .catch((err) =>
          toast.error("خطا در برقراری ارتباط", {
            style: {
              fontSize: "14px",
            },
          })
        );
    } else {
      Navigate("/SignUp");
    }
  };
  const stateHandler = (e) => {
    setStateReady(true);
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedOptionText = selectedOption.textContent;
    setState({ name: selectedOptionText, id: e.target.value });
  };
  const finalBuy = () => {
    if (postalCode == "") {
      return toast.error("اطلاعات پستی خود را تکمیل کنید", {
        style: {
          fontSize: "14px",
        },
      });
    } else if (postalCode.length !== 10) {
      return toast.error("کد پستی باید ده رقم باشد", {
        style: {
          fontSize: "14px",
        },
      });
    } else if (address == "") {
      return toast.error("اطلاعات پستی خود را تکمیل کنید", {
        style: {
          fontSize: "14px",
        },
      });
    } else if (state.id == null || city.id == null) {
      return toast.error("شهر و استان مورد نظر را انتخاب کنید", {
        style: {
          fontSize: "14px",
        },
      });
    } else {
      let basket = [];
      cartProducts.map((item) => {
        let obj = {
          title: item.title,
          "_id ": item._id,
          color: item.color,
          quantity: item.quantity,
          theFinalPrice: item.theFinalPrice * item.quantity,
          address,
          postalCode,
          city: city?.name,
          state: state?.name,
        };
        basket.push(obj);
      });
      toast.loading("در حال انتقال به درگاه", {
        style: {
          fontSize: "14px",
        },
      });
      axios
        .post(
          "https://gajetmajet.iran.liara.run/payment/payment",
          {
            basket: basket,
            sendPrice: Number(
              postPriceStr.substring(0, postPriceStr.length - 1)
            ),
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          window.location.replace(res.data.data.gatewayURL);
        })
        .catch((err) => console.log(err))
        .catch((err) =>
          toast.error("خطا در برقراری ارتباط", {
            style: {
              fontSize: "14px",
            },
          })
        );
    }
  };
  useEffect(() => {
    setState((prev) => prev);
  }, [state]);
  useEffect(() => {
    setStateReady((prev) => prev);
  }, [stateReady]);
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "token",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJDdXN0b21lcklkIjo0MTEyMzk4MSwiZXhwIjoxODMxNTI4ODM5fQ.Uojat8MAqz08tpks6UZ2mG_sAv-2S4hJnx7YrsMOipo"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://postex.ir/api/town/getTownsByStateId?stateId=${state?.id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => setCities(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }, [state]);
  const cityHandler = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedOptionText = selectedOption.textContent;
    setCity({ id: e.target.value, name: selectedOptionText });

    if (total >= 500000) {
      if (state.id == 1) {
        setPostPrice(450000);
      } else {
        setPostPrice(550000);
      }
    } else {
      if (state.id == 1) {
        setPostPrice(350000);
      } else {
        setPostPrice(450000);
      }
    }
    // fetch("https://postex.ir/api/newgetprice", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     token:
    //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJDdXN0b21lcklkIjo0MTEyMzk4MSwiZXhwIjoxODMxNTI4ODM5fQ.Uojat8MAqz08tpks6UZ2mG_sAv-2S4hJnx7YrsMOipo", // make sure to replace <insert_token_here> with your actual token
    //   },
    //   body: JSON.stringify({
    //     serviceId: 723,
    //     insuranceName: "غرامت تا سقف 300 هزار تومان",
    //     CartonSizeName: "کارتن نیاز ندارم.",
    //     senderCityId: 580,
    //     receiverCityId: Number(e.target.value),
    //     goodsValue: Number(cartProducts[0]?.theFinalPrice.toString() + "0"),
    //     printBill: false,
    //     printLogo: false,
    //     needCartoon: true,
    //     isCod: false,
    //     sendSms: false,
    //     weight: Math.round(
    //       Number(cartProducts[0]?.features?.weight) > 50
    //         ? Number(cartProducts[0]?.features?.weight)
    //         : 51
    //     ),
    //     PackingDimension: {
    //       Width: Math.round(
    //         Number(cartProducts[0]?.features?.width) > 50
    //           ? Number(cartProducts[0]?.features?.width)
    //           : 51
    //       ),
    //       Height: Math.round(
    //         Number(cartProducts[0]?.features?.height) > 50
    //           ? Number(cartProducts[0]?.features?.height)
    //           : 51
    //       ),
    //       Length: Math.round(
    //         Number(cartProducts[0]?.features?.length) > 50
    //           ? Number(cartProducts[0]?.features?.length)
    //           : 51
    //       ),
    //     }, //الزامی می باشد PackingDimension و CartonSizeName وارد کردن یکی از 2 فیلد
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data && data.ServicePrices && data.ServicePrices[0]) {
    //       setPostPrice(data.ServicePrices[0]?.TotalPriceIncludeTax);
    //     } else {
    //       setPostPrice(400000);
    //     }
    //   })
    //   .catch((error) => console.error(error));
  };
  useEffect(() => {
    setCity((prev) => prev);
  }, [city]);
  return (
    <>
      <Toaster />
      <div className="cart-header-container">
        <h1 className="cart-header">سبد خرید من</h1>
        <span className="cart-header-badge">{toFarsiNumber(qty)}</span>
      </div>
      {products?.length > 0 ? (
        <>
          <div className="cart-wrapper">
            <div className="cart-products-wrapper">
              <ul className="cart-products-container">
                {cartProducts?.map((item, idx) => {
                  let forurl;
                  forurl = item.title.replaceAll(" ", "-");
                  forurl = forurl.replaceAll("/", "-");
                  return (
                    <li className="cart-product-container" key={idx}>
                      <Link
                        to={`/products/product/${item.catagory}/${item._id}/${forurl}`}
                      >
                        <figure
                          className={`cart-product-image-container ${
                            item.discount === 0 ? "clear-after" : ""
                          }`}
                          data-category={`٪${toFarsiNumber(item.discount)}`}
                        >
                          <img
                            src={`https://gajetmajet.iran.liara.run/${item.images[0]}`}
                            className="cart-product-image"
                          />
                        </figure>
                      </Link>
                      <div className="cart-product-texts">
                        <div className="cart-product-text-del">
                          <span className="cart-product-text">
                            {item.title}
                          </span>
                          <span
                            onClick={() =>
                              deleteProduct(
                                item._id,
                                item.color,
                                item.theFinalPrice,
                                item.quantity
                              )
                            }
                          >
                            <FaTrashAlt
                              size="14px"
                              color="#999999"
                              cursor="pointer"
                              style={{ marginLeft: "20px" }}
                            />
                          </span>
                        </div>
                        <div className="cart-product-subtexts">
                          <div className="cart-product-color-container">
                            <span>رنگ:</span>
                            <div
                              className="cart-product-color"
                              style={{
                                backgroundColor: `${item.color}`,
                                padding: "10px",
                              }}
                            />
                          </div>
                          <div className="cart-product-qty">
                            <AiOutlinePlus
                              cursor="pointer"
                              onClick={() =>
                                addqty(item._id, item.color, item.theFinalPrice)
                              }
                            />
                            <span>{toFarsiNumber(item.quantity)}</span>
                            <AiOutlineMinus
                              cursor="pointer"
                              onClick={() =>
                                decqty(item._id, item.color, item.theFinalPrice)
                              }
                            />
                          </div>
                          <div className="cart-product-prices">
                            {item.discount === 0 ? null : (
                              <span className="cart-product-price">
                                {`${toFarsiNumber(
                                  item.price * item.quantity
                                )} تومان`}
                              </span>
                            )}
                            <span className="cart-product-Fprice">
                              {`${toFarsiNumber(
                                item.theFinalPrice * item.quantity
                              )} تومان`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div
                className="cart-form-wrapper"
                style={{
                  height: "auto",
                  width: "100%",
                  display: `${submit ? "block" : "none"}`,
                }}
                ref={divRef}
              >
                {ready ? (
                  <div className="cart-form">
                    <div className="signup-container">
                      <div className="signup-form">
                        <h2 style={{ color: "#333333" }}> اطلاعات نهایی</h2>
                        <div className="name">
                          <input
                            type="text"
                            placeholder="نام"
                            value={firstName}
                            disabled
                            onChange={(e) => {}}
                          />
                          <input
                            type="text"
                            placeholder="نام خانوادگی"
                            disabled
                            value={lastName}
                            onChange={(e) => {}}
                          />
                        </div>
                        <input
                          className="text-input"
                          type="tel"
                          disabled
                          placeholder="شماره موبایل"
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                          }}
                        />
                        <div className="cart-form-selects">
                          <select
                            onChange={(e) => stateHandler(e)}
                            className="cart-form-select"
                          >
                            <option className="cart-form-options">
                              استان خود
                            </option>
                            {states?.map((state, idx) => {
                              return (
                                <option
                                  value={state?.stateId}
                                  key={idx}
                                  className="cart-form-options"
                                >
                                  {state?.stateName}
                                </option>
                              );
                            })}
                          </select>
                          <select
                            onChange={(e) => cityHandler(e)}
                            className="cart-form-select"
                            style={{
                              visibility: `${
                                stateReady && cities?.length > 0
                                  ? "visible"
                                  : "hidden"
                              }`,
                            }}
                          >
                            <option className="cart-form-options">
                              شهر خود
                            </option>
                            {stateReady && cities?.length > 0
                              ? cities?.map((city, idx) => {
                                  return (
                                    <option
                                      value={city?.townId}
                                      key={idx}
                                      className="cart-form-options"
                                    >
                                      {city?.townName}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>
                        <div className="finalPostPrice">
                          {postPrice !== 0 ? (
                            <>
                              <span>هزینه پست و بسته بندی : </span>
                              <span>{toFarsiNumber(postPrice)} ریال</span>
                            </>
                          ) : null}
                        </div>
                        <input
                          className="text-input"
                          type="text"
                          placeholder="ادرس"
                          value={address}
                          onChange={(e) => {
                            setAdress(e.target.value);
                          }}
                        />
                        <input
                          className="text-input"
                          type="text"
                          placeholder="کد پستی"
                          value={postalCode}
                          onChange={(e) => {
                            setPostalCode(e.target.value);
                          }}
                        />
                        <button
                          className="sign-up-button"
                          style={{ width: "60%" }}
                          onClick={finalBuy}
                        >
                          ثبت نهایی
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Loader />
                )}
              </div>
            </div>
            <div className="cart-box-container">
              <div>
                <span style={{ fontSize: "14px" }}>
                  تضمین اصالت و سلامت فیزیکی
                </span>
              </div>
              <div className="cart-box-qty">
                <span>تعداد:</span>
                <span>{toFarsiNumber(qty)}</span>
              </div>
              <div className="cart-box-price">
                <span>قیمت کل کالاها:</span>
                <span>{`${toFarsiNumber(total)} تومان`}</span>
              </div>
              {/* <div className="cart-post-price">
                <span>هزینه مالیات({toFarsiNumber(9)} درصد قیمت کل):</span>
                <span>{toFarsiNumber((9 / 100) * Number(total))} تومان</span>
              </div> */}
              <div className="cart-post-price">
                <span>هزینه پست و ارسال:</span>
                <span> {toFarsiNumber(Math.floor(postPrice / 10))} تومان </span>
              </div>
              <div className="cart-post-price">
                <span>مالیات و بسته بندی محصولات : </span>
                <span>{toFarsiNumber(tax)} تومان </span>
              </div>
              <div className="cart-box-price">
                <span>قیمت نهایی:</span>
                <span>{`${toFarsiNumber(
                  total +
                    tax +
                    Number(postPriceStr.substring(0, postPriceStr.length - 1))
                )} تومان`}</span>
              </div>
              <button className="cart-button" onClick={buyHandler}>
                ادامه سفارش
              </button>
              {/* <Link to='/products' style={{width:'100%'}}>
            <button className='cart-button-continue'>
                ادامه خرید
            </button>
            </Link> */}
            </div>
          </div>
        </>
      ) : (
        <div className="cart-empty-container">
          <span>سبد خرید خالی میباشد</span>
          <Link to="/products">
            <button className="cart-empty-button">صفحه محصولات</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default React.memo(CartComponent);
