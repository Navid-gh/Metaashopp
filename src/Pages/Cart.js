import React from 'react';
import CartComponent from '../Components/CartComponent/CartComponent';
import SEO from '../helpers/seo';

function Cart() {
  return (
    <>
        <SEO
            titleTemplate="سبد خرید"
            description=" سبد خرید متا شاپ"
        />    
        <CartComponent />
    </>
  )
}

export default React.memo(Cart);