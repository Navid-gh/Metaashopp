import React from 'react';
import SEO from '../helpers/seo';
import BreadcrumbWrap from '../helpers/Breadcrumb';
import { useLocation } from 'react-router-dom';
import Button from '../Components/UI/Button/Button';
import '../helpers/NotFound.css';
function NotFound() {
  let { pathname } = useLocation();
  return (
    <>
      <SEO
        titleTemplate="پیدا نشده"
        description="صفحه ی یافت نشده ی متا شاپ"
      />
        <BreadcrumbWrap 
          pages={[
            {label: "صفحه اصلی", path:"/" },
            {label: "صفحه یافت نشده", path:pathname }
          ]}
        />
        <div className='not-found-wrapper'>
            <div className='error-container'>
                <h1>404</h1>
                <h2 style={{fontWeight:'500'}}>متاسفانه صفحه مورد نظر یافت نشد</h2>
                <Button to='/' buttonstyle='btn--signup'>برگشت به صفحه اصلی</Button>
            </div>
        </div>     
    </>
  )
}

export default NotFound;