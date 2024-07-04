import React from 'react';
import UserPanel from '../Components/userPanel/userPanel';
import SEO from '../helpers/seo';

function User() {
  return (
    <>
        <SEO
        titleTemplate="صفحه کاربر"
        description={`صفحه کاربر متا شاپ`}
        />        
        <UserPanel />
    </>
  )
}

export default React.memo(User)