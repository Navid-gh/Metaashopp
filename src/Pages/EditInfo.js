import React from 'react';
import SEO from '../helpers/seo';
import EditComponent from '../Components/editComponent/EditComponent';
import { useLocation } from 'react-router-dom';

function EditInfo() {
  const loc = useLocation();
  const inf = loc.state
  return (
    <>
      <SEO
        titleTemplate="صفحه ویرایش"
        description="صفحه ویرایش اطلاعات متا شاپ"
      />
      <EditComponent inf={inf} />
    </>
  )
}

export default React.memo(EditInfo);