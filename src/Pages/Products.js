import React from "react";
import Cards from "../Components/Cards/Cards";
import EasyMenu from "../Components/EasyMenu/EasyMenu";
import SEO from "../helpers/seo";
function Products() {
  return (
    <>
      <SEO titleTemplate="محصولات" description="محصولات متا شاپ" />
      <div
        className="all-products"
        style={{ height: "100%", marginTop: "70px" }}
      >
        <EasyMenu />
        <Cards header="محصولات برتر" category={`cover`} />
        <Cards header="محصولات پرفروش" category={`bestSale`} />
        <Cards header="ساعت هوشمند" category={`digitwatch`} />
        <Cards header="قاب و کاور" category={`cover`} />
        <Cards header="سبک زندگی" category={`life-style`} />
        <Cards header="هندزفری" category={`handsfree`} />
        <Cards header="اسپیکر" category={`speaker`} />
        {/* <Cards header='کنسول بازی' category={`digitwatch`}/> */}
        <Cards header="دوربین امنیتی" category={`security-camera`} />
      </div>
    </>
  );
}

export default React.memo(Products);
