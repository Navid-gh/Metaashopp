import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchComponent from '../Components/SearchComponent/SearchComponent';
import SEO from '../helpers/seo';
function SearchPage() {
  const loc = useLocation();
  return (
    <>
    <SEO
            titleTemplate={`صفحه نمایش نتایج همه محصولات`}
            description="صفحه نمایش نتایج"
    />
    <SearchComponent query={loc.state.query} type='search' />
    </>

  )
}

export default React.memo(SearchPage);