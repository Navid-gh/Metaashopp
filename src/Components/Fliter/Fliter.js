import { memo, useState, useEffect, useCallback } from "react";
import "./Fliter.css";
import {
  AiOutlineFilter,
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineClose,
} from "react-icons/ai";
import { StyledEngineProvider } from "@mui/material/styles";
import RangeSlider from "../../helpers/PriceRange";
import { FaFilter } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../redux/filtersSlice";
import { changeRmn } from "../../redux/Remain";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../helpers/loader/Loader";
import { useLocation } from "react-router-dom";
import { updateRng } from "../../redux/priceRngSlice";
import toast, { Toaster } from "react-hot-toast";

function Fliter() {
  const [colorSub, setColorSub] = useState(false);
  const [brandSub, setBrandSub] = useState(false);
  const [priceSub, setPriceSub] = useState(false);
  const [remain, setRemain] = useState(false);
  const [cat, setCat] = useState({});
  const [ready, setReady] = useState(false);
  const [showedSubs, setShowedSubs] = useState({});
  const [siderFilter, setSiderFilter] = useState(false);
  const [openSide, setOpenSide] = useState(false);
  const [subFilters, setSubFilters] = useState({});
  const prices = useSelector((state) => state.priceRng);
  const dispatch = useDispatch();
  const loc = useLocation();
  useEffect(() => {
    const handlesidefilter = () => {
      if (window.innerWidth <= 1000) {
        if (!siderFilter) {
          setSiderFilter(true);
        }
      } else {
        if (siderFilter) {
          setSiderFilter(false);
        }
      }
    };
    handlesidefilter();
    window.addEventListener("resize", handlesidefilter);
    return () => {
      window.removeEventListener("resize", handlesidefilter);
    };
  }, [siderFilter]);
  useEffect(() => {
    setReady(false);
    axios
      .get(
        `https://gajetmajet.iran.liara.run/category/updateCat/${
          loc.pathname.split("/")[2]
        }`
      )
      .then((res) => {
        let result = res.data.data.cat;
        setCat(result);
        dispatch(
          updateRng([res.data.data.cat.range.min, res.data.data.cat.range.max])
        );
        setReady(true);
      })
      .catch((err) => toast.error("خطا در برقراری ارتباط"), {
        style: {
          fontSize: "14px",
        },
      });
  }, [loc.pathname.split("/")[2]]);
  useEffect(() => {
    setCat((prev) => prev);
  }, [cat]);
  useEffect(() => {
    setReady((prev) => prev);
  }, [ready]);
  useEffect(() => {
    if (ready) {
      let keys = {};
      Object.keys(cat.feature).map((key) => {
        keys = { ...keys, [key]: [] };
      });
      setSubFilters({ ...keys });
    }
  }, [ready]);
  useEffect(() => {
    setSubFilters((prev) => prev);
  }, [subFilters]);
  const filtersHandler = (e) => {
    let key = e.target.name;
    if (subFilters[key].indexOf(e.target.value) === -1) {
      setSubFilters({
        ...subFilters,
        [key]: [...subFilters[key], e.target.value],
      });
    } else {
      let values = subFilters[key];
      values = values.filter((item) => item !== e.target.value);
      setSubFilters({
        ...subFilters,
        [key]: [...values],
      });
    }
  };
  useEffect(() => {
    dispatch(updateFilter([subFilters]));
  }, [subFilters]);
  useEffect(() => {
    dispatch(changeRmn(remain));
  }, [remain]);
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
  if (!siderFilter) {
    if (ready) {
      return (
        <>
          <Toaster />
          <div className="filter-wrapper">
            <div className="filter-headers">
              <span className="filter-header">
                <AiOutlineFilter size="18px" />
                فیلتر ها
              </span>
              <button
                className="filter-delete"
                onClick={() => window.location.reload(false)}
              >
                حذف فیلتر ها
              </button>
            </div>
            <div className="filter-colors">
              <div className="filter-colors-arrow-container">
                <span className="colors">برند ها</span>
                <span
                  className="filter-arrow"
                  onClick={() => setBrandSub((prev) => !prev)}
                >
                  {brandSub ? (
                    <AiOutlineUp size="16px" />
                  ) : (
                    <AiOutlineDown size="16px" />
                  )}
                </span>
              </div>
              <div
                className="sub-colors-wrapper"
                style={{ display: `${brandSub ? "block" : "none"}` }}
              >
                <ul className="sub-colors-container">
                  {cat?.feature?.brand?.map((brand, idx) => {
                    return (
                      <li className="sub-color" key={idx}>
                        <div className="sub-color-name-container">
                          <input
                            type="checkbox"
                            className="sub-color-input"
                            name="brand"
                            value={brand}
                            onChange={filtersHandler}
                          />
                          <span className="sub-color-name">{brand}</span>
                        </div>
                        <div className="brands-eng">{null}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="filter-colors">
              <div className="filter-colors-arrow-container">
                <span className="colors">رنگ ها</span>
                <span
                  className="filter-arrow"
                  onClick={() => setColorSub((prev) => !prev)}
                >
                  {colorSub ? (
                    <AiOutlineUp size="16px" />
                  ) : (
                    <AiOutlineDown size="16px" />
                  )}
                </span>
              </div>
              <div
                className="sub-colors-wrapper"
                style={{ display: `${colorSub ? "block" : "none"}` }}
              >
                <ul className="sub-colors-container">
                  {cat?.feature?.colors?.map((color, idx) => {
                    return (
                      <li className="sub-color" key={idx}>
                        <div className="sub-color-name-container">
                          <input
                            type="checkbox"
                            className="sub-color-input"
                            name="colors"
                            value={color}
                            onChange={filtersHandler}
                          />
                          <span className="sub-color-name">{null}</span>
                        </div>
                        <div
                          className="sub-color-circle"
                          style={{ backgroundColor: `${color}` }}
                        ></div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="filter-remaining">
              <span className="rem-text">فقط کالاهای موجود</span>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={() => setRemain((prev) => !prev)}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="filter-colors">
              <div className="filter-colors-arrow-container">
                <span className="colors">محدوده قیمت</span>
                <span
                  className="filter-arrow"
                  onClick={() => setPriceSub((prev) => !prev)}
                >
                  {priceSub ? (
                    <AiOutlineUp size="16px" />
                  ) : (
                    <AiOutlineDown size="16px" />
                  )}
                </span>
              </div>
              <div
                className="sub-price-container"
                style={{ display: `${priceSub ? "flex" : "none"}` }}
              >
                <StyledEngineProvider injectFirst>
                  <RangeSlider min={cat.range.min} max={cat.range.max} />
                </StyledEngineProvider>
                <div className="prices-range-container">
                  <span>از</span>
                  <span className="prices-show-number">
                    {prices[0] ? toFarsiNumber(prices[0]) : null}
                  </span>
                  <span>-</span>
                  <span className="prices-show-number">
                    {prices[1] ? toFarsiNumber(prices[1]) : null} تومان
                  </span>
                </div>
              </div>
            </div>
            {Object.keys(cat.feature).map((item, idx) => {
              if (item === "colors" || item === "brand" || item === "برند") {
                return null;
              }
              return (
                <div className="filter-colors" key={idx}>
                  <div className="filter-colors-arrow-container">
                    <span className="colors">{item}</span>
                    <span
                      className="filter-arrow"
                      onClick={() =>
                        setShowedSubs((prev) => ({
                          ...showedSubs,
                          [item]: !prev[item],
                        }))
                      }
                    >
                      {showedSubs[item] ? (
                        <AiOutlineUp size="16px" />
                      ) : (
                        <AiOutlineDown size="16px" />
                      )}
                    </span>
                  </div>
                  <div
                    className="sub-colors-wrapper"
                    style={{
                      display: `${showedSubs[item] ? "block" : "none"}`,
                    }}
                  >
                    <ul className="sub-colors-container">
                      {cat?.feature[item]?.map((prop, idx) => {
                        return (
                          <li className="sub-color" key={idx}>
                            <div className="sub-color-name-container">
                              <input
                                type="checkbox"
                                className="sub-color-input"
                                name={item}
                                value={prop}
                                onChange={filtersHandler}
                              />
                              <span className="sub-color-name">{prop}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    } else {
      return <Loader />;
    }
  }
  if (ready) {
    return (
      <>
        <Toaster />
        <div
          className={`open-filter-modal-container ${
            openSide ? "side-close-button" : ""
          }`}
          onClick={() => setOpenSide(openSide ? false : true)}
        >
          <span>
            {openSide ? (
              <AiOutlineClose size="22px" color="black" />
            ) : (
              <FaFilter size="22px" />
            )}
          </span>
        </div>
        <div
          className={`side-filter-backdrop ${
            openSide ? "fade-in" : "fade-out"
          }`}
          onClick={() => setOpenSide(false)}
        />
        <div
          className={`filter-wrapper-mobile-wrapper ${
            openSide ? "fade-in" : "fade-out"
          }`}
        >
          <div className="filter-headers">
            <span className="filter-header">
              <AiOutlineFilter size="18px" />
              فیلتر ها
            </span>
            <button className="filter-delete">حذف فیلتر ها</button>
          </div>
          <div className="filter-colors">
            <div className="filter-colors-arrow-container">
              <span className="colors">برند ها</span>
              <span
                className="filter-arrow"
                onClick={() => setBrandSub((prev) => !prev)}
              >
                {brandSub ? (
                  <AiOutlineUp size="16px" />
                ) : (
                  <AiOutlineDown size="16px" />
                )}
              </span>
            </div>
            <div
              className="sub-colors-wrapper"
              style={{ display: `${brandSub ? "block" : "none"}` }}
            >
              <ul className="sub-colors-container">
                {cat?.feature?.brand?.map((brand, idx) => {
                  return (
                    <li className="sub-color" key={idx}>
                      <div className="sub-color-name-container">
                        <input
                          type="checkbox"
                          className="sub-color-input"
                          name="brands"
                          value={brand}
                          onChange={filtersHandler}
                        />
                        <span className="sub-color-name">{brand}</span>
                      </div>
                      <div className="brands-eng">{null}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="filter-colors">
            <div className="filter-colors-arrow-container">
              <span className="colors">رنگ ها</span>
              <span
                className="filter-arrow"
                onClick={() => setColorSub((prev) => !prev)}
              >
                {colorSub ? (
                  <AiOutlineUp size="16px" />
                ) : (
                  <AiOutlineDown size="16px" />
                )}
              </span>
            </div>
            <div
              className="sub-colors-wrapper"
              style={{ display: `${colorSub ? "block" : "none"}` }}
            >
              <ul className="sub-colors-container">
                {cat?.feature?.colors?.map((color, idx) => {
                  return (
                    <li className="sub-color" key={idx}>
                      <div className="sub-color-name-container">
                        <input
                          type="checkbox"
                          className="sub-color-input"
                          name="colors"
                          value={color}
                          onChange={filtersHandler}
                        />
                        <span className="sub-color-name">{null}</span>
                      </div>
                      <div
                        className="sub-color-circle"
                        style={{ backgroundColor: `${color}` }}
                      ></div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="filter-remaining">
            <span className="rem-text">فقط کالاهای موجود</span>
            <label
              className="switch"
              onClick={() => setRemain((prev) => !prev)}
            >
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="filter-colors">
            <div className="filter-colors-arrow-container">
              <span className="colors">محدوده قیمت</span>
              <span
                className="filter-arrow"
                onClick={() => setPriceSub((prev) => !prev)}
              >
                {priceSub ? (
                  <AiOutlineUp size="16px" />
                ) : (
                  <AiOutlineDown size="16px" />
                )}
              </span>
            </div>
            <div
              className="sub-price-container"
              style={{ display: `${priceSub ? "flex" : "none"}` }}
            >
              <StyledEngineProvider injectFirst>
                <RangeSlider min={cat.range.min} max={cat.range.max} />
              </StyledEngineProvider>
              <div className="prices-range-container">
                <span>از</span>
                <span className="prices-show-number">
                  {prices[0] ? toFarsiNumber(prices[0]) : null}
                </span>
                <span>-</span>
                <span className="prices-show-number">
                  {prices[1] ? toFarsiNumber(prices[1]) : null} تومان
                </span>
              </div>
            </div>
          </div>
          {Object.keys(cat.feature).map((item, idx) => {
            if (item === "colors" || item === "brand" || item === "برند") {
              return null;
            }
            return (
              <div className="filter-colors" key={idx}>
                <div className="filter-colors-arrow-container">
                  <span className="colors">{item}</span>
                  <span
                    className="filter-arrow"
                    onClick={() =>
                      setShowedSubs((prev) => ({
                        ...showedSubs,
                        [item]: !prev[item],
                      }))
                    }
                  >
                    {showedSubs[item] ? (
                      <AiOutlineUp size="16px" />
                    ) : (
                      <AiOutlineDown size="16px" />
                    )}
                  </span>
                </div>
                <div
                  className="sub-colors-wrapper"
                  style={{ display: `${showedSubs[item] ? "block" : "none"}` }}
                >
                  <ul className="sub-colors-container">
                    {cat?.feature[item]?.map((prop, idx) => {
                      return (
                        <li className="sub-color" key={idx}>
                          <div className="sub-color-name-container">
                            <input
                              type="checkbox"
                              className="sub-color-input"
                              name={item}
                              value={prop}
                              onChange={filtersHandler}
                            />
                            <span className="sub-color-name">{prop}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return <Loader />;
  }
}

export default memo(Fliter);
