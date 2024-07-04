import React from "react";
import Cards from "../Components/Cards/Cards";
import EasyMenu from "../Components/EasyMenu/EasyMenu";
import HeaderImages from "../Components/HeaderImages/HeaderImages";
import SEO from "../helpers/seo";
function Home() {
  return (
    <>
      <SEO titleTemplate="صفحه اصلی" description="صفحه اصلی و خانه متا شاپ" />
      <HeaderImages />
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
    </>
  );
}

export default React.memo(Home);
