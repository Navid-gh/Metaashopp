import React from 'react';
import Button from '../Button/Button';
import './cartbutton.css';
function Cartbutton({change}) {
  return (
    <div className={`${!change?'change':''}`}>
    <Button buttonstyle="btn--cart">
    سبد خرید<i className="fa fa-shopping-cart"><span  className='total-number'>1</span></i>
    </Button>
    </div>
  )
}

export default React.memo(Cartbutton);