import React from 'react';
import SEO from '../helpers/seo';
import WishComponent from '../Components/wishComponent/wishComponent';

function Whishlist() {
  return (
    <>
        <SEO
            titleTemplate="لیست علاقه مندی"
            description="لیست علاقه مندی متا شاپ"
        />
        <WishComponent />
    </>
  )
}

export default React.memo(Whishlist)