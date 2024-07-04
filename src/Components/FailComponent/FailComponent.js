import React from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import '../SuccessComponent/SuccessComponent.css';

function FailedBuy() {
  return (
    <div className='success-wrapper'>
        <span style={{display:'flex',gap:'8px',alignItems:'center'}}>
            <h1 className='success-header'>خرید شما با مشکل مواجه شد </h1>
            <AiOutlineCloseCircle size='30PX' color='red' /> 
        </span>
        <Link to='/cart'> 
            <button className='success-button'>
                برگشت به سبد خرید
            </button>
        </Link>       
    </div>
  )
}

export default React.memo(FailedBuy)