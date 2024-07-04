import React from 'react';
import './SuccessComponent.css';
import {FaCheckCircle} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SuccessComponent() {
  return (
    <div className='success-wrapper'>
        <span style={{display:'flex',gap:'8px',alignItems:'center'}}>
            <h1 className='success-header'>خرید شما با موفقیت انجام شد</h1>
            <FaCheckCircle size='30PX' color='green' /> 
        </span>
        <Link to='/user'> 
            <button className='success-button'>
                برگشت به داشبورد
            </button>
        </Link>       
    </div>
  )
}

export default React.memo(SuccessComponent)