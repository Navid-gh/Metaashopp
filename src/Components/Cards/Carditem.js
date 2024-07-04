import React, { useEffect, useState, useCallback } from "react";
import "./Cards.css";
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline, IoHeartOutline, IoTrashOutline } from "react-icons/io5";
import ProductRating from "../ProductRating";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../redux/wishSlice";
import { useSelector } from "react-redux";

function Carditem(props) {
  const [forurl, setforurl] = useState(" ");
  const [index, setIndex] = useState(-1);
  const [mobileHover, setMobileHover] = useState(false);
  let {
    label,
    src,
    text,
    score,
    price,
    category,
    cat,
    mouseEnter,
    mouseOut,
    showcart,
    id,
    qty,
    colors,
    exsclusive,
    desc,
    property,
    comments,
    discounted,
    liked,
    notification,
  } = props;
  var forurl2;
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  let { Auth, token } = useSelector((state) => state.user);
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
    forurl2 = text;
    forurl2 = forurl2.replaceAll(" ", "-");
    forurl2 = forurl2.replaceAll("/", "-");
    setforurl(forurl2);
  }, []);
  const addCart = () => {
    Navigate(`/products/product/${cat}/${id}/${forurl}`);
  };
  const addWish = () => {
    if (Auth) {
      axios
        .get(
          `https://gajetmajet.iran.liara.run/admin/products/likeProduct/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          dispatch(
            updateFilter({
              product: {
                discount: label,
                images: src,
                title: text,
                sumStar: score,
                theFinalPrice: price,
                price: discounted,
                cat: category,
                category: cat,
                count: qty,
                _id: id,
                features: { colors: colors },
                ImportantFeatures: exsclusive,
                text: desc,
                property: property,
                comments: comments,
              },
              id: id,
            })
          );
          Navigate("/wishlist");
        });
    } else {
      Navigate("/SignUp");
    }
  };
  useEffect(() => {
    setIndex((prev) => prev);
  }, [index]);
  useEffect(() => {
    const handleMobile = () => {
      if (window.innerWidth <= 724) {
        if (!mobileHover) {
          setMobileHover(true);
        }
      } else {
        if (mobileHover) {
          setMobileHover(false);
        }
      }
    };
    handleMobile();
    window.addEventListener("resize", handleMobile);
    return () => {
      window.removeEventListener("resize", handleMobile);
    };
  }, [mobileHover]);
  const delWish = () => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://gajetmajet.iran.liara.run/admin/products/likeProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload(false);
    };
    fetchData();
  };
  if (qty === 0) {
    return (
      <div
        className="cards__item"
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseOut}
      >
        <div
          className={`cards-hidden-contents ${
            showcart || liked || mobileHover ? "card-active" : ""
          }`}
        >
          <span className="card-icons-container" onClick={addCart}>
            <IoCartOutline size="25px" color="white" />
          </span>
          {liked ? (
            <span className="card-icons-container" onClick={delWish}>
              <IoTrashOutline size="25px" color="white" />
            </span>
          ) : (
            <span className="card-icons-container" onClick={addWish}>
              <IoHeartOutline size="25px" color="white" />
            </span>
          )}
        </div>
        <Link
          className="cards__item__link"
          to={`/products/product/${cat}/${id}/${forurl}`}
          state={{
            label: label,
            text: text,
            score: score,
            price: price,
            category: category,
            qty: qty,
            colors: colors,
            exsclusive: exsclusive,
            desc: desc,
            property: property,
            src: src,
            comments: comments,
            discounted: discounted,
          }}
        >
          <figure
            className="cards__item__pic__wrap3"
            data-qty={notification ? `موجودی بزودی` : `ناموجود`}
            text-n="اضافه به سبد خرید"
          >
            <img
              src={`https://gajetmajet.iran.liara.run/${src[0]}`}
              alt={src}
              className={`cards__item__img ${
                showcart ? "img-fade-out" : "img-fade-in"
              }`}
            />
            <img
              src={`https://gajetmajet.iran.liara.run/${src[1]}`}
              alt={src}
              className={`cards__item__img ${
                showcart ? "img-fade-in" : "img-fade-out"
              }`}
            />
          </figure>
          <div
            className="cards__item__info"
            style={{
              display: "flex",
              flexFlow: "column",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "12px", color: "rgba(0,0,0,0.6)" }}>
              {category}
            </span>
            <span className="cards__item__text">{text}</span>
            <span
              style={{
                alignSelf: "flex-end",
                marginLeft: "25px",
                fontSize: "13px",
                color: "#333333",
                display: "flex",
                gap: "4px",
                marginTop: "20px",
              }}
            >
              <ProductRating ratingValue={score} />
            </span>
            <span
              style={{
                fontSize: "17px",
                fontWeight: "200",
                alignSelf: "flex-end",
                marginLeft: "25px",
                marginBottom: "15px",
              }}
            ></span>
          </div>
        </Link>
      </div>
    );
  } else {
    if (Number(label) === 0) {
      return (
        <div
          className="cards__item"
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseOut}
        >
          <div
            className={`cards-hidden-contents ${
              showcart || liked || mobileHover ? "card-active" : ""
            }`}
          >
            <span className="card-icons-container" onClick={addCart}>
              <IoCartOutline size="25px" color="white" />
            </span>
            {liked ? (
              <span className="card-icons-container" onClick={delWish}>
                <IoTrashOutline size="25px" color="white" />
              </span>
            ) : (
              <span className="card-icons-container" onClick={addWish}>
                <IoHeartOutline size="25px" color="white" />
              </span>
            )}
          </div>
          <Link
            className="cards__item__link"
            to={`/products/product/${cat}/${id}/${forurl}`}
            state={{
              label: label,
              text: text,
              score: score,
              price: price,
              category: category,
              qty: qty,
              colors: colors,
              exsclusive: exsclusive,
              desc: desc,
              property: property,
              src: src,
              comments: comments,
              discounted: discounted,
              cat: cat,
            }}
          >
            <figure className="cards__item__pic__wrap2">
              <img
                src={`https://gajetmajet.iran.liara.run/${src[0]}`}
                alt={src}
                className={`cards__item__img ${
                  showcart ? "img-fade-out" : "img-fade-in"
                }`}
              />
              <img
                src={`https://gajetmajet.iran.liara.run/${src[1]}`}
                alt={src}
                className={`cards__item__img ${
                  showcart ? "img-fade-in" : "img-fade-out"
                }`}
              />
            </figure>
            <div
              className="cards__item__info"
              style={{
                display: "flex",
                flexFlow: "column",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "12px", color: "rgba(0,0,0,0.6)" }}>
                {category}
              </span>
              <span className="cards__item__text">{text}</span>
              <span
                style={{
                  alignSelf: "flex-end",
                  marginLeft: "25px",
                  fontSize: "13px",
                  color: "#333333",
                  display: "flex",
                  gap: "4px",
                  marginTop: "20px",
                }}
              >
                <ProductRating ratingValue={score} />
              </span>
              <span
                style={{
                  fontSize: "17px",
                  fontWeight: "200",
                  alignSelf: "flex-end",
                  marginLeft: "25px",
                  marginBottom: "15px",
                }}
              >
                {price == 0 ? "تماس بگیرید" : `${toFarsiNumber(price)} تومان`}
              </span>
            </div>
          </Link>
        </div>
      );
    }

    return (
      <div
        className="cards__item"
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseOut}
      >
        <div
          className={`cards-hidden-contents ${
            showcart || liked || mobileHover ? "card-active" : ""
          }`}
        >
          <span className="card-icons-container" onClick={addCart}>
            <IoCartOutline size="25px" color="white" />
          </span>
          {liked ? (
            <span className="card-icons-container" onClick={delWish}>
              <IoTrashOutline size="25px" color="white" />
            </span>
          ) : (
            <span className="card-icons-container" onClick={addWish}>
              <IoHeartOutline size="25px" color="white" />
            </span>
          )}
        </div>
        <Link
          className="cards__item__link"
          to={`/products/product/${cat}/${id}/${forurl}`}
          state={{
            label: label,
            text: text,
            score: score,
            price: price,
            category: category,
            qty: qty,
            colors: colors,
            exsclusive: exsclusive,
            desc: desc,
            property: property,
            src: src,
            comments: comments,
            discounted: discounted,
            cat: cat,
          }}
        >
          <figure
            className="cards__item__pic__wrap"
            data-category={`٪${toFarsiNumber(label)}`}
            text-n="اضافه به سبد خرید"
          >
            <img
              src={`https://gajetmajet.iran.liara.run/${src[0]}`}
              alt={src}
              className={`cards__item__img ${
                showcart ? "img-fade-out" : "img-fade-in"
              }`}
            />
            <img
              src={`https://gajetmajet.iran.liara.run/${src[1]}`}
              alt={src}
              className={`cards__item__img ${
                showcart ? "img-fade-in" : "img-fade-out"
              }`}
            />
          </figure>
          <div
            className="cards__item__info"
            style={{
              display: "flex",
              flexFlow: "column",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "12px", color: "rgba(0,0,0,0.6)" }}>
              {category}
            </span>
            <span className="cards__item__text">{text}</span>
            <span
              style={{
                alignSelf: "flex-end",
                marginLeft: "25px",
                fontSize: "13px",
                color: "#333333",
                display: "flex",
                gap: "4px",
                marginTop: "20px",
              }}
            >
              <ProductRating ratingValue={score} />
            </span>
            <div className="card-old-new-prices">
              <span className="card-old">{toFarsiNumber(discounted)}</span>
              <span
                style={{
                  fontSize: "17px",
                  fontWeight: "200",
                  alignSelf: "flex-end",
                  marginLeft: "25px",
                }}
              >
                {price == 0 ? "تماس بگیرید" : `${toFarsiNumber(price)} تومان`}
              </span>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default React.memo(Carditem);
