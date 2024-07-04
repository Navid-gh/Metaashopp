import React from 'react';
import SEO from '../helpers/seo';
import FailComponent from '../Components/FailComponent/FailComponent';

function FailedBuy() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <SEO
                titleTemplate="صفحه خرید ناموفق"
                description="خرید ناموفق متاشاپ"
            />
            <FailComponent />
        </div>
    )
}

export default React.memo(FailedBuy)