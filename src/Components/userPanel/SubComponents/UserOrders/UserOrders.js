import React, { useState, useEffect } from "react";
import "./UserOrders.css";
import axios from "axios";
import Carditem from "../../../Cards/Carditem";
import Loader from "../../../../helpers/loader/Loader";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

function UserOrders() {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [completedReady, setCompletedReady] = useState(true);
  const [waitOrders, setWaitOrders] = useState([]);
  const [waitReady, setWaitReady] = useState(true);
  const [hoveredCart, setHoveredCart] = useState(-1);
  let { Auth, token } = useSelector((state) => state.user);
  useEffect(() => {
    if (Auth && token !== "") {
      axios
        .get("https://gajetmajet.iran.liara.run/payment/productPurchased", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCompletedOrders(res.data.data.listProduct);
          setCompletedReady(true);
        })
        .catch((err) =>
          toast.error("خطا در برقراری ارتباط", {
            style: {
              fontSize: "14px",
            },
          })
        );
    }
  }, [Auth, token]);
  useEffect(() => {
    setCompletedOrders((prev) => prev);
  }, [completedOrders]);
  useEffect(() => {
    setCompletedReady((prev) => prev);
  }, [completedReady]);
  useEffect(() => {
    setWaitOrders((prev) => prev);
  }, [waitOrders]);
  useEffect(() => {
    setWaitReady((prev) => prev);
  }, [waitReady]);
  const showCartHandler = (i) => {
    setHoveredCart(i);
  };

  const hideCartHandler = () => {
    setHoveredCart(-1);
  };
  return (
    <div className="us-orders-wrapper">
      <Toaster />
      <div className="us-orders-completed-wrapper">
        <h1 className="orders-headers">سفارش های شما </h1>
        {completedReady ? (
          <ul className="us-orders-completed-container">
            {completedOrders?.length > 0 ? (
              completedOrders?.map((card, idx) => {
                return (
                  <li className="us-orders-completed" key={idx}>
                    <Carditem
                      mouseEnter={() => showCartHandler(idx)}
                      mouseOut={hideCartHandler}
                      key={idx}
                      label={card.discount}
                      src={card.images}
                      text={card.title}
                      score={card.sumStar}
                      price={card.theFinalPrice}
                      discounted={card.price}
                      category={card.cat}
                      cat={card.category}
                      qty={card.count}
                      id={card._id}
                      showcart={hoveredCart === idx ? true : false}
                      //colors={card.features.colors}
                      exsclusive={card.ImportantFeatures}
                      desc={card.text}
                      property={card.property}
                      comments={card.comments}
                    />
                  </li>
                );
              })
            ) : (
              <span style={{ fontSize: "16px" }}>لیست خالی است...</span>
            )}
          </ul>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default React.memo(UserOrders);
