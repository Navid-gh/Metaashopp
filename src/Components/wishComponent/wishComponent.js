import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./wishComponent.css";
import Carditem from "../Cards/Carditem";
import Loader from "../../helpers/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setWish } from "../../redux/wishSlice";
import toast, { Toaster } from "react-hot-toast";

function WishComponent() {
  const [hoveredCart, setHoveredCart] = useState(-1);
  const [products, setProducts] = useState([]);
  const [ready, setReady] = useState(false);
  const cartqty = useSelector((state) => state.Cart.qty);
  const wishProducts = useSelector((state) => state.wish.products);
  let { Auth, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  useEffect(() => {
    if (!Auth) {
      Navigate("/SignUp");
    }
  }, []);
  useEffect(() => {
    if (Auth && token !== "") {
      axios
        .get(`https://gajetmajet.iran.liara.run/user/listLikeProduct`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProducts(res.data.data.products);
          setReady(true);
          dispatch(setWish(res.data.data.products));
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
    setProducts((prev) => prev);
  }, [products]);
  useEffect(() => {
    setReady((prev) => prev);
  }, [ready]);
  const showCartHandler = (i) => {
    setHoveredCart(i);
  };

  const hideCartHandler = () => {
    setHoveredCart(-1);
  };
  return (
    <>
      <Toaster />
      {ready ? (
        wishProducts?.length > 0 ? (
          <div className="wish-wrapper">
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
                    min: 1350,
                  },
                  items: 5,
                  partialVisibilityGutter: 40,
                },
                large_desktop: {
                  breakpoint: {
                    max: 1350,
                    min: 1124,
                  },
                  items: 4,
                  partialVisibilityGutter: 40,
                },
                tablet: {
                  breakpoint: {
                    max: 1124,
                    min: 800,
                  },
                  items: 3,
                  partialVisibilityGutter: 30,
                },
                mobile: {
                  breakpoint: {
                    max: 800,
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
          </div>
        ) : (
          <div className="wish-empty-container">
            {cartqty === 0 ? (
              <span className="wish-cart-empty">لیست خالی است</span>
            ) : (
              <span className="wish-empty">لیست خالی است</span>
            )}
            <Link to="/products">
              <button className="wish-empty-button">صفحه محصولات</button>
            </Link>
          </div>
        )
      ) : (
        <Loader />
      )}
    </>
  );
}

export default React.memo(WishComponent);
