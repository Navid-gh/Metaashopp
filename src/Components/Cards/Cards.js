import React, { useEffect, useState } from "react";
import "./Cards.css";
import Carditem from "./Carditem";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Button from "../UI/Button/Button";
import Loader from "../../helpers/loader/Loader";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Cards({ category, header }) {
  const [hoveredCart, setHoveredCart] = useState(-1);
  const [data, setData] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // axios.get('http://localhost:3000/jsons/data.json')
    axios
      .get(
        `https://gajetmajet.iran.liara.run/product/listAllproductCat/${category}`
      )
      .then((res) => {
        setData(res.data.products);
        setReady(true);
      })
      .catch((err) =>
        toast.error("خطا در برقراری ارتباط", {
          style: {
            fontSize: "14px",
          },
        })
      );
  }, []);
  useEffect(() => {
    setData((prev) => prev);
  }, [data]);
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
    <div className="cards">
      <Toaster />
      <h1>{header}</h1>
      <div className="cards__container">
        <div className="cards__items">
          {ready ? (
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
              {data.map((card, ind) => (
                <Carditem
                  mouseEnter={() => showCartHandler(ind)}
                  mouseOut={hideCartHandler}
                  key={ind}
                  label={card.discount}
                  src={card.images}
                  text={card.title}
                  score={card.sumStar}
                  price={card.theFinalPrice}
                  discounted={card.price}
                  category={card.cat}
                  cat={card.category}
                  qty={card.count}
                  notification={card.notification}
                  id={card._id}
                  showcart={hoveredCart === ind ? true : false}
                  colors={card.features.colors}
                  exsclusive={card.ImportantFeatures}
                  desc={card.text}
                  property={card.property}
                  comments={card.comments}
                />
              ))}
            </Carousel>
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <Button
        buttonsize="btn--medium"
        buttonstyle="btn--more"
        to={`/AllProducts/${category}`}
      >
        مشاهده همه
      </Button>
    </div>
  );
}

export default React.memo(Cards);
