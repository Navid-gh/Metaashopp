import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchComponent from "../Components/SearchComponent/SearchComponent";
import SEO from "../helpers/seo";

function AllProducts() {
  const [dis, setDis] = useState(false);
  let loc = useLocation();
  let cat = loc.pathname.split("/")[2];
  if (loc.pathname.split("/")[3]) {
    if (!dis) {
      setDis(true);
    }
  }
  //   useEffect(() => {
  //     if (loc.pathname.split("/")[3]) {
  //       setDis(true);
  //     }
  //   }, []);
  //   useEffect(() => {
  //     setDis((prev) => prev);
  //   }, [dis]);
  return (
    <>
      <SEO
        titleTemplate={`صفحه نمایش همه محصولات`}
        description="صفحه نمایش محصولات"
      />
      {dis ? (
        <SearchComponent
          query={cat}
          type="All"
          discount={loc.pathname.split("/")[3]}
        />
      ) : (
        <SearchComponent query={cat} type="All" discount={""} />
      )}
    </>
  );
}

export default React.memo(AllProducts);
