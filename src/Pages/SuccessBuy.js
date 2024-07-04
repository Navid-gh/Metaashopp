import React from 'react';
import SuccessComponent from '../Components/SuccessComponent/SuccessComponent';
import SEO from '../helpers/seo';

function SuccessBuy() {
    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%'}}>
            <SEO
                titleTemplate="صفحه خرید موفق"
                description="خرید موفق متاشاپ"
            />
            <SuccessComponent />
        </div>
    )
}

export default React.memo(SuccessBuy)