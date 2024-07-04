import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./AdminCopmonent.css";
import Loader from "../../helpers/loader/Loader";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment-jalaali";

export const toPersianNums = (input, split) => {
  const persianDigits = {
    0: "۰",
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
  };

  if (split) {
    const formatedValue = Intl.NumberFormat("fa-IR", {
      notation: "standard",
      maximumFractionDigits: 3,
    }).format(Number(input));

    return formatedValue;
  }
  return input?.toString()?.replace(/\d/g, (match) => persianDigits[match]);
};

function AdminCopmonent() {
  const [products, setProducts] = useState([]);
  const [ready, setReady] = useState(false);
  const [expandIndex, setExpandIndex] = useState(-1);
  const [codeRefsObj, setCodeRefsObj] = useState({});
  const { Auth, token, role } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  useEffect(() => {
    if (!Auth || (Auth && !role)) {
      Navigate("/SignUp");
    }
  }, [role]);
  useEffect(() => {
    if (Auth && token !== "" && role) {
      axios
        .get("https://gajetmajet.iran.liara.run/payment/getAllSaleProduct", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProducts(res.data.data.saleProduct);
          setReady(true);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            let token = document.cookie
              .split("; ")
              .find((row) => row.startsWith("Token="))
              .split("=")[1];
            axios
              .post("https://gajetmajet.iran.liara.run/auth/refreshToken", {
                refreshToken: token,
              })
              .then((res) => {
                // dispatch(
                //   logIn([res.data.data.accessToken, res.data.data.bool])
                // );
                console.log(res);
              })
              .catch((error) => console.log(error));
          }
        });
    }
  }, [Auth, token, role]);
  useEffect(() => {
    setProducts((prev) => prev);
  }, [products]);
  useEffect(() => {
    setReady((prev) => prev);
  }, [ready]);
  const sendHdanler = (id, idx) => {
    if (Auth && token !== "" && role) {
      axios
        .post(
          `https://gajetmajet.iran.liara.run/payment/sendProduct`,
          {
            id: id,
            code: codeRefsObj[idx],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          Navigate("/admin");
        })
        .catch((err) =>
          toast.error("خطا در برقراری ارتباط", {
            style: {
              fontSize: "14px",
            },
          })
        );
    }
  };

  const codeRefsChangeHandler = (newVal, idx) => {
    const updatedObj = { ...codeRefsObj };
    updatedObj[idx] = newVal;
    setCodeRefsObj(updatedObj);
  };
  return (
    <div className="admin-products-wrapper">
      <Link to="wait-products" style={{ fontSize: "16px" }}>
        صفحه محصولات در انتظار
      </Link>
      <Toaster />
      {ready ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h2>لیست فروش ها</h2>
          <ol className="admin-products-container">
            {products?.map((item, idx) => {
              return (
                <li key={idx}>
                  <div className="admin-product-container">
                    {item?.send ? (
                      <span>فرستاده شده</span>
                    ) : (
                      <span style={{ color: "red" }}>فرستاده نشده</span>
                    )}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingBottom: "6px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          alignItems: "center",
                          paddingBottom: "6px",
                        }}
                      >
                        <span>
                          تاریخ :{" "}
                          {moment(item?.createdAt).format(
                            "jYYYY/jMM/jDD HH:mm:ss"
                          )}
                        </span>
                        <span>اسم : {item?.userID?.first_name}</span>
                        <span>فامیلی : {item?.userID?.last_name}</span>
                        <span>تلفن : {item?.userID?.phone}</span>
                        <span>
                          قیمت نهایی جمع همه محصولات :
                          {toPersianNums(
                            Math.floor(item?.theFinalPrice / 10),
                            true
                          )}
                          تومان
                        </span>
                        <span
                          style={{
                            backgroundColor: "#f2f2f2",
                            padding: "6px",
                            borderRadius: "12px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            setExpandIndex((prev) => (prev === idx ? -1 : idx))
                          }
                        >
                          مشاهده محصولات
                        </span>
                      </div>
                      <span>شماره فاکتور سفارش : {item?.factor}</span>
                    </div>
                    <div
                      style={{
                        display: expandIndex === idx ? "flex" : "none",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "3px",
                        }}
                      >
                        <span>لیست محصولات خریداری شده : </span>
                        <ol className="admin-product-saled-container">
                          {item?.sale?.map((product, index) => {
                            return (
                              <li key={index}>
                                <div className="admin-product-saled">
                                  <span>اسم : {product?.title}</span>
                                  <span>
                                    قیمت نهایی محصول (تومان) :{" "}
                                    {product?.theFinalPrice}
                                  </span>
                                  <span>رنگ : {product?.color}</span>
                                  <span>تعداد : {product?.count}</span>
                                </div>
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "3px",
                        }}
                      >
                        <span>اطلاعات خریدار : </span>
                        <span>ادرس : {item?.address?.address}</span>
                        <span>کد پستی : {item?.address?.postalCode}</span>
                        <span>استان : {item?.address?.state}</span>
                        <span>شهر : {item?.address?.city}</span>
                        <span>اسم : {item?.userID?.first_name}</span>
                        <span>فامیلی : {item?.userID?.last_name}</span>
                        <span>تلفن : {item?.userID?.phone}</span>
                        {item?.send ? (
                          <></>
                        ) : (
                          <>
                            <input
                              type="text"
                              placeholder="کد رهگیری"
                              value={codeRefsObj[idx] ?? ""}
                              onChange={(e) => {
                                codeRefsChangeHandler(e.target.value, idx);
                              }}
                              style={{ direction: "ltr" }}
                            />
                            <div style={{ display: "flex", gap: "13px" }}>
                              <button
                                className="admin-send-button"
                                onClick={() => sendHdanler(item?._id, idx)}
                              >
                                فرستاده شد
                              </button>
                              <button
                                className="admin-send-button"
                                onClick={() => {}}
                              >
                                مبلغ پرداختی مرجوع شد
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
        <Loader />
      )}
      {/* {productsReady ? (
        <ul className="admin-products-container">
          {products?.map((item, idx) => {
            return (
              <li className="admin-product-container" key={idx}>
                {item?.send ? (
                  <span>فرستاده شده</span>
                ) : (
                  <span style={{ color: "red" }}>فرستاده نشده</span>
                )}
                <ul className="admin-product-saled-container">
                  {item?.sale?.map((product, index) => {
                    return (
                      <li className="admin-product-saled" key={index}>
                        <span>رنگ : {product?.color}</span>
                        <span>تعداد : {product?.count}</span>
                        <span>اسم : {product?.title}</span>
                        <span>
                          قیمت نهایی (تومان) : {product?.theFinalPrice}{" "}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <span>ادرس : {item?.address?.address}</span>
                <span>کد پستی : {item?.address?.postalCode}</span>
                <span>استان : {item?.address?.state}</span>
                <span>شهر : {item?.address?.city}</span>
                <span>اسم : {item?.userID?.first_name}</span>
                <span>فامیلی : {item?.userID?.last_name}</span>
                <span>تلفن : {item?.userID?.phone}</span>
                {item?.send ? (
                  <></>
                ) : (
                  <>
                    <button
                      className="admin-send-button"
                      onClick={() => sendHdanler(item?._id)}
                    >
                      فرستاده شد
                    </button>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <Loader />
      )} */}
    </div>
  );
}

export default React.memo(AdminCopmonent);
