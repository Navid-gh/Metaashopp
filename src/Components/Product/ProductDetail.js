import React, { useEffect, useState, useCallback } from "react";
import "./ProductDetail.css";
import { useLocation } from "react-router-dom";
import SEO from "../../helpers/seo";
import BreadcrumbWrap from "../../helpers/Breadcrumb";
import "./ProductDetail.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineShoppingCart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineClose,
  AiOutlineCheck,
  AiFillBell,
} from "react-icons/ai";
import { BsReplyAll } from "react-icons/bs";
import Cards from "../Cards/Cards";
import ProductRating from "../ProductRating";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../helpers/loader/Loader";
import { addCart } from "../../redux/CartSlice";
import toast, { Toaster } from "react-hot-toast";

function ProductDetail() {
  const [idximage, setidximage] = useState(0);
  const [quantity, setquantity] = useState(1);
  const [reply, setreply] = useState(-1);
  const [selectedcolor, setselectedcolor] = useState(-1);
  const [color, setColor] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [last, setLast] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [selectedsection, setselectedsection] = useState({
    desc: true,
    prop: false,
    comments: false,
  });
  const [showCommentOrder, setSohwCommentOrder] = useState(false);
  const [product, setProduct] = useState({});
  const [sumComments, setSumComments] = useState(0);
  const [ready, setReady] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratinghover, setratingHover] = useState(0);
  const [comment, setComment] = useState("");
  const [inf, setInf] = useState({});
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Cart.products);
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
    const handletotop = () => {
      if (window.innerWidth <= 801) {
        if (!showCommentOrder) {
          setSohwCommentOrder(true);
        }
      } else {
        if (showCommentOrder) {
          setSohwCommentOrder(false);
        }
      }
    };
    handletotop();
    window.addEventListener("resize", handletotop);
    return () => {
      window.removeEventListener("resize", handletotop);
    };
  }, [showCommentOrder]);
  let location = useLocation();
  const id = location.pathname.split("/")[4];
  let pathname = location.pathname;
  let {
    discount: label,
    title: text,
    sumStar: score,
    theFinalPrice: price,
    cat: category,
    count: qty,
    features,
    ImportantFeatures: exsclusive,
    text: desc,
    property,
    images: src,
    comments,
    price: discounted,
    category: cat,
    notification,
  } = product;
  useEffect(() => {
    axios
      .get(`https://gajetmajet.iran.liara.run/product/getProduct/${id}`)
      .then((res) => {
        setSumComments(res.data.data.sumComments);
        setProduct(res.data.data.product);
        setReady(true);
      })
      .catch((err) =>
        toast.error("خطا در برقراری ارتباط", {
          style: {
            fontSize: "14px",
          },
        })
      );
  }, [id]);
  useEffect(() => {
    if (Auth && token !== "") {
      axios
        .get("https://gajetmajet.iran.liara.run/user/getInformationUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const inf = res.data.data.result[0];
          setName(inf?.first_name);
          setLast(inf?.last_name);
          setPhoneNumber(inf?.phone);
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
    setName((prev) => prev);
  }, [name]);
  useEffect(() => {
    setLast((prev) => prev);
  }, [last]);
  useEffect(() => {
    setPhoneNumber((prev) => prev);
  }, [phone]);
  useEffect(() => {
    setProduct((prev) => prev);
    setSumComments((prev) => prev);
  }, [product, sumComments]);
  useEffect(() => {
    setReady((prev) => prev);
  }, [ready]);
  const addqty = () => {
    setquantity((prev) => (prev === 3 ? 3 : prev + 1));
  };
  const decqty = () => {
    setquantity((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const addHandler = () => {
    if (color === "" || color === undefined || color === null) {
      toast.error("لطفا یک رنگ را انتخاب کنید", {
        style: {
          fontSize: "14px",
        },
      });
    } else {
      dispatch(addCart({ ...product, quantity, color }));

      toast.success("محصول با موفقیت اضافه گردید", {
        style: {
          fontSize: "14px",
        },
      });
    }
  };
  const addCommentHandler = (type, _id) => {
    if (Auth && token !== "") {
      if (type === "rep") {
        axios
          .post(
            "https://gajetmajet.iran.liara.run/comment/addComment",
            {
              comment: replyContent,
              id: id,
              parent: _id,
              star: "",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            window.location.reload(false);
          })
          .catch((err) =>
            toast.error("خطا در برقراری ارتباط", {
              style: {
                fontSize: "14px",
              },
            })
          );
      } else {
        axios
          .post(
            "https://gajetmajet.iran.liara.run/comment/addComment",
            {
              comment: comment,
              id: id,
              parent: "",
              star: rating,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            window.location.reload(false);
          })
          .catch((err) =>
            toast.error("خطا در برقراری ارتباط", {
              style: {
                fontSize: "14px",
              },
            })
          );
      }
    } else {
      toast.error("لطفا وارد اکانت خود شوید", {
        style: {
          fontSize: "14px",
        },
      });
    }
  };
  const likeHandler = (type, _id, parent) => {
    if (Auth && token !== "") {
      if (type === "rep") {
        axios
          .post(
            "https://gajetmajet.iran.liara.run/comment/likeComment",
            {
              commentID: _id,
              productID: id,
              parent: parent,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            window.location.reload(false);
          })
          .catch((err) =>
            toast.error("خطا در برقراری ارتباط", {
              style: {
                fontSize: "14px",
              },
            })
          );
      } else {
        axios
          .post(
            "https://gajetmajet.iran.liara.run/comment/likeComment",
            {
              commentID: _id,
              productID: id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            window.location.reload(false);
          })
          .catch((err) =>
            toast.error("خطا در برقراری ارتباط", {
              style: {
                fontSize: "14px",
              },
            })
          );
      }
    } else {
      toast.error("لطفا وارد اکانت خود شوید", {
        style: {
          fontSize: "14px",
        },
      });
    }
  };

  const addNotifHandler = () => {
    if (Auth && token !== "") {
      const loader = toast.loading("در حال بررسی...", {
        style: {
          fontSize: "14px",
        },
      });
      if (color === "" || color === undefined || color === null) {
        toast.error("لطفا یک رنگ را انتخاب کنید", {
          style: {
            fontSize: "14px",
          },
        });
        toast.dismiss(loader);
        return;
      }
      axios
        .post(
          "https://gajetmajet.iran.liara.run/notifiaction/add",
          {
            id,
            color,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          toast.dismiss(loader);
          toast.success("با موفقیت به لیست انتظار شما اضافه شده", {
            style: {
              fontSize: "14px",
            },
          });
        })
        .catch((err) => {
          toast.dismiss(loader);
          if (err.response.status === 400) {
            toast.error("این محصول هم اکنون در لیست انتظار شما وجود دارد", {
              style: {
                fontSize: "14px",
              },
            });
          } else {
            toast.error("خطا در برقراری ارتباط", {
              style: {
                fontSize: "14px",
              },
            });
          }
        });
    } else {
      toast.error("لطفا وارد اکانت خود شوید", {
        style: {
          fontSize: "14px",
        },
      });
    }
  };
  return (
    <>
      <SEO titleTemplate="صفحه محصول" description={`صفحه محصول ${text}`} />
      <Toaster />
      {ready ? (
        <BreadcrumbWrap
          pages={[
            { label: "صفحه اصلی", path: "/" },
            { label: "محصولات", path: "/products" },
            { label: `${category}`, path: "/products/" + cat },
            { label: `صفحه محصول ${text}`, path: pathname },
          ]}
        />
      ) : null}
      {ready ? (
        <>
          <div className="product-wrapper">
            <div className="product-images-container">
              <div className="product-certain-image-wrapper">
                <Zoom zoomMargin={150}>
                  <figure
                    className={`product-certain-image-container ${
                      Number(label) === 0 ? "hide-after" : ""
                    }`}
                    data-category={`٪${toFarsiNumber(label)}`}
                  >
                    <img
                      src={`https://gajetmajet.iran.liara.run/${src[idximage]}`}
                      className="product-certain-image"
                    />
                  </figure>
                </Zoom>
              </div>
              <div className="product-images-slider">
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
                  //pauseOnHover
                  renderArrowsWhenDisabled={false}
                  renderButtonGroupOutside={false}
                  renderDotsOutside={false}
                  responsive={{
                    desktop: {
                      breakpoint: {
                        max: 3000,
                        min: 1024,
                      },
                      items: 4,
                      //partialVisibilityGutter: 40
                    },
                    mobile: {
                      breakpoint: {
                        max: 800,
                        min: 600,
                      },
                      items: 4,
                      //partialVisibilityGutter: 30
                    },
                    mobilesmall: {
                      breakpoint: {
                        max: 600,
                        min: 0,
                      },
                      items: 4,
                      //partialVisibilityGutter: 30
                    },
                    tablet: {
                      breakpoint: {
                        max: 1024,
                        min: 800,
                      },
                      items: 4,
                      //partialVisibilityGutter: 30
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
                  {src?.map((image, ind) => (
                    <figure
                      key={ind}
                      className="product-image-slider-container"
                      onMouseOver={() => {
                        setidximage(ind);
                      }}
                    >
                      <img
                        src={`https://gajetmajet.iran.liara.run/${image}`}
                        className="product-image-slider"
                      />
                    </figure>
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="product-details-wrapper">
              <div className="product-details-container">
                <h1 className="product-details-header">{text}</h1>
                <div className="product-details-score-comment">
                  <span className="product-details-score">
                    {toFarsiNumber(score)}
                    <AiFillStar size="15px" color="#f9bc00" />
                  </span>
                  <span className="product-details-comment">{`${toFarsiNumber(
                    comments.length
                  )} دیدگاه `}</span>
                </div>
                <div className="product-details-con">
                  <p className="product-details-name">ویژگی ها</p>
                  <ul className="product-details-list">
                    {Object?.keys(exsclusive)?.map((item, idx) => {
                      if (item === "colors" || item === "brand") {
                        return;
                      }
                      return (
                        <li className="product-details-item" key={idx}>
                          <span className="product-details-key">{item}:</span>
                          <span className="product-details-value">
                            {exsclusive[item]}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="product-box-container">
                <p className="product-box-paragraph">
                  تضمین اصالت و سلامت کالا
                </p>
                <div className="product-box-colors-container">
                  <span className="product-box-paragraph">انتخاب رنگ</span>
                  <div className="product-box-colors">
                    {features?.colors?.map((color, idx) => {
                      return (
                        <div
                          className="product-box-color"
                          style={{
                            backgroundColor: `${color}`,
                            transform: `${
                              idx === selectedcolor ? "scale(1.30)" : "unset"
                            }`,
                          }}
                          key={idx}
                          onClick={() => {
                            setselectedcolor(idx);
                            setColor(color);
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
                <div
                  className="product-box-price-container"
                  style={{
                    justifyContent: `${qty === 0 ? "center" : "space-between"}`,
                  }}
                >
                  <div className="product-box-qty">
                    <AiOutlinePlus size="15px" onClick={addqty} />
                    <span className="product-qty">
                      {toFarsiNumber(quantity)}
                    </span>
                    <AiOutlineMinus size="15px" onClick={decqty} />
                  </div>
                  <div className="old-new-price">
                    {Number(label) === 0 ? null : (
                      <span className="old-price">
                        {toFarsiNumber(discounted)}
                      </span>
                    )}
                    {qty === 0 ? null : price == 0 ? (
                      <span style={{ fontSize: "16px" }}>تماس بگیرید</span>
                    ) : (
                      <span className="product-price">{`${toFarsiNumber(
                        price
                      )} تومان`}</span>
                    )}
                  </div>
                </div>
                {qty === 0 ? (
                  notification ? (
                    <div className="active-notif-wrapper">
                      <span style={{ fontSize: "13px" }}>
                        این کالا فعلا موجود نیست اما می‌توانید زنگوله را بزنید
                        تا به محض موجود شدن، به شما خبر دهیم.
                      </span>
                      <button
                        type="button"
                        className="product-box-button"
                        onClick={addNotifHandler}
                      >
                        موجود شد خبرم کن <AiFillBell size="20px" />
                      </button>
                    </div>
                  ) : (
                    <span style={{ fontSize: "14px" }}>
                      این محصول موجود نمیباشد
                    </span>
                  )
                ) : products.find(
                    (item) => item._id === id && item.color === color
                  ) ? (
                  <div className="in-cart-text">
                    هم اکنون در سبد خرید شما
                    <AiOutlineCheck size="18px" />
                  </div>
                ) : (
                  <button
                    type="button"
                    className="product-box-button"
                    onClick={addHandler}
                    disabled={price == 0 ? true : false}
                  >
                    افزودن به سبد خرید <AiOutlineShoppingCart size="20px" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div
            className="trusting-section"
            style={{ borderBottom: "2px solid rgba(0,0,0,0.2)" }}
          >
            <div className="trust-container">
              <div className="trusting-containers">
                <figure className="trusting-image-container">
                  <img src="/images/delivery.png" className="trusting-image" />
                </figure>
                <div className="trusting-caption">ارسال سریع و امن</div>
              </div>
              <div className="trusting-containers">
                <figure className="trusting-image-container">
                  <img src="/images/contact.png" className="trusting-image" />
                </figure>
                <div className="trusting-caption">پشتیبانی 24 ساعته</div>
              </div>
            </div>
            <div className="trust-container">
              <div className="trusting-containers">
                <figure className="trusting-image-container">
                  <img src="/images/payment.png" className="trusting-image" />
                </figure>
                <div className="trusting-caption">پرداخت امن و مطمئن</div>
              </div>
              <div className="trusting-containers">
                <figure className="trusting-image-container">
                  <img src="/images/guarantee.png" className="trusting-image" />
                </figure>
                <div className="trusting-caption">ضمانت کیفیت و اصالت</div>
              </div>
            </div>
          </div>
          <div className="diff-details-wrapper">
            <div className="choosing-wrapper">
              <ul className="choosing-container">
                <li
                  className={`${
                    selectedsection.desc
                      ? "choosing-element-selected"
                      : "choosing-element"
                  }`}
                  onClick={() => {
                    setselectedsection({
                      desc: true,
                      comments: false,
                      prop: false,
                    });
                  }}
                >
                  توضیحات
                </li>
                <li
                  className={`${
                    selectedsection.prop
                      ? "choosing-element-selected"
                      : "choosing-element"
                  }`}
                  onClick={() => {
                    setselectedsection({
                      desc: false,
                      comments: false,
                      prop: true,
                    });
                  }}
                >
                  مشخصات
                </li>
                <li
                  className={`${
                    selectedsection.comments
                      ? "choosing-element-selected"
                      : "choosing-element"
                  }`}
                  onClick={() => {
                    setselectedsection({
                      desc: false,
                      comments: true,
                      prop: false,
                    });
                  }}
                >
                  نظرات
                  <span style={{ opacity: "0.6" }}>
                    ({toFarsiNumber(sumComments)})
                  </span>
                </li>
              </ul>
            </div>
            <div
              className={`diff-desc-section-wrapper ${
                selectedsection.desc ? "section-fade-in" : "section-fade-out"
              }`}
            >
              <article className="diff-desc-section-container">{desc}</article>
            </div>
            <div
              className={`diff-property-section-wrapper ${
                selectedsection.prop ? "section-fade-in" : "section-fade-out"
              }`}
            >
              <ul className="diff-property-container">
                {Object?.keys(property)?.map((item, idx) => {
                  return (
                    <li className="diff-property" key={idx}>
                      <span className="diff-property-key">{item}:</span>
                      <span className="diff-property-value">
                        {property[item]}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div
              className={`diff-comments-section-wrapper ${
                selectedsection.comments
                  ? "section-fade-in"
                  : "section-fade-out"
              }`}
            >
              {!showCommentOrder ? (
                <>
                  <div className="diff-comments-adding">
                    <span className="writing-comment">نوشتن نظر</span>
                    <span className="comments-security">
                      ایمیل و اطلاعات شخصی شما محفوظ خواهد ماند
                    </span>
                    <div className="comments-star-container">
                      <span className="writing-score">امتیاز شما*</span>
                      <div className="star-rating">
                        {[...Array(5)].map((star, index) => {
                          index += 1;
                          return (
                            <button
                              type="button"
                              key={index}
                              className={
                                index <=
                                ((rating && ratinghover) || ratinghover)
                                  ? "star-on"
                                  : "star-off"
                              }
                              onClick={() => setRating(index)}
                              onMouseEnter={() => setratingHover(index)}
                              onMouseLeave={() => setratingHover(rating)}
                            >
                              <span className="star">
                                <AiFillStar size="20px" />
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="comments-adding-form">
                      <div className="writing-comment-area">
                        <label className="comment-text-area-label">
                          نظر شما*
                        </label>
                        <textarea
                          className="comment-text-area"
                          style={{ resize: "none" }}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="نظر خود را اینجا بنویسید"
                          required
                        ></textarea>
                      </div>
                      <div className="comment-name-input-container">
                        <label className="comment-name-input-label">
                          نام*{" "}
                        </label>
                        <input
                          className="comment-name-input"
                          type="text"
                          disabled
                          onChange={() => {}}
                          value={`${name} ${last}`}
                        ></input>
                      </div>
                      <div className="comment-email-input-container">
                        <label className="comment-email-input-label">
                          شماره تلفن*{" "}
                        </label>
                        <input
                          className="comment-email-input"
                          type="number"
                          disabled
                          onChange={() => {}}
                          value={phone}
                        ></input>
                      </div>
                      <button
                        className="comments-submit-button"
                        onClick={addCommentHandler}
                      >
                        ثبت نظر
                      </button>
                    </div>
                  </div>
                  <div className="diff-comments-section-container">
                    {comments?.length > 0 ? (
                      <ul className="diff-comments-container">
                        {comments?.map((comment, idx) => (
                          <li className="diff-comment-container" key={idx}>
                            <div className="comment-title-score">
                              <span className="comment-score">
                                <ProductRating ratingValue={comment.star} />
                              </span>
                            </div>
                            <div className="comment-time-name">
                              <span className="coment-time">
                                {comment.createdAt}
                              </span>
                              <span className="comment-name">
                                {comment.user.first_name}
                              </span>
                            </div>
                            <div className="comment-content-container">
                              <p className="comment-content">
                                {comment.comment}
                              </p>
                            </div>
                            <div className="comment-like-reply">
                              <div className="comment-like-container">
                                <span className="comment-like">
                                  {toFarsiNumber(comment.likes.length)}
                                </span>
                                <AiOutlineHeart
                                  size="16px"
                                  onClick={() =>
                                    likeHandler("com", comment._id)
                                  }
                                />
                              </div>
                              <div
                                className="comment-reply-container"
                                onClick={() => setreply(idx)}
                              >
                                <BsReplyAll size="16px" />
                              </div>
                            </div>
                            <div
                              className="type-reply-container"
                              style={{
                                opacity: `${reply === idx ? "1" : "0"}`,
                                height: `${reply === idx ? "auto" : "0"}`,
                              }}
                            >
                              <div className="close-type-reply">
                                <span
                                  onClick={() =>
                                    addCommentHandler("rep", comment._id)
                                  }
                                >
                                  <AiOutlineCheck size="16px" />
                                </span>
                                <span
                                  onClick={() => {
                                    setReplyContent("");
                                    setreply(-1);
                                  }}
                                >
                                  <AiOutlineClose size="16px" />
                                </span>
                              </div>
                              <textarea
                                value={replyContent}
                                onChange={(e) =>
                                  setReplyContent(e.target.value)
                                }
                                className="type-reply"
                                placeholder="جواب خود را اینجا بنویسید"
                              ></textarea>
                            </div>
                            {comment?.answers && comment?.answers.length > 0 ? (
                              <ul
                                className="diff-comments-container"
                                style={{ width: "97%", alignSelf: "flex-end" }}
                              >
                                {comment?.answers.map((reply, index) => {
                                  return (
                                    <li
                                      className="diff-comment-container"
                                      key={index}
                                      style={{ borderBottom: "unset" }}
                                    >
                                      <div className="comment-time-name">
                                        <span className="coment-time">
                                          {reply.createdAt}
                                        </span>
                                        <span className="comment-name">
                                          {reply.user.first_name}
                                        </span>
                                      </div>
                                      <div
                                        className="comment-content-container"
                                        style={{ opacity: "0.8" }}
                                      >
                                        <p className="comment-content">
                                          {reply.comment}
                                        </p>
                                      </div>
                                      <div className="comment-like-reply">
                                        <div className="comment-like-container">
                                          <span className="comment-like">
                                            {toFarsiNumber(reply.likes.length)}
                                          </span>
                                          <AiOutlineHeart
                                            size="16px"
                                            onClick={() =>
                                              likeHandler(
                                                "rep",
                                                reply._id,
                                                comment._id
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="diff-no-comment">
                        <p className="no-comment-p1">
                          هیج نظری برای این محصول وجود ندارد
                        </p>
                        <p className="no-comment-p2">
                          اولین نفری باشید که برای محصول {`" ${text} "`} نظر
                          مینویسید
                        </p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="diff-comments-section-container">
                    {comments?.length > 0 ? (
                      <ul className="diff-comments-container">
                        {comments?.map((comment, idx) => (
                          <li className="diff-comment-container" key={idx}>
                            <div className="comment-title-score">
                              <span className="comment-score">
                                <ProductRating ratingValue={comment.star} />
                              </span>
                            </div>
                            <div className="comment-time-name">
                              <span className="coment-time">
                                {comment.createdAt}
                              </span>
                              <span className="comment-name">
                                {comment.user.first_name}
                              </span>
                            </div>
                            <div className="comment-content-container">
                              <p className="comment-content">
                                {comment.comment}
                              </p>
                            </div>
                            <div className="comment-like-reply">
                              <div className="comment-like-container">
                                <span className="comment-like">
                                  {toFarsiNumber(comment.likes.length)}
                                </span>
                                <AiOutlineHeart
                                  size="16px"
                                  onClick={() =>
                                    likeHandler("com", comment._id)
                                  }
                                />
                              </div>
                              <div
                                className="comment-reply-container"
                                onClick={() => setreply(idx)}
                              >
                                <BsReplyAll size="16px" />
                              </div>
                            </div>
                            <div
                              className="type-reply-container"
                              style={{
                                opacity: `${reply === idx ? "1" : "0"}`,
                                height: `${reply === idx ? "auto" : "0"}`,
                              }}
                            >
                              <div className="close-type-reply">
                                <span
                                  onClick={() =>
                                    addCommentHandler("rep", comment._id)
                                  }
                                >
                                  <AiOutlineCheck size="16px" />
                                </span>
                                <span
                                  onClick={() => {
                                    setReplyContent("");
                                    setreply(-1);
                                  }}
                                >
                                  <AiOutlineClose size="16px" />
                                </span>
                              </div>
                              <textarea
                                value={replyContent}
                                onChange={(e) =>
                                  setReplyContent(e.target.value)
                                }
                                className="type-reply"
                                placeholder="جواب خود را اینجا بنویسید"
                              ></textarea>
                            </div>
                            {comment?.answers && comment?.answers.length > 0 ? (
                              <ul
                                className="diff-comments-container"
                                style={{ width: "97%", alignSelf: "flex-end" }}
                              >
                                {comment?.answers.map((reply, index) => {
                                  return (
                                    <li
                                      className="diff-comment-container"
                                      key={index}
                                      style={{ borderBottom: "unset" }}
                                    >
                                      <div className="comment-time-name">
                                        <span className="coment-time">
                                          {reply.createdAt}
                                        </span>
                                        <span className="comment-name">
                                          {reply.user.first_name}
                                        </span>
                                      </div>
                                      <div
                                        className="comment-content-container"
                                        style={{ opacity: "0.8" }}
                                      >
                                        <p className="comment-content">
                                          {reply.comment}
                                        </p>
                                      </div>
                                      <div className="comment-like-reply">
                                        <div className="comment-like-container">
                                          <span className="comment-like">
                                            {toFarsiNumber(reply.likes.length)}
                                          </span>
                                          <AiOutlineHeart
                                            size="16px"
                                            onClick={() =>
                                              likeHandler(
                                                "rep",
                                                reply._id,
                                                comment._id
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="diff-no-comment">
                        <p className="no-comment-p1">
                          هیج نظری برای این محصول وجود ندارد
                        </p>
                        <p className="no-comment-p2">
                          اولین نفری باشید که برای محصول {`" ${text} "`} نظر
                          مینویسید
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="diff-comments-adding">
                    <span className="writing-comment">نوشتن نظر</span>
                    <span className="comments-security">
                      ایمیل و اطلاعات شخصی شما محفوظ خواهد ماند
                    </span>
                    <div className="comments-star-container">
                      <span className="writing-score">امتیاز شما*</span>
                      <div className="star-rating">
                        {[...Array(5)].map((star, index) => {
                          index += 1;
                          return (
                            <button
                              type="button"
                              key={index}
                              className={
                                index <=
                                ((rating && ratinghover) || ratinghover)
                                  ? "star-on"
                                  : "star-off"
                              }
                              onClick={() => setRating(index)}
                              onMouseEnter={() => setratingHover(index)}
                              onMouseLeave={() => setratingHover(rating)}
                            >
                              <span className="star">
                                <AiFillStar size="20px" />
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="comments-adding-form">
                      <div className="writing-comment-area">
                        <label className="comment-text-area-label">
                          نظر شما*
                        </label>
                        <textarea
                          className="comment-text-area"
                          style={{ resize: "none" }}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="نظر خود را اینجا بنویسید"
                          required
                        ></textarea>
                      </div>
                      <div className="comment-name-input-container">
                        <label className="comment-name-input-label">
                          نام*{" "}
                        </label>
                        <input
                          className="comment-name-input"
                          type="text"
                          disabled
                          onChange={() => {}}
                          value={`${name} ${last}`}
                        ></input>
                      </div>
                      <div className="comment-email-input-container">
                        <label className="comment-email-input-label">
                          شماره تلفن*{" "}
                        </label>
                        <input
                          className="comment-email-input"
                          type="email"
                          disabled
                          onChange={() => {}}
                          value={phone}
                        ></input>
                      </div>
                      <button
                        className="comments-submit-button"
                        onClick={addCommentHandler}
                      >
                        ثبت نظر
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <Cards header="محصولات مشابه" category={cat} />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default React.memo(ProductDetail);
