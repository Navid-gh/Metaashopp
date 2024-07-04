import React, { useEffect, useState } from "react";
import Carditem from "../Cards/Carditem";
import "./SearchComponent.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../helpers/loader/Loader";

function SearchComponent({ query, type, discount }) {
  const [results, setResults] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (type === "search") {
      axios
        .get(`https://gajetmajet.iran.liara.run/product/list?search=${query}`)
        .then((res) => {
          setResults(res.data.data.products);
          setReady(true);
        })
        .catch((err) =>
          toast.error("خطا در برقراری ارتباط", {
            style: {
              fontSize: "14px",
            },
          })
        );
    } else {
      if (discount !== "" && discount) {
        axios
          .get(
            `https://gajetmajet.iran.liara.run/slider/listProducts/${query}/${discount}`
          )
          .then((res) => {
            setResults(res.data.data.result);
            setReady(true);
            console.log(res);
          })
          .catch((err) => console.log(err))
          .catch((err) =>
            toast.error("خطا در برقراری ارتباط", {
              style: {
                fontSize: "14px",
              },
            })
          );
      } else {
        axios
          .get(
            `https://gajetmajet.iran.liara.run/product/listAllProductByCat/${query}`
          )
          .then((res) => {
            setResults(res.data.products);
            setReady(true);
          })
          .catch((err) =>
            toast.error("خطا در برقراری ارتباط", {
              style: {
                fontSize: "14px",
              },
            })
          );
      }
    }
  }, [query, type, discount]);
  const [hoveredCart, setHoveredCart] = useState(-1);
  useEffect(() => {
    setResults((prev) => prev);
  }, [results]);
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
    <div className="search-results-wrapper">
      <Toaster />
      {ready ? (
        <ul className="search-results-container">
          {results?.map((card, ind) => {
            return (
              <li className="search-result-container" key={ind}>
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
                  id={card._id}
                  showcart={hoveredCart === ind ? true : false}
                  // colors={card.features.colors}
                  exsclusive={card.ImportantFeatures}
                  desc={card.text}
                  property={card.property}
                  comments={card.comments}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default React.memo(SearchComponent);
