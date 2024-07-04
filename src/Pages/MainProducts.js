import React from 'react';
import AllProducts from '../Components/AllProducts/AllProducts';

function MainProducts() {
  return (
    <>
      <AllProducts />
    </>
  )
}

export default React.memo(MainProducts);