import React, { useEffect, useState } from "react";
import "./Summary.css";
import { ReactComponent as SVG1 } from "../../../assets/Asset1.svg";
import { ReactComponent as SVG2 } from "../../../assets/Asset2.svg";
import { ReactComponent as SVG3 } from "../../../assets/Asset3.svg";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Loader from "../../../helpers/loader/Loader";
import Carditem from "../../Cards/Carditem";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

function Summary() {
  const [wishProducts, setWishProducts] = useState([]);
  const [wishReady, setWishReady] = useState(false);
  const [lastProducts, setLastProducts] = useState([]);
  const [lastReady, setLastReady] = useState(false);
  const [hoveredCart, setHoveredCart] = useState(-1);
  let { Auth, token } = useSelector((state) => state.user);
  useEffect(() => {
    if (Auth && token !== "") {
      axios
        .get(`https://gajetmajet.iran.liara.run/user/listLikeProduct`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setWishProducts(res.data.data.products);
          setWishReady(true);
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
    if (Auth && token !== "") {
      axios
        .get("https://gajetmajet.iran.liara.run/payment/productPurchased", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.data.listProduct);
          setLastProducts(res.data.data.listProduct);
          setLastReady(true);
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
  // useEffect(() => {
  //     axios.get('http://localhost:3000/jsons/Tester.json')
  //         .then(res => setLastProducts([]))
  //         .catch(err => console.log(err));
  // }, [])
  useEffect(() => {
    setWishProducts((prev) => prev);
  }, [wishProducts]);
  useEffect(() => {
    setWishReady((prev) => prev);
  }, [wishReady]);
  useEffect(() => {
    setLastReady((prev) => prev);
  }, [lastReady]);
  useEffect(() => {
    setLastProducts((prev) => prev);
  }, [lastProducts]);
  const showCartHandler = (i) => {
    setHoveredCart(i);
  };

  const hideCartHandler = () => {
    setHoveredCart(-1);
  };
  return (
    <div className="summary-wrapper">
      <Toaster />
      <h1 className="summary-header">خلاصه فعالیت ها</h1>
      <div className="summary-containers">
        <span className="summary-containers-headers">سفارش های من (بزودی)</span>
        <div className="summary-orders-containers">
          <div className="summary-orders-container">
            <SVG1
              width="50px"
              className="summary-svg"
              style={{ backgroundColor: "rgb(108 102 243 / 15%)" }}
            />
            <div className="summary-orders-texts">
              <span style={{ color: "#6c66f3" }}>جاری</span>
              <span>0 سفارش</span>
            </div>
          </div>
          <div className="summary-orders-container">
            <SVG2
              width="50px"
              className="summary-svg"
              style={{ backgroundColor: "rgb(45 165 97 / 15%)" }}
            />
            <div className="summary-orders-texts">
              <span style={{ color: "#2da561" }}>تحویل داده شده</span>
              <span>0 سفارش</span>
            </div>
          </div>
          <div className="summary-orders-container">
            <SVG3
              width="50px"
              className="summary-svg"
              style={{ backgroundColor: "rgb(255 107 108 / 15%)" }}
            />
            <div className="summary-orders-texts">
              <span style={{ color: "#ff6b6c" }}>مرجوع شده</span>
              <span>0 سفارش</span>
            </div>
          </div>
        </div>
      </div>
      <div className="summary-containers">
        <span className="summary-containers-headers">علاقه مندی ها</span>
        <div className="summary-wish-container">
          {wishReady ? (
            wishProducts && wishProducts?.length > 0 ? (
              <Carousel
                additionalTransfrom={0}
                arrows
                autoPlay
                autoPlaySpeed={3500}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 1700,
                    },
                    items: 5,
                    partialVisibilityGutter: 40,
                  },
                  mobile: {
                    breakpoint: {
                      max: 1100,
                      min: 600,
                    },
                    items: 2,
                    partialVisibilityGutter: 30,
                  },
                  mobilesmall: {
                    breakpoint: {
                      max: 600,
                      min: 0,
                    },
                    items: 1,
                    partialVisibilityGutter: 30,
                  },
                  tablet: {
                    breakpoint: {
                      max: 1700,
                      min: 1400,
                    },
                    items: 4,
                    partialVisibilityGutter: 30,
                  },
                  tablet2: {
                    breakpoint: {
                      max: 1400,
                      min: 1100,
                    },
                    items: 3,
                    partialVisibilityGutter: 30,
                  },
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
              >
                {wishProducts?.map((card, idx) => {
                  return (
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
                      colors={card.features.colors}
                      exsclusive={card.ImportantFeatures}
                      desc={card.text}
                      property={card.property}
                      comments={card.comments}
                      liked={true}
                    />
                  );
                })}
              </Carousel>
            ) : (
              <span style={{ fontSize: "14px" }}>لیست خالی است</span>
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <div className="summary-containers">
        <span className="summary-containers-headers">سفارشات اخیر</span>
        <div className="summary-last-container">
          {lastReady ? (
            lastProducts && lastProducts?.length > 0 ? (
              <Carousel
                additionalTransfrom={0}
                arrows
                autoPlay
                autoPlaySpeed={3500}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 1700,
                    },
                    items: 5,
                    partialVisibilityGutter: 40,
                  },
                  mobile: {
                    breakpoint: {
                      max: 1100,
                      min: 600,
                    },
                    items: 2,
                    partialVisibilityGutter: 30,
                  },
                  mobilesmall: {
                    breakpoint: {
                      max: 600,
                      min: 0,
                    },
                    items: 1,
                    partialVisibilityGutter: 30,
                  },
                  tablet: {
                    breakpoint: {
                      max: 1700,
                      min: 1400,
                    },
                    items: 4,
                    partialVisibilityGutter: 30,
                  },
                  tablet2: {
                    breakpoint: {
                      max: 1400,
                      min: 1100,
                    },
                    items: 3,
                    partialVisibilityGutter: 30,
                  },
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
              >
                {lastProducts?.map((card, idx) => {
                  return (
                    <Carditem
                      //   key={idx}
                      //   mouseEnter={() => showCartHandler(idx)}
                      //   mouseOut={hideCartHandler}
                      //   path={card.path}
                      //   label={card.label}
                      //   src={card.src}
                      //   text={card.text}
                      //   score={card.score}
                      //   price={card.price}
                      //   discounted={card.discounted}
                      //   category={card.category}
                      //   cat={card.cat}
                      //   qty={card.qty}
                      //   id={card.id}
                      //   showcart={hoveredCart === idx ? true : false}
                      //   colors={card.colors}
                      //   exsclusive={card.exsclusive}
                      //   desc={card.desc}
                      //   property={card.property}
                      //   comments={card.comments}
                      //
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
                      colors={card.features.colors}
                      exsclusive={card.ImportantFeatures}
                      desc={card.text}
                      property={card.property}
                      comments={card.comments}
                    />
                  );
                })}
              </Carousel>
            ) : (
              <span style={{ fontSize: "14px" }}>لیست خالی است</span>
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Summary);
