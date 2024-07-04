import React, { useState, useEffect } from "react";
import Carditem from "../Cards/Carditem";
import "./AllProducts.css";
import Fliter from "../Fliter/Fliter";
import { BsSortDown } from "react-icons/bs";
import SEO from "../../helpers/seo";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../helpers/loader/Loader";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function AllProducts() {
  const [hoveredCart, setHoveredCart] = useState(-1);
  const [toolSort, setToolSort] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsHolder, setProductsHolder] = useState([]);
  const [ready, setReady] = useState(false);
  const [filtersHolder, setFiltersHolder] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [ranged, setRanged] = useState([]);
  const [sort, setSort] = useState("");
  const [slice, setSlice] = useState(9);
  const [cat, setCat] = useState("");

  const [whichSort, setWhichSort] = useState({
    asc: { bool: false, value: "ارزان ترین" },
    desc: { bool: true, value: "گران ترین" },
    new: { bool: false, value: "جدید ترین" },
    sale: { bool: false, value: "پرفروش ترین" },
  });
  const loc = useLocation();
  // console.log(products);
  // console.log(productsHolder);
  const filters = useSelector((state) => state.filter[0]);
  const prices = useSelector((state) => state.priceRng);
  const { remain } = useSelector((state) => state.rmain);
  useEffect(() => {
    const handletoolsort = () => {
      if (window.innerWidth <= 550) {
        if (!toolSort) {
          setToolSort(true);
        }
      } else {
        if (toolSort) {
          setToolSort(false);
        }
      }
    };
    handletoolsort();
    window.addEventListener("resize", handletoolsort);
    return () => {
      window.removeEventListener("resize", handletoolsort);
    };
  }, [toolSort]);
  useEffect(() => {
    setCat(loc.pathname.split[2]);
  }, [loc.pathname.split[2]]);
  useEffect(() => {
    setCat((prev) => prev);
  }, [cat]);
  useEffect(() => {
    setReady(false);
    axios
      .get(
        `https://gajetmajet.iran.liara.run/product/listAllProductByCat/${
          loc.pathname.split("/")[2]
        }`
      )
      .then((res) => {
        setProducts(res.data.products);
        setProductsHolder(res.data.products);
        setRanged(res.data.products);
        setReady(true);
      })
      .catch((err) =>
        toast.error("خطا در برقراری ارتباط", {
          style: {
            fontSize: "14px",
          },
        })
      );
  }, [loc.pathname.split("/")[2]]);
  useEffect(() => {
    setProducts((prev) => prev);
  }, [products]);
  useEffect(() => {
    setProductsHolder((prev) => prev);
  }, [productsHolder]);
  useEffect(() => {
    setRanged((prev) => prev);
  }, [ranged]);
  useEffect(() => {
    setReady((prev) => prev);
  }, [ready]);
  useEffect(() => {
    if (sort === "new") {
      setProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setProducts((prev) =>
        [...prev].sort((a, b) => a.theFinalPrice - b.theFinalPrice)
      );
    } else if (sort === "desc") {
      setProducts((prev) =>
        [...prev].sort((a, b) => b.theFinalPrice - a.theFinalPrice)
      );
    } else {
      setProducts((prev) => [...prev].sort((a, b) => b.sale - a.sale));
    }
  }, [sort]);
  useEffect(() => {
    if (filtersHolder.length > 0) {
      let res = [...productsHolder].filter(
        (item) =>
          item.theFinalPrice >= prices[0] && item.theFinalPrice <= prices[1]
      );
      res = [...res].filter((item) =>
        filtersHolder.every((filter) =>
          filter[1].some((value) => {
            return item["ImportantFeatures"][filter[0]]?.includes(value);
          })
        )
      );
      if (remain) {
        res = res.filter((item) => item.count > 0);
      }
      setHolder(res);
      setRanged(res);
    } else {
      let res = [...productsHolder].filter(
        (item) =>
          item.theFinalPrice >= prices[0] && item.theFinalPrice <= prices[1]
      );
      if (remain) {
        res = res.filter((item) => item.count > 0);
      }
      setHolder(res);
      setRanged(res);
    }
  }, [prices]);
  const showCartHandler = (i) => {
    setHoveredCart(i);
  };

  const hideCartHandler = () => {
    setHoveredCart(-1);
  };
  // useEffect(()=>{
  //   const scrollHandler = () => {
  //     let ul = document.querySelector('.all-products-container');
  //     let value = window.scrollY - (ul.offsetTop + ul.offsetHeight - window.innerHeight) + window.innerHeight;
  //     //
  //     if(value >= 440){
  //       setSlice(prev => prev+9);
  //     }
  //   }
  //   window.addEventListener('scroll',scrollHandler);
  //   return () => {
  //     window.removeEventListener("scroll", scrollHandler);
  // };
  // },[])
  const setHolder = (value) => {
    let res;
    if (sort === "new") {
      res = [...value].sort((a, b) => a.createdAt - b.createdAt);
    } else if (sort === "asc") {
      res = [...value].sort((a, b) => a.theFinalPrice - b.theFinalPrice);
    } else if (sort === "desc") {
      res = [...value].sort((a, b) => b.theFinalPrice - a.theFinalPrice);
    } else {
      res = [...value].sort((a, b) => b.sale - a.sale);
    }
    setProducts(res);
  };
  useEffect(() => {
    if (filters) {
      if (Object.values(filters).length > 0) {
        let list = [];
        for (let i in filters) {
          list.push(filters[i].length);
        }
        if (list.some((a) => a > 0)) {
          const fl2 = Object.entries(filters).filter(
            (item) => item[1].length > 0
          );
          setFiltersHolder(fl2);
        } else {
          let res = [...productsHolder].filter(
            (item) =>
              item.theFinalPrice >= prices[0] && item.theFinalPrice <= prices[1]
          );
          setHolder(res);
          setFiltered([]);
          setFiltersHolder([]);
        }
      }
    }
  }, [filters]);
  useEffect(() => {
    if (filtersHolder.length > 0) {
      let result = [...ranged].filter((item) =>
        filtersHolder.every((filter) =>
          filter[1].some((value) => {
            return item["ImportantFeatures"][filter[0]]?.includes(value);
          })
        )
      );
      setHolder(result);
      setFiltered(result);
    }
  }, [filtersHolder]);
  useEffect(() => {
    setFiltered((prev) => prev);
  }, [filtered]);
  useEffect(() => {
    if (remain) {
      setProducts((prev) => [...prev].filter((item) => item.count > 0));
    } else {
      let list = [];
      for (let i in filtersHolder) {
        list.push(filtersHolder[i][1].length);
      }
      if (filtered.length === 0 && list.every((a) => a === 0)) {
        setHolder(ranged);
      } else {
        if (list.some((a) => a === 0)) {
          setProducts(filtered);
        } else {
          setHolder(ranged);
        }
      }
    }
  }, [remain]);
  return (
    <>
      <Toaster />
      {ready ? (
        <>
          <SEO
            titleTemplate={`صفحه محصولات ${productsHolder[0]?.cat} `}
            description={`صفحه محصولات  متا شاپ ${productsHolder[0]?.cat}`}
          />
          <div className="all-product-wrapper">
            <Fliter />
            <div className="left-section-wrapper">
              <div className="headers-filters">
                <div className="sort-filter">
                  <span
                    className="sort-icon"
                    onClick={() => setShowToolTip((prev) => !prev)}
                  >
                    <BsSortDown size="18px" />
                    مرتب سازی بر اساس:
                  </span>
                  <div
                    className="header-sorts-container"
                    style={{ zIndex: `${toolSort ? "1999" : "unset"}` }}
                  >
                    {toolSort ? (
                      <>
                        <span className="tooltip-value">
                          {
                            Object.values(whichSort).find(
                              (item) => item.bool === true
                            ).value
                          }
                        </span>
                        <div
                          className={`header-sorts-tootltip ${
                            showToolTip ? "fade-in" : "fade-out"
                          }`}
                        >
                          <span
                            className={`header-sort ${
                              whichSort.asc.bool ? "active-sort" : ""
                            }`}
                            onClick={() => {
                              setWhichSort({
                                asc: { bool: true, value: "ارزان ترین" },
                                desc: { bool: false, value: "گران ترین" },
                                new: { bool: false, value: "جدید ترین" },
                                sale: { bool: false, value: "پرفروش ترین" },
                              });
                              setShowToolTip(false);
                              setSort("asc");
                            }}
                          >
                            ارزان ترین
                          </span>
                          <span
                            className={`header-sort ${
                              whichSort.desc.bool ? "active-sort" : ""
                            }`}
                            onClick={() => {
                              setWhichSort({
                                asc: { bool: false, value: "ارزان ترین" },
                                desc: { bool: true, value: "گران ترین" },
                                new: { bool: false, value: "جدید ترین" },
                                sale: { bool: false, value: "پرفروش ترین" },
                              });
                              setShowToolTip(false);
                              setSort("desc");
                            }}
                          >
                            گران ترین
                          </span>
                          <span
                            className={`header-sort ${
                              whichSort.new.bool ? "active-sort" : ""
                            }`}
                            onClick={() => {
                              setWhichSort({
                                asc: { bool: false, value: "ارزان ترین" },
                                desc: { bool: false, value: "گران ترین" },
                                new: { bool: true, value: "جدید ترین" },
                                sale: { bool: false, value: "پرفروش ترین" },
                              });
                              setShowToolTip(false);
                              setSort("new");
                            }}
                          >
                            جدید ترین
                          </span>
                          <span
                            className={`header-sort ${
                              whichSort.sale.bool ? "active-sort" : ""
                            }`}
                            onClick={() => {
                              setWhichSort({
                                asc: { bool: false, value: "ارزان ترین" },
                                desc: { bool: false, value: "گران ترین" },
                                new: { bool: false, value: "جدید ترین" },
                                sale: { bool: true, value: "پرفروش ترین" },
                              });
                              setShowToolTip(false);
                              setSort("sale");
                            }}
                          >
                            پرفروش ترین
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span
                          className={`header-sort ${
                            whichSort.asc.bool ? "active-sort" : ""
                          }`}
                          onClick={() => {
                            setWhichSort({
                              asc: { bool: true, value: "ارزان ترین" },
                              desc: { bool: false, value: "گران ترین" },
                              new: { bool: false, value: "جدید ترین" },
                              sale: { bool: false, value: "پرفروش ترین" },
                            });
                            setSort("asc");
                          }}
                        >
                          ارزان ترین
                        </span>
                        <span
                          className={`header-sort ${
                            whichSort.desc.bool ? "active-sort" : ""
                          }`}
                          onClick={() => {
                            setWhichSort({
                              asc: { bool: false, value: "ارزان ترین" },
                              desc: { bool: true, value: "گران ترین" },
                              new: { bool: false, value: "جدید ترین" },
                              sale: { bool: false, value: "پرفروش ترین" },
                            });
                            setSort("desc");
                          }}
                        >
                          گران ترین
                        </span>
                        <span
                          className={`header-sort ${
                            whichSort.new.bool ? "active-sort" : ""
                          }`}
                          onClick={() => {
                            setWhichSort({
                              asc: { bool: false, value: "ارزان ترین" },
                              desc: { bool: false, value: "گران ترین" },
                              new: { bool: true, value: "جدید ترین" },
                              sale: { bool: false, value: "پرفروش ترین" },
                            });
                            setSort("new");
                          }}
                        >
                          جدید ترین
                        </span>
                        <span
                          className={`header-sort ${
                            whichSort.sale.bool ? "active-sort" : ""
                          }`}
                          onClick={() => {
                            setWhichSort({
                              asc: { bool: false, value: "ارزان ترین" },
                              desc: { bool: false, value: "گران ترین" },
                              new: { bool: false, value: "جدید ترین" },
                              sale: { bool: true, value: "پرفروش ترین" },
                            });
                            setSort("sales");
                          }}
                        >
                          پرفروش ترین
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <ul className="all-products-container">
                {products?.length > 0 ? (
                  products?.map((card, ind) => {
                    return (
                      <li
                        className={`all-products-product-container ${
                          slice > 10 ? "pro-fade-out" : ""
                        } ${slice > 10 ? "pro-fade-in" : ""}`}
                        key={ind}
                      >
                        <Carditem
                          mouseEnter={() => showCartHandler(ind)}
                          mouseOut={hideCartHandler}
                          key={ind}
                          label={card?.discount}
                          src={card?.images}
                          text={card?.title}
                          score={card?.sumStar}
                          price={card?.theFinalPrice}
                          discounted={card?.price}
                          category={card?.cat}
                          cat={card?.category}
                          qty={card?.count}
                          notification={card?.notification}
                          id={card?._id}
                          showcart={hoveredCart === ind ? true : false}
                          colors={card?.features?.colors}
                          exsclusive={card?.ImportantFeatures}
                          desc={card?.text}
                          property={card?.property}
                          comments={card?.comments}
                        />
                      </li>
                    );
                  })
                ) : (
                  <span style={{ fontSize: "20px" }}>محصولی یافت نشد</span>
                )}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default React.memo(AllProducts);
