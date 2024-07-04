import React from "react";
import ContactUs from "../Components/ContactUs/ContactUs";
import SEO from "../helpers/seo";

function Contact() {
  return (
    <>
      <SEO titleTemplate="تماس با ما" description="تماس با ما متاشاپ" />
      <ContactUs />
    </>
  );
}

export default React.memo(Contact);
